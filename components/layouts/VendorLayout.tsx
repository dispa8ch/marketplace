import type React from "react"
import { VendorSidebar } from "@/components/vendor/vendor-sidebar"
import { VendorHeader } from "@/components/vendor/vendor-header"

interface VendorLayoutProps {
  children: React.ReactNode
}

/**
 * VendorLayout Component
 * Main layout wrapper for vendor dashboard pages
 * - Fixed 256px (w-64) left sidebar with navigation
 * - Top header with search, quick actions, and profile
 * - Main content area with exact 24px padding per PDF specs
 */
export function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <VendorSidebar />
      <div className="flex flex-1 flex-col overflow-hidden ml-64">
        <VendorHeader />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">{children}</main>
      </div>
    </div>
  )
}
