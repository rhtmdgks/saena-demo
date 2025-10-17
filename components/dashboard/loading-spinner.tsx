"use client"

import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C0C] flex items-center justify-center">
      <Bouncy
        size="45"
        speed="1.75"
        color="#C6FF3A"
      />
    </div>
  )
}
