"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import Content from "@/components/dashboard/content"
import { OnboardingModal, UserData } from "@/components/onboarding-modal"
import { motion } from "motion/react"
import "../paperlogy-fonts.css"

export default function PrototypeDashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("saena-onboarding-completed")
    
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    } else {
      setIsCompleted(true)
    }
  }, [])

  const handleOnboardingComplete = (data: UserData) => {
    console.log("Onboarding completed with data:", data)
    
    // Save to localStorage (나중에 Supabase로 변경 가능)
    localStorage.setItem("saena-onboarding-completed", "true")
    localStorage.setItem("saena-user-data", JSON.stringify(data))
    
    // Close modal with animation
    setShowOnboarding(false)
    setIsCompleted(true)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {/* Main content with conditional blur */}
      <motion.div
        animate={{
          filter: showOnboarding ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        className={showOnboarding ? "pointer-events-none" : ""}
      >
        <Layout>
          <Content />
        </Layout>
      </motion.div>

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
    </ThemeProvider>
  )
}
