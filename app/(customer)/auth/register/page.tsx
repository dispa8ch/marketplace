"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { signup, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const returnUrl = searchParams.get("returnUrl") || "/"

  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl)
    }
  }, [isAuthenticated, returnUrl, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`
      await signup(fullName, formData.email, formData.password)

      toast({
        title: "Account created",
        description: "Welcome to dispa8ch!",
      })

      router.push(returnUrl)
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
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Form Section - Left Side on Desktop */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative order-2 lg:order-1">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif text-primary">Create Account</h2>
            <p className="text-muted-foreground text-sm tracking-wide">Join our community of vendors and shoppers.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">FIRST NAME</Label>
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">LAST NAME</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">EMAIL ADDRESS</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">PHONE NUMBER</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">PASSWORD</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">CONFIRM PASSWORD</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                className="w-full rounded-full h-12 text-xs uppercase tracking-widest font-medium bg-[#2A402D] hover:bg-[#2A402D]/90 text-[#EBE1DC]"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>

              <div className="text-center">
                <span className="text-xs text-muted-foreground">Already have an account? </span>
                <Link
                  href="/auth/login"
                  className="text-xs font-bold text-primary hover:text-accent transition-colors underline decoration-1 underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Mobile only branding */}
        <div className="absolute top-6 left-6 lg:hidden">
          <span className="font-serif font-bold text-xl tracking-tight">DISPA8CH</span>
        </div>
      </div>

      {/* Visual Section - Right Side on Desktop */}
      <div className="hidden lg:flex flex-col relative bg-[#D4C5BE] text-[#2A402D] p-12 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/botanical-minimalist-drawing.jpg" alt="Background pattern" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between items-end text-right">
          <div>
            <h1 className="font-serif text-[60px] leading-[0.9] mb-4">
              Join the
              <br />
              Movement
            </h1>
          </div>

          <div className="max-w-md border-t border-[#2A402D]/20 pt-8">
            <p className="text-xl font-serif italic mb-2">"Dedicated to Creativity, Culture & Growth."</p>
            <p className="text-sm tracking-wide opacity-80">
              Dispa8ch is a creative hub where brands and people come to define who they are.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
