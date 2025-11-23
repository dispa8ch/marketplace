"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addLogisticsPartner } from "@/lib/api/admin"
import { useToast } from "@/hooks/use-toast"

interface AddLogisticsPartnerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddLogisticsPartnerModal({ open, onOpenChange, onSuccess }: AddLogisticsPartnerModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceArea: "",
    contactPerson: "",
  })

  const handleAdd = async () => {
    setIsLoading(true)
    try {
      await addLogisticsPartner({
        ...formData,
        activeOrders: 0,
      })
      toast({
        title: "Success",
        description: "Logistics partner added successfully",
      })
      if (onSuccess) onSuccess()
      onOpenChange(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceArea: "",
        contactPerson: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add logistics partner",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Logistics Partner</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="QuickMove Express"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@quickmove.ng"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 800 000 0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceArea">Service Area *</Label>
            <Input
              id="serviceArea"
              value={formData.serviceArea}
              onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
              placeholder="Lagos, Abuja, Port Harcourt"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="John Doe"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-[#E41F47] hover:bg-[#C11A3D]"
            onClick={handleAdd}
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.serviceArea ||
              !formData.contactPerson ||
              isLoading
            }
          >
            {isLoading ? "Adding..." : "Add Partner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
