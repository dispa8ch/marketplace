import { VendorSidebar } from '@/components/vendor/vendor-sidebar';
import { VendorHeader } from '@/components/vendor/vendor-header';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <VendorSidebar />
      <div className="flex flex-1 flex-col overflow-hidden ml-64">
        <VendorHeader />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
