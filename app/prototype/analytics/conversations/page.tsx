"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsConversationsContent from "@/components/dashboard/analytics-conversations-content"

export default function AnalyticsConversationsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <AnalyticsConversationsContent />
      </Layout>
    </ThemeProvider>
  )
}
