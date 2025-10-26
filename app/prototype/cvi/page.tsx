"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import CVIContent from "@/components/dashboard/cvi-content"

export default function CVIPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <CVIContent />
      </Layout>
    </ThemeProvider>
  )
}
