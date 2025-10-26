"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import MarketingStrategyContent from "@/components/dashboard/marketing-strategy-content"

export default function MarketingStrategyPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <MarketingStrategyContent />
      </Layout>
    </ThemeProvider>
  )
}
