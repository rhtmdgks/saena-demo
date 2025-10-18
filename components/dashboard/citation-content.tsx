"use client"

import { useEffect, useState } from "react"
import CitationAnalysis from "./citation-analysis"
import { getCitationAnalysisData } from "@/lib/api/dashboard-data"
import type { CitationAnalysisData } from "@/types/dashboard"

export default function CitationContent() {
  const [citationData, setCitationData] = useState<CitationAnalysisData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCitationAnalysisData()
        setCitationData(data)
      } catch (error) {
        console.error("Failed to fetch citation data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading citation data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Citation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Percentage of AI-generated answers that cite your brand's domain or related sources
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Citation Domain Count</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Total citations: {citationData?.totalCitations.toLocaleString()}
        </p>
        <CitationAnalysis data={citationData} />
      </div>
    </div>
  )
}
