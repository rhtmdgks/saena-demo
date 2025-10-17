"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useState } from "react"

export default function BrandVisibility() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const brandRankings = [
    { rank: 1, brand: "Chase", visibility: 92, change: 5, trending: "up" },
    { rank: 2, brand: "Rho", visibility: 89.8, change: 1, trending: "up" },
    { rank: 3, brand: "American Express", visibility: 85.2, change: -1, trending: "down" },
    { rank: 4, brand: "Capital on Tap", visibility: 78, change: 5, trending: "up" },
    { rank: 5, brand: "US Bank", visibility: 76.9, change: -2, trending: "down" },
    { rank: 6, brand: "Bill", visibility: 72.3, change: 1.8, trending: "up" },
  ]

  const chartData = [65, 70, 68, 75, 82, 78, 85, 89.8]
  const dates = ["Jan 29", "Jan 30", "Jan 31", "Feb 01", "Feb 02", "Feb 03", "Feb 04", "Feb 05"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visibility Chart */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">89.8%</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              1% vs last week
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Visibility Score</p>
        </div>

        {/* Simple Bar Chart with Animation */}
        <div className="relative h-48 flex items-end gap-2">
          {chartData.map((value, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2"
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div
                className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg relative group hover:from-emerald-600 hover:to-emerald-500 transition-all duration-300 cursor-pointer"
                style={{
                  height: `${value}%`,
                  transform: hoveredBar === i ? "scaleY(1.05)" : "scaleY(1)",
                  transformOrigin: "bottom",
                }}
              >
                {hoveredBar === i && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shadow-lg z-10">
                    <div className="font-semibold">{value}%</div>
                    <div className="text-[10px] opacity-75">{dates[i]}</div>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{dates[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Ranking Table */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Brand Industry Ranking</h4>
        <div className="space-y-2">
          {brandRankings.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400 text-sm w-4 font-medium">{item.rank}</span>
                <span className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.brand}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{item.visibility}%</span>
                <span
                  className={`text-xs flex items-center gap-1 font-medium ${
                    item.trending === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.trending === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
