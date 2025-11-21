"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, MapPin, User, Phone, Mail } from "lucide-react"

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState<any>(null)

  // Mock: Load order data
  useEffect(() => {
    // In real app, fetch order by params.id
    setOrder({
      id: "ORD-1001",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+234 801 234 5678",
      },
      date: "2024-01-15",
      time: "10:30 AM",
      status: "paid",
      items: [
        {
          id: "1",
          name: "Premium Wireless Headphones",
          quantity: 1,
          price: 25000,
        },
        {
          id: "2",
          name: "Designer Handbag",
          quantity: 1,
          price: 35000,
        },
      ],
      subtotal: 60000,
      deliveryFee: 2000,
      total: 62000,
      deliveryAddress: {
        street: "123 Main Street",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria",
      },
    })
  }, [params.id])

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    )
  }

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
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-muted-foreground">Order #{order.id}</p>
        </div>
        <Badge variant={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{order.customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="font-medium">{order.customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </p>
              <p className="font-medium">{order.customer.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{order.deliveryAddress.street}</p>
              <p className="text-muted-foreground">{order.deliveryAddress.city}</p>
              <p className="text-muted-foreground">{order.deliveryAddress.state}</p>
              <p className="text-muted-foreground">{order.deliveryAddress.country}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={item.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₦{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₦{order.deliveryFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary h-3 w-3" />
                <div className="h-full w-px bg-border" />
              </div>
              <div className="pb-4">
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-muted-foreground">
                  {order.date} at {order.time}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
