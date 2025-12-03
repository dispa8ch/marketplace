"use client";

import { useState } from "react";
import BackButton from "@/components/ui/back-button";
import { NavBar } from "@/components/marketplace/nav-bar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/product-card";
import {
  Star,
  MapPin,
  Minus,
  Plus,
  Check,
  Shield,
  ShieldCheckIcon,
  ShieldCheck,
  Mail,
  Phone,
  ShieldIcon,
} from "lucide-react";
import Iconex from "@/components/icons/iconex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { addToCart } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();
  const router = useRouter();

  const mockProduct = {
    name: "Amazing Brand - Cool product with nice color",
    price: 56.0,
    originalPrice: 124.0,
    discount: 40,
    rating: 4.5,
    reviewCount: 123,
    stock: 20,
    category: "ELECTRONICS",
    location: "Lagos, Nig",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    id: "prod-1",
    vendorId: "vendor-123",
  };

  const mockReviews = Array(2)
    .fill(null)
    .map((_, i) => ({
      id: i,
      userName: "User Name",
      email: "useremail@gmail.com",
      rating: 5,
      date: "12/09/2025 08:14:19AM",
      comment:
        "I had a positive experience with Dispa8ch; I have made a few purchases and my advise is to always check the measurements as pictures could be misleading at times, but I am a careful buyer, they have a very cl...",
      helpful: 200,
    }));

  const mockSimilarProducts = Array(3)
    .fill(null)
    .map((_, i) => ({
      id: `sim-${i}`,
      name: "Amazing Brand - Cool product with nice color",
      price: 60000,
      originalPrice: 128000,
      discount: 40,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 123,
      location: "No, 43 Alabaja Road",
      vendorName: "Amazing Brand",
    }));

  const customer = {
    id: "cust-001",
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar customer={customer} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images & Info */}
          <div className="flex-1">
            <div className="flex gap-4 mb-8">
              <div className="flex flex-col gap-2">
                {mockProduct.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt=""
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden aspect-square max-w-lg">
                <Image
                  src={mockProduct.images[0] || "/placeholder.svg"}
                  alt={mockProduct.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-background border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-6 font-medium text-[#757575] mb-4">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded">
                  {mockProduct.category}
                </span>
                <div className="flex items-center gap-1">
                  <Iconex icon={MapPin} className="mr-2 h-4 w-4" />
                  <span className="text-sm">{mockProduct.location}</span>
                </div>
              </div>

              <h1 className="text-lg font-normal mb-4">{mockProduct.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xl font-semibold">
                    ${mockProduct.price.toFixed(2)}
                  </div>
                  <div className="flex items-center text-lg text-muted-foreground line-through">
                    ${mockProduct.originalPrice.toFixed(2)}
                  </div>
                  <div className="px-2 py-1 bg-primary/14 text-primary rounded text-sm font-medium">
                    {mockProduct.discount}% Off
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Iconex
                    icon={Star}
                    className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-medium">{mockProduct.rating}/5.0</span>
                </div>
                <span className="text-muted-foreground">
                  ({mockProduct.reviewCount} Reviews)
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Iconex icon={Minus} className="mr-2 h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(mockProduct.stock, quantity + 1))
                    }
                  >
                    <Iconex icon={Plus} className="mr-2 h-4 w-4" />
                  </Button>
                </div>
                <span className="text-[#757575]">
                  Stock: {mockProduct.stock}
                </span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const itemBase = {
                    id: `cart-${Date.now()}`,
                    productId: mockProduct.id,
                    name: mockProduct.name,
                    price: mockProduct.price,
                    image: mockProduct.images[0],
                    vendorName: "Vendor",
                  };

                  let newlyAdded = false;
                  for (let i = 0; i < quantity; i++) {
                    const added = addToCart(itemBase);
                    newlyAdded = newlyAdded || added;
                  }

                  if (!newlyAdded) {
                    toast({
                      title: "Already in cart",
                      description: `${mockProduct.name} was already in your cart. Quantity updated.`,
                    });
                  } else {
                    toast({
                      title: "Added to cart",
                      description: `${mockProduct.name} x${quantity}`,
                    });
                  }
                }}
              >
                Add To Cart
              </Button>
            </div>

            {/* Tabs */}
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="bg-background border rounded-lg overflow-hidden"
            >
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="vendor"
                  className="rounded-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Vendor
                </TabsTrigger>
                <TabsTrigger
                  value="recently-viewed"
                  className="rounded-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Recently Viewed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6 rounded-md">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">DESCRIPTION:</h3>
                    <p className="text-muted-foreground">
                      Product description goes here...
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">SPECIFICATIONS</h3>
                    <p className="text-muted-foreground">
                      Product specifications go here...
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">VARIANTS</h3>
                    <p className="text-muted-foreground">
                      Product variants go here...
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-8 mb-6">
                    <div>
                      <div className="lg:text-4xl text-2xl font-semibold">
                        {mockProduct.rating}
                      </div>
                      <div className="flex items-center gap-1 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Iconex
                            icon={Star}
                            key={i}
                            className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {mockProduct.reviewCount.toLocaleString()} Reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div
                          key={stars}
                          className="flex items-center gap-2 mb-1"
                        >
                          <span className="text-sm w-4">{stars}</span>
                          <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${
                                  stars === 5 ? 80 : stars === 4 ? 15 : 5
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="lg:[w-12 h-12] w-8 h-8 bg-gray-200 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">
                                {review.userName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {review.email}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {review.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Iconex
                                icon={Star}
                                key={i}
                                className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <p className="text-white mb-3">{review.comment}</p>
                          <div className="lg:[flex items-center justify-between] block spacing-y-2">
                            <span className="text-sm text-muted-foreground">
                              {review.helpful} people found this helpful
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                Was this review helpful?
                              </span>
                              <Button variant="outline" size="sm">
                                Yes
                              </Button>
                              <Button variant="outline" size="sm">
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    See all reviews
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="vendor" className="p-6">
                <div className="space-y-6">
                  <div className="w-full flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-18 h-18 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-1">
                          <h3 className="font-semibold text-lg">
                            Vendor Shop Name
                          </h3>
                          <div className="flex items-center gap-1 bg-[#2d080f] px-1.5 py-1 rounded-md">
                            <Iconex
                              icon={ShieldCheck}
                              className="h-3 w-3 text-background fill-primary"
                            />
                            <span className="text-xs font-medium text-primary">
                              Verified
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.5/5.0</span>
                          </div>
                          <span>44 Reviews</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs px-1.5 py-1 bg-accent rounded-md text-muted-foreground">
                            Retail Store
                          </div>
                          <div className="text-xs text-muted-foreground">
                            10m on Dispa8h
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/vendor/${mockProduct.vendorId}`)
                      }
                    >
                      View Profile
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Iconex
                        icon={Mail}
                        className="h-4 w-4 text-muted-foreground"
                      />
                      <span className="text-muted-foreground">
                        vendorshopemail@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Iconex
                        icon={Phone}
                        className="h-4 w-4 text-muted-foreground"
                      />
                      <span className="text-muted-foreground">
                        +234 709 786 6890
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Iconex
                        icon={MapPin}
                        className="h-4 w-4 text-muted-foreground"
                      />
                      <span className="text-muted-foreground">
                        No, 43 Alabaja Road
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#1b0d02] border border-yellow-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Iconex icon={ShieldIcon} className="fill-yellow-600 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-600">
                        Safety Tips
                      </h4>
                    </div>

                    <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
                      <li>Avoid sending any payments outside of Dispa8ch</li>
                      <li>Meet the dispatch rider at a safe public space</li>
                      <li>
                        Inspect what you're going to buy to make sure it's what
                        you need
                      </li>
                      <li>
                        Provide delivery codes at the point of collection for
                        confirmation.
                      </li>
                    </ol>
                  </div>

                  <div className="bg-accent rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Iconex
                        icon={MapPin}
                        className="h-12 w-12 stroke-1 text-accent fill-[#757575] mx-auto mb-2"
                      />
                      <div className="font-semibold">Deluxe Plaza</div>
                      <div className="text-sm text-muted-foreground">
                        No, 43 Alabaja Road, Lagos Nig.
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recently-viewed" className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {mockSimilarProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Similar Products Sidebar (becomes full-width under main content on mobile) */}
          <div className="w-full lg:w-80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Similar Products</h2>
              <Button variant="link" className="text-primary p-0">
                See More
              </Button>
            </div>
            <div className="flex flex-col space-y-4">
              {mockSimilarProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
