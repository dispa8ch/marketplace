"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface WithdrawalApprovalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  withdrawal?: {
    id: string
    vendorName: string
    amount: number
    bankName: string
    accountNumber: string
    accountName: string
    requestDate: string
    status: string
  }
}

export function WithdrawalApprovalModal({ open, onOpenChange, withdrawal }: WithdrawalApprovalModalProps) {
  if (!withdrawal) return null

  const handleApprove = () => {
    // TODO: Connect to backend API
    console.log("[v0] Approve withdrawal:", withdrawal.id)
    onOpenChange(false)
  }

  const handleReject = () => {
    // TODO: Connect to backend API
    console.log("[v0] Reject withdrawal:", withdrawal.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Withdrawal Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Request ID</p>
              <p className="font-medium">{withdrawal.id}</p>
            </div>
            <Badge variant="secondary">{withdrawal.status}</Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Vendor</p>
              <p className="font-medium">{withdrawal.vendorName}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-lg font-bold text-[#E41F47]">₦{withdrawal.amount.toLocaleString()}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Bank</p>
              <p className="font-medium">{withdrawal.bankName}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">{withdrawal.accountNumber}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Account Name</p>
              <p className="font-medium">{withdrawal.accountName}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Request Date</p>
              <p className="font-medium">{withdrawal.requestDate}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleReject}>
            Reject
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleApprove}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
