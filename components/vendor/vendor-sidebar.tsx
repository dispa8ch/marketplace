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
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Iconex } from "@/components/icons/iconex"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Overview", href: "/vendor", icon: LayoutDashboard },
  { name: "Products", href: "/vendor/products", icon: Package },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { name: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { name: "Wallet", href: "/vendor/wallet", icon: Wallet },
  { name: "Promotions", href: "/vendor/promotions", icon: Megaphone },
  { name: "Subscription", href: "/vendor/subscription", icon: CreditCard },
  { name: "Settings", href: "/vendor/settings", icon: Settings },
]

export function VendorSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden sm:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E41F47]">
          <span className="text-lg font-bold text-white">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Dispa8ch</span>
          <span className="text-xs text-muted-foreground">Vendor Portal</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          // Exact match for root, prefix match for others
          const isActive = item.href === "/vendor" ? pathname === "/vendor" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#FFEDF0] text-[#E41F47] shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
          <Link href="/vendor/auth/login">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  )
}
