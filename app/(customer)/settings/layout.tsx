'use client'

import { NavBar } from '@/components/marketplace/nav-bar'
import { SettingsSidebar } from '@/components/settings/settings-sidebar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-40">
          <div className="lg:col-span-1">
            {/* On large screens make the sidebar sticky; on mobile it remains in-flow */}
            <div className="hidden lg:block">
              <div className="fixed top-20"> 
                <SettingsSidebar />
              </div>
            </div>
            {/* Mobile: show sidebar at top (non-sticky) */}
            <div className="block lg:hidden mb-6">
              <SettingsSidebar />
            </div>
          </div>

          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
