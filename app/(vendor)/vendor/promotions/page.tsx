import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function VendorPromotionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#171717]">Promotions</h1>
        <div className="flex items-center gap-3">
          <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Filter
          </button>
          <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Pause
          </button>
          <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Delete
          </button>
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Promotion
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Active Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">3</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">45,000</div>
            <p className="text-xs text-green-600 mt-1">+17.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">25,000</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#171717]">₦1,202,567.90</div>
            <p className="text-xs text-blue-600 mt-1">Running next week</p>
          </CardContent>
        </Card>
      </div>

      {/* Promotions Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E6E6E6]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Promotion</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Spend</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Start Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">End Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Creamy Milkshake Fruit Parfait",
                    type: "Sponsored Ad",
                    spend: 7000,
                    start: "12/09/2025",
                    end: "24/09/2025",
                    status: "Active",
                  },
                  {
                    name: "Holiday Combo Offer",
                    type: "Banner Feature",
                    spend: 7000,
                    start: "14/09/2025",
                    end: "18/10/2025",
                    status: "Scheduled",
                  },
                  {
                    name: "Seasonal Discount",
                    type: "Store Banner",
                    spend: 10000,
                    start: "16/09/2025",
                    end: "25/10/2025",
                    status: "Scheduled",
                  },
                  {
                    name: "Creamy Milkshake Fruit Parfait",
                    type: "Sponsored Ad",
                    spend: 5000,
                    start: "20/10/2025",
                    end: "25/11/2025",
                    status: "Active",
                  },
                  {
                    name: "Special Weekend Offer",
                    type: "Weekly Promo",
                    spend: 10000,
                    start: "19/09/2025",
                    end: "08/08/2025",
                    status: "Completed",
                  },
                  {
                    name: "Tuesday T-shirts",
                    type: "Category Boost",
                    spend: 5000,
                    start: "12/09/2025",
                    end: "24/09/2025",
                    status: "Active",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                    <td className="py-4 px-4 text-sm text-[#171717]">{item.name}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.type}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.spend}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.start}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.end}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Scheduled"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#757575] hover:text-[#171717]">•••</button>
                    </td>
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
    </div>
  )
}
