"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface TransactionDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: {
    id: string
    type: "credit" | "debit"
    description: string
    amount: number
    date: string
    status: string
    reference?: string
    fee?: number
  }
}

export function TransactionDetailsModal({ open, onOpenChange, transaction }: TransactionDetailsModalProps) {
  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-medium">{transaction.id}</p>
            </div>
            <Badge variant={transaction.type === "credit" ? "default" : "destructive"}>{transaction.type}</Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium text-right">{transaction.description}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "credit" ? "+" : "-"}₦{Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{transaction.date}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline">{transaction.status}</Badge>
            </div>

            {transaction.reference && (
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Reference</p>
                <p className="font-medium text-right">{transaction.reference}</p>
              </div>
            )}

            {transaction.fee && (
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Transaction Fee</p>
                <p className="font-medium">₦{transaction.fee.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
