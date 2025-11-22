"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Flag, ShieldAlert } from "lucide-react"

interface SystemFlagReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  flagType: string
  description: string
  entityName: string
  onResolve: (action: "dismiss" | "suspend") => void
}

export function SystemFlagReviewModal({
  open,
  onOpenChange,
  flagType,
  description,
  entityName,
  onResolve,
}: SystemFlagReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Flag className="h-5 w-5 text-orange-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Review System Flag</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            System flagged <span className="font-medium text-foreground">{entityName}</span> for review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex gap-3 p-3 bg-orange-50 border border-orange-100 rounded-md">
            <ShieldAlert className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-orange-800">{flagType}</h4>
              <p className="text-sm text-orange-700 mt-1">{description}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onResolve("dismiss")}
              className="flex-1 sm:flex-none"
            >
              Dismiss Flag
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => onResolve("suspend")}
              className="flex-1 sm:flex-none"
            >
              Suspend Entity
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
