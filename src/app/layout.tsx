import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import MiniCart from '@/components/cart/MiniCart';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
})

export const metadata: Metadata = {
  title: 'QuickDash | Delivery Optimized Quick-Commerce',
  description: 'A mock quick-commerce platform demonstrating advanced delivery optimization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.className} bg-background font-body-md text-on-surface antialiased`}>
        {children}
        <MiniCart />
        <Analytics />
      </body>
    </html>
  )
}
