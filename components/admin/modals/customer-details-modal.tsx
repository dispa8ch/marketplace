"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ban, Mail, Phone, Calendar, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  joinDate: string
  status?: string
}

interface CustomerDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
}

export function CustomerDetailsModal({ open, onOpenChange, customer }: CustomerDetailsModalProps) {
  const { toast } = useToast()

  if (!customer) return null

  const handleBan = () => {
    toast({
      title: "Action performed",
      description: `Customer ${customer.name} has been restricted.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`https://avatar.vercel.sh/${customer.email}`} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {customer.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold">{customer.name}</h3>
            <Badge variant={customer.status === "banned" ? "destructive" : "secondary"} className="rounded-full">
              {customer.status === "banned" ? "Restricted" : "Active Customer"}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="truncate">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {customer.joinDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShoppingBag className="h-4 w-4" />
              <span>{customer.orders} Orders</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Lifetime Value</h4>
            <div className="text-2xl font-bold font-mono">₦{customer.totalSpent.toLocaleString()}</div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="destructive" onClick={handleBan}>
            <Ban className="mr-2 h-4 w-4" />
            Restrict Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
