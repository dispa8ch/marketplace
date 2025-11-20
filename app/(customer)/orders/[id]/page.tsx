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
      { name: 'Elegant Yellow Ankara Gown', price: 15, quantity: 2 },
      { name: 'Elegant Yellow Ankara Gown', price: 15, quantity: 2 },
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/settings/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Orders
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h1>
              <p className="text-gray-600">View complete information about this order</p>
            </div>

            <div className="space-y-8">
              {/* Tracking Number */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Tracking Number:</label>
                <div className="text-2xl font-bold text-gray-900">{order.trackingNumber}</div>
              </div>

              {/* Order Items */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  <div className="text-lg font-bold text-gray-900">${order.total}</div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{order.items} items in this order</p>

                <div className="space-y-3">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity} units</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${product.price}</p>
                        <p className="text-xs text-gray-500">Quantity: {product.quantity} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Metadata */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Metadata</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Placed</p>
                    <p className="font-medium text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium text-gray-900">{order.id}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Recipient Name</p>
                    <p className="font-medium text-gray-900">{order.shipping.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recipient Email</p>
                    <p className="font-medium text-gray-900">{order.shipping.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recipient Phone Number</p>
                    <p className="font-medium text-gray-900">{order.shipping.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Country</p>
                    <p className="font-medium text-gray-900">{order.shipping.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-medium text-gray-900">{order.shipping.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Local Government Area</p>
                    <p className="font-medium text-gray-900">{order.shipping.lga}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Street Address</p>
                    <p className="font-medium text-gray-900">{order.shipping.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Postal Code</p>
                    <p className="font-medium text-gray-900">{order.shipping.postalCode}</p>
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
