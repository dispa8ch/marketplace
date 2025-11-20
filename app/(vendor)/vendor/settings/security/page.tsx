import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorSecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#171717]">Account & Security</CardTitle>
          <p className="text-sm text-[#757575]">Keep your account safe and secure</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Management */}
          <div>
            <h3 className="text-sm font-semibold text-[#171717] mb-4">Password Management</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#171717] mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="e.g. John13Doe#"
                  className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#171717] mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="e.g. John13Doe#"
                  className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
                />
              </div>
            </div>
            <button className="mt-4 bg-[#E41F47] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
              Update Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="pt-6 border-t border-[#E6E6E6]">
            <h3 className="text-sm font-semibold text-[#171717] mb-2">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-[#757575] mb-4">Add an extra layer of protection with 2FA.</p>
            <div className="flex gap-3">
              <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
                Enable via Email
              </button>
              <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
                Enable via SMS
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="pt-6 border-t border-[#E6E6E6]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#171717]">Active Sessions</h3>
              <button className="text-sm text-[#E41F47] font-medium hover:underline">Logout of All Devices</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E6E6E6]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Device</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">IP Address</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Last active</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { device: "Dell Desktop", ip: "192.168.98", status: "Active", lastActive: "01/10/2025 03:45AM" },
                    {
                      device: "HP 15 Avalanche",
                      ip: "176.120.98",
                      status: "Expired",
                      lastActive: "01/09/2025 10:15PM",
                    },
                    {
                      device: "Macbook M4 Air Pro",
                      ip: "172.168.66",
                      status: "Inactive",
                      lastActive: "01/08/2025 04:12AM",
                    },
                    { device: "Ipad Air", ip: "194.172.45", status: "Inactive", lastActive: "01/07/2025 11:45PM" },
                    { device: "Dell Desktop", ip: "192.170.28", status: "Expired", lastActive: "01/06/2025 09:29AM" },
                    {
                      device: "HP 15 Avalanche",
                      ip: "168.172.62",
                      status: "Expired",
                      lastActive: "01/05/2025 09:22AM",
                    },
                  ].map((session, index) => (
                    <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                      <td className="py-4 px-4 text-sm text-[#171717]">{session.device}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{session.ip}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            session.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : session.status === "Inactive"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {session.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{session.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
