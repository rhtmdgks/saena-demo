import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsEDAContent from "@/components/dashboard/analytics-eda-content"

export default function EDAPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsEDAContent />
      </Layout>
    </ThemeProvider>
  )
}
