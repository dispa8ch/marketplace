"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
  Truck,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Vendors", href: "/admin/vendors", icon: Store },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Logistics Partners", href: "/admin/logistics", icon: Truck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden sm:block fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.svg" alt="dispa8ch" width={16} height={16} />
        </Link>
        <div className="flex flex-col">
          <span className="font-semibold text-sm ">Dispa8ch</span>
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Admin Console
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#260e13] text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-sidebar-foreground"
                )}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          asChild
        >
          <Link href="/admin-auth/login">
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  );
}
