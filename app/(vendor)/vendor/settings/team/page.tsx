"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Iconex } from "@/components/icons/iconex"
import { getTeamMembers, inviteTeamMember } from "../../../../../lib/api/vendor"
import { useToast } from "@/hooks/use-toast"
import { AddTeamMemberModal } from "@/components/vendor/modals/add-team-member-modal"

export default function VendorTeamSettingsPage() {
  const { toast } = useToast()
  const [members, setMembers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadMembers = async () => {
    try {
      const data = await getTeamMembers()
      setMembers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [toast])

  const handleInvite = async (data: any) => {
    try {
      await inviteTeamMember(data)
      toast({
        title: "Success",
        description: "Invitation sent",
      })
      loadMembers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-[#171717]">Team Management</CardTitle>
            <p className="text-sm text-[#757575] mt-1">Add and manage staff who can access your dashboard</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors flex items-center gap-2"
          >
            <Iconex>
              <Plus className="h-4 w-4" />
            </Iconex>
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
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      Loading team members...
                    </td>
                  </tr>
                ) : (
                  members.map((member, index) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddTeamMemberModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
