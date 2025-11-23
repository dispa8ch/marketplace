"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssignLogisticsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId?: string
}

export function AssignLogisticsModal({ open, onOpenChange, orderId }: AssignLogisticsModalProps) {
  const [operator, setOperator] = useState("")

  const handleAssign = () => {
    // TODO: Connect to backend API
    console.log("[v0] Assign logistics:", orderId, operator)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Assign Logistics Operator</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Order ID</Label>
            <p className="text-sm font-medium">{orderId}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operator">Select Logistics Partner *</Label>
            <Select value={operator} onValueChange={setOperator}>
              <SelectTrigger>
                <SelectValue placeholder="Choose operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quickmove">QuickMove Express</SelectItem>
                <SelectItem value="speedyship">Speedy Shipping</SelectItem>
                <SelectItem value="fasttrack">FastTrack Logistics</SelectItem>
                <SelectItem value="reliableroad">Reliable Road</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleAssign} disabled={!operator}>
            Assign Operator
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
