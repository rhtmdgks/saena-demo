"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsCopilotContent from "@/components/dashboard/analytics-copilot-content"

export default function AnalyticsCopilotPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <AnalyticsCopilotContent />
      </Layout>
    </ThemeProvider>
  )
}
