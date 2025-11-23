"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface UpdateOrderStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId?: string
  currentStatus?: string
}

export function UpdateOrderStatusModal({ open, onOpenChange, orderId, currentStatus }: UpdateOrderStatusModalProps) {
  const [status, setStatus] = useState(currentStatus || "")
  const [notes, setNotes] = useState("")

  const handleUpdate = () => {
    // TODO: Connect to backend API
    console.log("[v0] Update order status:", orderId, status, notes)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Order ID</Label>
            <p className="text-sm font-medium">{orderId}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">New Status *</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="assigned">Assigned to Logistics</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any relevant notes..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleUpdate} disabled={!status}>
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
