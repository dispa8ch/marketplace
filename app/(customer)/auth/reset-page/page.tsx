"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import supabase from "@/lib/supabase/client"; // Ensure correct Supabase client import

export default function ResetPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = new URLSearchParams(window.location.search).get("email") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure the passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Use Supabase to update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Password Reset Successful",
        description:
          "Your password has been reset successfully. You can now log in with your new password.",
      });

      // Redirect to login page
      router.push("/auth/login");
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
            src="/placeholder.svg"
            alt="Abstract lines"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h1 className="text-[60px] leading-[0.9] mb-4">
              Reset
              <br />
              Password
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
            <h2 className="text-4xl text-primary">Reset Your Password</h2>
            <p className="text-muted-foreground text-sm tracking-wide">
              Enter your new password below to reset it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="placeholder:text-muted-foreground/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}