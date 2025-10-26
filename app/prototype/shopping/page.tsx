"use client"

import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import ShoppingContent from "@/components/dashboard/shopping-content"

export default function ShoppingPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <ShoppingContent />
      </Layout>
    </ThemeProvider>
  )
}
