"use client"

import { useSyncExternalStore } from "react"
import { ThemeProvider } from "@/components/dashboard/theme-provider"
import Layout from "@/components/dashboard/layout"
import Content from "@/components/dashboard/content"
import { OnboardingModal, UserData } from "@/components/onboarding-modal"
import { motion } from "motion/react"
import "../paperlogy-fonts.css"

const subscribeOnboarding = (notify: () => void) => {
  window.addEventListener("storage", notify)
  window.addEventListener("saena-onboarding-updated", notify)
  return () => {
    window.removeEventListener("storage", notify)
    window.removeEventListener("saena-onboarding-updated", notify)
  }
}
const onboardingSnapshot = () => localStorage.getItem("saena-onboarding-completed") ? "completed" : "pending"

export default function PrototypeDashboard() {
  const onboarding = useSyncExternalStore(subscribeOnboarding, onboardingSnapshot, () => "loading")
  const showOnboarding = onboarding === "pending"

  const handleOnboardingComplete = (data: UserData) => {
    
    // Save to localStorage (나중에 Supabase로 변경 가능)
    localStorage.setItem("saena-onboarding-completed", "true")
    localStorage.setItem("saena-user-data", JSON.stringify(data))
    
    // Close modal with animation
    window.dispatchEvent(new Event("saena-onboarding-updated"))
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
