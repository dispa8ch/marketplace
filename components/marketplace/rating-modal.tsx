'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Iconex } from '@/components/icons/iconex'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface RatingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorName: string
  orderId: string
}

export function RatingModal({ open, onOpenChange, vendorName, orderId }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const { toast } = useToast()

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      })
      return
    }

    // Here you would send the rating to your API
    console.log('[v0] Submitting rating:', { rating, review, orderId, vendorName })

    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been submitted successfully.",
    })

    onOpenChange(false)
    setRating(0)
    setReview('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#FFEDF0] flex items-center justify-center">
                <Iconex as={Star} className="w-8 h-8 text-[#E41F47]" />
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
                <Iconex
                  as={Star}
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-[#FFA500] text-[#FFA500]'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Review Text */}
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
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#E41F47] hover:bg-[#c11839] text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
