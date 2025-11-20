"use client"

import type React from "react"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

interface FilterConfig {
  id: string
  label: string
  type: "select" | "date-range" | "range" | "text"
  options?: { label: string; value: string }[]
  min?: number
  max?: number
  defaultValue?: any
}

interface FiltersPanelProps {
  filters: FilterConfig[]
  onApplyFilters: (filters: Record<string, any>) => void
  trigger?: React.ReactNode
}

export function FiltersPanel({ filters, onApplyFilters, trigger }: FiltersPanelProps) {
  const [open, setOpen] = useState(false)
  const [filterValues, setFilterValues] = useState<Record<string, any>>(
    filters.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.defaultValue || ""
        return acc
      },
      {} as Record<string, any>,
    ),
  )

  const handleReset = () => {
    const resetValues = filters.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.defaultValue || ""
        return acc
      },
      {} as Record<string, any>,
    )
    setFilterValues(resetValues)
  }

  const handleApply = () => {
    onApplyFilters(filterValues)
    setOpen(false)
  }

  const updateFilter = (id: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Apply filters to narrow down your results</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <Label htmlFor={filter.id}>{filter.label}</Label>

              {filter.type === "select" && (
                <Select value={filterValues[filter.id]} onValueChange={(value) => updateFilter(filter.id, value)}>
                  <SelectTrigger id={filter.id}>
                    <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {filter.type === "date-range" && (
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    placeholder="From"
                    value={filterValues[filter.id]?.from || ""}
                    onChange={(e) =>
                      updateFilter(filter.id, {
                        ...filterValues[filter.id],
                        from: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="date"
                    placeholder="To"
                    value={filterValues[filter.id]?.to || ""}
                    onChange={(e) =>
                      updateFilter(filter.id, {
                        ...filterValues[filter.id],
                        to: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {filter.type === "range" && (
                <div className="space-y-2">
                  <Slider
                    min={filter.min}
                    max={filter.max}
                    step={1}
                    value={[filterValues[filter.id] || filter.min || 0]}
                    onValueChange={(value) => updateFilter(filter.id, value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{filter.min}</span>
                    <span className="font-medium text-foreground">{filterValues[filter.id] || filter.min || 0}</span>
                    <span>{filter.max}</span>
                  </div>
                </div>
              )}

              {filter.type === "text" && (
                <Input
                  id={filter.id}
                  placeholder={`Enter ${filter.label.toLowerCase()}`}
                  value={filterValues[filter.id]}
                  onChange={(e) => updateFilter(filter.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <SheetFooter className="mt-8">
          <Button variant="outline" onClick={handleReset}>
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
