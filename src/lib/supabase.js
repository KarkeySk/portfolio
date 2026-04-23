import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. Contact form will work in demo mode.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit a contact message to Supabase.
 * Falls back to a demo mode (console.log) if Supabase is not configured.
 */
export async function submitContactMessage({ name, email, subject, message }) {
  if (!supabase) {
    console.log('Demo mode - message logged:', { name, email, subject, message });
    return { success: true, demo: true };
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name,
        email,
        subject,
        message,
      },
    ]);

  if (error) throw error;

  return { success: true };
}

export async function createPaymentTransaction(payment) {
  if (!supabase) {
    console.log('Demo mode - pending payment logged:', payment);
    return { success: true, demo: true };
  }

  const { error } = await supabase
    .from('payment_transactions')
    .insert([
      {
        plan_name: payment.planName,
        customer_name: payment.customerName,
        customer_email: payment.customerEmail,
        customer_phone: payment.customerPhone,
        transaction_uuid: payment.transactionUuid,
        product_code: payment.productCode,
        amount: payment.amount,
        tax_amount: payment.taxAmount,
        total_amount: payment.totalAmount,
        product_service_charge: payment.productServiceCharge,
        product_delivery_charge: payment.productDeliveryCharge,
        status: 'PENDING',
      },
    ]);

  if (error) throw error;

  return { success: true };
}

export async function completePaymentTransaction(paymentResponse) {
  if (!supabase) {
    console.log('Demo mode - completed payment logged:', paymentResponse);
    return { success: true, demo: true };
  }

  const { error } = await supabase
    .from('payment_transactions')
    .update({
      status: paymentResponse.status || 'COMPLETE',
      transaction_code: paymentResponse.transaction_code || null,
      ref_id: paymentResponse.ref_id || null,
      signed_field_names: paymentResponse.signed_field_names || null,
      signature: paymentResponse.signature || null,
      raw_response: paymentResponse,
      verified_at: new Date().toISOString(),
    })
    .eq('transaction_uuid', paymentResponse.transaction_uuid);

  if (error) throw error;

  return { success: true };
}
