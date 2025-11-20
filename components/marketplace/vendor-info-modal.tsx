"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, Phone, Mail, MapPin } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Props {
  vendor: {
    id: string
    name: string
    email: string
    phone: string
    address: string
  }
}

export function VendorInfoModal({ vendor }: Props) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: 'Copied', description: `${label} copied to clipboard` })
    } catch (e) {
      toast({ title: 'Copy failed', description: 'Could not copy to clipboard' })
    }
  }

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
              <Phone className="w-5 h-5" />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">{vendor.phone}</div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => copy(vendor.phone, 'Phone') }><Copy className="w-4 h-4" /></Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">{vendor.email}</div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => copy(vendor.email, 'Email') }><Copy className="w-4 h-4" /></Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <div className="font-medium">Address</div>
                <div className="text-sm text-muted-foreground">{vendor.address}</div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => copy(vendor.address, 'Address') }><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VendorInfoModal
