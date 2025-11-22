"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Store, Users, Truck, Settings, BarChart3, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Iconex } from "@/components/icons/iconex"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Vendors", href: "/admin/vendors", icon: Store },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Logistics Partners", href: "/admin/logistics", icon: Truck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden sm:block fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <span className="text-lg font-bold text-primary-foreground">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Dispa8ch</span>
          <span className="text-xs text-muted-foreground">Admin Console</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#FFEDF0] text-[#E41F47] shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Iconex className={cn(isActive ? "text-[#E41F47]" : "text-[#757575]")}>
                <Icon className="h-5 w-5" />
              </Iconex>
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t bg-muted/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          asChild
        >
          <Link href="/admin/auth/login">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  )
}
