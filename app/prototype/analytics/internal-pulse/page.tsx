import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsInternalPulseContent from "@/components/dashboard/analytics-internal-pulse-content"

export default function InternalPulsePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsInternalPulseContent />
      </Layout>
    </ThemeProvider>
  )
}
