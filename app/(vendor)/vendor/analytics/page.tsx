import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-white">Analytics</h1>
        <div className="flex items-center gap-3">
          <select className="border border-[#3c3c3c] rounded-md px-2 py-2 text-sm bg-transparent">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
          </select>
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-white">₦19.0M</div>
            <p className="text-xs text-green-600 mt-1">+12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-white">2,948</div>
            <p className="text-xs text-green-600 mt-1">+17.2%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-white">124</div>
            <p className="text-xs text-yellow-600 mt-1">Processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Avg. Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-white">₦23k</div>
            <p className="text-xs text-green-600 mt-1">+12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-white">38.9k</div>
            <p className="text-xs text-red-600 mt-1">-14.2%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-white">450</div>
            <p className="text-xs text-green-600 mt-1">+12.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different report views - Scrollable on mobile */}
      <div className="border-b border-[#E6E6E6] overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          <button className="pb-3 px-1 border-b-2 border-[#E41F47] text-[#E41F47] font-medium text-sm">
            Sales Breakdown
          </button>
          <button className="pb-3 px-1 text-[#757575] font-medium text-sm hover:text-[#171717]">Payout Reports</button>
          <button className="pb-3 px-1 text-[#757575] font-medium text-sm hover:text-[#171717]">
            Inventory Trends
          </button>
          <button className="pb-3 px-1 text-[#757575] font-medium text-sm hover:text-[#171717]">
            Customer Insights
          </button>
        </div>
      </div>

      {/* Sales Breakdown Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Product</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Creamy Milkshake Fruit Parfait",
                  revenue: "₦2,260,100",
                  sales: 1246,
                  reviews: 800,
                  views: "12,089",
                },
                { name: "Milky Doughnut Pack", revenue: "₦2,100,009", sales: 1009, reviews: 990, views: "10,009" },
                { name: "Coconut Bread", revenue: "₦1,900,998", sales: 960, reviews: 900, views: "44,010" },
                { name: "Chocolate Chip Cookies", revenue: "₦1,892,708", sales: 830, reviews: 819, views: "110,484" },
                { name: "Frosted Cake Biscuit", revenue: "₦1,409,226", sales: 810, reviews: 700, views: "2,090" },
                { name: "Pineapple Smoothie", revenue: "₦890,786", sales: 660, reviews: 400, views: "11,990" },
              ].map((item, index) => (
                <TableRow key={index} className="hover:bg-[#FFEDF0]/10">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.revenue}</TableCell>
                  <TableCell className="text-muted-foreground">{item.sales}</TableCell>
                  <TableCell className="text-muted-foreground">{item.reviews}</TableCell>
                  <TableCell className="text-muted-foreground">{item.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between p-4 border-t border-[#E6E6E6]">
            <p className="text-sm text-[#757575]">6 out of 25 entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">&lt;</button>
              <button className="px-3 py-1 bg-[#E41F47] text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">2</button>
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">5</button>
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">&gt;</button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart placeholders */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Withdrawals vs Refunds</CardTitle>
            <p className="text-sm text-[#757575]">An overview of your withdraw count and refund count.</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[#F5F5F5] rounded-lg">
              <p className="text-[#757575]">Chart visualization</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#E41F47] rounded-full"></div>
                <span className="text-[#757575]">120 ₦2.0M Withdrawal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#757575] rounded-full"></div>
                <span className="text-[#757575]">17 ₦998k Refund</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Customer Insights</CardTitle>
            <p className="text-sm text-[#757575]">Distribution of your customer base</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[#F5F5F5] rounded-lg">
              <p className="text-[#757575]">Pie chart visualization</p>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#E41F47] rounded-full"></div>
                  <span className="text-[#757575]">Repeat Customers</span>
                </div>
                <span className="font-medium text-[#171717]">50%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#757575] rounded-full"></div>
                  <span className="text-[#757575]">New Customers</span>
                </div>
                <span className="font-medium text-[#171717]">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FFEDF0] rounded-full"></div>
                  <span className="text-[#757575]">Churned Customers</span>
                </div>
                <span className="font-medium text-[#171717]">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
