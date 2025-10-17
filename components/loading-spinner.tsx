"use client"

import { useEffect } from 'react'

interface LoadingSpinnerProps {
  size?: string | number
  speed?: string | number
  color?: string
  text?: string
  fullScreen?: boolean
}

/**
 * Reusable loading spinner component using ldrs bouncy animation
 * Only shows when explicitly rendered
 */
export function LoadingSpinner({
  size = "45",
  speed = "1.75",
  color = "rgb(198, 255, 58)",
  text = "Loading...",
  fullScreen = false
}: LoadingSpinnerProps) {
  useEffect(() => {
    // Import and register the bouncy loader
    import('ldrs').then(({ bouncy }) => {
      bouncy.register()
    })
  }, [])

  const content = (
    <div className="flex flex-col items-center gap-4">
      <l-bouncy
        size={size}
        speed={speed}
        color={color}
      />
      {text && (
        <p className="text-sm font-medium text-white/90 animate-pulse">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20">
          {content}
        </div>
      </div>
    )
  }

  return content
}
