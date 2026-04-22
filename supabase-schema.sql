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
