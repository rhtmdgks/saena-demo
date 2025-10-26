"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsWebsiteContent from "@/components/dashboard/analytics-website-content"

export default function AnalyticsWebsitePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <AnalyticsWebsiteContent />
      </Layout>
    </ThemeProvider>
  )
}
