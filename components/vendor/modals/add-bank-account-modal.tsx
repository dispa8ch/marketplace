"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addBankAccount } from "@/lib/api/vendor"
import { useToast } from "@/hooks/use-toast"

interface AddBankAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddBankAccountModal({ open, onOpenChange }: AddBankAccountModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  })

  const handleAdd = async () => {
    setIsLoading(true)
    try {
      await addBankAccount(formData)
      toast({
        title: "Success",
        description: "Bank account added successfully",
      })
      onOpenChange(false)
      setFormData({ bankName: "", accountNumber: "", accountName: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add bank account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Bank Account</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bank">Bank Name *</Label>
            <Select value={formData.bankName} onValueChange={(value) => setFormData({ ...formData, bankName: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gtb">Guaranty Trust Bank</SelectItem>
                <SelectItem value="access">Access Bank</SelectItem>
                <SelectItem value="zenith">Zenith Bank</SelectItem>
                <SelectItem value="uba">United Bank for Africa</SelectItem>
                <SelectItem value="firstbank">First Bank of Nigeria</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number *</Label>
            <Input
              id="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="0123456789"
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name *</Label>
            <Input
              id="accountName"
              type="text"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="John Doe"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-[#E41F47] hover:bg-[#C11A3D]"
            onClick={handleAdd}
            disabled={!formData.bankName || !formData.accountNumber || !formData.accountName || isLoading}
          >
            {isLoading ? "Adding..." : "Add Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
