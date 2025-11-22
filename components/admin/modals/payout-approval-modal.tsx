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
import { Wallet } from "lucide-react"

interface PayoutApprovalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorName: string
  amount: number
  bankDetails: string
  onConfirm: () => void
}

export function PayoutApprovalModal({
  open,
  onOpenChange,
  vendorName,
  amount,
  bankDetails,
  onConfirm,
}: PayoutApprovalModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Approve Payout</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Confirm payout of <span className="font-bold text-foreground">{formatCurrency(amount)}</span> to{" "}
            <span className="font-medium text-foreground">{vendorName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-4 rounded-md text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank Details:</span>
            <span className="font-medium text-right">{bankDetails}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction Fee:</span>
            <span className="font-medium text-right">{formatCurrency(amount * 0.01)} (1%)</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="text-muted-foreground">Net Payout:</span>
            <span className="font-bold text-right">{formatCurrency(amount * 0.99)}</span>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700 text-white">
            Process Payout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
