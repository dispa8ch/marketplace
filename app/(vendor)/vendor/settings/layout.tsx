"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, isActivePath } from "@/lib/utils";
import { Bell, Building, CreditCard, HelpCircle, ShieldCheck, User, Users } from "lucide-react";

const settingsNav = [
  { name: "Profile Settings", href: "/vendor/settings", icon: User },
  { name: "Account & Security", href: "/vendor/settings/security", icon: ShieldCheck },
  { name: "Business & Compliance", href: "/vendor/settings/compliance", icon: Building },
  { name: "Subscription & Billing", href: "/vendor/settings/billing", icon: CreditCard },
  {
    name: "Notifications & Preferences", icon: Bell,
    href: "/vendor/settings/notifications",
  },
  { name: "Team Management", href: "/vendor/settings/team", icon: Users },
  { name: "Support & Help", href: "/vendor/settings/support", icon: HelpCircle },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#171717]">Settings</h1>
        <p className="text-[#757575] mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile horizontal tabs */}
        <div className="block lg:hidden w-full">
          <nav
            role="tablist"
            aria-label="Settings tabs"
            className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {settingsNav.map((item) => {
                const isActive = isActivePath(pathname, item.href, {
                  exact: item.href === "/vendor/settings",
                });
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="tab"
                    aria-selected={isActive}
                    className={cn(
                      "whitespace-nowrap px-3 py-2 rounded-md text-sm transition-colors border",
                      isActive
                        ? "bg-[#260e13] text-[#E41F47]"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Settings Navigation (desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="space-y-1 sticky top-24">
            {settingsNav.map((item) => {
              const isActive =
                item.href === "/vendor/settings"
                  ? pathname === "/vendor/settings"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-[#260e13] text-[#E41F47]"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
