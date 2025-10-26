"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import SearchContent from "@/components/dashboard/search-content"

export default function SearchPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <SearchContent />
      </Layout>
    </ThemeProvider>
  )
}
