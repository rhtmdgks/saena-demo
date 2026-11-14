"use client"

import ObservationPanel from "./observation-panel";
import { MeasurementNotice } from "./measurement-state";
import { dashboardFailure, type DashboardFailure } from "@/lib/api/dashboard-data";

import { useEffect, useState } from "react"
import HomeContent from "./home-content"
import { getBrandVisibilityData, getHomeContentData } from "@/lib/api/dashboard-data"
import type { BrandVisibilityData, HomeContentData } from "@/types/dashboard"

export default function Content() {
  const [loadError, setLoadError] = useState<DashboardFailure | undefined>();
  const [brandVisibilityData, setBrandVisibilityData] = useState<BrandVisibilityData | undefined>(undefined)
  const [homeData, setHomeData] = useState<HomeContentData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const [brandData, homeContentData] = await Promise.all([
          getBrandVisibilityData(),
          getHomeContentData()
        ])
        if (active) setBrandVisibilityData(brandData)
        if (active) setHomeData(homeContentData)
      } catch (error) {
        if (active) setLoadError(dashboardFailure(error));
        console.error("Failed to fetch dashboard data:", error)
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
        <div className="text-gray-500 dark:text-gray-400">Loading dashboard data...</div>
      </div>
    )
  }


  return <><ObservationPanel />{loadError && <MeasurementNotice code={loadError} />}<HomeContent brandVisibilityData={brandVisibilityData} homeData={homeData} /></>
}
