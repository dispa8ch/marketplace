"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { type Vendor, approveVendor } from "@/lib/api/admin"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface VendorDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendor: Vendor
  onUpdate: () => void
}

export function VendorDetailsModal({ open, onOpenChange, vendor, onUpdate }: VendorDetailsModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      await approveVendor(vendor._id)
      toast({
        title: "Success",
        description: "Vendor approved successfully",
      })
      onUpdate()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve vendor",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Vendor Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#757575]">Business Name</p>
              <p className="font-medium text-[#171717]">{vendor.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Email Address</p>
              <p className="font-medium text-[#171717]">{vendor.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Phone Number</p>
              <p className="font-medium text-[#171717]">{vendor.phone}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Status</p>
              <p className="font-medium text-[#171717]">{vendor.verified ? "Verified" : "Pending Verification"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-[#757575] mb-1">Address</p>
            <p className="font-medium text-[#171717]">
              {vendor.address?.street}, {vendor.address?.lga}, {vendor.address?.state}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#757575] mb-1">Joined Date</p>
            <p className="font-medium text-[#171717]">{new Date(vendor.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {!vendor.verified && (
            <Button className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleApprove} disabled={isLoading}>
              {isLoading ? "Approving..." : "Approve Vendor"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
