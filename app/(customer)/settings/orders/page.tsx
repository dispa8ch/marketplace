"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Package, TrendingUp } from "lucide-react";
import { Iconex } from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Protected from "@/components/auth/protected";

export default function OrdersPage() {
  const [filter, setFilter] = useState<
    "all" | "completed" | "processing" | "cancelled"
  >("all");

  const stats = [
    {
      label: "Total Orders",
      value: 4,
      change: "+20% vs last 28 days",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Completed Order",
      value: 2,
      change: "+15% vs last 28 days",
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Processing Orders",
      value: 2,
      change: "+15% vs last 15 days",
      color: "bg-orange-50 text-orange-700",
    },
    {
      label: "Cancelled Orders",
      value: 0,
      change: "0% vs last 15 days",
      color: "bg-red-50 text-red-700",
    },
  ];

  const orders = [
    {
      id: "#ORD12344029",
      items: 2,
      products: [
        { name: "Elegant Yellow Ankara Gown", price: 15, quantity: 2 },
        { name: "Elegant Yellow Ankara Gown", price: 15, quantity: 2 },
      ],
      total: 275.9,
      date: "10/07/2025 10:26:22 AM",
      deliveryFee: 1.5,
      status: "completed",
    },
    {
      id: "#ORD12344029",
      items: 2,
      products: [
        { name: "Elegant Yellow Ankara Gown", price: 15, quantity: 2 },
        { name: "Elegant Yellow Ankara Gown", price: 15, quantity: 2 },
      ],
      total: 275.9,
      date: "10/07/2025 10:26:22 AM",
      deliveryFee: 1.5,
      status: "cancelled",
    },
  ];

  return (
    <Protected>
      <div className="min-h-screen bg-gray-50">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-600 mb-2">{stat.label}</div>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Iconex className="h-5 w-5">
                      <Package className="h-5 w-5 text-red-600" />
                    </Iconex>
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Iconex className="h-5 w-5">
                      <TrendingUp className="h-5 w-5 text-red-600" />
                    </Iconex>
                    {stat.change}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-500">Your latest order activity</p>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              size="sm"
            >
              Completed
            </Button>
            <Button
              variant={filter === "processing" ? "default" : "outline"}
              onClick={() => setFilter("processing")}
              size="sm"
            >
              Processing
            </Button>
            <Button
              variant={filter === "cancelled" ? "default" : "outline"}
              onClick={() => setFilter("cancelled")}
              size="sm"
            >
              Cancelled
            </Button>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.items} items in this order
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ${order.total}
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      •{" "}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {product.quantity} units
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${product.price}
                        </p>
                        <p className="text-xs text-gray-500">
                          Quantity: {product.quantity} units
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div>
                      <p className="text-gray-600">
                        Ordered:{" "}
                        <span className="text-gray-900">{order.date}</span>
                      </p>
                      <p className="text-gray-600">
                        Delivery Fee:{" "}
                        <span className="text-gray-900">
                          ${order.deliveryFee}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Payment:{" "}
                        <span className="text-green-600 font-medium">Paid</span>
                      </p>
                    </div>
                    <Link href={`/orders/${order.id.replace("#", "")}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Protected>
  );
}
