"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/contexts/auth-context"
import { Loader2, ShieldCheck, Terminal } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { loginAdmin } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await loginAdmin(formData.email, formData.password)

      toast({
        title: "Authentication Successful",
        description: "Initializing admin session...",
      })

      router.push("/admin")
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: "Invalid credentials or insufficient permissions.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 font-mono text-gray-400">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-xl font-medium tracking-tight text-white">DISPA8CH CONTROL</h1>
            <p className="text-xs uppercase tracking-widest opacity-50">System Access Required</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-[#222] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-gray-500">
                Admin Identifier
              </Label>
              <div className="relative group/input">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dispa8ch.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0A0A0A] border-[#333] text-white h-11 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-[#555] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-gray-500">
                Security Key
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-[#0A0A0A] border-[#333] text-white h-11 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-[#555] transition-all"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-white text-black hover:bg-gray-200 rounded-sm font-medium text-sm tracking-wide transition-all"
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

          <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-600 border-t border-[#222] pt-4">
            <span>Secure Connection</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-900 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        <div className="text-center text-[10px] text-gray-700 font-mono">
          UNAUTHORIZED ACCESS IS PROHIBITED. <br />
          ALL ACTIVITIES ARE LOGGED AND MONITORED.
        </div>
      </div>
    </div>
  )
}
