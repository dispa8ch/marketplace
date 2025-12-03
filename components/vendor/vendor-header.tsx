"use client";

import {
  Bell,
  Search,
  Filter,
  Plus,
  User,
  User2,
  Shield,
  LogOut,
} from "lucide-react";
import Iconex from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function VendorHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center w-full max-w-md">
          {/* <Iconex>
            <Search className="h-4 w-4 text-muted-foreground" />
          </Iconex> */}
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Iconex icon={Bell} className="h-5 w-5"/>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">New order received</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Product out of stock</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Payment received</p>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-semibold text-primary">CA</span>
            </div>
            <div className="hidden flex-col items-start md:flex">
              <span className="text-sm font-medium">Caleb Adenuga</span>
              <span className="text-xs text-muted-foreground">
                calebadenuga@gmail.com
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 flex flex-col gap-2">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Caleb Adenuga</p>
              <p className="text-xs text-muted-foreground">
                calebadenuga@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Iconex icon={User2} className="h-5 w-5"/>
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Iconex icon={Shield} className="h-5 w-5"/>
            Account & Security
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Iconex icon={LogOut} className="h-5 w-5 text-destructive"/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
