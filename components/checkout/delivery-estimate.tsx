'use client'

import { useEffect, useState } from 'react'
import { estimateDeliveryPrice, type PricingEstimate } from '@/lib/pricing/pricing-engine'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeliveryEstimateProps {
  pickupLGA: string
  dropoffLGA: string
  onSelectProvider: (estimate: PricingEstimate) => void
  selectedProvider?: string
}

export function DeliveryEstimate({
  pickupLGA,
  dropoffLGA,
  onSelectProvider,
  selectedProvider,
}: DeliveryEstimateProps) {
  const [estimates, setEstimates] = useState<PricingEstimate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock coordinates for LGAs (in real app, these would be geocoded addresses)
    const mockCoords = {
      Ikeja: { lat: 6.5964, lng: 3.3378 },
      Lekki: { lat: 6.4474, lng: 3.4737 },
      Surulere: { lat: 6.5027, lng: 3.3614 },
    }

    const pickup = mockCoords[pickupLGA as keyof typeof mockCoords] || mockCoords.Ikeja
    const dropoff = mockCoords[dropoffLGA as keyof typeof mockCoords] || mockCoords.Lekki

    setTimeout(() => {
      const results = estimateDeliveryPrice(
        { ...pickup, lga: pickupLGA },
        { ...dropoff, lga: dropoffLGA }
      )
      setEstimates(results)
      setLoading(false)
      
      // Auto-select cheapest option
      if (results.length > 0 && !selectedProvider) {
        onSelectProvider(results[0])
      }
    }, 800)
  }, [pickupLGA, dropoffLGA, selectedProvider, onSelectProvider])

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[#171717]">Select Delivery Partner</h3>
      {estimates.map((estimate) => (
        <button
          key={estimate.provider}
          onClick={() => onSelectProvider(estimate)}
          className={cn(
            'w-full p-4 rounded-lg border-2 text-left transition-all',
            selectedProvider === estimate.provider
              ? 'border-[#E41F47] bg-[#FFEDF0]'
              : 'border-gray-200 hover:border-gray-300'
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#171717]">{estimate.provider}</span>
                {selectedProvider === estimate.provider && (
                  <Check className="w-4 h-4 text-[#E41F47]" />
                )}
              </div>
              <div className="mt-1 text-sm text-[#757575]">
                {estimate.estimatedTime} mins • {estimate.reliability}% reliable
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#171717]">
                ₦{estimate.price.toLocaleString()}
              </div>
              <div className="text-xs text-[#757575]">inc. platform fee</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
