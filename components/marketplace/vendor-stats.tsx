"use client"

import { useState } from 'react'
import { Users, Package, Star } from 'lucide-react'
import FollowButton from './follow-button'

type Props = {
  vendorId: string
  initialFollowers: number
  productCount: number
  rating: number | string
}

export default function VendorStats({ vendorId, initialFollowers, productCount, rating }: Props) {
  const [followers, setFollowers] = useState(initialFollowers)

  return (
    <div className="grid grid-cols-3 gap-6 mb-4">
      <div>
        <div className="flex items-center gap-2 text-[#757575]">
          <Users className="w-4 h-4" />
          <span className="text-sm">Followers</span>
        </div>
        <p className="text-lg font-bold text-[#171717] mt-1">{followers.toLocaleString()}</p>
        <div className="mt-3">
          <FollowButton vendorId={vendorId} initialFollowed={false} onChange={(followed) => setFollowers((f) => followed ? f + 1 : Math.max(0, f - 1))} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-[#757575]">
          <Package className="w-4 h-4" />
          <span className="text-sm">Products</span>
        </div>
        <p className="text-lg font-bold text-[#171717] mt-1">{productCount}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-[#757575]">
          <Star className="w-4 h-4" />
          <span className="text-sm">Rating</span>
        </div>
        <p className="text-lg font-bold text-[#171717] mt-1">{rating}</p>
      </div>
    </div>
  )
}
