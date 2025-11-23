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

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { login, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const returnUrl = searchParams.get("returnUrl") || "/"

  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl)
    }
  }, [isAuthenticated, returnUrl, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)

      toast({
        title: "Welcome back",
        description: "You have successfully signed in.",
      })

      let redirect = returnUrl
      try {
        const stored = window.localStorage.getItem("dispa8ch_post_login_redirect")
        if (stored) {
          redirect = stored
          window.localStorage.removeItem("dispa8ch_post_login_redirect")
        }
      } catch (e) {
        // ignore
      }

      router.push(redirect)
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Visual Section - Left Side */}
      <div className="hidden lg:flex flex-col relative bg-[#2A402D] text-[#EBE1DC] p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/abstract-nature-lines-elegant.jpg" alt="Background pattern" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h1 className="font-serif text-[80px] leading-[0.9] mb-4">
              DIS
              <br />
              PA8
              <br />
              CH
            </h1>
            <p className="text-xl tracking-wide font-light max-w-md mt-8 border-t border-[#EBE1DC]/30 pt-8">
              Connect directly with local vendors. Logistics simplified for the modern world.
            </p>
          </div>

          <div className="font-mono text-xs tracking-widest opacity-60">© 2025 DISPA8CH MARKETPLACE</div>
        </div>
      </div>

      {/* Form Section - Right Side */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-24 relative">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif text-primary">Sign in</h2>
            <p className="text-muted-foreground text-sm tracking-wide">Welcome back. Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">EMAIL ADDRESS</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">PASSWORD</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors border-b border-transparent hover:border-accent"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="placeholder:text-muted-foreground/40"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                className="w-full rounded-full h-12 text-xs uppercase tracking-widest font-medium bg-[#2A402D] hover:bg-[#2A402D]/90 text-[#EBE1DC]"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>

              <div className="text-center">
                <span className="text-xs text-muted-foreground">Don't have an account? </span>
                <Link
                  href="/auth/register"
                  className="text-xs font-bold text-primary hover:text-accent transition-colors underline decoration-1 underline-offset-4"
                >
                  Sign up
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
    </div>
  )
}
