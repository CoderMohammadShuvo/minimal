import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Suspense } from "react"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { AuthGuard } from "@/components/auth/auth-guard"
import "./globals.css" // Fixed CSS import path to use correct relative path

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Minimal - Premium E-commerce",
  description: "Discover premium products with minimal design",
  generator: "Shuvo",
}

export default async function HomeLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <html lang={locale || "en"}>
      <body className={`font-sans ${playfairDisplay.variable} ${sourceSans.variable}`}>
        <ReduxProvider>
          <AuthGuard>
              <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </AuthGuard>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
