import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsBehavioralContent from "@/components/dashboard/analytics-behavioral-content"

export default function BehavioralPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsBehavioralContent />
      </Layout>
    </ThemeProvider>
  )
}
