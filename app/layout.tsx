import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sfProFont = {
  variable: '--font-sans',
}

export const metadata: Metadata = {
  title: 'dispa8ch - Shop from trusted local businesses near you',
  description: 'Discover, order, and get your items delivered seamlessly from trusted local vendors.',
  icons: {
    icon: '/favicon.ico',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
