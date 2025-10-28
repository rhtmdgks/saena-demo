import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsUCEGContent from "@/components/dashboard/analytics-uceg-content"

export default function UCEGPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsUCEGContent />
      </Layout>
    </ThemeProvider>
  )
}
