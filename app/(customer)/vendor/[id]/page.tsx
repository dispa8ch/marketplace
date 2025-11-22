import Image from "next/image"
import { MapPin, Phone, Mail, Star, MessageSquare } from "lucide-react"
import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import VendorStats from "@/components/marketplace/vendor-stats"
import { ProductCard } from "@/components/marketplace/product-card"
import { Badge } from "@/components/ui/badge"
import { ReportVendorModal } from "@/components/marketplace/report-vendor-modal"
import VendorInfoModal from "@/components/marketplace/vendor-info-modal"

export default async function VendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Mock vendor data - replace with actual API call
  const vendor = {
    id,
    name: "Vendor Shop Name",
    email: "vendorshopemail@gmail.com",
    phone: "+234 709 786 6890",
    address: "No, 43 Alabaja Road, Lagos Nig.",
    type: "Retail Store",
    verified: true,
    rating: 4.5,
    reviewCount: 44,
    timeOnPlatform: "10m on Dispa8ch",
    followers: 1234,
    productCount: 156,
    banner: "/placeholder.svg?height=300&width=1200",
    avatar: "/generic-vendor-logo.png",
  }

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: `${i + 1}`,
    name: "Amazing Brand - Cool product with nice color",
    price: 60000,
    originalPrice: 128000,
    discount: 40,
    image: "/diverse-products-still-life.png",
    rating: 4.5,
    reviews: 123,
    location: "No, 43 Alabaja Road",
    vendorName: vendor.name,
  }))

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Vendor Banner */}
      <div className="relative h-60 w-full bg-gray-200">
        <Image src={vendor.banner || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
      </div>

      {/* Vendor Profile Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-8">
          <div className="mb-4">
            <BackButton />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={vendor.avatar || "/placeholder.svg"}
                    alt={vendor.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                {vendor.verified && (
                  <Badge className="absolute -top-2 -right-2 bg-[#E41F47] text-white">Verified</Badge>
                )}
              </div>

              {/* Vendor Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-[#171717] mb-1">{vendor.name}</h1>
                    <p className="text-sm text-[#757575] mb-3">{vendor.type}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                        <span className="text-sm font-semibold text-[#171717]">{vendor.rating}/5.0</span>
                        <span className="text-sm text-[#757575]">({vendor.reviewCount} Reviews)</span>
                      </div>
                      <span className="text-sm text-[#757575]">{vendor.timeOnPlatform}</span>
                    </div>

                    {/* Vendor stats & follow (client) */}
                    <VendorStats
                      vendorId={vendor.id}
                      initialFollowers={vendor.followers}
                      productCount={vendor.productCount}
                      rating={vendor.rating}
                    />

                    <div className="space-y-2 hidden">
                      <a
                        href={`mailto:${vendor.email}`}
                        className="flex items-center gap-2 text-sm text-[#757575] hover:text-[#E41F47]"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{vendor.email}</span>
                      </a>
                      <a
                        href={`tel:${vendor.phone}`}
                        className="flex items-center gap-2 text-sm text-[#757575] hover:text-[#E41F47]"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{vendor.phone}</span>
                      </a>
                      <button className="flex items-center gap-2 text-sm text-[#757575] hover:text-[#E41F47]">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.address}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://wa.me/${vendor.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi " + vendor.name + ", I have a question about your products.")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="bg-[#25D366] hover:bg-[#1da851] text-white hidden">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </a>
                    <VendorInfoModal vendor={vendor} />
                    <ReportVendorModal vendor={vendor} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-[#FFEDF0] border border-[#E41F47]/20 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-[#171717] mb-3">Safety Tips</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[#757575]">
            <li>Avoid sending any payments outside of Dispa8ch</li>
            <li>Meet the dispatch rider at a safe public space</li>
            <li>Inspect what you're going to buy to make sure it's what you need</li>
            <li>Provide delivery codes at the point of collection for confirmation.</li>
          </ol>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#171717] mb-6">Products from this vendor</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
