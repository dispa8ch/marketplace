"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Iconex } from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VendorProductsPage() {
  const router = useRouter();
  const [products] = useState([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 25000,
      stock: 15,
      status: "active",
    },
    {
      id: "2",
      name: "Designer Handbag",
      category: "Fashion",
      price: 35000,
      stock: 8,
      status: "active",
    },
    {
      id: "3",
      name: "Smart Watch Series 5",
      category: "Electronics",
      price: 45000,
      stock: 0,
      status: "inactive",
    },
    {
      id: "4",
      name: "Organic Vegetables Pack",
      category: "Food",
      price: 5000,
      stock: 50,
      status: "active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/vendor/products/new">
            <Iconex>
              <Plus className="mr-2 h-4 w-4" />
            </Iconex>
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₦{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock === 0
                          ? "text-destructive"
                          : "text-foreground"
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "active" ? "default" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Iconex>
                          <Eye className="h-4 w-4" />
                        </Iconex>
                      </Button>
                      <Button
                        className="flex items-center justify-center"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/vendor/products/${product.id}`)
                        }
                      >
                        <Iconex>
                          <Edit className="h-4 w-4" />
                        </Iconex>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Iconex>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Iconex>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
