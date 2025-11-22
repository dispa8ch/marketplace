"use client"

import { useState } from "react"
import { Download, FileText, FileSpreadsheet, File } from "lucide-react"
import { Iconex } from '@/components/icons/iconex'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  fields: { id: string; label: string; checked?: boolean }[]
  onExport: (format: string, selectedFields: string[], dateRange: { from: string; to: string }) => void
}

export function ExportModal({ open, onOpenChange, title = "Export Product Data", fields, onExport }: ExportModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>(fields.filter((f) => f.checked).map((f) => f.id))
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  })
  const [format, setFormat] = useState<string>("csv")
  const [loading, setLoading] = useState(false)

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
  }

  const handleExport = async () => {
    setLoading(true)
    await onExport(format, selectedFields, dateRange)
    setLoading(false)
    onOpenChange(false)
  }

  const handleClearAll = () => {
    setSelectedFields([])
  }

  const handleSelectAll = () => {
    setSelectedFields(fields.map((f) => f.id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Select the data you'd like to export and the format</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Date Range */}
          <div className="grid gap-4">
            <Label>Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from" className="text-xs text-muted-foreground">
                  From
                </Label>
                <Input
                  id="from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="to" className="text-xs text-muted-foreground">
                  To
                </Label>
                <Input
                  id="to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Options to Select */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Options to Select</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  Clear Selections
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-lg border p-4">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => handleFieldToggle(field.id)}
                  />
                  <Label
                    htmlFor={field.id}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="grid gap-4">
            <Label>Export Format</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={format === "csv" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setFormat("csv")}
              >
                <Iconex as={FileSpreadsheet} className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button
                variant={format === "pdf" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setFormat("pdf")}
              >
                <Iconex as={FileText} className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button
                variant={format === "excel" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setFormat("excel")}
              >
                <Iconex as={File} className="mr-2 h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={loading || selectedFields.length === 0}>
            <Iconex as={Download} className="mr-2 h-4 w-4" />
            {loading ? "Exporting..." : "Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
