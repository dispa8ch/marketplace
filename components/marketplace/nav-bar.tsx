"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
  User,
  Wallet,
  Package,
  Settings,
  LogOut,
  X,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";
import SearchModal from "@/components/marketplace/search-modal";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import LogoutModal from "@/components/ui/logout-modal";
import LocationModal from "./location-modal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NewProductDialog } from "./addnewproduct-modal";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orders?: number;
  totalSpent?: number;
  joinDate?: string;
  status?: string;
}

interface CustomerProps {
  customer: Customer;
}

export function NavBar({ customer }: CustomerProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [newproductDialogOpen, setNewProductDialogOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const router = useRouter();

  useEffect(() => {
    // Load from localStorage
    const cart = JSON.parse(localStorage.getItem("dispa8ch_cart") || "[]");
    const likes = JSON.parse(localStorage.getItem("dispa8ch_likes") || "[]");
    setCartCount(cart.length);
    setLikesCount(likes.length);
  }, []);

  // Small in-file mock dataset for suggestions (client-only)
  const MOCK_SUGGESTIONS = [
    {
      id: "p-1",
      type: "product",
      title: "Wireless Headphones",
      subtitle: "Electronics",
      href: "/product/p-1",
      image: "/modern-smartwatch.png",
    },
    {
      id: "p-2",
      type: "product",
      title: "Stylish Leather Handbag",
      subtitle: "Fashion",
      href: "/product/p-2",
      image: "/stylish-leather-handbag.png",
    },
    {
      id: "p-3",
      type: "product",
      title: "Modern Smartwatch",
      subtitle: "Electronics",
      href: "/product/p-3",
      image: "/modern-smartwatch.png",
    },
    {
      id: "v-1",
      type: "vendor",
      title: "Green Grocers",
      subtitle: "Groceries",
      href: "/vendor/v-1",
    },
    {
      id: "v-2",
      type: "vendor",
      title: "Gifty's Boutique",
      subtitle: "Fashion",
      href: "/vendor/v-2",
    },
    {
      id: "p-4",
      type: "product",
      title: "Stylish Leather Belt",
      subtitle: "Fashion",
      href: "/product/p-4",
      image: "/assorted-vegetables.png",
    },
  ];

  const [liveSuggestions, setLiveSuggestions] = useState<any[] | null>(null);

  // Debounce searchTerm updates for suggestions
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm), 220);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filteredSuggestions = debouncedTerm
    ? liveSuggestions && liveSuggestions.length > 0
      ? liveSuggestions
      : MOCK_SUGGESTIONS.filter((s) => {
          const q = debouncedTerm.toLowerCase();
          return (
            s.title.toLowerCase().includes(q) ||
            s.subtitle.toLowerCase().includes(q)
          );
        }).slice(0, 6)
    : [];

  // Fetch live suggestions from API when debouncedTerm changes
  useEffect(() => {
    let mounted = true;
    if (!debouncedTerm) {
      setLiveSuggestions(null);
      return;
    }

    (async () => {
      try {
        const params = new URLSearchParams();
        params.set("search", debouncedTerm);
        params.set("limit", "6");
        const res = await apiClient.get(`/api/products?${params.toString()}`);
        // Map products to suggestion shape
        const items = (res.products || []).map((p: any) => ({
          id: p._id,
          type: "product",
          title: p.name,
          subtitle: p.category || "",
          href: `/product/${p._id}`,
          image: p.images && p.images[0],
        }));
        if (mounted) setLiveSuggestions(items);
      } catch (e) {
        // API may not be available in dev environment; ignore and rely on mock
        if (mounted) setLiveSuggestions([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [debouncedTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Reset highlight when suggestions change
  useEffect(() => {
    setHighlightIndex(filteredSuggestions.length > 0 ? 0 : -1);
  }, [filteredSuggestions.length]);

  return (
    <>
      <div className="bg-accent border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-foreground">
                Call us: <span className="font-medium">+234 903 667 1929</span>
              </span>
            </div>
            <div className="flex gap-6">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-muted-foreground">
                  Take 30% off when you spend 4,000 or more with code
                  &quot;FINDR&quot;
                </span>
                <button className="text-primary hover:underline text-sm font-medium">
                  More details
                </button>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/about"
                  className="hidden lg:inline text-sm text-secondary hover:text-foreground"
                >
                  About
                </Link>
                <Link
                  href="/help"
                  className="hidden lg:inline text-sm text-secondary hover:text-foreground"
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
        <div className="w-full container lg:px-0 px-2 mx-auto">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo (icon only on mobile) - single instance */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-icon.svg"
                alt="dispa8ch"
                width={16}
                height={16}
                className="lg:[w-0 h-0] w-7 h-7"
              />
              <span className="font-semibold text-lg hidden sm:inline">
                Dispa8ch
              </span>
            </Link>

            {/* Middle/Right grouping: categories dropdown + search (icon on mobile) + account */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Categories dropdown: visible on all sizes (compact on mobile) */}
              <div className="mr-2">
                <Select
                  value={selectedCategory}
                  onValueChange={(v) => setSelectedCategory(v)}
                >
                  <SelectTrigger className="lg:w-38 w-24">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="health">Health & Beauty</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="toys">Toys & Hobby</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Unified search: icon-only trigger on mobile, full input on desktop. Uses a single form and suggestion handling. */}
              <div className="flex-1 min-w-0">
                <form
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = searchTerm.trim();
                    if (!q) return;
                    const params = new URLSearchParams();
                    params.set("q", q);
                    if (selectedCategory && selectedCategory !== "all")
                      params.set("category", selectedCategory);
                    router.push(`/search?${params.toString()}`);
                  }}
                >
                  {/* Mobile: show icon-only button that opens SearchModal */}
                  <div className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchModalOpen(true)}
                      aria-label="Open search"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Desktop: full input */}
                  <div className="hidden sm:block">
                    <Search
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                    <Input
                      aria-label="Search products or vendors"
                      type="search"
                      placeholder="Search..."
                      className="w-[520px] pl-10 pr-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={(e) => {
                        if (!showSuggestions) return;
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setHighlightIndex((i) =>
                            Math.min(i + 1, filteredSuggestions.length - 1)
                          );
                          return;
                        }
                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setHighlightIndex((i) => Math.max(i - 1, 0));
                          return;
                        }
                        if (e.key === "Enter") {
                          if (
                            highlightIndex >= 0 &&
                            highlightIndex < filteredSuggestions.length
                          ) {
                            e.preventDefault();
                            const s = filteredSuggestions[highlightIndex];
                            setShowSuggestions(false);
                            router.push(s.href);
                          }
                        }
                        if (e.key === "Escape") {
                          setShowSuggestions(false);
                        }
                      }}
                    />

                    {/* Clear button for desktop input */}
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    {/* Suggestions dropdown - accessible */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                      <div
                        ref={suggestionsRef}
                        role="listbox"
                        aria-label="Search suggestions"
                        className="absolute left-0 right-0 mt-1 bg-card border rounded shadow z-50 max-h-64 overflow-auto"
                      >
                        {filteredSuggestions.map((s, idx) => (
                          <button
                            key={s.id}
                            role="option"
                            aria-selected={idx === highlightIndex}
                            onMouseDown={(ev) => ev.preventDefault()}
                            onClick={() => {
                              setShowSuggestions(false);
                              router.push(s.href);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-accent/50 flex items-center gap-3 ${
                              idx === highlightIndex ? "bg-accent/60" : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {s.image ? (
                                <div className="h-10 w-10 shrink-0 rounded overflow-hidden bg-muted">
                                  <Image
                                    src={s.image}
                                    alt={s.title}
                                    width={40}
                                    height={40}
                                  />
                                </div>
                              ) : (
                                <div className="h-10 w-10 shrink-0 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                  {s.type === "vendor" ? "V" : "P"}
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {s.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {s.subtitle} • {s.type}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                        <div className="border-t px-2 py-2">
                          <button
                            onClick={() => {
                              setShowSuggestions(false);
                              const params = new URLSearchParams();
                              params.set("q", searchTerm.trim());
                              if (
                                selectedCategory &&
                                selectedCategory !== "all"
                              )
                                params.set("category", selectedCategory);
                              router.push(`/search?${params.toString()}`);
                            }}
                            className="w-full text-left text-sm text-primary"
                          >
                            See more results for "{searchTerm}" →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hidden input element for mobile spacing; actual mobile search opens modal */}
                  <div className="sm:hidden">
                    <Input
                      aria-hidden
                      placeholder="Search..."
                      className="pl-10 pr-8"
                      readOnly
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* On small screens we hide wishlist/cart icons; they appear inside account dropdown */}
              <div className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                    {likesCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                        {likesCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  asChild
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${customer.email}`}
                        />
                        <AvatarFallback className="text-md bg-primary/10 text-primary">
                          {(customer?.name ?? "??")
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Replace arrow with counts on small screens */}
                    <div className="hidden sm:inline">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div className="sm:hidden">
                      <div className="flex items-center gap-2">
                        {likesCount > 0 && (
                          <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                            {likesCount}
                          </Badge>
                        )}
                        {cartCount > 0 && (
                          <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                            {cartCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="flex items-center gap-3 px-3 py-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${customer.email}`}
                      />
                      <AvatarFallback className="text-xl bg-primary/10 text-primary">
                        {(customer?.name ?? "??").substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* <div className="w-12 h-12 bg-gray-200 rounded-full" /> */}
                    <div className="flex-1">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {/* Wishlist & Cart as menu items with counts for mobile users */}
                  <DropdownMenuItem asChild className="lg:hidden">
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2 group"
                    >
                      <Heart className="h-4 w-4 group-hover:text-foreground" />
                      <span>Wishlist</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {likesCount}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="lg:hidden">
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 group"
                    >
                      <ShoppingCart className="h-4 w-4 group-hover:text-foreground" />
                      <span>Cart</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {cartCount}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="lg:hidden" />
                  <DropdownMenuItem onClick={() => setNewProductDialogOpen(true)}>
                    <ShoppingCart className="h-4 w-4 group-hover:text-foreground" />
                    <span>Sell</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings/wallet"
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Wallet className="h-4 w-4 group-hover:text-foreground" />
                      <span>Wallet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings/orders"
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Package className="h-4 w-4 group-hover:text-foreground" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Settings className="h-4 w-4 group-hover:text-foreground" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setIsLocationOpen(true);
                    }}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <MapPin className="h-4 w-4 group-hover:text-foreground" />
                    <span>Location</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive flex items-center gap-2 cursor-pointer group"
                    onClick={() => setLogoutOpen(true)}
                  >
                    <LogOut className="h-4 w-4 text-destructive group-hover:text-foreground" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <LogoutModal open={logoutOpen} onOpenChange={setLogoutOpen} />
              <LocationModal
                open={isLocationOpen}
                onOpenChange={setIsLocationOpen}
              />
            </div>
          </div>
        </div>
      </header>
      <SearchModal
        open={searchModalOpen}
        onOpenChange={setSearchModalOpen}
        initialQuery={searchTerm}
        initialCategory={selectedCategory}
      />
      <NewProductDialog
        open={newproductDialogOpen}
        onOpenChange={setNewProductDialogOpen}
      />
    </>
  );
}
