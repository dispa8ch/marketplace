import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorNotificationsSettingsPage() {
  const notifications = [
    {
      alert: "Order Updates",
      description: "Get real-time alerts for new and completed orders",
      inApp: true,
      sms: false,
      email: true,
    },
    {
      alert: "Payment Receipts",
      description: "Receive payment confirmations via email",
      inApp: true,
      sms: false,
      email: true,
    },
    {
      alert: "Delivery Tracking",
      description: "Get delivery status notifications",
      inApp: true,
      sms: true,
      email: false,
    },
    {
      alert: "Promotions & Offers",
      description: "Stay updated on new marketplace campaigns",
      inApp: false,
      sms: false,
      email: true,
    },
    {
      alert: "System Announcements",
      description: "Get important Dispa8ch updates",
      inApp: true,
      sms: false,
      email: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#171717]">Notifications & Preferences</CardTitle>
        <p className="text-sm text-[#757575]">Choose how you want to stay updated</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E6E6E6]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Alert</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Description</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-[#171717]">In-app</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-[#171717]">SMS</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-[#171717]">Email</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif, index) => (
                <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                  <td className="py-4 px-4 text-sm font-medium text-[#171717]">{notif.alert}</td>
                  <td className="py-4 px-4 text-sm text-[#757575]">{notif.description}</td>
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={notif.inApp}
                      className="w-4 h-4 text-[#E41F47] rounded focus:ring-[#E41F47]"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={notif.sms}
                      className="w-4 h-4 text-[#E41F47] rounded focus:ring-[#E41F47]"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={notif.email}
                      className="w-4 h-4 text-[#E41F47] rounded focus:ring-[#E41F47]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#E6E6E6]">
          <button className="bg-[#E41F47] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
            Save Preferences
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
