import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ShieldBan, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VendorCardProps {
  id: string;
  name: string;
  logo?: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
  verified?: boolean;
}

export function VendorCard({
  id,
  name,
  logo,
  location,
  rating,
  reviews,
  type,
  verified = true,
}: VendorCardProps) {
  return (
    <Link href={`/vendor/${id}`}>
      <Card className="hover:border-primary transition-colors cursor-pointer">
          <div className="h-16 w-16 rounded-lg bg-muted shrink-0 relative overflow-hidden flex items-center justify-center">
            {logo ? (
              <Image
                src={logo || "/placeholder.svg"}
                alt={name}
                fill
                className="object-contain"
                style={{ objectPosition: 'center' }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-primary">
                <div className="w-full h-full flex items-center justify-center bg-muted">{name[0]}</div>
              </div>
            )}
          </div>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium line-clamp-1">{name}</h3>
                {verified && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-primary text-white"
                  >
                    <ShieldCheck className="fill-white text-primary" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{type}</p>
              <div className="flex items-center gap-1 text-xs mt-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">
                  | {reviews} Customers
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
