"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsOverviewContent from "@/components/dashboard/analytics-overview-content"

export default function AnalyticsOverviewPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <AnalyticsOverviewContent />
      </Layout>
    </ThemeProvider>
  )
}
