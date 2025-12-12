"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseClient } from '@/lib/supabase/client';
import { Loader2 } from "lucide-react";
import Image from "next/image";

/**
 * LoginPage handles user authentication. Upon successful sign in, it
 * retrieves the account information from the custom `users` table and
 * personal details from the `profiles` table, then combines them and
 * caches the result in localStorage. This ensures the correct role
 * (buyer/seller) and personal data are displayed across the app.
 */
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const returnUrl = searchParams.get("returnUrl") || "/";
  const supabase = getSupabaseClient();

  // Redirect if already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push(returnUrl);
      }
    };
    checkSession();
  }, [router, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
      if (signInError) throw signInError;
      // Retrieve userId from the current session
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user.id;
      if (userId) {
        // Fetch account data from users (role, email)
        const { data: userRow, error: userErr } = await supabase
          .from("users")
          .select("id, email, role")
          .eq("id", userId)
          .single();
        // Fetch profile data from profiles (first/last names, phone)
        const { data: profileRow, error: profileErr } = await supabase
          .from("profiles")
          .select("first_name, last_name, phone")
          .eq("id", userId)
          .single();
        if (!userErr && userRow) {
          const fullName = `${profileRow?.first_name ?? ""} ${
            profileRow?.last_name ?? ""
          }`.trim();
          const combined = {
            id: userRow.id,
            name: fullName,
            email: userRow.email,
            phone: profileRow?.phone ?? "",
            role: userRow.role,
          };
          if (typeof window !== "undefined") {
            localStorage.setItem("dispa8ch_customer", JSON.stringify(combined));
          }
        }
      }
      toast({
        title: "Welcome back",
        description: "You have successfully signed in.",
      });
      router.push(returnUrl);
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col relative bg-[#E41F47] text-white p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg"
            alt="Abstract lines"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h1 className="text-[60px] leading-[0.9] mb-4">Welcome Back</h1>
            <p className="text-xl tracking-wide font-light max-w-md mt-8 border-t border-[#EBE1DC]/30 pt-8">
              Connect directly with local vendors. Logistics simplified for the
              modern world.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative">
        <div className="w-full max-w-[400px] space-y-12">
          <h2 className="text-4xl text-primary">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <Button
              variant="default"
              type="submit"
              className="w-full h-12 text-sm tracking-widest font-medium bg-[#E41F47] hover:bg-[#E41F47]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-center">
              <span className="text-xs text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                href="/auth/register"
                className="text-xs font-medium text-primary hover:underline transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}