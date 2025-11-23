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

interface ToggleProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName?: string
  productId?: string
  isEnabled?: boolean
}

export function ToggleProductModal({
  open,
  onOpenChange,
  productName,
  productId,
  isEnabled = true,
}: ToggleProductModalProps) {
  const handleToggle = () => {
    // TODO: Connect to backend API
    console.log("[v0] Toggle product:", productId, !isEnabled)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{isEnabled ? "Disable" : "Enable"} Product</DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to {isEnabled ? "disable" : "enable"} "{productName}"?
            {isEnabled
              ? " This will hide the product from customers."
              : " This will make the product visible to customers."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleToggle}>
            {isEnabled ? "Disable" : "Enable"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
