"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Iconex } from "@/components/icons/iconex"
import { getPromotions } from "@/lib/api/vendor"

export default function VendorPromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await getPromotions()
        setPromotions(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPromotions()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#171717]">Promotions</h1>
        <div className="flex items-center gap-3">
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors flex items-center gap-2">
            <Iconex>
              <Plus className="h-4 w-4" />
            </Iconex>
            Create New Promotion
          </button>
        </div>
      </div>

      {/* Promotions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
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
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      Loading promotions...
                    </td>
                  </tr>
                ) : (
                  promotions.map((item, index) => (
                    <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                      <td className="py-4 px-4 text-sm text-[#171717]">{item.name}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{item.type}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{item.spend}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{item.start}</td>
                      <td className="py-4 px-4 text-sm text-[#757575]">{item.end}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-100 text-green-700"
                              : item.status === "scheduled"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
