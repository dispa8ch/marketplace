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
    <div className="flex h-screen overflow-hidden bg-muted/20">
      <div className="hidden sm:block">
        <AdminSidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden sm:ml-64 pb-16 sm:pb-0">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      <div className="sm:hidden">
        <AdminBottomNav />
      </div>
    </div>
  )
}
