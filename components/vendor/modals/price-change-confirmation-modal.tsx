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
import { AlertCircle } from "lucide-react"

interface PriceChangeConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName: string
  oldPrice: number
  newPrice: number
  onConfirm: () => void
}

export function PriceChangeConfirmationModal({
  open,
  onOpenChange,
  productName,
  oldPrice,
  newPrice,
  onConfirm,
}: PriceChangeConfirmationModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white border border-[#2A402D]/10">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E41F47]/10">
              <AlertCircle className="h-5 w-5 text-[#E41F47]" />
            </div>
            <DialogTitle className="text-xl font-serif text-[#2A402D]">Update Price</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-[#757575]">
            You are changing the price for <span className="font-medium text-[#2A402D]">{productName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-[#F5F5F0] p-4 rounded-md my-2 flex items-center justify-between">
          <div className="text-center w-full">
            <span className="block text-xs uppercase tracking-wide text-[#5C6B5E] mb-1">Old Price</span>
            <span className="text-sm line-through text-[#757575]">{formatCurrency(oldPrice)}</span>
          </div>
          <div className="text-[#2A402D]">→</div>
          <div className="text-center w-full">
            <span className="block text-xs uppercase tracking-wide text-[#5C6B5E] mb-1">New Price</span>
            <span className="text-lg font-bold text-[#2A402D]">{formatCurrency(newPrice)}</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full border-[#2A402D]/20"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-[#2A402D] hover:bg-[#2A402D]/90 text-white"
          >
            Confirm Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
