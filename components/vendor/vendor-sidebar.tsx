"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import Iconex from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";
import LogoutModal from "../ui/logout-modal";
import Image from "next/image";

const navItems = [
  { name: "Overview", href: "/vendor", icon: LayoutDashboard },
  { name: "Products", href: "/vendor/products", icon: Package },
  { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { name: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { name: "Wallet", href: "/vendor/wallet", icon: Wallet },
  { name: "Promotions", href: "/vendor/promotions", icon: Megaphone },
  { name: "Subscription", href: "/vendor/subscription", icon: CreditCard },
  { name: "Settings", href: "/vendor/settings", icon: Settings },
];

export function VendorSidebar() {
  const pathname = usePathname();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <aside className="hidden sm:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="dispa8ch" width={16} height={16} />
          </Link>
          <div className="flex flex-col">
            <span className="font-semibold text-sm ">Dispa8ch</span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Vendor Console
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/vendor"
                ? pathname === "/vendor"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#260e13] text-[#E41F47]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {/* FIXED ICONEX USAGE */}
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )}
                />

                <span className="truncate flex-1">{item.name}</span>
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
  );
}
