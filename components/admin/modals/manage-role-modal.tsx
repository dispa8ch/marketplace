"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface ManageRoleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function ManageRoleModal({ open, onOpenChange, user }: ManageRoleModalProps) {
  const [permissions, setPermissions] = useState({
    manageVendors: true,
    manageCustomers: true,
    manageOrders: true,
    approveWithdrawals: false,
    managePlatformFees: false,
    sendAnnouncements: true,
    viewAnalytics: true,
    manageLogistics: false,
  })

  const handleSave = () => {
    // TODO: Connect to backend API
    console.log("[v0] Update role permissions:", user?.id, permissions)
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Manage Role & Permissions</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">User</p>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base">Permissions</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manageVendors"
                  checked={permissions.manageVendors}
                  onCheckedChange={(checked) => setPermissions({ ...permissions, manageVendors: checked as boolean })}
                />
                <label
                  htmlFor="manageVendors"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Manage Vendors
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manageCustomers"
                  checked={permissions.manageCustomers}
                  onCheckedChange={(checked) => setPermissions({ ...permissions, manageCustomers: checked as boolean })}
                />
                <label htmlFor="manageCustomers" className="text-sm font-medium leading-none">
                  Manage Customers
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manageOrders"
                  checked={permissions.manageOrders}
                  onCheckedChange={(checked) => setPermissions({ ...permissions, manageOrders: checked as boolean })}
                />
                <label htmlFor="manageOrders" className="text-sm font-medium leading-none">
                  Manage Orders
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="approveWithdrawals"
                  checked={permissions.approveWithdrawals}
                  onCheckedChange={(checked) =>
                    setPermissions({ ...permissions, approveWithdrawals: checked as boolean })
                  }
                />
                <label htmlFor="approveWithdrawals" className="text-sm font-medium leading-none">
                  Approve Withdrawals
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="managePlatformFees"
                  checked={permissions.managePlatformFees}
                  onCheckedChange={(checked) =>
                    setPermissions({ ...permissions, managePlatformFees: checked as boolean })
                  }
                />
                <label htmlFor="managePlatformFees" className="text-sm font-medium leading-none">
                  Manage Platform Fees
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendAnnouncements"
                  checked={permissions.sendAnnouncements}
                  onCheckedChange={(checked) =>
                    setPermissions({ ...permissions, sendAnnouncements: checked as boolean })
                  }
                />
                <label htmlFor="sendAnnouncements" className="text-sm font-medium leading-none">
                  Send Announcements
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="viewAnalytics"
                  checked={permissions.viewAnalytics}
                  onCheckedChange={(checked) => setPermissions({ ...permissions, viewAnalytics: checked as boolean })}
                />
                <label htmlFor="viewAnalytics" className="text-sm font-medium leading-none">
                  View Analytics
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manageLogistics"
                  checked={permissions.manageLogistics}
                  onCheckedChange={(checked) => setPermissions({ ...permissions, manageLogistics: checked as boolean })}
                />
                <label htmlFor="manageLogistics" className="text-sm font-medium leading-none">
                  Manage Logistics Partners
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleSave}>
            Save Permissions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
