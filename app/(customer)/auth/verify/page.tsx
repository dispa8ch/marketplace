"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/auth-context";
import { Loader2, ArrowLeft } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { verifyOtp } = useAuth();

  const email = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.split("").slice(0, 6 - index);
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);

      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await verifyOtp(email, otpValue);

      toast({
        title: "Verified",
        description: "Your email has been successfully verified.",
      });

      router.push("/");
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Visual Section - Right Side on Desktop (Alternating layout) */}
      <div className="hidden lg:flex flex-col relative bg-[#E41F47] text-[#EBE1DC] p-12 overflow-hidden order-2">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/placeholder.svg?key=verify"
            alt="Security pattern"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between text-right">
          <div>
            <h1 className="text-[60px] leading-[0.9] mb-4">
              Verify
              <br />
              Identity
            </h1>
          </div>

          <div className="max-w-md ml-auto border-t border-[#EBE1DC]/30 pt-8">
            <p className="text-sm tracking-wide opacity-80 font-light">
              Confirming it's you keeps the marketplace safe for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section - Left Side on Desktop */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative order-1">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-3 w-3" />
              Back to Login
            </Link>
            <h2 className="text-4xl text-primary">Check your email</h2>
            <p className="text-muted-foreground font-normal text-sm tracking-wide">
              We've sent a 6-digit verification code to{" "}
              <span className="text-foreground font-medium">
                {email || "your email address"}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <Label className="text-center w-full block">
                ENTER VERIFICATION CODE
              </Label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }} // Correct way to assign ref
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl border border-input focus-visible:border-primary focus-visible:ring-0 bg-transparent px-0 rounded-md"
                  />
                ))}
              </div>
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
                  "Verify Code"
                )}
              </Button>

              <div className="text-center">
                <span className="text-xs text-muted-foreground">
                  Didn't receive the code?{" "}
                </span>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline transition-colors decoration-1 underline-offset-4"
                >
                  Resend
                </button>
              </div>
            </div>
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
