import type React from "react"
import type { Metadata } from "next"
import "../styles/globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "MediaMarktSaturn Marketplace",
  description: "A marketplace for online sellers to offer their products",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body>
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
    </body>
    </html>
  )
}
