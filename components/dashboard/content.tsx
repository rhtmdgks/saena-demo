"use client"

import { useEffect, useState } from "react"
import HomeContent from "./home-content"
import { getBrandVisibilityData, getHomeContentData } from "@/lib/api/dashboard-data"
import type { BrandVisibilityData, HomeContentData } from "@/types/dashboard"

export default function Content() {
  const [brandVisibilityData, setBrandVisibilityData] = useState<BrandVisibilityData | undefined>(undefined)
  const [homeData, setHomeData] = useState<HomeContentData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [brandData, homeContentData] = await Promise.all([
          getBrandVisibilityData(),
          getHomeContentData()
        ])
        setBrandVisibilityData(brandData)
        setHomeData(homeContentData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading dashboard data...</div>
      </div>
    )
  }

  return <HomeContent brandVisibilityData={brandVisibilityData} homeData={homeData} />
}
