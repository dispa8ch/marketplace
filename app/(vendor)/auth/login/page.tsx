"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/contexts/auth-context"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function VendorLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)

      toast({
        title: "Welcome Partner",
        description: "Accessing your vendor dashboard...",
      })

      router.push("/vendor")
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F5F5F0]">
      {/* Form Section - Left Side */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative order-2 lg:order-1">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-serif text-[#2A402D]">Vendor Portal</h2>
            <p className="text-[#5C6B5E] text-sm tracking-wide">
              Manage your products, orders, and logistics in one place.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">BUSINESS EMAIL</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="business@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">PASSWORD</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[10px] uppercase tracking-widest text-[#5C6B5E] hover:text-[#2A402D] transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                className="w-full rounded-full h-12 text-xs uppercase tracking-widest font-medium bg-[#2A402D] hover:bg-[#2A402D]/90 text-[#EBE1DC]"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Access Dashboard"}
              </Button>

              <div className="text-center pt-4 border-t border-[#2A402D]/10">
                <span className="text-xs text-[#5C6B5E]">Interested in selling? </span>
                <Link
                  href="/vendor/auth/register"
                  className="text-xs font-bold text-[#2A402D] hover:underline transition-colors"
                >
                  Apply to become a vendor
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Mobile branding */}
        <div className="absolute top-6 left-6 lg:hidden">
          <span className="font-serif font-bold text-xl tracking-tight text-[#2A402D]">DISPA8CH</span>
        </div>
      </div>

      {/* Visual Section - Right Side */}
      <div className="hidden lg:flex flex-col relative bg-[#2A402D] text-[#EBE1DC] p-12 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg?key=vendor-login"
            alt="Logistics background"
            fill
            className="object-cover grayscale"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between items-end text-right">
          <div>
            <h1 className="font-serif text-[48px] leading-[1.1] mb-4">
              Streamline
              <br />
              Your Commerce
            </h1>
          </div>

          <div className="max-w-md border-t border-[#EBE1DC]/20 pt-8">
            <p className="text-lg font-serif italic mb-2">"Efficiency meets elegance."</p>
            <p className="text-xs tracking-widest uppercase opacity-70">Dispa8ch Vendor Portal</p>
          </div>
        </div>
      </div>
    </div>
  )
}
