"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function OrderDetailsModal({
  open,
  order,
  onClose,
}: {
  open: boolean;
  order: any;
  onClose: () => void;
}) {
  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order {order.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong>Customer:</strong> {order.customer}
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
          <p>
            <strong>Items:</strong> {order.items}
          </p>
          <p>
            <strong>Total:</strong> ₦{order.total.toLocaleString()}
          </p>
          <div>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{order.status.replace("_", " ")}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button>Mark as Fulfilled</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
