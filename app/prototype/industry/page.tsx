"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import IndustryContent from "@/components/dashboard/industry-content"

export default function IndustryPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <IndustryContent />
      </Layout>
    </ThemeProvider>
  )
}
