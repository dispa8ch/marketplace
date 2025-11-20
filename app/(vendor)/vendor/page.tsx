import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/vendor/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Add Product</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value="45"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Orders"
          value="128"
          icon={ShoppingBag}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Revenue"
          value="₦450,000"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Growth"
          value="23%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">
                      {i} hour{i > 1 ? 's' : ''} ago
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{(Math.random() * 50000 + 10000).toFixed(0)}</p>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Paid
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Premium Headphones', sales: 45 },
                { name: 'Designer Bag', sales: 38 },
                { name: 'Smart Watch', sales: 32 },
                { name: 'Wireless Earbuds', sales: 28 },
                { name: 'Laptop Stand', sales: 25 },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
