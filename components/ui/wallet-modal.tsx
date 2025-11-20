"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type WalletModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function WalletModal({ open: openProp, onOpenChange }: WalletModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const controlled = typeof openProp === 'boolean'
  const open = controlled ? openProp! : internalOpen
  const setOpen = onOpenChange ? onOpenChange : setInternalOpen
  const [balance] = useState(25000)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Wallet</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Available balance</div>
          <div className="text-2xl font-bold">₦{balance.toLocaleString()}</div>
          <div className="flex gap-3">
            <Button className="flex-1">Deposit</Button>
            <Button variant="outline" className="flex-1">Withdraw</Button>
          </div>
          <div className="text-sm text-muted-foreground">Recent transactions will show here (placeholder)</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WalletModal
