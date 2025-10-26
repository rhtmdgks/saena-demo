"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import ImproveContent from "@/components/dashboard/improve-content"

export default function ImprovePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <ImproveContent />
      </Layout>
    </ThemeProvider>
  )
}
