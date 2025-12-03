"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Iconex from "@/components/icons/iconex";
import Link from "next/link";
import { cn } from "@/lib/utils";
export default function WalletPage() {
  const transactions = [
    {
      id: 1,
      type: "Deposit from Bank A",
      amount: 15,
      status: "Successful",
      date: "Nov 26, 2025 08:15:00AM",
    },
    {
      id: 2,
      type: "Deposit from Bank A",
      amount: 15,
      status: "Failed",
      date: "Nov 26, 2025 08:15:00AM",
    },
    {
      id: 3,
      type: "Deposit from Bank A",
      amount: 15,
      status: "Successful",
      date: "Nov 26, 2025 08:15:00AM",
    },
    {
      id: 4,
      type: "Deposit from Bank A",
      amount: 15,
      status: "Failed",
      date: "Nov 26, 2025 08:15:00AM",
    },
    {
      id: 5,
      type: "Deposit from Bank A",
      amount: 15,
      status: "Successful",
      date: "Nov 26, 2025 08:15:00AM",
    },
  ];

  return (
    <div>
      <div className="bg-background border rounded-lg p-6 mb-6">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Wallet</h2>
          <p className="text-muted-foreground text-sm">
            Manage your account information and preferences
          </p>
        </div>

        <div className="flex flex-col bg-linear-to-br from-primary to-primary/80 text-white rounded-lg p-6 mb-6 gap-4">
          <div className="fle flex-col gap-1">
            <div className="text-sm opacity-90">Current Balance</div>
            <div className="text-sm opacity-40 mb-4">
              Available funds in your account
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-4xl font-medium">₦0.00</div>
            <div className="text-xs opacity-70">
              Last updated: 20 seconds ago
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Iconex icon={ArrowUpFromLine} className="h-5 w-5 text-red-600" />
              <span className="text-muted-foreground text-sm">Withdraw</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Iconex icon={ArrowDownToLine} className="h-5 w-5 text-red-600" />
              <span className="text-muted-foreground text-sm">Deposit</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Iconex icon={Clock} className="h-5 w-5 text-red-600" />
              <span className="text-muted-foreground text-sm">History</span>
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Transactions</h3>
            <Button variant="link" className="text-primary p-0">
              View All
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your latest wallet activity
          </p>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {transaction.status === "Successful" ? (
                    <Iconex
                      icon={CheckCircle2}
                      className="h-5 w-5 text-green-600"
                    />
                  ) : (
                    <Iconex icon={XCircle} className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${transaction.amount}</div>
                  <div
                    className={cn(
                      "text-xs",
                      transaction.status === "Successful"
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
