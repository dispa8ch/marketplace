"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { type Vendor, suspendVendor } from "@/lib/api/admin"
import { useToast } from "@/hooks/use-toast"

interface SuspendVendorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendor: Vendor
  onUpdate: () => void
}

export function SuspendVendorModal({ open, onOpenChange, vendor, onUpdate }: SuspendVendorModalProps) {
  const { toast } = useToast()
  const [reason, setReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSuspend = async () => {
    setIsLoading(true)
    try {
      await suspendVendor(vendor._id, reason)
      toast({
        title: "Success",
        description: "Vendor suspended successfully",
      })
      onUpdate()
      onOpenChange(false)
      setReason("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suspend vendor",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-destructive">Suspend Vendor</DialogTitle>
          <p className="text-sm text-[#757575]">
            Are you sure you want to suspend <strong>{vendor.businessName}</strong>? This action will prevent them from
            accessing their dashboard and receiving new orders.
          </p>
        </DialogHeader>

        <div className="space-y-2 my-4">
          <Label htmlFor="reason">Reason for Suspension</Label>
          <Textarea
            id="reason"
            placeholder="Enter reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSuspend} disabled={!reason || isLoading}>
            {isLoading ? "Suspending..." : "Suspend Vendor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
