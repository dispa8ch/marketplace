import type React from "react"
import { VendorSidebar } from "@/components/vendor/vendor-sidebar"
import { VendorHeader } from "@/components/vendor/vendor-header"
import { VendorBottomNav } from "@/components/vendor/bottom-nav"

interface VendorLayoutProps {
  children: React.ReactNode
}

/**
 * VendorLayout Component
 * Main layout wrapper for vendor dashboard pages
 * - Fixed 256px (w-64) left sidebar with navigation on desktop
 * - Top header with search, quick actions, and profile
 * - Main content area with responsive padding
 * - Bottom navigation for mobile
 */
export function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden sm:block">
        <VendorSidebar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden sm:ml-64 pb-16 sm:pb-0">
        <VendorHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      {/* Bottom Navigation - visible only on mobile */}
      <div className="sm:hidden">
        <VendorBottomNav />
      </div>
    </div>
  )
}
