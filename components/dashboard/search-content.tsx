import { Search, TrendingUp, Calendar } from "lucide-react"

export default function SearchContent() {
  const searchQueries = [
    { query: "best business credit cards", volume: 12500, visibility: 89.8, trend: "up", change: 5.2 },
    { query: "corporate expense management", volume: 8900, visibility: 76.3, trend: "up", change: 3.1 },
    { query: "business banking solutions", volume: 15200, visibility: 92.1, trend: "up", change: 8.5 },
    { query: "startup financial tools", volume: 6700, visibility: 68.4, trend: "down", change: -2.3 },
    { query: "accounts payable automation", volume: 9800, visibility: 85.7, trend: "up", change: 12.4 },
    { query: "business payment processing", volume: 11300, visibility: 71.2, trend: "up", change: 4.8 },
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
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">#{index + 1} Top Query</span>
              <span
                className={`text-xs font-medium ${
                  query.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
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

      {/* All Search Queries Table */}
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">Query</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Volume
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Visibility
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {searchQueries.map((query, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">"{query.query}"</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-900 dark:text-white">
                    {query.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{query.visibility}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-sm font-medium flex items-center justify-end gap-1 ${
                        query.trend === "up"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      <TrendingUp className={`h-3 w-3 ${query.trend === "down" ? "rotate-180" : ""}`} />
                      {Math.abs(query.change)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Query Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Query Categories</h3>
          <div className="space-y-3">
            {[
              { category: "Product Comparison", count: 45, percentage: 35 },
              { category: "How-to Guides", count: 32, percentage: 25 },
              { category: "Feature Questions", count: 28, percentage: 22 },
              { category: "Pricing Inquiries", count: 23, percentage: 18 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} queries</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
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
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Q4 Peak Season</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Business credit card queries increase by 45% during Q4 due to year-end planning.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Tax Season Spike</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expense management queries surge 60% in March-April during tax preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
