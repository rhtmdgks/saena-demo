import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsPJAContent from "@/components/dashboard/analytics-pja-content"

export default function PJAPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsPJAContent />
      </Layout>
    </ThemeProvider>
  )
}
