"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getOrders, type Order } from "@/lib/api/vendor"
import { useToast } from "@/hooks/use-toast"

export default function VendorOrdersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data.orders)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load orders",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "assigned":
        return "secondary"
      case "in_transit":
        return "default"
      case "delivered":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order._id.substring(0, 8)}</TableCell>
                    <TableCell>Customer {order.customerId.substring(0, 6)}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>₦{order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/vendor/orders/${order._id}`)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
