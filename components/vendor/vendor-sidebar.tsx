"use client"

import { useState } from "react"
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Iconex } from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";

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

function isActivePath(pathname: string, href: string) {
  // exact match or startsWith for nested routes; adjust as needed
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}


export function VendorSidebar({ menuItems }: { menuItems: { href: string; icon: any; label: string }[] }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden sm:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-lg font-bold">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide">Dispa8ch</span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Vendor</span>
          </div>
        </div>

      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(pathname || "", item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#FFEDF0] text-[#E41F47]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Iconex
                className={cn(isActive ? "text-[#E41F47]" : "text-[#757575]")}
              >
                <item.icon className="h-5 w-5" />
              </Iconex>

              <span className="truncate flex-1 text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowLogout(true)}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <LogoutModal open={showLogout} onOpenChange={setShowLogout} />
    </>
  )
}
