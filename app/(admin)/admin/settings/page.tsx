"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { getPlatformFees, updatePlatformFees } from "../../../../lib/api/admin"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    commission: "",
    minOrderValue: "1000", // Mock default
    deliveryRadius: "50", // Mock default
    autoApproveVendors: false, // Mock default
    emailNotifications: true, // Mock default
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const fees = await getPlatformFees()
        setSettings((prev) => ({
          ...prev,
          commission: fees.commission.toString(),
          // Other settings would come from API in real implementation
        }))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load settings",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [toast])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updatePlatformFees({
        commission: Number(settings.commission),
        // Other fields would be sent here
      })

      toast({
        title: "Settings saved",
        description: "Platform settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div>Loading settings...</div>

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="commission">Platform Commission (%)</Label>
            <Input
              id="commission"
              type="number"
              value={settings.commission}
              onChange={(e) => setSettings({ ...settings, commission: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Commission charged on each delivery</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minOrder">Minimum Order Value (₦)</Label>
            <Input
              id="minOrder"
              type="number"
              value={settings.minOrderValue}
              onChange={(e) => setSettings({ ...settings, minOrderValue: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius">Delivery Radius (km)</Label>
            <Input
              id="radius"
              type="number"
              value={settings.deliveryRadius}
              onChange={(e) => setSettings({ ...settings, deliveryRadius: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-approve Vendors</Label>
              <p className="text-xs text-muted-foreground">Automatically verify new vendor registrations</p>
            </div>
            <Switch
              checked={settings.autoApproveVendors}
              onCheckedChange={(checked) => setSettings({ ...settings, autoApproveVendors: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Send email notifications for important events</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
