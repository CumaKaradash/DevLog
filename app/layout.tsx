import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "DevLog - Geliştirici Günlüğü",
  description: "Geliştiriciler için teknik düşünce arşivi ve dijital ifade alanı",
  keywords: "geliştirici, blog, yazılım, teknoloji, programlama",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'