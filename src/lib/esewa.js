const ESEWA_DEV_FORM_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
const ESEWA_PROD_FORM_URL = 'https://epay.esewa.com.np/api/epay/main/v2/form';
const ESEWA_DEV_STATUS_URL = 'https://rc.esewa.com.np/api/epay/transaction/status/';
const ESEWA_PROD_STATUS_URL = 'https://esewa.com.np/api/epay/transaction/status/';
const ESEWA_DEV_PRODUCT_CODE = 'EPAYTEST';
const ESEWA_DEV_SECRET_KEY = '8gBm/:&EnhH.1/q';
const ENABLE_BROWSER_STATUS_CHECK = 'true';
const DEFAULT_TAX_AMOUNT = 0;
const DEFAULT_SERVICE_CHARGE = 0;
const DEFAULT_DELIVERY_CHARGE = 0;
const REQUEST_SIGNED_FIELD_NAMES = 'total_amount,transaction_uuid,product_code';
const PENDING_PAYMENT_STORAGE_KEY = 'portfolio:esewa-payment';

const encoder = new TextEncoder();

function encodeBase64(bytes) {
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

function normalizeBase64(value) {
  const sanitized = value.trim().replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  const paddingNeeded = sanitized.length % 4;

  if (!paddingNeeded) {
    return sanitized;
  }

  return `${sanitized}${'='.repeat(4 - paddingNeeded)}`;
}

function normalizeStatusUrl(statusUrl) {
  return statusUrl.endsWith('/') ? statusUrl : `${statusUrl}/`;
}

function createSignatureMessage(fieldNames, values) {
  return fieldNames
    .split(',')
    .map((fieldName) => fieldName.trim())
    .filter(Boolean)
    .map((fieldName) => `${fieldName}=${values[fieldName] ?? ''}`)
    .join(',');
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
  const slug = planName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'portfolio';
  const timestamp = new Date().toISOString().replaceAll('-', '').replaceAll(':', '').replaceAll('.', '').replace('T', '').replace('Z', '').slice(0, 14);

  return `${slug}-${timestamp}`;
}

function storePendingPayment(details) {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(PENDING_PAYMENT_STORAGE_KEY, JSON.stringify(details));
}

export function getPendingEsewaPayment() {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.sessionStorage.getItem(PENDING_PAYMENT_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearPendingEsewaPayment() {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(PENDING_PAYMENT_STORAGE_KEY);
}

export function getEsewaConfig() {
  const productCode = import.meta.env.VITE_ESEWA_PRODUCT_CODE || ESEWA_DEV_PRODUCT_CODE;
  const isDevMerchant = productCode === ESEWA_DEV_PRODUCT_CODE;
  const defaultFormUrl = isDevMerchant ? ESEWA_DEV_FORM_URL : ESEWA_PROD_FORM_URL;
  const defaultStatusCheckUrl = isDevMerchant ? ESEWA_DEV_STATUS_URL : ESEWA_PROD_STATUS_URL;

  return {
    formUrl: import.meta.env.VITE_ESEWA_FORM_URL || defaultFormUrl,
    statusCheckUrl: normalizeStatusUrl(import.meta.env.VITE_ESEWA_STATUS_URL || defaultStatusCheckUrl),
    enableBrowserStatusCheck: import.meta.env.VITE_ESEWA_ENABLE_BROWSER_STATUS_CHECK === ENABLE_BROWSER_STATUS_CHECK,
    productCode,
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
  const { productCode, secretKey } = getEsewaConfig();

  const returnUrl = `${window.location.origin}${window.location.pathname}`;
  const successUrl = returnUrl;
  const failureUrl = `${returnUrl}?esewa_status=failure`;
  const signatureMessage = createSignatureMessage(REQUEST_SIGNED_FIELD_NAMES, {
    total_amount: String(totalAmount),
    transaction_uuid: transactionUuid,
    product_code: productCode,
  });
  const signature = await createSignature(signatureMessage, secretKey);

  const payload = {
    amount: String(amount),
    tax_amount: String(taxAmount),
    total_amount: String(totalAmount),
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: String(productServiceCharge),
    product_delivery_charge: String(productDeliveryCharge),
    success_url: successUrl,
    failure_url: failureUrl,
    signed_field_names: REQUEST_SIGNED_FIELD_NAMES,
    signature,
  };

  storePendingPayment({
    planName: plan.name,
    amount: payload.amount,
    totalAmount: payload.total_amount,
    transactionUuid,
    productCode,
    createdAt: new Date().toISOString(),
  });

  return payload;
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
    const decoded = window.atob(normalizeBase64(encodedData));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export async function verifyEsewaSignedPayload(payload) {
  if (!payload?.signed_field_names || !payload?.signature || typeof window === 'undefined' || !window.crypto?.subtle) {
    return false;
  }

  const message = createSignatureMessage(payload.signed_field_names, payload);
  const expectedSignature = await createSignature(message, getEsewaConfig().secretKey);

  return payload.signature === expectedSignature;
}

export async function parseEsewaSuccessPayload(encodedData) {
  const payload = decodeEsewaSuccessData(encodedData);

  if (!payload) {
    return {
      ok: false,
      reason: 'invalid_payload',
    };
  }

  const signatureValid = await verifyEsewaSignedPayload(payload);

  return {
    ok: signatureValid,
    payload,
    reason: signatureValid ? null : 'invalid_signature',
  };
}

export async function checkEsewaTransactionStatus({ productCode, totalAmount, transactionUuid }) {
  const params = new URLSearchParams({
    product_code: productCode,
    total_amount: String(totalAmount),
    transaction_uuid: transactionUuid,
  });
  const statusUrl = `${getEsewaConfig().statusCheckUrl}?${params.toString()}`;
  const response = await fetch(statusUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`eSewa status check failed with ${response.status}.`);
  }

  return response.json();
}
