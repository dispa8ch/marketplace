"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const settingsNav = [
  { name: "Profile Settings", href: "/vendor/settings" },
  { name: "Account & Security", href: "/vendor/settings/security" },
  { name: "Business & Compliance", href: "/vendor/settings/compliance" },
  { name: "Subscription & Billing", href: "/vendor/settings/billing" },
  { name: "Notifications & Preferences", href: "/vendor/settings/notifications" },
  { name: "Team Management", href: "/vendor/settings/team" },
  { name: "Support & Help", href: "/vendor/settings/support" },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#171717]">Settings</h1>
        <p className="text-[#757575] mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {settingsNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-[#FFEDF0] text-[#E41F47]" : "text-[#757575] hover:bg-[#F5F5F5] hover:text-[#171717]",
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
