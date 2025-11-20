import Link from 'next/link'
import { ProductCard } from '@/components/marketplace/product-card'
import { VendorCard } from '@/components/marketplace/vendor-card'
import products from '@/data/seed/products.json'
import shops from '@/data/seed/shops.json'

export default function CategoryPage(props: any) {
  const { params } = props as { params: { slug: string } }
  const { slug } = params

  // Map slug to a human-friendly category name by matching seed data
  const categoryName = slug.replace('-', ' ')

  const matchedProducts = (products as any[]).filter((p) =>
    (p.categories || []).some((c: string) => c.toLowerCase().replace(/\s+/g, '-') === slug)
  )

  const matchedShops = (shops as any[]).filter((s) =>
    (s.categories || []).some((c: string) => c.toLowerCase().replace(/\s+/g, '-') === slug)
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Category: {categoryName}</h1>
          <p className="text-gray-600">Showing products and shops for {categoryName}</p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {matchedProducts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  image={p.image}
                  vendorName={p.vendorName || 'Vendor'}
                  location={p.location || 'Unknown'}
                  rating={p.rating}
                  reviews={p.reviews}
                  discount={p.discount}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No products found for this category.</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Shops</h2>
          {matchedShops.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedShops.map((s) => (
                <VendorCard
                  key={s.id}
                  id={s.id}
                  name={s.name}
                  logo={s.logo}
                  location={s.location?.address || `${s.location?.lga}, ${s.location?.state}`}
                  rating={s.rating}
                  reviews={s.total_customers}
                  type={s.type}
                  verified={s.verified}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No shops found for this category.</p>
          )}
        </section>
      </div>
    </div>
  )
}
