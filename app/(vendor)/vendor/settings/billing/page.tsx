import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorBillingSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#171717]">Subscription & Billing</CardTitle>
          <p className="text-sm text-[#757575]">Manage your plan, payments, and billing history</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Plan Overview */}
          <div className="grid gap-6 md:grid-cols-2 p-4 bg-[#F5F5F5] rounded-lg">
            <div>
              <p className="text-xs text-[#757575] mb-1">Selected Plan</p>
              <p className="text-lg font-semibold text-[#171717]">Starter Plan</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                  Save 10%
                </span>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                  Active
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#757575] mb-1">Billing Cycle</p>
              <p className="text-sm font-medium text-[#171717]">Monthly</p>
              <div className="mt-3 pt-3 border-t border-[#E6E6E6]">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#757575]">Subtotal</span>
                  <span className="font-medium text-[#171717]">₦50,000</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#757575]">Discount</span>
                  <span className="font-medium text-[#171717]">₦0</span>
                </div>
                <div className="flex justify-between text-base font-semibold mt-2 pt-2 border-t border-[#E6E6E6]">
                  <span className="text-[#171717]">Total</span>
                  <span className="text-[#171717]">₦50,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="border border-[#E6E6E6] px-6 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
              Change Plan
            </button>
            <button className="bg-[#E41F47] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
              Renew Now
            </button>
          </div>

          {/* Payment Methods */}
          <div className="pt-6 border-t border-[#E6E6E6]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#171717]">Payment Methods</h3>
              <button className="text-sm text-[#E41F47] font-medium hover:underline">Add New Card</button>
            </div>
            <div className="border border-[#E6E6E6] rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-medium text-[#171717]">4664 **** **** 1678</p>
                  <p className="text-xs text-[#757575]">Cassandra K.A. • 10/27 • Credit</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-[#E41F47] hover:underline">Set as Default</button>
                <button className="text-sm text-[#E41F47] hover:underline">View Details</button>
                <button className="text-sm text-red-600 hover:underline">Delete Card</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
