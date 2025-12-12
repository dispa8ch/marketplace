"use client";

import {
  User,
  Wallet,
  Package,
  Bell,
  Globe,
  PackageCheck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

interface CustomerProps {
  customer: Customer;
}

/**
 * Sidebar showing the user's avatar, name, email and role.  Adds Products and
 * Subscription links for sellers.  Highlights the active page.
 */
export function SettingsSidebar({ customer }: CustomerProps) {
  const pathname = usePathname();

  const baseItems = [
    { icon: User, label: "Account", href: "/settings" },
    { icon: Wallet, label: "Wallet", href: "/settings/wallet" },
    { icon: Package, label: "Orders", href: "/settings/orders" },
    { icon: Bell, label: "Notifications", href: "/settings/notifications" },
    { icon: Globe, label: "Language & Currency", href: "/settings/language" },
  ];

  const sellerItems = [
    { icon: PackageCheck, label: "Products", href: "/settings/products" },
    { icon: CreditCard, label: "Subscription", href: "/settings/subscription" },
  ];

  // append extra items for sellers
  const items =
    customer?.role === "seller" ? [...baseItems, ...sellerItems] : baseItems;

  if (!customer) {
    return (
      <aside className="lg:w-64 shrink-0 lg:mt-10">
        <div className="p-4 text-muted-foreground text-sm">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="lg:w-72 shrink-0 lg:mt-10">
      <div className="bg-background border rounded-lg overflow-hidden">
        {/* avatar + user info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-14 h-14">
              <AvatarImage src={`https://avatar.vercel.sh/${customer.email}`} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">
                {(customer?.name ?? "??").substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-md">{customer.name}</div>
              <div className="text-xs text-muted-foreground">{customer.email}</div>
              {customer.role && (
                <div className="text-xs mt-2 px-2 py-1 capitalize rounded-sm bg-accent w-fit text-muted-foreground line-clamp-1">
                  {customer.role}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* navigation items */}
        <nav className="flex flex-col p-2 gap-2">
          {items.map(item => {
            const Icon = item.icon;
            const isActive =
              item.href === "/settings"
                ? pathname === "/settings"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  isActive
                    ? "bg-[#260e13] text-[#E41F47]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="flex-1 text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
