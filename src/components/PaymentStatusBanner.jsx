import { useMemo } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { decodeEsewaSuccessData } from '../lib/esewa';

export default function PaymentStatusBanner() {
  const paymentState = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const params = new URLSearchParams(window.location.search);
    const status = params.get('esewa_status');
    const encodedData = params.get('data');
    const decodedData = encodedData ? decodeEsewaSuccessData(encodedData) : null;

    if (decodedData?.status === 'COMPLETE') {
      return {
        tone: 'success',
        title: 'eSewa dev payment completed',
        description: `Transaction ${decodedData.transaction_code || decodedData.transaction_uuid} was returned from the eSewa sandbox successfully.`,
      };
    }

    if (status === 'failure') {
      return {
        tone: 'error',
        title: 'eSewa payment was not completed',
        description: 'The sandbox flow returned to your site without a completed payment. You can try the checkout again or continue with the contact form.',
      };
    }

    if (status === 'success') {
      return {
        tone: 'success',
        title: 'Returned from eSewa sandbox',
        description: 'The payment redirect completed. If you expected a transaction summary, eSewa may not have included the response payload on this return.',
      };
    }

    return null;
  }, []);

  if (!paymentState) {
    return null;
  }

  const isSuccess = paymentState.tone === 'success';
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div className="section-container pb-0 pt-10">
      <div
        className={`glass-card mx-auto flex max-w-4xl items-start gap-4 p-5 ${
          isSuccess ? 'border-green-500/20 bg-green-500/10' : 'border-red-500/20 bg-red-500/10'
        }`}
      >
        <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${isSuccess ? 'text-green-400' : 'text-red-400'}`} />
        <div>
          <p className={`text-sm font-semibold ${isSuccess ? 'text-green-300' : 'text-red-300'}`}>
            {paymentState.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">{paymentState.description}</p>
        </div>
      </div>
    </div>
  );
}
