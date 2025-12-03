import { NavBar } from "@/components/marketplace/nav-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Package, Truck, Shield, Headphones } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  const categories = [
    { name: "Electronics", icon: "📱", href: "/categories/electronics" },
    { name: "Fashion", icon: "👗", href: "/categories/fashion" },
    { name: "Groceries", icon: "🛒", href: "/categories/groceries" },
    { name: "Health & Beauty", icon: "💄", href: "/categories/health" },
    { name: "Furniture", icon: "🛋️", href: "/categories/furniture" },
    { name: "Gaming", icon: "🎮", href: "/categories/gaming" },
    { name: "Toys & Hobby", icon: "🧸", href: "/categories/toys" },
    { name: "Sports", icon: "⚽", href: "/categories/sports" },
  ]

  const features = [
    {
      icon: Package,
      title: "Wide Selection",
      description: "Thousands of products from trusted local vendors",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and reliably",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Shop with confidence using our secure payment system",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our customer support team is always here to help",
    },
  ]

  const customer = {
    id: "cust_123456",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 800 333 3333",
    orders: 12,
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar customer={customer} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
              Shop from trusted local businesses near you
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Discover, order, and get your items delivered seamlessly from trusted local vendors
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/search">
                  Start Shopping <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/vendor">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <span className="text-4xl">{category.icon}</span>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Dispa8ch?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers today</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
