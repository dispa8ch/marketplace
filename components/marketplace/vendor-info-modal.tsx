"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Phone, Mail, MapPin } from "lucide-react";
import { Iconex } from "@/components/icons/iconex";
import { useToast } from "@/hooks/use-toast";

interface Props {
  vendor: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export function VendorInfoModal({ vendor }: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: `${label} copied to clipboard` });
    } catch (e) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Info</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Vendor Information</DialogTitle>
          <DialogDescription>Contact details and address</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Iconex className="mr-2 h-5 w-5">
                <Phone className="h-5 w-5" />
              </Iconex>
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">
                  {vendor.phone}
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => copy(vendor.phone, "Phone")}>
              <Iconex className="mr-2 h-4 w-4">
                <Copy className="h-4 w-4" />
              </Iconex>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Iconex className="mr-2 h-5 w-5">
                <Mail className="h-5 w-5" />
              </Iconex>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">
                  {vendor.email}
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => copy(vendor.email, "Email")}>
              <Iconex className="mr-2 h-5 w-5">
                <Copy className="h-4 w-4" />
              </Iconex>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Iconex className="mr-2 h-5 w-5">
                <MapPin className="h-5 w-5" />
              </Iconex>
              <div>
                <div className="font-medium">Address</div>
                <div className="text-sm text-muted-foreground">
                  {vendor.address}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => copy(vendor.address, "Address")}
            >
              <Iconex className="mr-2 h-4 w-4">
                <Copy className="h-4 w-4" />
              </Iconex>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VendorInfoModal;
