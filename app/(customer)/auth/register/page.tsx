"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Store, User } from "lucide-react";
import { getSupabaseClient } from '@/lib/supabase/client';
import Iconex from "@/components/icons/iconex";

/**
 * RegisterPage handles user sign‑up. It creates a new auth user via
 * Supabase Auth, then stores additional metadata in both the public.users
 * and public.profiles tables. The public.users table stores id, email,
 * role, name and phone. The public.profiles table stores first/last names
 * and phone number. After successful registration the combined profile is
 * cached in localStorage and the user is redirected to the return URL.
 */
export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    storeBanner: null as File | null,
    storeLogo: null as File | null,
    businessName: "",
    address: "",
  });
  // buyer or seller determines the role stored in the users table
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");

  const returnUrl = searchParams.get("returnUrl") || "/";
  const supabase = getSupabaseClient();

  // Redirect if already authenticated
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        router.push(returnUrl);
      }
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      // sign up the user and include first/last name and phone as metadata
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
        },
      });
      if (signUpError) throw signUpError;
      if (!signUpData?.user) {
        throw new Error("User registration failed, no user data.");
      }
      const { id } = signUpData.user;
      // Insert fields into public.users (id, email, role, name, phone)
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const { error: usersError } = await supabase.from("users").upsert(
        {
          id,
          email: formData.email,
          role: userType,
          name: fullName,
          phone: formData.phone,
        },
        { onConflict: "id" },
      );
      if (usersError) {
      console.error("Error inserting user data:", usersError.message);
      throw new Error(usersError.message);
      }
      // Insert names and phone into public.profiles
      const { error: profilesError } = await supabase.from("profiles").upsert(
        {
          id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        },
        { onConflict: "id" },
      );
      if (profilesError) {
        console.error("Error inserting profile data:", profilesError.message);
        throw new Error(profilesError.message);
      }
      // cache the combined customer profile locally
      const combined = {
        id,
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        role: userType,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("dispa8ch_customer", JSON.stringify(combined));
      }
      toast({ title: "Account created", description: "Welcome to Dispa8ch!" });
      router.push(returnUrl);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData,
  ) => {
    const files = e.target.files;
    if (files) {
      setFormData({ ...formData, [field]: files[0] });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative order-2 lg:order-1">
        <div className="w-full max-w-[400px] space-y-12">
          <h2 className="text-4xl text-primary">Create Account</h2>
          {/* Tab navigation */}
          <div className="mb-8 grid grid-cols-2 gap-2">
            <Button
              variant={userType === "buyer" ? "default" : "outline"}
              onClick={() => setUserType("buyer")}
              className="w-full"
            >
              <Iconex icon={User} className="h-4 w-4 mr-2" />
              Buyer
            </Button>
            <Button
              variant={userType === "seller" ? "default" : "outline"}
              onClick={() => setUserType("seller")}
              className="w-full"
            >
              <Iconex icon={Store} className="h-4 w-4 mr-2" />
              Seller
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
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
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  minLength={6}
                />
              </div>
              {/* Seller-specific fields */}
              {userType === "seller" && (
                <div className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeBanner">Store Banner</Label>
                    <Input
                      id="storeBanner"
                      type="file"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          setFormData({ ...formData, storeBanner: files[0] });
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeLogo">Store Logo</Label>
                    <Input
                      id="storeLogo"
                      type="file"
                      onChange={(e) => handleFileChange(e, "storeLogo")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="My Store"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      placeholder="Store Address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4 pt-4">
              <Button
                variant="default"
                type="submit"
                className="w-full h-12 text-sm tracking-widest font-medium bg-[#E41F47] hover:bg-[#E41F47]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="text-center">
                <span className="text-xs text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/auth/login"
                  className="text-xs font-bold text-primary hover:underline transition-colors decoration-1 underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Visual Section - Right Side on Desktop */}
      <div className="hidden lg:flex flex-col relative bg-[#E41F47] text-white p-12 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/botanical-minimalist-drawing.jpg"
            alt="Background pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col h-full justify-between items-end text-right">
          <div>
            <h1 className="text-[60px] leading-[0.9] mb-4">
              Join the
              <br />
              Movement
            </h1>
          </div>
          <div className="max-w-md border-t border-[#2A402D]/20 pt-8">
            <p className="text-xl font-serif italic mb-2">
              "Dedicated to Creativity, Culture & Growth."
            </p>
            <p className="text-sm font-light tracking-wide opacity-80">
              Dispa8ch is a creative hub where brands and people come to define
              who they are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}