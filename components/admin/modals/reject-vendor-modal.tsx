"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { XCircle } from "lucide-react"
import { useState } from "react"

interface RejectVendorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorName: string
  onConfirm: (reason: string) => void
}

export function RejectVendorModal({ open, onOpenChange, vendorName, onConfirm }: RejectVendorModalProps) {
  const [reason, setReason] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Reject Vendor</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            You are rejecting <span className="font-medium text-foreground">{vendorName}</span>. Please provide a reason
            for the rejection.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Textarea
            placeholder="Reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={() => onConfirm(reason)} disabled={!reason.trim()}>
            Reject Vendor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
