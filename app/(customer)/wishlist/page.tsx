'use client'

import { NavBar } from '@/components/marketplace/nav-bar'
import { ProductCard } from '@/components/marketplace/product-card'
import { ChevronLeft } from 'lucide-react'
import Iconex from '@/components/icons/iconex'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Protected from '@/components/auth/protected'

export default function WishlistPage() {
  const likedProducts = Array(8).fill(null).map((_, i) => ({
    id: `liked-${i}`,
    name: 'Amazing Brand - Cool product with nice color',
    price: 60000,
    originalPrice: 128000,
    discount: 40,
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.5,
    reviews: 123,
    location: 'No, 43 Alabaja Road',
    vendorName: 'Amazing Brand'
  }))

  const customer = {
    id: 'cust-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  return (
    <Protected>
      <div className="min-h-screen bg-background">
        <NavBar customer={customer} />

        <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
            <Iconex icon={ChevronLeft} className="h-5 w-5 text-red-500"/>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Liked Product</h1>
            <p className="text-gray-600">You've liked {likedProducts.length} items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        </div>
      </div>
    </Protected>
  )
}
