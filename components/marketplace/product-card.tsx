import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendorName: string;
  location: string;
  rating?: number;
  reviews?: number;
  discount?: number;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  vendorName,
  location,
  rating = 4.5,
  reviews = 123,
  discount,
}: ProductCardProps) {
  const content = (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative aspect-square bg-muted">
        <Image
          src={image || "/placeholder.svg?height=300&width=300"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <CardContent className="p-3 space-y-2">
        <p className="text-xs text-muted-foreground">{vendorName}</p>
        <h3 className="font-medium text-sm line-clamp-2 leading-tight">{name}</h3>
        <div className="gap-4">
          <span className="text-base font-bold text-primary">₦{price.toLocaleString()}</span>
          <div className="flex items-center gap-2">
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₦{originalPrice.toLocaleString()}</span>
            )}
            {discount && (
              <Badge className="top-2 left-2 text-[10px] bg-accent text-primary">{discount}% Off</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span className="text-xs font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">| {reviews} Reviews</span>
        </div>
      </CardContent>
    </Card>
  )

  // If id present wrap in Link, otherwise render the content without a link to avoid runtime errors
  if (id) {
    return (
      <Link href={`/product/${id}`}>
        {content}
      </Link>
    )
  }
  if (process.env.NODE_ENV !== 'production') {
    // help developers find data issues during development
    // eslint-disable-next-line no-console
    console.warn('[ProductCard] missing id for product:', { name, vendorName })
  }

  return content
}
