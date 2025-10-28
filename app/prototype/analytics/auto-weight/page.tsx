import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsAutoWeightContent from "@/components/dashboard/analytics-auto-weight-content"

export default function AutoWeightPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsAutoWeightContent />
      </Layout>
    </ThemeProvider>
  )
}
