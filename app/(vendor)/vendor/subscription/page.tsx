"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Iconex } from "@/components/icons/iconex"
import { getSubscriptionPlans, getCurrentSubscription } from "../../../../lib/api/vendor"
import { useToast } from "@/hooks/use-toast"

export default function VendorSubscriptionPage() {
  const { toast } = useToast()
  const [plans, setPlans] = useState<any[]>([])
  const [currentSub, setCurrentSub] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plansData, subData] = await Promise.all([getSubscriptionPlans(), getCurrentSubscription()])
        setPlans(plansData)
        setCurrentSub(subData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load subscription data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [toast])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#171717]">Subscription</h1>
          <p className="text-[#757575] mt-1">Upgrade and get more out of Dispa8ch</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Contact Us
          </button>
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
            Change Plan
          </button>
        </div>
      </div>

      {/* Current Plan Overview */}
      {currentSub && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#757575]">Current Plan</p>
                <h2 className="text-2xl font-bold text-[#171717] mt-1">{currentSub.plan.name}</h2>
                <p className="text-[#757575] mt-2">Get started at no cost and experience the basics of Dispa8ch</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#757575]">Plan Cost</p>
                <p className="text-3xl font-bold text-[#171717] mt-1">
                  ₦{currentSub.plan.price.toLocaleString()}
                  <span className="text-base font-normal text-[#757575]">/month</span>
                </p>
                <p className="text-sm text-[#757575] mt-2">Renewal Date</p>
                <p className="text-sm font-medium text-[#171717]">
                  {new Date(currentSub.renewalDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-600 mt-1">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === "Growth Plan" ? "border-2 border-[#E41F47] relative" : ""}>
            {plan.name === "Growth Plan" && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#E41F47] text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#171717]">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#171717]">₦{plan.price.toLocaleString()}</span>
                <span className="text-[#757575]">/{plan.period}</span>
              </div>
              <p className="text-sm text-[#757575] mt-2">{plan.description || "Plan description"}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Iconex>
                      <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    </Iconex>
                    <span className="text-[#171717]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentSub?.plan.name === plan.name
                    ? "bg-[#F5F5F5] text-[#757575] cursor-not-allowed"
                    : plan.name === "Growth Plan"
                      ? "bg-[#E41F47] text-white hover:bg-[#C11A3D]"
                      : "border border-[#E6E6E6] text-[#171717] hover:bg-[#F5F5F5]"
                }`}
              >
                {currentSub?.plan.name === plan.name ? "Current Plan" : "Upgrade"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
