"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WithdrawModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  availableBalance?: number
}

export function WithdrawModal({ open, onOpenChange, availableBalance = 0 }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")

  const handleWithdraw = () => {
    // TODO: Connect to backend API
    console.log("[v0] Withdraw funds:", amount, bankAccount)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Withdraw Funds</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold">₦{availableBalance.toLocaleString()}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Withdraw (₦) *</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              max={availableBalance}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank">Bank Account *</Label>
            <Select value={bankAccount} onValueChange={setBankAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select bank account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gtb-1234">GTBank - **** 1234</SelectItem>
                <SelectItem value="access-5678">Access Bank - **** 5678</SelectItem>
                <SelectItem value="zenith-9012">Zenith Bank - **** 9012</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">Withdrawals are processed within 24-48 hours</div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-[#E41F47] hover:bg-[#C11A3D]"
            onClick={handleWithdraw}
            disabled={!amount || !bankAccount || Number(amount) > availableBalance}
          >
            Withdraw
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
