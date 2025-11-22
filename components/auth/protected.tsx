"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/storage"

interface Props {
  children: React.ReactNode
}

export default function Protected({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authed = isAuthenticated()
    if (!authed) {
      try {
        // persist intended path so login can redirect back
        window.localStorage.setItem("dispa8ch_post_login_redirect", pathname || "/")
      } catch (e) {
        // ignore
      }

      // Determine correct login page based on section
      if (pathname?.startsWith("/admin")) {
        router.push("/admin/auth/login")
      } else if (pathname?.startsWith("/vendor")) {
        router.push("/vendor/auth/login")
      } else {
        router.push("/auth/login")
      }
    }
  }, [router, pathname])

  if (!isAuthenticated()) return null

  return <>{children}</>
}
