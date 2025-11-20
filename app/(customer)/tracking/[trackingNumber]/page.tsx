'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronLeft, Package, MapPin, Check, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TrackingPage() {
  const params = useParams()
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const { toast } = useToast()

  const tracking = {
    trackingNumber: 'JE-ZAF-1862318952-0401',
    orderNumber: 'JK126K532-AGH970',
    courier: 'GIG Logistics',
    from: '13 Sep, 2025',
    to: '25 Nov, 2025',
    pickup: '123 Main Street Kalahaja, Kaduna',
    dropoff: '23rd & Main Ajegunle, Lagos',
    status: 'transit',
    timeline: [
      { status: 'Moving From', location: 'Jacquiline Tower, Lagos', time: 'June 10, 2025 08:30:15AM', completed: true },
      { status: 'In Transit', location: 'Jacquiline Tower, Lagos', time: '08:30:15AM', completed: true },
      { status: 'Out for Delivery', location: 'Jacquiline Tower, Lagos', time: '08:30:15AM', completed: false },
      { status: 'Delivered', location: '23rd & Main Ajegunle, Lagos', time: '08:30:15AM', completed: false },
    ],
    items: [
      { name: 'Amazing Brand - Cool product with nice color', quantity: 2, price: 60000 },
      { name: 'Amazing Brand - Cool product with nice color', quantity: 2, price: 60000 },
    ],
  }

  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been submitted successfully.",
    })

    setShowRatingModal(false)
    setRating(0)
    setReview('')
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/settings/orders">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#171717]">Package Tracking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tracking Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="font-bold text-[#171717] mb-4">Shipping Status</h2>
              <p className="text-sm text-[#757575] mb-4">Set your location and delivery preferences</p>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    value={tracking.trackingNumber}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {tracking.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-[#E41F47]' : 'bg-gray-200'
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                        )}
                      </div>
                      {index < tracking.timeline.length - 1 && (
                        <div className={`w-0.5 h-auto ${item.completed ? 'bg-[#E41F47]' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${item.completed ? 'text-[#171717]' : 'text-[#757575]'}`}>
                        {item.status}
                      </p>
                      <p className="text-sm text-[#757575]">{item.location}</p>
                      <p className="text-xs text-[#757575] mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items in Delivery */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-[#171717] mb-3">In Delivery</h3>
              <div className="space-y-2">
                {tracking.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm text-[#171717]">{item.name}</p>
                      <p className="text-xs text-[#757575]">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#171717]">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-bold text-[#171717] mb-4">Order Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p className="text-[#757575]">Order Number</p>
                <p className="font-semibold text-[#171717]">{tracking.orderNumber}</p>
              </div>
              <div>
                <p className="text-[#757575]">Courier</p>
                <p className="font-semibold text-[#171717]">{tracking.courier}</p>
              </div>
              <div>
                <p className="text-[#757575]">From</p>
                <p className="font-semibold text-[#171717]">{tracking.from}</p>
              </div>
              <div>
                <p className="text-[#757575]">To</p>
                <p className="font-semibold text-[#171717]">{tracking.to}</p>
              </div>
              <div>
                <p className="text-[#757575]">Pickup</p>
                <p className="font-semibold text-[#171717]">{tracking.pickup}</p>
              </div>
              <div>
                <p className="text-[#757575]">Drop-off</p>
                <p className="font-semibold text-[#171717]">{tracking.dropoff}</p>
              </div>
              <div>
                <p className="text-[#757575]">Status</p>
                <p className="font-semibold text-[#E41F47]">{tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1)}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-[#171717] mb-3">In Delivery</h3>
              <div className="space-y-2">
                {tracking.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm text-[#171717]">{item.name}</p>
                      <p className="text-xs text-[#757575]">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#171717]">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button
                onClick={() => setShowRatingModal(true)}
                className="w-full bg-[#E41F47] hover:bg-[#c11839] text-white"
              >
                Rate This Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#FFEDF0] flex items-center justify-center">
                <Star className="w-8 h-8 text-[#E41F47]" />
              </div>
            </div>
            <DialogTitle className="text-center">Rate This Vendor</DialogTitle>
            <DialogDescription className="text-center">
              We value your experience and would love for you to leave a score (0-100%), a short review and rating on this vendor.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-[#FFA500] text-[#FFA500]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Leave a review..."
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowRatingModal(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={handleRatingSubmit}
                className="flex-1 bg-[#E41F47] hover:bg-[#c11839] text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
