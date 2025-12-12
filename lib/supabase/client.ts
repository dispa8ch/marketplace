// lib/supabase/client.ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Function to create a new Supabase client (so onboarding can call it)
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseKey);
}

// Default client instance for the rest of your app
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
export default supabase;
