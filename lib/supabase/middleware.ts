import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // No need for CookieSerializeOptions import

// Define the Cookie type for cookiesToSet
type Cookie = {
  name: string;
  value: string;
  options?: Record<string, any>; // Using Record<string, any> for the cookie options
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = async (request: NextRequest) => {
  const cookieStore = cookies(); // This is a Promise, so we need to await it

  // Set a cookie if needed
  const response = NextResponse.next();

  // Example: Setting a cookie
  response.cookies.set("myCookie", "myCookieValue", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    maxAge: 60 * 60 * 24 * 7, // Set expiration to 1 week
    path: "/",
  });

  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      async getAll() {
        const cookieData = await cookieStore; // Await the promise to get cookies
        return cookieData.getAll();
      },
      async setAll(cookiesToSet: Cookie[]) {
        const cookieData = await cookieStore; // Await the promise to get cookies
        cookiesToSet.forEach(({ name, value, options }) => {
          // Set cookies using the resolved cookie store
          cookieData.set(name, value, options); // Set cookies in the resolved cookie store
          // Set cookies in the response too
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  return { supabaseResponse, response, supabase };
};
