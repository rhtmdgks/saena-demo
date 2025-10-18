"use client"

import { Building2, TrendingUp, Users, Award } from "lucide-react"
import { useEffect, useState } from "react"
import { getIndustryContentData } from "@/lib/api/dashboard-data"
import type { IndustryContentData } from "@/types/dashboard"

export default function IndustryContent() {
  const [data, setData] = useState<IndustryContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const industryData = await getIndustryContentData()
        setData(industryData)
      } catch (error) {
        console.error("Failed to fetch industry data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading industry data...</div>
      </div>
    )
  }

  if (!data) {
    return <div>Failed to load data</div>
  }

  // Industry comparison - 실제 데이터 사용
  const industryComparison = data.competitors.map(comp => ({
    company: comp.companyName,
    score: comp.score,
    marketShare: comp.marketShare,
    growth: comp.growthRate,
    rank: comp.rank
  }))

  // Industry metrics - 실제 데이터 사용
  const industryMetrics = [
    {
      title: "Industry Rank",
      value: `#${data.metrics.industryRank}`,
      change: `+${data.metrics.rankChange}`,
      description: `out of ${data.metrics.totalCompetitors} competitors`,
      icon: Award,
    },
    {
      title: "Market Share",
      value: `${data.metrics.marketSharePercent}%`,
      change: `+${data.metrics.marketShareChange}%`,
      description: "of AI mentions",
      icon: Building2,
    },
    {
      title: "Growth Rate",
      value: `+${data.metrics.growthRate}%`,
      change: "+4.1%",
      description: "vs industry avg",
      icon: TrendingUp,
    },
    {
      title: "Audience Reach",
      value: `${(data.metrics.audienceReach / 1000000).toFixed(1)}M`,
      change: "+18%",
      description: "monthly impressions",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Industry Benchmarking</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Compare your AI presence against industry leaders and competitors
        </p>
      </div>

      {/* Industry Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {industryMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg group-hover:bg-accent-green-10 transition-colors">
                <metric.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-green transition-colors" />
              </div>
              <span className="text-sm font-medium text-accent-green-glow">{metric.change}</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Competitive Landscape */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Competitive Landscape</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">Rank</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Company
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Visibility Score
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Market Share
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {industryComparison.map((company, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors ${
                    company.company === "suelo" ? "bg-accent-green-10" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">#{company.rank}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          company.company === "suelo"
                            ? "text-accent-green-glow font-semibold"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {company.company}
                      </span>
                      {company.company === "suelo" && (
                        <span className="px-2 py-0.5 bg-accent-green-20 text-accent-green-glow text-xs rounded-full font-medium">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{company.score}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-gray-900 dark:text-white">{company.marketShare}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-sm font-medium ${
                        company.growth > 0
                          ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {company.growth > 0 ? "+" : ""}
                      {company.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strengths</h3>
          <div className="space-y-3">
            {data.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF3A] shadow-lg shadow-[#C6FF3A]/50 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Opportunities</h3>
          <div className="space-y-3">
            {data.opportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
