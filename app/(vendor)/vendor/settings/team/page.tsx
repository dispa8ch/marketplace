import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function VendorTeamSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-[#171717]">Team Management</CardTitle>
            <p className="text-sm text-[#757575] mt-1">Add and manage staff who can access your dashboard</p>
          </div>
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Invite Member
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E6E6E6]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Caleb Adenuga", role: "Admin", email: "calebadenuga@gmail.com", status: "Active" },
                  { name: "Stefan Carvalho", role: "Admin", email: "stefancarvalho@gmail.com", status: "Active" },
                  { name: "Garry Foresters", role: "Admin", email: "garryforesters@gmail.com", status: "Active" },
                  { name: "Kimmy Hendrics", role: "Manager", email: "kimmyhendrics@gmail.com", status: "Active" },
                  { name: "James Dematrio", role: "Admin", email: "jamesdematrio@gmail.com", status: "Active" },
                  { name: "Alavera Deturo", role: "Analyst", email: "alaveradeturo@gmail.com", status: "Inactive" },
                  { name: "Damian Fallon", role: "Analyst", email: "damianfallon@gmail.com", status: "Active" },
                ].map((member, index) => (
                  <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                    <td className="py-4 px-4 text-sm font-medium text-[#171717]">{member.name}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{member.role}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{member.email}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.status}
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
        </CardContent>
      </Card>
    </div>
  )
}
