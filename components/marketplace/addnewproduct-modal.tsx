"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { PlusSquare, Upload, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api/vendor";
import { useToast } from "@/hooks/use-toast";

export function NewProductDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    weight: "",
    weightValue: "",
    productType: "",
    status: "",
    sizeText: "",
    sizeNumber: "",
    color: "",
    colorName: "",
  });

  const [images, setImages] = useState<File[]>([]); // Store uploaded images

  // Handle image upload and limit to 5
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files ? Array.from(e.target.files) : [];
    if (selectedImages.length + images.length > 5) {
      toast({
        title: "Image limit reached",
        description: "You can only upload up to 5 images.",
        variant: "destructive",
      });
      // Only show the first 5 images
      const newImages = selectedImages.slice(0, 5 - images.length);
      setImages((prevImages) => [...prevImages, ...newImages]);
      return;
    }
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        images: images.map((img) => img.name), // Storing image names for now
      });

      toast({
        title: "Product created",
        description: "Your product has been added successfully",
      });

      router.push("/vendor/products");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 sm:max-w-[800px] max-h-[95vh] overflow-y-auto bg-background p-6 right-0">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Here you can manage your selling preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 lg:gap-2 w-full">
          <div className="max-w-2xl space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₦)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description">Product Type</Label>
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p className="text-sm font-light">Single Product</p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p className="text-sm font-light">Product with Variants</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Weight</Label>

                <div className="flex items-center gap-1">
                  <Select
                    value={formData.weight}
                    onValueChange={(value) => setFormData({ ...formData, weight: value })}
                  >
                    <SelectTrigger className="w-1/4">
                      <SelectValue placeholder="KG" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="lb">LB</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.weightValue}
                    onChange={(e) => setFormData({ ...formData, weightValue: e.target.value })}
                    className="w-3/4"
                    required
                  />
                </div>
              </div>

              <span className="text-lg sm:text-xl mt-6 mb-6">Variants</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <Label htmlFor="category">Size Number</Label>
                    <p className="text-sm text-muted-foreground">(Optional)</p>
                  </div>
                  <Input
                    id="size"
                    type="number"
                    placeholder="0"
                    value={formData.sizeNumber}
                    onChange={(e) => setFormData({ ...formData, sizeNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <Label htmlFor="category">Size Text</Label>
                    <p className="text-sm text-muted-foreground">(Optional)</p>
                  </div>

                  <Select
                    value={formData.sizeText}
                    onValueChange={(value) => setFormData({ ...formData, sizeText: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Small (sm)</SelectItem>
                      <SelectItem value="fashion">Large (lg)</SelectItem>
                      <SelectItem value="food">Extralarge (xl)</SelectItem>
                      <SelectItem value="home">
                        Extra Extralarge (xxl)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <Label htmlFor="category">Color</Label>
                  <p className="text-sm text-muted-foreground">(Optional)</p>
                </div>

                <div className="flex items-center gap-1">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-10 px-2"
                    required
                  />

                  <Input
                    id="color"
                    placeholder="e.g. Black"
                    value={formData.colorName}
                    onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="button" variant="ghost">
                <PlusSquare />
                Add another variant
              </Button>
            </form>
          </div>

          {/* Image Upload Section */}
          <div className="">
            <div className="flex flex-col p-4 m-4 items-center justify-center gap-4 h-[200px] rounded-md bg-accent border-[1.5px] border-dashed border-primary">
              <Upload />

              <div className="flex flex-col items-center gap-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-2 py-2 bg-background border-2 border-input text-xs text-muted-foreground rounded-md"
                  multiple
                  disabled={images.length >= 5}
                />
                <p className="text-[10px] text-muted-foreground">
                  PDF, JPG or PNG (Max 5MB)
                </p>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <div key={index} className="relative w-16 h-16">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <Button
                    onClick={() => removeImage(index)}
                    variant="destructive"
                    className="absolute top-0 right-0 text-white p-1 w-4 h-6"
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
