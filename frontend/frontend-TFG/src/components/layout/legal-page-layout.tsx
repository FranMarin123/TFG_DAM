import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

interface LegalPageLayoutProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow py-12 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
            {lastUpdated && <p className="text-sm text-gray-500 mb-8">Última actualización: {lastUpdated}</p>}
            <div className="prose prose-sky max-w-none">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}