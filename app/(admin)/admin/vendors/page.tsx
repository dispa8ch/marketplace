"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Eye } from "lucide-react"
import { Iconex } from "@/components/icons/iconex"

export default function AdminVendorsPage() {
  const [vendors] = useState([
    {
      id: "1",
      name: "Tech Hub Electronics",
      email: "contact@techhub.ng",
      phone: "+234 800 000 0000",
      location: "Ikeja, Lagos",
      status: "verified",
      products: 128,
      joinDate: "2023-12-01",
    },
    {
      id: "2",
      name: "Fresh Market Store",
      email: "hello@freshmarket.ng",
      phone: "+234 800 111 1111",
      location: "Surulere, Lagos",
      status: "pending",
      products: 45,
      joinDate: "2024-01-15",
    },
    {
      id: "3",
      name: "Fashion Forward",
      email: "info@fashionforward.ng",
      phone: "+234 800 222 2222",
      location: "Lekki, Lagos",
      status: "verified",
      products: 89,
      joinDate: "2023-11-15",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vendors</h1>
        <div className="relative w-80">
          <Iconex className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </Iconex>
          <Input type="search" placeholder="Search vendors..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.location}</TableCell>
                  <TableCell>{vendor.products}</TableCell>
                  <TableCell>
                    <Badge variant={vendor.status === "verified" ? "default" : "secondary"}>{vendor.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View">
                        <Iconex className="h-4 w-4">
                          <Eye className="h-4 w-4" />
                        </Iconex>
                      </Button>
                      {vendor.status === "pending" && (
                        <>
                          <Button variant="ghost" size="icon" title="Approve" className="text-green-600">
                            <Iconex className="h-4 w-4">
                              <CheckCircle className="h-4 w-4" />
                            </Iconex>
                          </Button>
                          <Button variant="ghost" size="icon" title="Reject" className="text-destructive">
                            <Iconex className="h-4 w-4">
                              <XCircle className="h-4 w-4" />
                            </Iconex>
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
