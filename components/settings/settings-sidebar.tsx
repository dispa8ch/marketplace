"use client";

import { User, Wallet, Package, Bell, Globe, Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, isActivePath } from "@/lib/utils";
import Iconex from "@/components/icons/iconex";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orders?: number;
  totalSpent?: number;
  joinDate?: string;
  status?: string;
}

interface CustomerProps {
  customer: Customer;
}

const menuItems = [
  { icon: User, label: "Account", href: "/settings" },
  { icon: Wallet, label: "Wallet", href: "/settings/wallet" },
  { icon: Package, label: "Orders", href: "/settings/orders" },
  { icon: Bell, label: "Notifications", href: "/settings/notifications" },
  { icon: Globe, label: "Language & Currency", href: "/settings/language" },
];

export function SettingsSidebar({ customer }: CustomerProps) {
  const pathname = usePathname();

  if (!customer) {
    return (
      <aside className="lg:w-64 shrink-0 lg:mt-10">
        <div className="p-4 text-muted-foreground text-sm">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="lg:w-64 shrink-0 lg:mt-10">
      <div className="bg-background border rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${customer.email}`} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">
                {(customer?.name ?? "??").substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* <div className="w-12 h-12 bg-gray-200 rounded-full" /> */}
            <div className="flex-1">
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-muted-foreground">
                {customer.email}
              </div>
            </div>
          </div>
        </div>
        <nav className="flex flex-col p-2 gap-2">
          {menuItems.map((item) => {
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
