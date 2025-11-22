"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Wallet,
  Megaphone,
  Settings,
} from "lucide-react";
import { cn, isActivePath } from "@/lib/utils";
import { Iconex } from "@/components/icons/iconex";

const navItems = [
  { name: "Overview", href: "/vendor", icon: LayoutDashboard },
  { name: "Products", href: "/vendor/products", icon: Package },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { name: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { name: "Wallet", href: "/vendor/wallet", icon: Wallet },
  { name: "Promotions", href: "/vendor/promotions", icon: Megaphone },
  { name: "Settings", href: "/vendor/settings", icon: Settings },
];

export function VendorBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Vendor navigation"
      className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden bg-card border-t shadow-inner"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  isActive ? "bg-[#FFEDF0] text-[#E41F47]" : "hover:bg-gray-50"
                )}
              >
                <Iconex
                  className={cn(isActive ? "text-[#E41F47]" : "text-gray-500")}
                >
                  <item.icon className="h-5 w-5" />
                </Iconex>
                <span className="text-[11px]">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
