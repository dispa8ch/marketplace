"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/auth-context";
import { Loader2, ShieldCheck, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loginAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginAdmin(formData.email, formData.password);

      toast({
        title: "Authentication Successful",
        description: "Initializing admin session...",
      });

      router.push("/admin");
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: "Invalid credentials or insufficient permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 text-gray-400">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-icon.svg"
                alt="dispa8ch"
                width={16}
                height={16}
                className="lg:[w-0 h-0] w-7 h-7"
              />
            </Link>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-xl font-medium tracking-tight text-white">
              DISPA8CH ADMIN
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#757575] opacity-80">
              System Access Required
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-[#222] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[10px] uppercase tracking-widest text-[#757575]"
              >
                Admin Identifier
              </Label>
              <div className="relative group/input">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dispa8ch.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-[#0A0A0A] border-[#333] text-white h-11 focus-visible:border-primary transition-all duration-75"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-[10px] uppercase tracking-widest text-[#757575]"
              >
                Security Key
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="bg-[#0A0A0A] border-[#333] text-white h-11 focus-visible:border-primary transition-all duration-75"
              />
            </div>

            <Button
              variant="default"
              type="submit"
              className="w-full h-11 text-black hover:bg-primary/80 rounded-sm font-medium text-sm tracking-wide transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>VERIFYING...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>AUTHENTICATE</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#757575] border-t border-[#222] pt-4">
            <span>Secure Connection</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        <div className="text-center text-[10px] text-[#757575] opacity-80 font-mono">
          UNAUTHORIZED ACCESS IS PROHIBITED. <br />
          ALL ACTIVITIES ARE LOGGED AND MONITORED.
        </div>
      </div>
    </div>
  );
}
