"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import { usePathname } from "next/navigation"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/">
                    <h1 className="text-xl font-bold hover:text-primary cursor-pointer">DevLog</h1>
                  </Link>
                  <nav className="hidden md:flex items-center gap-4">
                    <Link
                      href="/"
                      className={`text-sm hover:text-primary transition-colors ${
                        pathname === "/" ? "text-primary font-medium" : ""
                      }`}
                    >
                      Ana Sayfa
                    </Link>
                    <Link
                      href="/editor"
                      className={`text-sm hover:text-primary transition-colors ${
                        pathname === "/editor" ? "text-primary font-medium" : ""
                      }`}
                    >
                      Yeni Yazı
                    </Link>
                    <Link
                      href="/drafts"
                      className={`text-sm hover:text-primary transition-colors ${
                        pathname === "/drafts" ? "text-primary font-medium" : ""
                      }`}
                    >
                      Taslaklar
                    </Link>
                  </nav>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t mt-16">
              <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
                <p>DevLog - Geliştiriciler için dijital düşünce alanı</p>
                <p className="mt-2">Cuma Karadaş tarafından ❤️ ile geliştirildi</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
