"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Store, Users, Truck, BarChart3, Settings } from "lucide-react"
import { isActivePath } from "@/lib/utils"
import { Iconex } from "@/components/icons/iconex"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Vendors", href: "/admin/vendors", icon: Store },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Logistics", href: "/admin/logistics", icon: Truck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminBottomNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Admin navigation" className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden bg-card border-t shadow-inner" style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = isActivePath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-md text-xs ${isActive ? 'bg-[#FFEDF0] text-[#E41F47] font-medium' : 'text-[#757575]'}`}
              >
                <Iconex as={Icon} className={`${isActive ? 'text-[#E41F47]' : 'text-[#757575]'}`} />
                <span className="text-[11px]">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
