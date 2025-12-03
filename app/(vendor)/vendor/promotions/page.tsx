"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Eye, Plus, Table, Trash2 } from "lucide-react";
import Iconex from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function VendorPromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Simulate mock data
  const mockPromotions = [
    {
      _id: "1",
      name: "Holiday Sale",
      type: "Seasonal Discount",
      spend: 5000,
      start: "2025-12-01",
      end: "2025-12-31",
      status: "active",
    },
    {
      _id: "2",
      name: "Flash Sale",
      type: "Weekly Promo",
      spend: 3000,
      start: "2025-11-15",
      end: "2025-11-21",
      status: "inactive",
    },
  ];

  const loadPromotions = async () => {
    try {
      setIsLoading(true);
      // Simulating a successful API response
      setTimeout(() => {
        setPromotions(mockPromotions); // Simulate fetching mock data
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load promotions",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPromotions(); // This will load mock data
  }, []);

  // Handle the delete action
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promotion?")) return;

    try {
      // Simulate deleting the promotion
      setPromotions(promotions.filter((promo) => promo._id !== id));
      toast({
        title: "Success",
        description: "Promotion deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete promotion",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Promotions</h1>
        <div className="flex items-center gap-3">
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors flex items-center gap-2">
            <Iconex icon={Plus} className="h-4 w-4" />
            Create New Promotion
          </button>
        </div>
      </div>

      {/* Promotions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promotion</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading promotions...
                  </TableCell>
                </TableRow>
              ) : promotions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No promotions found. Add your first promotion!
                  </TableCell>
                </TableRow>
              ) : (
                promotions.map((promotion) => (
                  <TableRow key={promotion._id}>
                    <TableCell className="font-medium">{promotion.name}</TableCell>
                    <TableCell>{promotion.type}</TableCell>
                    <TableCell>₦{promotion.spend.toLocaleString()}</TableCell>
                    <TableCell>{promotion.start}</TableCell>
                    <TableCell>{promotion.end}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          promotion.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {promotion.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Iconex icon={Eye} className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/vendor/promotions/${promotion._id}`)
                          }
                        >
                          <Iconex icon={Edit} className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(promotion._id)}
                        >
                          <Iconex
                            icon={Trash2}
                            className="h-4 w-4 text-destructive"
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
