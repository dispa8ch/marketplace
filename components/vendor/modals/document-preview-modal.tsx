"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface DocumentPreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentUrl: string
  documentName: string
  fileType?: string
}

export function DocumentPreviewModal({
  open,
  onOpenChange,
  documentUrl,
  documentName,
  fileType = "PDF",
}: DocumentPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-white flex flex-col p-0 overflow-hidden border-[#2A402D]/10">
        <DialogHeader className="p-4 border-b border-[#2A402D]/10 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg font-serif text-[#2A402D]">{documentName}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-2 rounded-full border-[#2A402D]/20 bg-transparent">
              <Download className="h-3 w-3" />
              Download
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 bg-[#F5F5F0] flex items-center justify-center p-4">
          {/* Mock Preview - In real app, verify file type */}
          <div className="w-full h-full bg-white shadow-sm border border-[#2A402D]/5 flex flex-col items-center justify-center">
            <span className="text-4xl font-serif text-[#2A402D]/20 mb-4">{fileType}</span>
            <p className="text-[#5C6B5E]">Document Preview</p>
            <p className="text-xs text-[#757575] mt-2">{documentName}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
