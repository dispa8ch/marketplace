"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, MapPin, User, Phone, Mail } from "lucide-react";
import { getOrder, updateOrderStatus, type Order } from "@/lib/api/vendor";
import { useToast } from "@/hooks/use-toast";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrder(params.id as string);
        setOrder(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load order details",
          variant: "destructive",
        });
        router.push("/vendor/orders");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadOrder();
    }
  }, [params.id, router, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "assigned":
        return "secondary";
      case "in_transit":
        return "default";
      case "delivered":
        return "default";
      default:
        return "secondary";
    }
  };

  if (isLoading || !order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-muted-foreground">Order #{order._id}</p>
        </div>
        <Badge variant={getStatusColor(order.status)}>
          {order.status.replace("_", " ")}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{order.customer?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="font-medium">{order.customer?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </p>
              <p className="font-medium">{order.customer?.phone || "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{order.address?.street}</p>
              <p className="text-muted-foreground">
                {order.address?.lga}, {order.address?.state}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={item.productId || index}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Update Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {["processing", "ready_for_pickup", "completed"].map((status) => (
              <Button
                key={status}
                variant="outline"
                onClick={async () => {
                  try {
                    await updateOrderStatus(order._id, status);
                    toast({ title: "Status updated" });
                    setOrder({ ...order, status });
                  } catch (e) {
                    toast({
                      title: "Failed to update",
                      variant: "destructive",
                    });
                  }
                }}
                disabled={order.status === status}
              >
                Mark as {status.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
