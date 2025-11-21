import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import localFont from "next/font/local"
import "./globals.css"

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "dispa8ch - Shop from trusted local businesses near you",
  description: "Discover, order, and get your items delivered seamlessly from trusted local vendors.",
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={satoshi.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
