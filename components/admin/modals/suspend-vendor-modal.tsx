"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"

interface SuspendVendorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorName?: string
  vendorId?: string
  isSuspended?: boolean
}

export function SuspendVendorModal({
  open,
  onOpenChange,
  vendorName,
  vendorId,
  isSuspended = false,
}: SuspendVendorModalProps) {
  const [reason, setReason] = useState("")

  const handleAction = () => {
    // TODO: Connect to backend API
    console.log("[v0] Suspend/Restore vendor:", vendorId, reason)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {!isSuspended && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
            )}
            <DialogTitle className="text-xl font-semibold">{isSuspended ? "Restore" : "Suspend"} Vendor</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            {isSuspended
              ? `Are you sure you want to restore "${vendorName}"? This will allow them to access their account again.`
              : `Are you sure you want to suspend "${vendorName}"? They will not be able to access their account.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason {!isSuspended && "*"}</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                isSuspended ? "Optional reason for restoration..." : "Explain why this vendor is being suspended..."
              }
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant={isSuspended ? "default" : "destructive"}
            onClick={handleAction}
            disabled={!isSuspended && !reason}
            className={isSuspended ? "bg-[#E41F47] hover:bg-[#C11A3D]" : ""}
          >
            {isSuspended ? "Restore Vendor" : "Suspend Vendor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
