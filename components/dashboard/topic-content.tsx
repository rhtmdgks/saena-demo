"use client"

import { MeasurementNotice } from "./measurement-state";
import { dashboardFailure, type DashboardFailure } from "@/lib/api/dashboard-data";

import { useEffect, useState } from "react"
import TopicVisibility from "./topic-visibility"
import { getTopicVisibilityData } from "@/lib/api/dashboard-data"
import type { TopicVisibilityData } from "@/types/dashboard"

export default function TopicContent() {
  const [loadError, setLoadError] = useState<DashboardFailure | undefined>();
  const [topicData, setTopicData] = useState<TopicVisibilityData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const data = await getTopicVisibilityData()
        if (active) setTopicData(data)
      } catch (error) {
        if (active) setLoadError(dashboardFailure(error));
        console.error("Failed to fetch topic data:", error)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    fetchData();
    return () => { active = false; };
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
      {loadError && <MeasurementNotice code={loadError} />}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Topic Visibility</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Analyze keyword frequency and theme distribution in ChatGPT Search
        </p>
      </div>

      <div>
        <TopicVisibility data={topicData} />
      </div>
    </div>
  )
}
