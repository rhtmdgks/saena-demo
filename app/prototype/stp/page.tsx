"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import STPContent from "@/components/dashboard/stp-content"

export default function STPPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <STPContent />
      </Layout>
    </ThemeProvider>
  )
}
