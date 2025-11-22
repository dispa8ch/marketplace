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

export default function VendorRegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create account
      await signup(formData.companyName, formData.email, formData.password)

      toast({
        title: "Account Created",
        description: "Starting onboarding process...",
      })

      // Redirect to onboarding flow
      router.push("/onboarding")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F5F5F0]">
      {/* Visual Section - Left Side */}
      <div className="hidden lg:flex flex-col relative bg-[#E41F47] text-white p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply">
          <Image
            src="/placeholder.svg?key=vendor-register"
            alt="Business growth"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h1 className="font-serif text-[56px] leading-tight mb-4">
              Expand
              <br />
              Your Reach
            </h1>
            <p className="text-white/80 max-w-sm text-lg font-light">
              Join thousands of curated brands reaching new customers through Dispa8ch.
            </p>
          </div>

          <div className="flex gap-12 font-mono text-xs tracking-widest opacity-80">
            <div>
              <span className="block text-2xl font-serif mb-1">10k+</span>
              CUSTOMERS
            </div>
            <div>
              <span className="block text-2xl font-serif mb-1">24h</span>
              FULFILLMENT
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Right Side */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-serif text-[#2A402D]">Partner Application</h2>
            <p className="text-[#5C6B5E] text-sm tracking-wide">Start your journey with Dispa8ch Marketplace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">COMPANY / BRAND NAME</Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Acme Co."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                  className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">BUSINESS EMAIL</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">CONTACT PHONE</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">PASSWORD</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
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
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Start Application"}
              </Button>

              <div className="text-center pt-4 border-t border-[#2A402D]/10">
                <span className="text-xs text-[#5C6B5E]">Already a partner? </span>
                <Link
                  href="/vendor-auth/login"
                  className="text-xs font-bold text-[#2A402D] hover:underline transition-colors"
                >
                  Sign in here
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
    </div>
  )
}
