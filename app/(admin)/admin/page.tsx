"use client"

import { useState, useEffect } from "react"
import { Users, ShoppingBag, Store, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminDashboardStats, type AdminDashboardStats } from "../../../lib/api/admin"

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getAdminDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to load admin stats", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadStats()
  }, [])

  if (isLoading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#171717]">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Vendors</CardTitle>
            <Store className="h-4 w-4 text-[#E41F47]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">{stats?.totalVendors || 0}</div>
            <p className="text-xs text-[#757575] mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-[#E41F47]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">{stats?.totalCustomers || 0}</div>
            <p className="text-xs text-[#757575] mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#E41F47]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">{stats?.totalOrders || 0}</div>
            <p className="text-xs text-[#757575] mt-1">+24% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Platform Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#E41F47]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">₦{stats?.platformRevenue.toLocaleString() || 0}</div>
            <p className="text-xs text-[#757575] mt-1">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section - Placeholder for now */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#171717]">Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent signups.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#171717]">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent orders.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
