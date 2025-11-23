"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PlanDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan?: {
    name: string
    price: number
    features: string[]
    isPopular?: boolean
  }
}

export function PlanDetailsModal({ open, onOpenChange, plan }: PlanDetailsModalProps) {
  if (!plan) return null

  const handleSubscribe = () => {
    // TODO: Connect to backend API
    console.log("[v0] Subscribe to plan:", plan.name)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{plan.name} Plan</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-bold">₦{plan.price.toLocaleString()}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            {plan.isPopular && (
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-[#FFEDF0] text-[#E41F47] text-sm font-medium rounded-full">
                  Most Popular
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <p className="font-medium">Features included:</p>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#E41F47] shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-[#E41F47] hover:bg-[#C11A3D]" onClick={handleSubscribe}>
            Subscribe Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
