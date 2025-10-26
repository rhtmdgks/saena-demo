import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// During build time, use placeholder values
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseServiceKey || 'placeholder-key';

// Server-side client with service role key (bypasses RLS)
export const supabaseServer = createClient<Database>(url, key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper to check if Supabase is properly configured
export function isSupabaseServerConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceKey);
}
