import { Store, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/vendor/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboardPage() {
  const recentVendors = [
    { name: 'Fresh Market Store', status: 'pending', date: '2024-01-15' },
    { name: 'Tech Hub Electronics', status: 'verified', date: '2024-01-14' },
    { name: 'Fashion Forward', status: 'verified', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Vendors"
          value="156"
          icon={Store}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Customers"
          value="2,341"
          icon={Users}
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Total Orders"
          value="5,678"
          icon={ShoppingBag}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Platform Revenue"
          value="₦12.5M"
          icon={TrendingUp}
          trend={{ value: 22, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Vendor Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVendors.map((vendor) => (
                  <TableRow key={vendor.name}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vendor.status === 'verified' ? 'default' : 'secondary'
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">New vendor registered</p>
                  <p className="text-sm text-muted-foreground">Fresh Market Store</p>
                </div>
                <p className="text-xs text-muted-foreground">2 mins ago</p>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Order completed</p>
                  <p className="text-sm text-muted-foreground">Order #1045</p>
                </div>
                <p className="text-xs text-muted-foreground">15 mins ago</p>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">New logistics partner added</p>
                  <p className="text-sm text-muted-foreground">QuickMove Express</p>
                </div>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
