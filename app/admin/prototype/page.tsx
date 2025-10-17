"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import Content from "@/components/dashboard/content"
import LoadingSpinner from "@/components/dashboard/loading-spinner"

export default function PrototypeDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      console.log("Prototype page: Checking auth...")
      console.log("All cookies:", document.cookie)
      const cookies = document.cookie.split(";")
      const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith("prototype-session="))
      console.log("Found prototype-session cookie:", sessionCookie)

      if (sessionCookie && sessionCookie.includes("authenticated")) {
        console.log("Auth successful!")
        setIsAuthenticated(true)
      } else {
        console.log("Auth failed, redirecting to login")
        router.push("/admin/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Layout>
        <Content />
      </Layout>
    </ThemeProvider>
  )
}
