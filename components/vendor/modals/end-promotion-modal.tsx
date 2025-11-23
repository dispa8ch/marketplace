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

interface EndPromotionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  promotionName?: string
  promotionId?: string
}

export function EndPromotionModal({ open, onOpenChange, promotionName, promotionId }: EndPromotionModalProps) {
  const handleEnd = () => {
    // TODO: Connect to backend API
    console.log("[v0] End promotion:", promotionId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">End Promotion</DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to end "{promotionName}"? This will immediately remove the discount from all
            applicable products.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleEnd}>
            End Promotion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
