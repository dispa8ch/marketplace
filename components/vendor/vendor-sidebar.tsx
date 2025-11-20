'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, Wallet, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { name: 'Products', href: '/vendor/products', icon: Package },
  { name: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
  { name: 'Wallet', href: '/vendor/wallet', icon: Wallet },
  { name: 'Settings', href: '/vendor/settings', icon: Settings },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/vendor" className="text-xl font-bold text-primary">
          Dispa8ch Vendor
        </Link>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/auth/login">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  );
}
