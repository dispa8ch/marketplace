import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#171717]">Analytics</h1>
        <div className="flex items-center gap-3">
          <select className="border border-[#E6E6E6] rounded-md px-4 py-2 text-sm">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">₦19,000,670</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Processed Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">2,948</div>
            <p className="text-xs text-green-600 mt-1">+17.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Out for Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">2,948</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">₦23,000</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">38,890</div>
            <p className="text-xs text-red-600 mt-1">-14.2% from last month</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#E41F47] text-white text-xs rounded">NEW</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">450</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different report views */}
      <div className="border-b border-[#E6E6E6]">
        <div className="flex gap-6">
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
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E6E6E6]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Sales</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Reviews</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Views</th>
                </tr>
              </thead>
              <tbody>
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
                  <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                    <td className="py-4 px-4 text-sm text-[#171717]">{item.name}</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#171717]">{item.revenue}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.sales}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.reviews}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E6E6E6]">
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
            <CardTitle className="text-lg font-semibold text-[#171717]">Withdrawals vs Refunds</CardTitle>
            <p className="text-sm text-[#757575]">An overview of your withdraw count and refund count.</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[#F5F5F5] rounded-lg">
              <p className="text-[#757575]">Chart visualization</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#E41F47] rounded-full"></div>
                <span className="text-[#757575]">120 #2,010,090.00 Withdrawal Count</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#757575] rounded-full"></div>
                <span className="text-[#757575]">17 #998,075.40 Refund Count</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#171717]">Customer Insights</CardTitle>
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
