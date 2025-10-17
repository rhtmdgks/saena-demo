import BrandVisibility from "./brand-visibility"
import { TrendingUp, Target, Globe, Zap } from "lucide-react"

export default function HomeContent() {
  const keyMetrics = [
    {
      title: "Visibility Score",
      value: "89.8%",
      change: "+12.3%",
      trend: "up",
      description: "vs last month",
      icon: Target,
    },
    {
      title: "Share of Voice",
      value: "34.2%",
      change: "+5.1%",
      trend: "up",
      description: "in your category",
      icon: TrendingUp,
    },
    {
      title: "AI Platforms",
      value: "8/10",
      change: "+2",
      trend: "up",
      description: "platforms covered",
      icon: Globe,
    },
    {
      title: "Citation Authority",
      value: "92/100",
      change: "+8",
      trend: "up",
      description: "authority score",
      icon: Zap,
    },
  ]

  const recentInsights = [
    {
      type: "positive",
      title: "Strong Performance in Financial Services",
      description: "Your brand appears in 89.8% of AI answers about business banking, outperforming competitors.",
      time: "2 hours ago",
    },
    {
      type: "neutral",
      title: "New Topic Emerging",
      description: "AI engines are increasingly associating your brand with 'expense automation' - consider content strategy.",
      time: "5 hours ago",
    },
    {
      type: "action",
      title: "Citation Opportunity",
      description: "Forbes.com mentions increased by 45% - leverage this for improved visibility.",
      time: "1 day ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/10 transition-colors">
                <metric.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <span
                className={`text-xs font-medium ${
                  metric.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{metric.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Visibility Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Brand visibility</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Percentage of AI answers about Business credit cards that mention your brand
        </p>
        <BrandVisibility />
      </div>

      {/* Recent Insights */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Insights</h2>
        <div className="space-y-3">
          {recentInsights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  insight.type === "positive"
                    ? "bg-emerald-500"
                    : insight.type === "neutral"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                }`}
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                <span className="text-xs text-gray-500 dark:text-gray-500">{insight.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Coverage */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Platform Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "ChatGPT", coverage: 95, active: true },
            { name: "Perplexity", coverage: 88, active: true },
            { name: "Claude", coverage: 92, active: true },
            { name: "Gemini", coverage: 85, active: true },
            { name: "Copilot", coverage: 78, active: true },
            { name: "SearchGPT", coverage: 82, active: true },
            { name: "You.com", coverage: 75, active: true },
            { name: "Bing AI", coverage: 80, active: true },
            { name: "Bard", coverage: 0, active: false },
            { name: "Others", coverage: 65, active: true },
          ].map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">{platform.name}</span>
              <span
                className={`text-lg font-bold ${
                  platform.active
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {platform.active ? `${platform.coverage}%` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
