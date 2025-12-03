"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface IconexProps {
  icon: LucideIcon
  className?: string
}

export default function Iconex({ icon: Icon, className }: IconexProps) {
  return <Icon className={cn("h-5 w-5", className)} />
}