"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import TopicContent from "@/components/dashboard/topic-content"

export default function TopicPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <TopicContent />
      </Layout>
    </ThemeProvider>
  )
}
