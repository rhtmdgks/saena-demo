"use client"

import { TrendingUp, TrendingDown, MessageSquare, Star, Globe, Target, Activity, Award } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const overviewData = {
  kpis: [
    {
      title: "Overall Visibility Score",
      value: "89.8",
      change: "+12.3%",
      trend: "up" as const,
      description: "vs last period",
      icon: Target,
      sparklineData: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 89.8]
    },
    {
      title: "Total Citations",
      value: "26,400",
      change: "+18.5%",
      trend: "up" as const,
      description: "across all platforms",
      icon: MessageSquare,
      sparklineData: [18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 25500, 26000, 26200, 26300, 26400]
    },
    {
      title: "Sentiment Score",
      value: "0.83",
      change: "+0.08",
      trend: "up" as const,
      description: "positive sentiment",
      icon: Star,
      sparklineData: [0.75, 0.76, 0.77, 0.78, 0.79, 0.80, 0.81, 0.82, 0.82, 0.83, 0.83, 0.83, 0.83]
    },
    {
      title: "Platform Coverage",
      value: "10",
      change: "+2",
      trend: "up" as const,
      description: "active platforms",
      icon: Globe,
      sparklineData: [6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10]
    },
    {
      title: "Growth Rate",
      value: "+12.3%",
      change: "+2.1%",
      trend: "up" as const,
      description: "month over month",
      icon: TrendingUp,
      sparklineData: [5, 6, 7, 8, 9, 10, 10.5, 11, 11.5, 12, 12.2, 12.3, 12.3]
    },
    {
      title: "Market Position",
      value: "#2",
      change: "+1",
      trend: "up" as const,
      description: "in K-beauty sunscreen",
      icon: Award,
      sparklineData: [5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2]
    }
  ],
  visibilityTrend: [
    { date: "Oct 1", score: 79.2 },
    { date: "Oct 3", score: 80.5 },
    { date: "Oct 5", score: 82.1 },
    { date: "Oct 7", score: 83.7 },
    { date: "Oct 9", score: 85.4 },
    { date: "Oct 11", score: 86.8 },
    { date: "Oct 13", score: 87.9 },
    { date: "Oct 15", score: 88.7 },
    { date: "Oct 17", score: 89.4 },
    { date: "Oct 18", score: 89.8 }
  ],
  platformBreakdown: [
    { platform: "ChatGPT", visibility: 95, change: 8.5, trend: "up" },
    { platform: "Perplexity", visibility: 92, change: 6.1, trend: "up" },
    { platform: "Claude", visibility: 91, change: 7.2, trend: "up" },
    { platform: "Gemini", visibility: 88, change: 5.6, trend: "up" },
    { platform: "Bing Copilot", visibility: 86, change: 4.7, trend: "up" },
    { platform: "You.com", visibility: 80, change: 3.9, trend: "up" },
    { platform: "Poe", visibility: 78, change: 2.8, trend: "up" },
    { platform: "Grok", visibility: 73, change: -2.1, trend: "down" }
  ],
  topKeywords: [
    { keyword: "PA++++", frequency: 82, change: 12 },
    { keyword: "No White Cast", frequency: 78, change: 15 },
    { keyword: "UVA/UVB", frequency: 72, change: 8 },
    { keyword: "Sensitive Skin", frequency: 68, change: 10 },
    { keyword: "Makeup Compatible", frequency: 66, change: 14 },
    { keyword: "Water-Resistant", frequency: 58, change: 6 },
    { keyword: "Niacinamide", frequency: 54, change: 9 },
    { keyword: "Centella", frequency: 52, change: 7 },
    { keyword: "Fragrance-Free", frequency: 49, change: 5 },
    { keyword: "SPF50+", frequency: 45, change: 4 }
  ],
  recentAlerts: [
    { type: "positive", title: "ChatGPT mentions increased 15%", time: "2 hours ago" },
    { type: "positive", title: "Entered top 3 in Perplexity rankings", time: "5 hours ago" },
    { type: "neutral", title: "New competitor Round Lab gaining traction", time: "1 day ago" },
    { type: "action", title: "Opportunity: Expand PA++++ education content", time: "1 day ago" }
  ]
}

export default function AnalyticsOverviewContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Analytics Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive view of your brand's AI presence performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewData.kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg">
                <kpi.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span
                className={`text-sm font-medium ${
                  kpi.trend === "up"
                    ? "text-accent-green-glow"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {kpi.change}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{kpi.description}</p>
              
              {/* Mini Sparkline */}
              <div className="h-8 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpi.sparklineData.map((value, i) => ({ value }))}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={kpi.trend === "up" ? "#84cc16" : "#ef4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visibility Trend Chart */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Visibility Trend (Last 30 Days)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overviewData.visibilityTrend}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff"
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#84cc16"
                strokeWidth={3}
                dot={{ fill: "#84cc16", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Breakdown & Top Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Breakdown
          </h3>
          <div className="space-y-3">
            {overviewData.platformBreakdown.map((platform, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {platform.platform}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {platform.visibility}%
                      </span>
                      <span
                        className={`text-xs ${
                          platform.trend === "up"
                            ? "text-accent-green-glow"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {platform.trend === "up" ? "+" : ""}{platform.change}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-green rounded-full transition-all duration-500"
                      style={{ width: `${platform.visibility}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Keywords */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Keywords
          </h3>
          <div className="space-y-2">
            {overviewData.topKeywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-6">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {keyword.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {keyword.frequency}
                  </span>
                  <span className="text-xs text-accent-green-glow">
                    +{keyword.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Alerts & Insights
        </h3>
        <div className="space-y-3">
          {overviewData.recentAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  alert.type === "positive"
                    ? "bg-accent-green shadow-lg shadow-accent-green/50"
                    : alert.type === "neutral"
                    ? "bg-blue-500"
                    : "bg-orange-500"
                }`}
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {alert.title}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-500">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
