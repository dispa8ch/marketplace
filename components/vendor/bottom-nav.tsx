"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Wallet,
  Megaphone,
  Settings,
  MoreHorizontal,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Iconex from "@/components/icons/iconex"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

// Define all nav items
const allNavItems = [
  { name: "Overview", href: "/vendor", icon: LayoutDashboard },
  { name: "Products", href: "/vendor/products", icon: Package },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { name: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { name: "Wallet", href: "/vendor/wallet", icon: Wallet },
  { name: "Promotions", href: "/vendor/promotions", icon: Megaphone },
  { name: "Subscription", href: "/vendor/subscription", icon: CreditCard },
  { name: "Settings", href: "/vendor/settings", icon: Settings },
]

export function VendorBottomNav() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  // Primary items shown directly in the bottom bar (max 4)
  const primaryItems = allNavItems.slice(0, 4)
  // Secondary items hidden behind "More" menu
  const moreItems = allNavItems.slice(4)

  return (
    <nav
      aria-label="Vendor navigation"
      className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden bg-background border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 4px)" }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {primaryItems.map((item) => {
          const Icon = item.icon
          // Check for exact match or sub-route match, but ensure home "/" doesn't match everything
          const isActive = item.href === "/vendor" ? pathname === "/vendor" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 rounded-md transition-colors",
                isActive ? "bg-[#260e13] text-[#E41F47] font-medium" : "text-muted-foreground",
              )}
            >

              <Iconex icon={Icon} className={cn(isActive ? "text-[#E41F47] h-5 w-5" : "text-current h-5 w-5")}/>
              <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>{item.name}</span>
            </Link>
          )
        })}

        <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 rounded-md transition-colors",
                isMoreOpen ? "bg-[#260e13] text-[#E41F47] font-medium" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Iconex icon={MoreHorizontal} className={isMoreOpen ? "text-[#E41F47] h-5 w-5" : "text-current h-5 w-5"}/>
              <span className={cn("text-[10px] font-medium", isMoreOpen && "font-semibold")}>More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl p-0 pb-6">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-center text-base">Menu</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-2 gap-4 p-4">
              {moreItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all",
                      isActive
                        ? "bg-[#260e13] text-[#E41F47] font-medium"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <Iconex icon={Icon} className={cn(isActive ? "text-[#E41F47] h-5 w-5" : "text-muted-foreground h-5 w-5")}/>
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
