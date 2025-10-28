import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import AnalyticsBHIContent from "@/components/dashboard/analytics-bhi-content"

export default function BHIPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnalyticsBHIContent />
      </Layout>
    </ThemeProvider>
  )
}
