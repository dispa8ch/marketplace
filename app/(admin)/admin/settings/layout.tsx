"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn, isActivePath } from "@/lib/utils"

const settingsNav = [
  { name: "General", href: "/admin/settings" },
  { name: "Platform Fees", href: "/admin/settings/fees" },
  { name: "Security & Roles", href: "/admin/settings/security" },
  { name: "System Logs", href: "/admin/settings/logs" },
  { name: "Notifications", href: "/admin/settings/notifications" },
]

export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-seimbold text-white">Platform Settings</h1>
        <p className="text-[#757575] mt-1 text-sm">Configure global platform parameters and security</p>
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
                const isActive = isActivePath(pathname, item.href, { exact: item.href === "/admin/settings" })
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="tab"
                    aria-selected={isActive}
                    className={cn(
                      "whitespace-nowrap px-3 py-2 rounded-md text-sm transition-colors border",
                      isActive
                        ? "bg-[#260e13] text-[#E41F47] font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Settings Navigation (desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="space-y-1 sticky top-24">
            {settingsNav.map((item) => {
              const isActive = isActivePath(pathname, item.href, { exact: item.href === "/admin/settings" })
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-[#260e13] text-[#E41F47]" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
