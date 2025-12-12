// app/settings/layout.tsx
'use client'

import { useEffect, useState } from 'react';
import { NavBar } from '@/components/marketplace/nav-bar';
import { SettingsSidebar } from '@/components/settings/settings-sidebar';
import supabase from '@/lib/supabase/client';
import type { Customer } from '@/components/marketplace/nav-bar';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Try to hydrate from cached profile first
      const stored = localStorage.getItem('dispa8ch_customer');
      if (stored) {
        setCustomer(JSON.parse(stored));
        return;
      }
      // Otherwise fetch the current session and user record from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, phone, role')
          .eq('id', session.user.id)
          .single();
        if (!error && data) {
          setCustomer(data);
          localStorage.setItem('dispa8ch_customer', JSON.stringify(data));
        }
      }
    };
    fetchUser();
  }, []);

  if (!customer) {
    return <p>Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar customer={customer} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-60">
          <div className="lg:col-span-1">
            {/* Sticky sidebar on large screens */}
            <div className="hidden lg:block">
              <div className="fixed top-20">
                <SettingsSidebar customer={customer} />
              </div>
            </div>
            {/* Inline sidebar on mobile */}
            <div className="block lg:hidden mb-6">
              <SettingsSidebar customer={customer} />
            </div>
          </div>
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
