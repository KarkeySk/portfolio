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
