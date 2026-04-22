const ESEWA_DEV_FORM_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
const ESEWA_DEV_PRODUCT_CODE = 'EPAYTEST';
const ESEWA_DEV_SECRET_KEY = '8gBm/:&EnhH.1/q';
const DEFAULT_TAX_AMOUNT = 0;
const DEFAULT_SERVICE_CHARGE = 0;
const DEFAULT_DELIVERY_CHARGE = 0;
const SIGNED_FIELD_NAMES = 'total_amount,transaction_uuid,product_code';

const encoder = new TextEncoder();

function encodeBase64(bytes) {
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

async function createSignature(message, secretKey) {
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await window.crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));

  return encodeBase64(new Uint8Array(signatureBuffer));
}

function createTransactionId(planName) {
  const slug = planName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

  return `${slug}-${timestamp}`;
}

export function getEsewaConfig() {
  return {
    formUrl: import.meta.env.VITE_ESEWA_FORM_URL || ESEWA_DEV_FORM_URL,
    productCode: import.meta.env.VITE_ESEWA_PRODUCT_CODE || ESEWA_DEV_PRODUCT_CODE,
    secretKey: import.meta.env.VITE_ESEWA_SECRET_KEY || ESEWA_DEV_SECRET_KEY,
  };
}

export async function createEsewaPaymentPayload(plan) {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    throw new Error('This browser does not support the secure eSewa payment flow.');
  }

  const amount = Number(plan.amount);

  if (!Number.isFinite(amount)) {
    throw new Error('Invalid plan amount for eSewa payment.');
  }

  const taxAmount = DEFAULT_TAX_AMOUNT;
  const productServiceCharge = DEFAULT_SERVICE_CHARGE;
  const productDeliveryCharge = DEFAULT_DELIVERY_CHARGE;
  const totalAmount = amount + taxAmount + productServiceCharge + productDeliveryCharge;
  const transactionUuid = createTransactionId(plan.name);
  const { productCode } = getEsewaConfig();

  const successUrl = `${window.location.origin}${window.location.pathname}?esewa_status=success#pricing`;
  const failureUrl = `${window.location.origin}${window.location.pathname}?esewa_status=failure#pricing`;
  const signatureMessage = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const signature = await createSignature(signatureMessage, getEsewaConfig().secretKey);

  return {
    amount: String(amount),
    tax_amount: String(taxAmount),
    total_amount: String(totalAmount),
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: String(productServiceCharge),
    product_delivery_charge: String(productDeliveryCharge),
    success_url: successUrl,
    failure_url: failureUrl,
    signed_field_names: SIGNED_FIELD_NAMES,
    signature,
  };
}

export function submitEsewaPayment(payload) {
  const { formUrl } = getEsewaConfig();
  const form = document.createElement('form');

  form.method = 'POST';
  form.action = formUrl;
  form.style.display = 'none';

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export function decodeEsewaSuccessData(encodedData) {
  try {
    const decoded = window.atob(encodedData);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
