"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NavBar } from "@/components/marketplace/nav-bar";
import { ProductCard } from "@/components/marketplace/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramOr = (key: string, fallback = "") => {
    const v = searchParams.get(key);
    return v ?? fallback;
  };

  const initialQuery = paramOr("q", "Headphones");
  const initialCategory = paramOr("category", "Electronics");

  const parseList = (value: string | null, fallback: string[]) => {
    if (!value) return fallback;
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    parseList(searchParams.get("location"), ["Lagos, Nigeria"])
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    parseList(searchParams.get("category"), [initialCategory])
  );
  const [priceRange, setPriceRange] = useState([10000, 50000]);
  const [quantityRange, setQuantityRange] = useState([0, 0]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([
    "< 4 stars",
  ]);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Keep URL in sync with current filters (replace so back-button isn't noisy)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategories.length)
      params.set("category", selectedCategories.join(","));
    if (selectedLocations.length)
      params.set("location", selectedLocations.join(","));
    if (priceRange && (priceRange[0] !== 10000 || priceRange[1] !== 50000))
      params.set("price", `${priceRange[0]}-${priceRange[1]}`);
    if (quantityRange && (quantityRange[0] !== 0 || quantityRange[1] !== 0))
      params.set("quantity", `${quantityRange[0]}-${quantityRange[1]}`);
    if (selectedRatings.length)
      params.set("ratings", selectedRatings.join(","));
    if (verifiedOnly) params.set("verified", "1");

    router.replace(`/search?${params.toString()}`);
  }, [
    searchQuery,
    selectedCategories,
    selectedLocations,
    priceRange,
    quantityRange,
    selectedRatings,
    verifiedOnly,
    router,
  ]);

  // Handlers for pill removal
  const removeCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  const removeLocation = (loc: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l !== loc));
  };

  const clearPriceRange = () => setPriceRange([10000, 50000]);
  const clearQuantityRange = () => setQuantityRange([0, 0]);

  const removeRating = (r: string) =>
    setSelectedRatings((prev) => prev.filter((x) => x !== r));

  const toggleVerifiedOnly = () => setVerifiedOnly((v) => !v);

  const mockProducts = Array(24)
    .fill(null)
    .map((_, i) => ({
      id: `prod-${i}`,
      name: "Amazing Brand - Cool product with nice color",
      price: 60000,
      originalPrice: 128000,
      discount: 40,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 123,
      location: "No, 43 Alabaja Road",
      vendorName: "Amazing Store",
    }));

  const filtered = useMemo(() => {
    const q = (searchQuery || "").toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar (desktop) and Filter Drawer (mobile) */}
          <aside className="w-80 shrink-0 hidden sm:block">
            <div className="bg-white rounded-lg border p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Custom Filter</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                  onClick={() => {
                    // clear desktop filters
                    setSelectedCategories([]);
                    setSelectedLocations([]);
                    setPriceRange([10000, 50000]);
                    setQuantityRange([0, 0]);
                    setSelectedRatings([]);
                    setVerifiedOnly(false);
                  }}
                >
                  Clear All
                </Button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Location</h3>
                <div className="space-y-2">
                  {["Lagos, Nigeria", "Port Harcourt, Nigeria"].map(
                    (location) => (
                      <div key={location} className="flex items-center gap-2">
                        <Checkbox
                          id={location}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLocations([
                                ...selectedLocations,
                                location,
                              ]);
                            } else {
                              setSelectedLocations(
                                selectedLocations.filter((l) => l !== location)
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={location}
                          className="text-sm cursor-pointer"
                        >
                          {location}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {["Electronics", "Fashion"].map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={category}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2 mb-4">
                  {[
                    "Under 499,999",
                    "$1,000 - $15,000",
                    "More Than $15,000",
                    "Custom",
                  ].map((range) => (
                    <div key={range} className="flex items-center gap-2">
                      <Checkbox id={range} />
                      <Label htmlFor={range} className="text-sm cursor-pointer">
                        {range}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span>$10K</span>
                    <span>$50K</span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={100000}
                    step={1000}
                    className="mb-3"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Input placeholder="Min" type="number" className="mb-2" />
                  <Input placeholder="Max" type="number" />
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Ratings</h3>
                <div className="space-y-2">
                  {[
                    "Under 3 stars",
                    "2 stars - 4 stars",
                    "More Than 4 stars",
                  ].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <Checkbox
                        id={rating}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRatings([...selectedRatings, rating]);
                          } else {
                            setSelectedRatings(
                              selectedRatings.filter((r) => r !== rating)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={rating}
                        className="text-sm cursor-pointer"
                      >
                        {rating}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Reviews</h3>
                <div className="space-y-2 mb-4">
                  {["Under 100", "100-500", "More Than 500", "Custom"].map(
                    (review) => (
                      <div key={review} className="flex items-center gap-2">
                        <Checkbox id={review} />
                        <Label
                          htmlFor={review}
                          className="text-sm cursor-pointer"
                        >
                          {review}
                        </Label>
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="From" type="number" />
                  <Input placeholder="To" type="number" />
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="font-medium mb-3">Verification Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="verified"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                    />
                    <Label
                      htmlFor="verified"
                      className="text-sm cursor-pointer"
                    >
                      Verified Vendors
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="unverified" />
                    <Label
                      htmlFor="unverified"
                      className="text-sm cursor-pointer"
                    >
                      Unverified Vendors
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <Dialog
            open={mobileFiltersOpen}
            onOpenChange={(v) => setMobileFiltersOpen(v)}
          >
            <DialogContent className="fixed left-0 z-50 w-11/12 h-full max-w-xs transform data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full transition-transform p-0 m-0 bg-background border-r sm:hidden">
              <div className="p-4 overflow-auto h-full">
                <DialogHeader>
                  <DialogTitle>Custom Filter</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  {/* Mobile: ClearAll is in footer so we remove top clear button */}
                  {/* Location Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Location</h3>
                    <div className="space-y-2">
                      {["Lagos, Nigeria", "Port Harcourt, Nigeria"].map(
                        (location) => (
                          <div
                            key={location}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={location}
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedLocations([
                                    ...selectedLocations,
                                    location,
                                  ]);
                                } else {
                                  setSelectedLocations(
                                    selectedLocations.filter(
                                      (l) => l !== location
                                    )
                                  );
                                }
                              }}
                            />
                            <Label
                              htmlFor={location}
                              className="text-sm cursor-pointer"
                            >
                              {location}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {["Electronics", "Fashion"].map((category) => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category,
                                ]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (c) => c !== category
                                  )
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={category}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range, Quantity, Ratings, Reviews, Verification sections: reuse desktop markup but in mobile flow */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="space-y-2 mb-4">
                      {[
                        "Under 499,999",
                        "$1,000 - $15,000",
                        "More Than $15,000",
                        "Custom",
                      ].map((range) => (
                        <div key={range} className="flex items-center gap-2">
                          <Checkbox id={range} />
                          <Label
                            htmlFor={range}
                            className="text-sm cursor-pointer"
                          >
                            {range}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span>$10K</span>
                        <span>$50K</span>
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={100000}
                        step={1000}
                        className="mb-3"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Min" type="number" />
                        <Input placeholder="Max" type="number" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Quantity</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Input placeholder="Min" type="number" className="mb-2" />
                      <Input placeholder="Max" type="number" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Ratings</h3>
                    <div className="space-y-2">
                      {[
                        "Under 3 stars",
                        "2 stars - 4 stars",
                        "More Than 4 stars",
                      ].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <Checkbox
                            id={rating}
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRatings([
                                  ...selectedRatings,
                                  rating,
                                ]);
                              } else {
                                setSelectedRatings(
                                  selectedRatings.filter((r) => r !== rating)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={rating}
                            className="text-sm cursor-pointer"
                          >
                            {rating}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Reviews</h3>
                    <div className="space-y-2 mb-4">
                      {["Under 100", "100-500", "More Than 500", "Custom"].map(
                        (review) => (
                          <div key={review} className="flex items-center gap-2">
                            <Checkbox id={review} />
                            <Label
                              htmlFor={review}
                              className="text-sm cursor-pointer"
                            >
                              {review}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="From" type="number" />
                      <Input placeholder="To" type="number" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Verification Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="verified"
                          checked={verifiedOnly}
                          onCheckedChange={(checked) =>
                            setVerifiedOnly(!!checked)
                          }
                        />
                        <Label
                          htmlFor="verified"
                          className="text-sm cursor-pointer"
                        >
                          Verified Vendors
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="unverified" />
                        <Label
                          htmlFor="unverified"
                          className="text-sm cursor-pointer"
                        >
                          Unverified Vendors
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t fixed bottom-0 left-0 right-0 bg-background">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => {
                      // clear all filters in mobile drawer
                      setSelectedCategories([]);
                      setSelectedLocations([]);
                      setPriceRange([10000, 50000]);
                      setQuantityRange([0, 0]);
                      setSelectedRatings([]);
                      setVerifiedOnly(false);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setMobileFiltersOpen(
                        false
                      ); /* Apply state already bound */
                    }}
                  >
                    Apply Filter
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex flex-col gap-4">
                {/* Mobile filter drawer trigger */}
                <div className="sm:hidden">
                  <Button
                    variant="outline"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
                <h1 className="text-2xl font-semibold mb-2">
                  Found {filtered.length} results from this search "
                  {searchQuery}"
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {cat}
                      <button
                        onClick={() => removeCategory(cat)}
                        aria-label={`Remove category ${cat}`}
                      >
                        <X className="h-3 w-3 cursor-pointer" />
                      </button>
                    </span>
                  ))}
                  {selectedLocations.slice(0, 1).map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {loc}
                      <button
                        onClick={() => removeLocation(loc)}
                        aria-label={`Remove location ${loc}`}
                      >
                        <X className="h-3 w-3 cursor-pointer" />
                      </button>
                    </span>
                  ))}
                  {selectedLocations.length > 1 && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      +{selectedLocations.length - 1}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    $10K - $50K
                    <button
                      onClick={clearPriceRange}
                      aria-label="Clear price range"
                    >
                      <X className="h-3 w-3 cursor-pointer" />
                    </button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    20-60 pcs
                    <button
                      onClick={clearQuantityRange}
                      aria-label="Clear quantity range"
                    >
                      <X className="h-3 w-3 cursor-pointer" />
                    </button>
                  </span>
                  {selectedRatings.map((rating) => (
                    <span
                      key={rating}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {rating}
                      <button
                        onClick={() => removeRating(rating)}
                        aria-label={`Remove rating ${rating}`}
                      >
                        <X className="h-3 w-3 cursor-pointer" />
                      </button>
                    </span>
                  ))}
                  {verifiedOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                      Unverified Vendors
                      <button
                        onClick={toggleVerifiedOnly}
                        aria-label="Toggle verification filter"
                      >
                        <X className="h-3 w-3 cursor-pointer" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
