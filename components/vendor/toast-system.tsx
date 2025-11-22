"use client"

import type React from "react"

import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { Iconex } from '@/components/icons/iconex'
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "warning" | "info"

interface ToastProps {
  type: ToastType
  title: string
  message?: string
  onClose: () => void
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
  },
}

export function Toast({ type, title, message, onClose }: ToastProps) {
  const config = toastConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-lg",
        config.bgColor,
        config.borderColor,
      )}
    >
      <Iconex as={Icon} className={cn("h-5 w-5 shrink-0", config.iconColor)} />
      <div className="flex-1">
        <p className={cn("text-sm font-semibold", config.titleColor)}>{title}</p>
        {message && <p className="mt-1 text-sm text-muted-foreground">{message}</p>}
      </div>
      <button onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground">
        <Iconex as={X} className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">{children}</div>
}
