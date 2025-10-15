"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({
  children,
  defaultTheme = "system",
  forcedTheme,
}: {
  children: React.ReactNode
  defaultTheme?: string
  forcedTheme?: string | null
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      forcedTheme={forcedTheme || undefined}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
