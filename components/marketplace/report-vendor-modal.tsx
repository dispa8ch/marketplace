'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface ReportVendorModalProps {
  vendor: {
    id: string
    name: string
    email: string
  }
}

export function ReportVendorModal({ vendor }: ReportVendorModalProps) {
  const [open, setOpen] = useState(false)
  const [complaintType, setComplaintType] = useState('')
  const [header, setHeader] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailBody = `
Complaint Type: ${complaintType}
Header: ${header}
Vendor: ${vendor.name} (${vendor.id})
Vendor Email: ${vendor.email}

Message:
${message}
    `.trim()

    window.location.href = `mailto:dispa8ch@gmail.com?subject=Vendor Report: ${vendor.name}&body=${encodeURIComponent(emailBody)}`

    toast({
      title: "Report Submitted",
      description: "Your report has been sent to our support team.",
    })

    setOpen(false)
    setComplaintType('')
    setHeader('')
    setMessage('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#E41F47] text-[#E41F47] hover:bg-[#FFEDF0]">
          <Flag className="w-4 h-4 mr-2" />
          Report Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report Vendor</DialogTitle>
          <DialogDescription>
            Please provide details about your complaint regarding this vendor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#FFEDF0] p-3 rounded-lg">
            <p className="text-sm font-semibold text-[#171717]">{vendor.name}</p>
            <p className="text-xs text-[#757575]">{vendor.email}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaint-type">Complaint Type</Label>
            <Select value={complaintType} onValueChange={setComplaintType} required>
              <SelectTrigger id="complaint-type" className="w-full">
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fraud">Fraudulent Activity</SelectItem>
                <SelectItem value="quality">Poor Product Quality</SelectItem>
                <SelectItem value="delivery">Delivery Issues</SelectItem>
                <SelectItem value="communication">Poor Communication</SelectItem>
                <SelectItem value="pricing">Pricing Issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="header">Complaint Header</Label>
            <Input
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Brief summary of the issue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide detailed information about your complaint..."
              rows={5}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#E41F47] hover:bg-[#c11839] text-white">
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
