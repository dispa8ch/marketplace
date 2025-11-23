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
import { AlertTriangle } from "lucide-react"

interface DeleteProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName?: string
  productId?: string
}

export function DeleteProductModal({ open, onOpenChange, productName, productId }: DeleteProductModalProps) {
  const handleDelete = () => {
    // TODO: Connect to backend API
    console.log("[v0] Delete product:", productId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Delete Product</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete "{productName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
