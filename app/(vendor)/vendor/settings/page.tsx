"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getVendorProfile, updateVendorProfile, type VendorProfile } from "@/lib/api/vendor"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function VendorSettingsGeneralPage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<VendorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getVendorProfile()
        setProfile(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setIsSaving(true)
    try {
      await updateVendorProfile(profile)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!profile) return <div>Failed to load profile</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#171717]">Profile Settings</CardTitle>
        <p className="text-sm text-[#757575]">Update your business or personal information</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={profile.businessName || ""}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={profile.email || ""} disabled className="bg-muted" />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              value={profile.address?.street || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address: { ...profile.address, street: e.target.value },
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={profile.description || ""}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E6E6]">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
