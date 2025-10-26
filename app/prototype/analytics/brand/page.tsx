"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsBrandContent from "@/components/dashboard/analytics-brand-content"

export default function AnalyticsBrandPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <AnalyticsBrandContent />
      </Layout>
    </ThemeProvider>
  )
}
