import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select defaultValue="7d">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              Chart placeholder - Revenue over time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              Chart placeholder - Orders over time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Electronics', value: '35%' },
                { name: 'Fashion', value: '28%' },
                { name: 'Food', value: '20%' },
                { name: 'Home', value: '12%' },
                { name: 'Others', value: '5%' },
              ].map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: cat.value }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {cat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Partners Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'FastRider Logistics', deliveries: 456, rating: 4.8 },
                { name: 'QuickMove Express', deliveries: 382, rating: 4.6 },
                { name: 'Island Express', deliveries: 298, rating: 4.7 },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {partner.deliveries} deliveries
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{partner.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
