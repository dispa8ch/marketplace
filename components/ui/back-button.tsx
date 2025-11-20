"use client"

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <button onClick={() => router.back()} className={`inline-flex items-center gap-2 text-sm text-gray-700 ${className || ''}`}>
      <ChevronLeft className="h-5 w-5" />
      Back
    </button>
  )
}
