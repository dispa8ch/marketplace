import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Iconex } from '@/components/icons/iconex'

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  href: string;
  count?: number;
}

export function CategoryCard({ name, icon: Icon, href, count }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:border-primary transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
          <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
            <Iconex as={Icon} className="h-6 w-6 text-primary" />
          </div>
          <p className="font-medium text-sm text-center">{name}</p>
          {count && (
            <p className="text-xs text-muted-foreground">{count} items</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
