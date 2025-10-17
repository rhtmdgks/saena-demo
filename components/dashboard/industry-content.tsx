import { Building2, TrendingUp, Users, Award } from "lucide-react"

export default function IndustryContent() {
  const industryComparison = [
    { company: "Your Brand", score: 89.8, marketShare: 18.5, growth: 12.3, rank: 2 },
    { company: "Chase", score: 92.0, marketShare: 22.1, growth: 5.2, rank: 1 },
    { company: "American Express", score: 85.2, marketShare: 19.8, growth: -1.2, rank: 3 },
    { company: "Capital One", score: 78.0, marketShare: 15.3, growth: 8.5, rank: 4 },
    { company: "US Bank", score: 76.9, marketShare: 12.4, growth: -2.1, rank: 5 },
    { company: "Bill", score: 72.3, marketShare: 11.9, growth: 15.8, rank: 6 },
  ]

  const industryMetrics = [
    {
      title: "Industry Rank",
      value: "#2",
      change: "+1",
      description: "out of 50 competitors",
      icon: Award,
    },
    {
      title: "Market Share",
      value: "18.5%",
      change: "+2.3%",
      description: "of AI mentions",
      icon: Building2,
    },
    {
      title: "Growth Rate",
      value: "+12.3%",
      change: "+4.1%",
      description: "vs industry avg",
      icon: TrendingUp,
    },
    {
      title: "Audience Reach",
      value: "2.4M",
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
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-accent-green-10 rounded-lg">
                <metric.icon className="h-5 w-5 text-accent-green" />
              </div>
              <span className="text-xs font-medium text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]">{metric.change}</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{metric.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{metric.description}</p>
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
                    company.company === "Your Brand" ? "bg-accent-green-10" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">#{company.rank}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          company.company === "Your Brand"
                            ? "text-accent-green-glow font-semibold"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {company.company}
                      </span>
                      {company.company === "Your Brand" && (
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
            {[
              "Highest growth rate in the industry (+12.3%)",
              "Strong presence in expense management category",
              "Leading in startup and SMB segments",
              "High citation authority from financial publications",
            ].map((strength, index) => (
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
            {[
              "Expand presence in enterprise segment",
              "Increase visibility in international markets",
              "Strengthen partnerships with fintech platforms",
              "Improve coverage on emerging AI platforms",
            ].map((opportunity, index) => (
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
