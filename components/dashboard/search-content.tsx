"use client"

import { Search, TrendingUp, Calendar } from "lucide-react"
import AnimatedList from "@/components/AnimatedList"

export default function SearchContent() {
  // Search query analysis data for Shuello sunscreen brand
  const searchQueries = [
    { query: "best sunscreen no white cast", volume: 18400, visibility: 95, trend: "up", change: 8.5, category: "Product Features" },
    { query: "PA++++ sunscreen for sensitive skin", volume: 14200, visibility: 92, trend: "up", change: 12.4, category: "Skin Type" },
    { query: "Korean sunscreen for oily skin", volume: 12800, visibility: 89, trend: "up", change: 5.2, category: "Skin Type" },
    { query: "makeup friendly sunscreen", volume: 11500, visibility: 88, trend: "up", change: 15.3, category: "Product Features" },
    { query: "lightweight sunscreen SPF50", volume: 9800, visibility: 85, trend: "up", change: 6.8, category: "Product Features" },
    { query: "fragrance free sunscreen", volume: 8600, visibility: 82, trend: "up", change: 3.1, category: "Ingredients" },
    { query: "water resistant sunscreen for face", volume: 7400, visibility: 78, trend: "up", change: 4.8, category: "Product Features" },
    { query: "reef safe sunscreen Korea", volume: 6200, visibility: 75, trend: "up", change: 6.2, category: "Sustainability" },
  ]

  const topPerformingQueries = searchQueries.sort((a, b) => b.visibility - a.visibility).slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Search Query Analysis</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Track how your brand appears in AI responses to real user queries
        </p>
      </div>

      {/* Top Performing Queries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topPerformingQueries.map((query, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-accent-green-glow">#{index + 1} Top Query</span>
              <span
                className={`text-xs font-medium ${
                  query.trend === "up" ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]" : "text-red-600 dark:text-red-400"
                }`}
              >
                {query.trend === "up" ? "↑" : "↓"} {Math.abs(query.change)}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">"{query.query}"</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{query.visibility}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Visibility</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {query.volume.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Monthly searches</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Search Queries List */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Search Queries</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
              Last 30 days
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
              Export
            </button>
          </div>
        </div>

        <AnimatedList
          items={searchQueries.map((query) => (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">"{query.query}"</span>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-sm text-gray-900 dark:text-white w-20 text-right">
                  {query.volume.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                  {query.visibility}%
                </span>
                <span
                  className={`text-sm font-medium flex items-center gap-1 w-16 justify-end ${
                    query.trend === "up"
                      ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <TrendingUp className={`h-3 w-3 ${query.trend === "down" ? "rotate-180" : ""}`} />
                  {Math.abs(query.change)}%
                </span>
              </div>
            </div>
          ))}
          onItemSelect={(item, index) => console.log('Selected:', searchQueries[index])}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      </div>

      {/* Query Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Query Categories</h3>
          <div className="space-y-3">
            {[
              { category: "Product Features", count: 52, percentage: 38 },
              { category: "Skin Type Specific", count: 38, percentage: 28 },
              { category: "Ingredient Questions", count: 28, percentage: 21 },
              { category: "Application & Usage", count: 18, percentage: 13 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} queries</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-accent-green h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Seasonal Trends</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-accent-green mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Summer Peak Season</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sunscreen queries increase by 65% during May-August as UV index rises and outdoor activities peak.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)] mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Year-Round Interest</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  PA++++ and sensitive skin queries maintain steady 40% baseline throughout winter months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
