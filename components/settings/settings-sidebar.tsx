'use client'

import { User, Wallet, Package, Bell, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function SettingsSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: User, label: 'Account', href: '/settings' },
    { icon: Wallet, label: 'Wallet', href: '/settings/wallet' },
    { icon: Package, label: 'Orders', href: '/settings/orders' },
    { icon: Bell, label: 'Notifications', href: '/settings/notifications' },
    { icon: Globe, label: 'Language & Currency', href: '/settings/language' },
  ]

  return (
    <aside className="lg:w-64 flex-shrink-0 lg:mt-10">
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="font-semibold">John Doe</div>
              <div className="text-sm text-gray-600">johndoe@gmail.com</div>
            </div>
          </div>
        </div>
        <nav className=" flex flex-col p-2 gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
