"use client"

import { useState, useEffect } from "react"
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"
import { StatsCard } from "@/components/vendor/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDashboardStats, getOrders, type DashboardStats, type Order } from "@/lib/api/vendor"
import { useToast } from "@/hooks/use-toast"

export default function VendorDashboardPage() {
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    growth: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, ordersData] = await Promise.all([getDashboardStats(), getOrders({ limit: 5 })])
        setStats(statsData)
        setRecentOrders(ordersData.orders.slice(0, 5))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [toast])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/vendor/products/new">Add Product</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          icon={<Package className="h-6 w-6 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          icon={<ShoppingBag className="h-6 w-6 text-primary" />}
          trend={{ value: stats.growth, isPositive: true }}
        />
        <StatsCard
          title="Revenue"
          value={`₦${stats.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-primary" />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Growth"
          value={`${stats.growth}%`}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-center text-muted-foreground py-4">Loading orders...</p>
              ) : recentOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">Order #{order._id.substring(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{order.total.toLocaleString()}</p>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Premium Headphones", sales: 45 },
                { name: "Designer Bag", sales: 38 },
                { name: "Smart Watch", sales: 32 },
                { name: "Wireless Earbuds", sales: 28 },
                { name: "Laptop Stand", sales: 25 },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
