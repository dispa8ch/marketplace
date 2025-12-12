import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers"; // Importing cookies from next/headers

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type Cookie = {
  name: string;
  value: string;
  options?: Record<string, any>; // Optional options with any properties
};

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  // Await the promise to get cookies
  const cookieData = await cookieStore; // Await to access the cookies

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      // This is used to get cookies. The await ensures we access the cookies properly.
      getAll() {
        return cookieData.getAll(); // We can now call getAll() as it's resolved
      },

      // Handle setting cookies by responding with headers directly
      setAll(cookiesToSet: Cookie[]) { // Explicitly type the parameter
        cookiesToSet.forEach(({ name, value, options }) => {
          // Use `cookieData` (resolved promise) for setting cookies directly
          cookieData.set(name, value, options); // Set cookies using the resolved cookie store
        });
      },
    },
  });
};
