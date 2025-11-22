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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditPlatformFeesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentFees?: {
    commission: number
    transactionFee: number
    withdrawalFee: number
  }
}

export function EditPlatformFeesModal({ open, onOpenChange, currentFees }: EditPlatformFeesModalProps) {
  const [fees, setFees] = useState({
    commission: currentFees?.commission || 5,
    transactionFee: currentFees?.transactionFee || 50,
    withdrawalFee: currentFees?.withdrawalFee || 100,
  })

  const handleSave = () => {
    // TODO: Connect to backend API
    console.log("[v0] Update platform fees:", fees)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Platform Fees</DialogTitle>
          <DialogDescription>Update the platform commission and transaction fees</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="commission">Platform Commission (%)</Label>
            <Input
              id="commission"
              type="number"
              value={fees.commission}
              onChange={(e) => setFees({ ...fees, commission: Number(e.target.value) })}
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground">Commission charged on each order</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionFee">Transaction Fee (₦)</Label>
            <Input
              id="transactionFee"
              type="number"
              value={fees.transactionFee}
              onChange={(e) => setFees({ ...fees, transactionFee: Number(e.target.value) })}
              min="0"
            />
            <p className="text-xs text-muted-foreground">Fixed fee per transaction</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdrawalFee">Withdrawal Fee (₦)</Label>
            <Input
              id="withdrawalFee"
              type="number"
              value={fees.withdrawalFee}
              onChange={(e) => setFees({ ...fees, withdrawalFee: Number(e.target.value) })}
              min="0"
            />
            <p className="text-xs text-muted-foreground">Fee charged on vendor withdrawals</p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
