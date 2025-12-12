"use client";

import { Package, Shirt, Gamepad2, Laptop, Heart, Sofa } from "lucide-react";
import { NavBar } from "@/components/marketplace/nav-bar";
import { ProductCard } from "@/components/marketplace/product-card";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import productsData from "@/data/seed/products.json";
import shopsData from "@/data/seed/shops.json";
import { useEffect, useState } from "react";
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Customer } from "@/components/marketplace/nav-bar";

const categories = [
  { name: "Toys & Hobby", icon: Package, slug: "toys-hobby" },
  { name: "Gaming", icon: Gamepad2, slug: "gaming" },
  { name: "Electronics", icon: Laptop, slug: "electronics" },
  { name: "Health & Beauty", icon: Heart, slug: "health-beauty" },
  { name: "Furniture", icon: Sofa, slug: "furniture" },
  { name: "Fashion", icon: Shirt, slug: "fashion" },
];

export default function HomePage() {
  const featuredProducts = productsData.filter((p) => p.featured).slice(0, 6);
  const allProducts = productsData.slice(0, 18);
  const verifiedShops = shopsData.filter((s) => s.verified).slice(0, 7);
  const supabase = getSupabaseClient();

  const [customer, setCustomer] = useState<Customer | null>(null);

  // Fetch the current user’s profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Check localStorage first for a cached profile
      const stored = localStorage.getItem("dispa8ch_customer");
      if (stored) {
        setCustomer(JSON.parse(stored));
        return;
      }

      // Otherwise, get the session and fetch from database
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from("users")
          .select("id, name, email, phone, role")
          .eq("id", session.user.id)
          .single();
        if (!error && data) {
          setCustomer(data);
          localStorage.setItem("dispa8ch_customer", JSON.stringify(data));
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Optional loading state while fetching
  if (!customer) {
    return <p>Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar customer={customer} />
      <main className="container mx-auto px-4 py-6 space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="md:col-span-2 bg-linear-to-r from-primary/10 to-accent overflow-hidden">
            <CardContent className="p-8 flex flex-col justify-center min-h-60">
              <h2 className="text-3xl font-bold mb-2">Today&apos;s Promos</h2>
              <p className="text-muted-foreground mb-4">
                Get the best offers from vendors around the world
              </p>
              <Button className="w-fit">Shop Now</Button>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-linear-to-br from-primary/5 to-accent/50">
              <CardContent className="p-6 flex items-center justify-center min-h-28">
                <div className="text-center">
                  <p className="font-bold text-lg">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Same day delivery
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-linear-to-br from-accent/50 to-primary/5">
              <CardContent className="p-6 flex items-center justify-center min-h-28">
                <div className="text-center">
                  <p className="font-bold text-lg">Secure Payments</p>
                  <p className="text-xs text-muted-foreground">
                    100% protected
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4">Popular Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={`/categories/${category.slug}`}>
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                      <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium text-xs text-center">
                        {category.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Flash Sale Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-medium">Flash Sale</h2>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Ends In</span>
                <span className="font-bold text-primary">01:17:56</span>
              </div>
            </div>
            <Link href="/flash-sale">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
              >
                See More
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.original_price}
                discount={product.discount_percentage}
                image={product.images[0]}
                vendorName={product.shop_name}
                location={product.location.address}
                rating={product.rating}
                reviews={product.total_reviews}
              />
            ))}
          </div>
        </section>

        {/* Verified Stores */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Verified Stores</h2>
            <Link href="/shops">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
              >
                See More
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {verifiedShops.map((shop) => (
              <VendorCard
                key={shop.id}
                id={shop.id}
                name={shop.name}
                location={`${shop.location.state} | ${shop.location.country}`}
                rating={shop.rating}
                reviews={shop.total_customers}
                type={shop.type}
                verified={shop.verified}
              />
            ))}
          </div>
        </section>

        {/* Products You May Like */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Products You May Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.original_price}
                discount={product.discount_percentage}
                image={product.images[0]}
                vendorName={product.shop_name}
                location={product.location.address}
                rating={product.rating}
                reviews={product.total_reviews}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">dispa8ch</h3>
              <p className="text-sm text-muted-foreground">
                Shop from trusted local businesses near you. Discover, order,
                and get your items delivered seamlessly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/career" className="hover:text-primary">
                    Career
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/payment" className="hover:text-primary">
                    Payment Methods
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="hover:text-primary">
                    Track Buyer Orders
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-primary">
                    Returns & Refunds
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Vendor</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/vendor/start" className="hover:text-primary">
                    How to Start Selling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vendor/commission"
                    className="hover:text-primary"
                  >
                    Commission Structure
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/dashboard" className="hover:text-primary">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>©2025 All rights reserved. Terms and Conditions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
