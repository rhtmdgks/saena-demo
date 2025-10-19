"use client"

import { useEffect, useState } from "react"
import TopicVisibility from "./topic-visibility"
import { getTopicVisibilityData } from "@/lib/api/dashboard-data"
import type { TopicVisibilityData } from "@/types/dashboard"

export default function TopicContent() {
  const [topicData, setTopicData] = useState<TopicVisibilityData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTopicVisibilityData()
        setTopicData(data)
      } catch (error) {
        console.error("Failed to fetch topic data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading topic data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Topic Visibility</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Analyze keyword frequency and theme distribution across AI platforms
        </p>
      </div>

      <div>
        <TopicVisibility data={topicData} />
      </div>
    </div>
  )
}
