"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

export default function AnalyticsBrandContent() {
  const [activeTab, setActiveTab] = useState("Shopping")
  const [activeTimeRange, setActiveTimeRange] = useState("7d")

  const tabs = ["Visibility", "Sentiment", "Topics", "Platforms", "Regions", "Shopping", "Citations"]
  const timeRanges = ["7d", "15d", "30d", "Custom"]

  // Shopping visibility data
  const chartData = [
    { day: 1, yourBrand: 28, competitor: 25 },
    { day: 2, yourBrand: 32, competitor: 28 },
    { day: 3, yourBrand: 48, competitor: 30 },
    { day: 4, yourBrand: 52, competitor: 32 },
    { day: 5, yourBrand: 45, competitor: 28 },
    { day: 6, yourBrand: 38, competitor: 30 },
    { day: 7, yourBrand: 25, competitor: 25 },
    { day: 8, yourBrand: 22, competitor: 24 },
    { day: 9, yourBrand: 24, competitor: 26 },
    { day: 10, yourBrand: 28, competitor: 28 },
    { day: 11, yourBrand: 35, competitor: 30 },
    { day: 12, yourBrand: 55, competitor: 32 },
    { day: 13, yourBrand: 75, competitor: 38 },
    { day: 14, yourBrand: 62, competitor: 35 },
    { day: 15, yourBrand: 58, competitor: 32 },
    { day: 16, yourBrand: 52, competitor: 30 },
    { day: 17, yourBrand: 48, competitor: 28 },
    { day: 18, yourBrand: 45, competitor: 32 },
    { day: 19, yourBrand: 70, competitor: 40 },
  ]

  const brandRankings = [
    { rank: 1, name: "Eight Sleep", badge: "Your Brand", icon: "🛏️" },
    { rank: 2, name: "Hatch", icon: "🌙" },
    { rank: 3, name: "Tempur-Pedic", icon: "🛏️" },
    { rank: 4, name: "Sleepme", icon: "❄️" },
  ]

  const maxValue = Math.max(...chartData.map(d => Math.max(d.yourBrand, d.competitor)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Brand</h2>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-[#1F1F23]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setActiveTimeRange(range)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTimeRange === range
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2B2B30]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Shopping Visibility Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Shopping Visibility</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          How often your products appear in ChatGPT Shopping tiles.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-gray-50 dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Shopping Visibility Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">65.2%</span>
                  <span className="text-[#C6FF3A] text-sm font-medium drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]">
                    + 1.9%
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-[#1F1F23] rounded-lg transition-colors">
                <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Chart Area */}
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2">
                <span>100%</span>
                <span>80%</span>
                <span>60%</span>
                <span>40%</span>
                <span>20%</span>
              </div>

              {/* Chart */}
              <div className="ml-12 h-full relative">
                {/* Grid lines */}
                {[0, 20, 40, 60, 80, 100].map((percent) => (
                  <div
                    key={percent}
                    className="absolute left-0 right-0 border-t border-gray-200 dark:border-[#1F1F23]"
                    style={{ bottom: `${percent}%` }}
                  />
                ))}

                {/* Line chart */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <filter id="glow-green">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Your Brand Line (Green) */}
                  <polyline
                    fill="none"
                    stroke="#C6FF3A"
                    strokeWidth="2"
                    filter="url(#glow-green)"
                    points={chartData
                      .map((d, i) => {
                        const x = (i / (chartData.length - 1)) * 100
                        const y = 100 - (d.yourBrand / maxValue) * 100
                        return `${x}%,${y}%`
                      })
                      .join(" ")}
                  />

                  {/* Competitor Line (Gray) */}
                  <polyline
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                    points={chartData
                      .map((d, i) => {
                        const x = (i / (chartData.length - 1)) * 100
                        const y = 100 - (d.competitor / maxValue) * 100
                        return `${x}%,${y}%`
                      })
                      .join(" ")}
                  />

                  {/* Data points */}
                  {chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 100
                    const y = 100 - (d.yourBrand / maxValue) * 100
                    return (
                      <circle
                        key={`point-${i}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        fill="#C6FF3A"
                        className="drop-shadow-[0_0_4px_rgba(198,255,58,0.6)]"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div className="bg-gray-50 dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Shopping Visibility Rank</p>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">#1</h3>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Brand</p>
              {brandRankings.map((brand) => (
                <div
                  key={brand.rank}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F1F23] transition-colors"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-4">{brand.rank}.</span>
                  <span className="text-xl">{brand.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white flex-1">
                    {brand.name}
                  </span>
                  {brand.badge && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-[#1F1F23] text-xs text-gray-600 dark:text-gray-400 rounded">
                      {brand.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
