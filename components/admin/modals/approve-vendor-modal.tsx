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
import { CheckCircle } from "lucide-react"

interface ApproveVendorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorName: string
  onConfirm: () => void
}

export function ApproveVendorModal({ open, onOpenChange, vendorName, onConfirm }: ApproveVendorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Approve Vendor</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to approve <span className="font-medium text-foreground">{vendorName}</span>? They
            will immediately gain access to the vendor dashboard.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} className="bg-green-600 hover:bg-green-700 text-white">
            Approve Vendor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
