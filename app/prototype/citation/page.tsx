"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import CitationContent from "@/components/dashboard/citation-content"

export default function CitationPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <CitationContent />
      </Layout>
    </ThemeProvider>
  )
}
