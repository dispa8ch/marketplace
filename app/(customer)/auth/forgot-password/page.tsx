"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/auth-context";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword(email);

      toast({
        title: "Reset link sent",
        description:
          "Check your email for instructions to reset your password.",
      });

      // Navigate to verify page passing email
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Visual Section - Left Side */}
      <div className="hidden lg:flex flex-col relative bg-[#E41F47] text-white p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg?key=forgot-pass"
            alt="Abstract lines"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h1 className="text-[60px] leading-[0.9] mb-4">
              Recover
              <br />
              Access
            </h1>
          </div>

          <div className="max-w-md border-t border-[#EBE1DC]/30 pt-8">
            <p className="text-sm tracking-wide font-light opacity-80">
              Security and privacy are at the core of the Dispa8ch experience.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section - Right Side */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-3 w-3" />
              Back to Login
            </Link>
            <h2 className="text-4xl text-primary">Forgot Password?</h2>
            <p className="text-muted-foreground text-sm tracking-wide">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="placeholder:text-muted-foreground/40"
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
                "Send Reset Link"
              )}
            </Button>
          </form>
        </div>

        {/* Mobile only branding */}
        <div className="absolute top-6 left-6 lg:hidden">
          <span className="font-serif font-bold text-xl tracking-tight">
            DISPA8CH
          </span>
        </div>
      </div>
    </div>
  );
}
