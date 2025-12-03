'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function OrderDetailPage() {
  const params = useParams()
  const [showOrderModal, setShowOrderModal] = useState(false)

  const order = {
    id: '#ORD12344029',
    trackingNumber: '101883736AF',
    items: 2,
    total: 275.90,
    date: '10/07/2025 10:26:22 AM',
    products: [
      { name: 'Elegant Yellow Ankara Gown', price: 15, quantity: 2, remanant: 10 },
      { name: 'Elegant Yellow Ankara Gown', price: 15, quantity: 2, remanant: 20 },
    ],
    shipping: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '+234 809 678 3456',
      country: 'Nigeria',
      state: 'Rivers',
      lga: 'Obia/Akpor',
      address: '123 Ajakaja Street, Road 15, Rumuodumaya Port Harcout',
      postalCode: '500102',
      shippingId: '#SCKAD13997200003',
      status: 'In Transit',
    },
    payment: {
      method: 'Card',
      amount: 209.50,
      service: 'Paystack',
      fee: 1.2,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/settings/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Orders
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="mb-8 flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-white">Order Details</h1>
              <p className="text-muted-foreground text-sm">View complete information about this order</p>
            </div>

            <div className="space-y-8">
              {/* Tracking Number */}
              <div>
                <label className="text-sm font-mormal text-muted-foreground block mb-2">Tracking Number:</label>
                <div className="text-2xl font-medium text-primary">{order.trackingNumber}</div>
              </div>

              {/* Order Items */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-muted-foreground">{order.id}</h3>
                  <div className="text-lg font-bold text-white">${order.total}</div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{order.items} items in this order</p>

                <div className="space-y-3">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-accent rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {product.quantity} units</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">${product.price}</p>
                        <p className="text-xs text-muted-foreground">Remaining: {product.remanant} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Metadata */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-white mb-4">Order Metadata</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Placed</p>
                    <p className="font-normal text-white">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-normal text-white">{order.id}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-white mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient Name</p>
                    <p className="font-normal text-white">{order.shipping.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient Email</p>
                    <p className="font-normal text-white">{order.shipping.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient Phone Number</p>
                    <p className="font-normal text-white">{order.shipping.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-normal text-white">{order.shipping.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-normal text-white">{order.shipping.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Local Government Area</p>
                    <p className="font-normal text-white">{order.shipping.lga}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Street Address</p>
                    <p className="font-normal text-white">{order.shipping.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Postal Code</p>
                    <p className="font-normal text-white">{order.shipping.postalCode}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <Button variant="outline" className="flex-1">Cancel Order</Button>
                <Link href={`/tracking/${order.trackingNumber}`} className="flex-1">
                  <Button className="w-full">Track Order</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
