import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminBottomNav } from "@/components/admin/bottom-nav"

interface AdminLayoutProps {
  children: React.ReactNode
}

/**
 * AdminLayout Component
 * Matches VendorLayout structure exactly with admin-specific navigation
 * - Same fixed 256px sidebar width
 * - Same header structure with search/notifications/profile
 * - Same 24px content padding
 * - Same visual design and interaction patterns
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden ml-64">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">{children}</main>
      </div>
      <AdminBottomNav />
    </div>
  )
}
