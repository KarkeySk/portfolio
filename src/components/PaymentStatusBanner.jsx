import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import {
  checkEsewaTransactionStatus,
  clearPendingEsewaPayment,
  getEsewaConfig,
  getPendingEsewaPayment,
  parseEsewaSuccessPayload,
} from '../lib/esewa';
import { completePaymentTransaction } from '../lib/supabase';

function getStatusDescription(statusResponse, pendingPayment) {
  const transactionLabel = statusResponse.ref_id || statusResponse.transaction_uuid;
  const planSuffix = pendingPayment?.planName ? ` for the ${pendingPayment.planName} plan` : '';

  switch (statusResponse.status) {
    case 'COMPLETE':
      return {
        tone: 'success',
        title: 'eSewa payment verified',
        description: `Transaction ${transactionLabel} was confirmed by eSewa${planSuffix}.`,
      };
    case 'PENDING':
      return {
        tone: 'warning',
        title: 'eSewa payment is still pending',
        description: `Transaction ${statusResponse.transaction_uuid} is still pending at eSewa. Please wait a moment and try again if the status does not update.`,
      };
    case 'AMBIGUOUS':
      return {
        tone: 'warning',
        title: 'eSewa payment needs recheck',
        description: `eSewa reported transaction ${transactionLabel} as ambiguous. Please verify it again before treating the payment as complete.`,
      };
    case 'FULL_REFUND':
    case 'PARTIAL_REFUND':
      return {
        tone: 'warning',
        title: 'eSewa payment was refunded',
        description: `Transaction ${transactionLabel} returned a ${statusResponse.status.toLowerCase().replace('_', ' ')} status from eSewa.`,
      };
    case 'CANCELED':
    case 'NOT_FOUND':
      return {
        tone: 'error',
        title: 'eSewa payment was not completed',
        description: `Transaction ${statusResponse.transaction_uuid} returned a ${statusResponse.status.toLowerCase().replace('_', ' ')} status from eSewa.`,
      };
    default:
      return {
        tone: 'warning',
        title: 'eSewa returned an unexpected status',
        description: `Transaction ${statusResponse.transaction_uuid} returned status ${statusResponse.status}.`,
      };
  }
}

function getEsewaReturnParams() {
  const params = new URLSearchParams(window.location.search);
  const hashQuery = window.location.hash.includes('?') ? window.location.hash.slice(window.location.hash.indexOf('?')) : '';
  const hashParams = new URLSearchParams(hashQuery);

  return {
    status: params.get('esewa_status') || hashParams.get('esewa_status'),
    encodedData: params.get('data') || hashParams.get('data'),
  };
}

export default function PaymentStatusBanner() {
  const [paymentState, setPaymentState] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function resolvePaymentState() {
      if (typeof window === 'undefined') {
        return;
      }

      const { status, encodedData } = getEsewaReturnParams();
      const pendingPayment = getPendingEsewaPayment();
      const { enableBrowserStatusCheck } = getEsewaConfig();

      if (!encodedData && !status) {
        return;
      }

      if (encodedData) {
        const parsedPayload = await parseEsewaSuccessPayload(encodedData);

        if (ignore) {
          return;
        }

        if (!parsedPayload.ok) {
          setPaymentState({
            tone: 'error',
            title: 'Unable to verify the eSewa response',
            description:
              parsedPayload.reason === 'invalid_signature'
                ? 'The returned payment payload did not pass the official eSewa signature check.'
                : 'The returned payment payload could not be decoded from eSewa.',
          });
          return;
        }

        if (parsedPayload.payload?.status === 'COMPLETE') {
          try {
            await completePaymentTransaction(parsedPayload.payload);
            clearPendingEsewaPayment();
          } catch (error) {
            setPaymentState({
              tone: 'warning',
              title: 'eSewa payment verified, but database save failed',
              description: error.message || 'The payment completed, but the transaction could not be saved to Supabase.',
            });
            return;
          }

          setPaymentState({
            tone: 'success',
            title: 'eSewa payment completed',
            description: `Transaction ${parsedPayload.payload.transaction_code || parsedPayload.payload.transaction_uuid} was verified and saved to Supabase.`,
          });
          return;
        }

        setPaymentState({
          tone: 'warning',
          title: 'eSewa returned a non-complete response',
          description: `The signed response returned status ${parsedPayload.payload.status}.`,
        });
        return;
      }

      if (!pendingPayment) {
        setPaymentState({
          tone: status === 'failure' ? 'error' : 'warning',
          title: status === 'failure' ? 'eSewa payment was not completed' : 'Returned from eSewa',
          description: 'No pending local transaction details were available to verify this payment with eSewa.',
        });
        return;
      }

      if (!enableBrowserStatusCheck) {
        setPaymentState({
          tone: status === 'failure' ? 'error' : 'warning',
          title: status === 'failure' ? 'eSewa payment was not completed' : 'Returned from eSewa',
          description:
            status === 'failure'
              ? `Transaction ${pendingPayment.transactionUuid} was not completed in eSewa.`
              : `Transaction ${pendingPayment.transactionUuid} returned without a signed eSewa payload. Browser status checks are disabled because eSewa may block them with CORS.`,
        });
        return;
      }

      setPaymentState({
        tone: 'loading',
        title: 'Verifying payment with eSewa',
        description: `Checking transaction ${pendingPayment.transactionUuid} with the official status endpoint.`,
      });

      try {
        const statusResponse = await checkEsewaTransactionStatus({
          productCode: pendingPayment.productCode,
          totalAmount: pendingPayment.totalAmount,
          transactionUuid: pendingPayment.transactionUuid,
        });

        if (ignore) {
          return;
        }

        if (statusResponse.status === 'COMPLETE') {
          try {
            await completePaymentTransaction(statusResponse);
            clearPendingEsewaPayment();
          } catch (error) {
            setPaymentState({
              tone: 'warning',
              title: 'eSewa payment verified, but database save failed',
              description: error.message || 'The payment completed, but the transaction could not be saved to Supabase.',
            });
            return;
          }
        }

        setPaymentState(getStatusDescription(statusResponse, pendingPayment));
      } catch (error) {
        if (ignore) {
          return;
        }

        setPaymentState({
          tone: 'error',
          title: 'Could not verify the eSewa payment',
          description:
            error instanceof TypeError
              ? 'The eSewa status endpoint could not be reached from the browser. This is usually a CORS/network restriction, not a checkout form error.'
              : error.message || 'The status check request failed.',
        });
      }
    }

    void resolvePaymentState();

    return () => {
      ignore = true;
    };
  }, []);

  if (!paymentState) {
    return null;
  }

  const toneStyles = {
    success: {
      wrapper: 'border-green-500/20 bg-green-500/10',
      icon: 'text-green-400',
      title: 'text-green-300',
    },
    warning: {
      wrapper: 'border-amber-500/20 bg-amber-500/10',
      icon: 'text-amber-400',
      title: 'text-amber-300',
    },
    error: {
      wrapper: 'border-red-500/20 bg-red-500/10',
      icon: 'text-red-400',
      title: 'text-red-300',
    },
    loading: {
      wrapper: 'border-sky-500/20 bg-sky-500/10',
      icon: 'text-sky-400',
      title: 'text-sky-300',
    },
  };

  const currentTone = toneStyles[paymentState.tone] || toneStyles.warning;
  const Icon = paymentState.tone === 'success'
    ? CheckCircle2
    : paymentState.tone === 'loading'
      ? Loader2
      : AlertCircle;

  return (
    <div className="section-container pb-0 pt-10">
      <div className={`glass-card mx-auto flex max-w-4xl items-start gap-4 p-5 ${currentTone.wrapper}`}>
        <Icon
          className={`mt-0.5 h-5 w-5 flex-shrink-0 ${currentTone.icon} ${
            paymentState.tone === 'loading' ? 'animate-spin' : ''
          }`}
        />
        <div>
          <p className={`text-sm font-semibold ${currentTone.title}`}>{paymentState.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">{paymentState.description}</p>
        </div>
      </div>
    </div>
  );
}
