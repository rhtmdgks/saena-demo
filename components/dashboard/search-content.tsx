import { Search, TrendingUp, Calendar } from "lucide-react"

export default function SearchContent() {
  // Reportly-based search query analysis data
  const searchQueries = [
    { query: "best business banking for startups", volume: 15200, visibility: 95, trend: "up", change: 8.5, category: "Business Banking" },
    { query: "business credit cards comparison", volume: 12500, visibility: 89, trend: "up", change: 5.2, category: "Product Features" },
    { query: "expense management software", volume: 11800, visibility: 88, trend: "up", change: 12.4, category: "Business Banking" },
    { query: "accounts payable automation tools", volume: 9800, visibility: 85, trend: "up", change: 15.3, category: "Innovation" },
    { query: "corporate card programs", volume: 8900, visibility: 82, trend: "up", change: 3.1, category: "Product Features" },
    { query: "business banking customer service", volume: 7600, visibility: 72, trend: "down", change: -2.3, category: "Customer Support" },
    { query: "fintech solutions for SMBs", volume: 6700, visibility: 78, trend: "up", change: 4.8, category: "Innovation" },
    { query: "business payment processing", volume: 5900, visibility: 75, trend: "up", change: 6.2, category: "Product Features" },
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
                          ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]"
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
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Q4 Peak Season</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Business credit card queries increase by 45% during Q4 due to year-end planning.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)] mt-0.5" />
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
