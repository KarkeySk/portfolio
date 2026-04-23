-- ═══════════════════════════════════════════════════════
-- SUPABASE SCHEMA — Contact Messages Table
-- Run this SQL in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

-- Create the contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  subject       TEXT NOT NULL,
  message       TEXT NOT NULL,
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on created_at for efficient querying
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);

-- Create an index on is_read for filtering unread messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read
  ON contact_messages (is_read)
  WHERE is_read = FALSE;

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for the contact form)
CREATE POLICY "Allow anonymous inserts"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Note: the frontend should use INSERT without a trailing SELECT.
-- Returning inserted rows would also require a SELECT policy for anon.

-- Policy: Allow authenticated users to read all messages
CREATE POLICY "Allow authenticated read"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update messages (mark as read)
CREATE POLICY "Allow authenticated update"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ═══════════════════════════════════════════════════════
-- OPTIONAL: Create a view for unread message count
-- ═══════════════════════════════════════════════════════
CREATE OR REPLACE VIEW unread_message_count AS
  SELECT COUNT(*) AS count
  FROM contact_messages
  WHERE is_read = FALSE;

-- ========================================================
-- PAYMENT TRANSACTIONS TABLE
-- Stores eSewa payment attempts and verified completions.
-- For production, verify and update completed payments from
-- a backend or Supabase Edge Function instead of the browser.
-- ========================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM (
      'PENDING',
      'COMPLETE',
      'FULL_REFUND',
      'PARTIAL_REFUND',
      'AMBIGUOUS',
      'CANCELED',
      'NOT_FOUND',
      'FAILED'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name TEXT,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  transaction_uuid TEXT NOT NULL UNIQUE,
  product_code TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  tax_amount NUMERIC(12, 2) DEFAULT 0,
  total_amount NUMERIC(12, 2) NOT NULL,
  product_service_charge NUMERIC(12, 2) DEFAULT 0,
  product_delivery_charge NUMERIC(12, 2) DEFAULT 0,
  status payment_status NOT NULL DEFAULT 'PENDING',
  transaction_code TEXT,
  ref_id TEXT,
  signed_field_names TEXT,
  signature TEXT,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_status
  ON payment_transactions (status);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at
  ON payment_transactions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_customer_email
  ON payment_transactions (customer_email);

CREATE OR REPLACE FUNCTION update_payment_transactions_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS payment_transactions_updated_at
  ON payment_transactions;

CREATE TRIGGER payment_transactions_updated_at
BEFORE UPDATE ON payment_transactions
FOR EACH ROW
EXECUTE FUNCTION update_payment_transactions_updated_at();

ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous payment inserts"
  ON payment_transactions;

CREATE POLICY "Allow anonymous payment inserts"
  ON payment_transactions
  FOR INSERT
  TO anon
  WITH CHECK (status = 'PENDING');

DROP POLICY IF EXISTS "Allow anonymous payment completion updates"
  ON payment_transactions;

CREATE POLICY "Allow anonymous payment completion updates"
  ON payment_transactions
  FOR UPDATE
  TO anon
  USING (status = 'PENDING')
  WITH CHECK (status = 'COMPLETE');

DROP POLICY IF EXISTS "Allow authenticated payment reads"
  ON payment_transactions;

CREATE POLICY "Allow authenticated payment reads"
  ON payment_transactions
  FOR SELECT
  TO authenticated
  USING (true);
