"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VendorDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendor?: {
    id: string
    name: string
    email: string
    phone: string
    location: string
    status: string
    products: number
    joinDate: string
    businessType?: string
    documents?: Array<{
      name: string
      url: string
      status: string
    }>
  }
}

export function VendorDetailsModal({ open, onOpenChange, vendor }: VendorDetailsModalProps) {
  if (!vendor) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Vendor Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="info" className="flex-1">
              Information
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">
              Documents
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{vendor.name}</h3>
                <p className="text-sm text-muted-foreground">{vendor.email}</p>
              </div>
              <Badge variant={vendor.status === "verified" ? "default" : "secondary"}>{vendor.status}</Badge>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{vendor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{vendor.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Business Type</p>
                <p className="font-medium">{vendor.businessType || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{vendor.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="font-medium">{vendor.products}</p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button className="bg-[#E41F47] hover:bg-[#C11A3D]">Approve Vendor</Button>
              <Button variant="outline">Suspend Vendor</Button>
              <Button variant="outline">Send Message</Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 mt-4">
            <div className="space-y-3">
              {vendor.documents && vendor.documents.length > 0 ? (
                vendor.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <Badge variant="outline" className="mt-1">
                        {doc.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      View Document
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No documents uploaded</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="flex-1">
                  <p className="font-medium">Account created</p>
                  <p className="text-sm text-muted-foreground">Vendor registered on the platform</p>
                </div>
                <p className="text-xs text-muted-foreground">{vendor.joinDate}</p>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="flex-1">
                  <p className="font-medium">Documents submitted</p>
                  <p className="text-sm text-muted-foreground">Verification documents uploaded</p>
                </div>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
