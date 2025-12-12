// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Get these values from your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;