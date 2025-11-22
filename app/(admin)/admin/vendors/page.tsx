"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getVendors, type Vendor } from "../../../lib/api/admin"
import { useToast } from "@/hooks/use-toast"
import { VendorDetailsModal } from "@/components/admin/modals/vendor-details-modal"
import { SuspendVendorModal } from "@/components/admin/modals/suspend-vendor-modal"

export default function AdminVendorsPage() {
  const { toast } = useToast()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isSuspendOpen, setIsSuspendOpen] = useState(false)

  const loadVendors = async () => {
    try {
      const data = await getVendors()
      setVendors(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load vendors",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadVendors()
  }, [])

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setIsDetailsOpen(true)
  }

  const handleSuspend = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setIsSuspendOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#171717]">Vendors</h1>
        <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
          Export List
        </button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E6E6E6]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Business Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      Loading vendors...
                    </td>
                  </tr>
                ) : vendors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      No vendors found
                    </td>
                  </tr>
                ) : (
                  vendors.map((vendor) => (
                    <tr key={vendor._id} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                      <td className="py-4 px-4 text-sm font-medium text-[#171717]">{vendor.businessName}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{vendor.email}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">
                        {vendor.address?.city}, {vendor.address?.state}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            vendor.verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {vendor.verified ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(vendor)}
                            className="text-sm text-[#E41F47] hover:underline"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleSuspend(vendor)}
                            className="text-sm text-[#757575] hover:text-[#171717]"
                          >
                            Suspend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedVendor && (
        <>
          <VendorDetailsModal
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
            vendor={selectedVendor}
            onUpdate={loadVendors}
          />
          <SuspendVendorModal
            open={isSuspendOpen}
            onOpenChange={setIsSuspendOpen}
            vendor={selectedVendor}
            onUpdate={loadVendors}
          />
        </>
      )}
    </div>
  )
}
