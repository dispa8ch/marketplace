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
    <aside className="hidden sm:block fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <span className="text-lg font-bold text-primary-foreground">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Dispa8ch</span>
          <span className="text-xs text-muted-foreground">Vendor Application</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4">
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

      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="soft" className="w-full justify-start" asChild>
          <Link href="/auth/login">
            <LogOut className="mr-3 h-5 w-5 text-[#E41F47]" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  )
}
