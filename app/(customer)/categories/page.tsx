'use client'

 import { NavBar } from '@/components/marketplace/nav-bar'
 import { ProductCard } from '@/components/marketplace/product-card'
 import Link from 'next/link'
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
 import { Button } from '@/components/ui/button'

 export default function CategoriesPage() {
  const subcategories = [
    'Computers', 'Refrigerators', 'Gaming Items', 'Sound and mic', 'Sub category',
    'Sub-category', 'Clothings', 'Sport and Tennis'
  ]

  const shops = [
    { id: 'shop-1', name: 'ElectroMart', count: 124 },
    { id: 'shop-2', name: 'Home Goods', count: 52 },
    { id: 'shop-3', name: 'Gadget World', count: 28 },
    { id: 'shop-4', name: 'Mobile Hub', count: 11 },
  ]

  const products = Array(12)
    .fill(null)
    .map((_, i) => ({
      id: `prod-${i}`,
      name: 'Great Product Name Goes Here but This is Just a Demo Text',
      price: Number((Math.random() * 200 + 10).toFixed(2)),
      image: '/placeholder.jpg',
      rating: 4.5,
      reviews: 32,
      location: 'New York, Manhattan',
      vendorName: 'Sample Vendor',
    }))

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Category name</h1>
        <div className="bg-white border rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Shops selling in this category</h3>
          <div className="flex gap-4 overflow-x-auto py-2">
            {shops.map((shop) => (
              <div key={shop.id} className="min-w-[160px] p-3 bg-gray-50 border rounded-lg">
                <div className="font-medium">{shop.name}</div>
                <div className="text-sm text-muted-foreground">{shop.count} products</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategory chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          {subcategories.map((s) => (
            <button key={s} className="px-4 py-2 rounded-full bg-white border text-sm hover:shadow-sm">{s}</button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
          <div className="flex gap-3 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="Category"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="Model"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40"><SelectValue placeholder="Color"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex justify-end">
            <Button variant="outline">Clear filter</Button>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={Number(p.price)} image={p.image} rating={p.rating} reviews={p.reviews} location={p.location} vendorName={p.vendorName} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-600">Showing 1–16 of 200 results</div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Prev</Button>
            <div className="inline-flex items-center gap-1">
              <Button>1</Button>
              <Button variant="ghost">2</Button>
              <Button variant="ghost">3</Button>
            </div>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
