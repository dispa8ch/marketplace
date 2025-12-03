"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Store, Users, Truck, BarChart3, Settings, MoreHorizontal, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Iconex from "@/components/icons/iconex"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Vendors", href: "/admin/vendors", icon: Store },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Logistics", href: "/admin/logistics", icon: Truck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Logout", href: "/admin-auth/login", icon: LogOut },
]

export function AdminBottomNav() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const visibleItems = navItems.slice(0, 4)
  const moreItems = navItems.slice(4)

  return (
    <nav
      aria-label="Admin navigation"
      className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden bg-card border-t shadow-inner"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 py-2">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-md text-xs transition-colors",
                  isActive ? "bg-[#260e13] text-[#E41F47] font-medium" : "text-muted-foreground",
                )}
              >
                <Iconex icon={Icon} className={cn(isActive ? "text-[#E41F47] h-5 w-5" : "text-muted-foreground h-5 w-5")}/>
                <span className="text-[11px]">{item.name}</span>
              </Link>
            )
          })}

          <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
            <SheetTrigger asChild>
              <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-md text-xs text-[#757575]">
                <Iconex icon={MoreHorizontal} className="h-5 w-5"/>
                <span className="text-[11px]">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>More Options</SheetTitle>
              </SheetHeader>
              <div className="grid gap-2 p-4">
                {moreItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive ? "bg-[#260e13] text-[#E41F47] font-medium" : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <Iconex icon={Icon} className={cn(isActive ? "text-[#E41F47] h-5 w-5" : "text-muted-foreground h-5 w-5")}/>
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
