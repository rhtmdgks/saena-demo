"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import ModelContent from "@/components/dashboard/model-content"

export default function ModelPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <ModelContent />
      </Layout>
    </ThemeProvider>
  )
}
