import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsAIDAContent from "@/components/dashboard/analytics-aida-content"

export default function AIDAPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsAIDAContent />
      </Layout>
    </ThemeProvider>
  )
}
