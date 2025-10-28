"use client"

import { TrendingUp, Users, Target, Zap } from "lucide-react"

// UCEG = User-Centric Engagement Growth
const ucegData = {
  overview: {
    score: 87.5,
    change: 12.3,
    userEngagement: 82,
    contentRelevance: 91,
    growthMomentum: 88
  },
  segments: [
    {
      name: "Sensitive Skin Seekers",
      size: 34,
      engagement: 92,
      growth: 15,
      avgSessionTime: "4:32",
      conversionRate: 8.5
    },
    {
      name: "Makeup Enthusiasts",
      size: 26,
      engagement: 88,
      growth: 12,
      avgSessionTime: "3:45",
      conversionRate: 7.2
    },
    {
      name: "K-Beauty Explorers",
      size: 22,
      engagement: 85,
      growth: 18,
      avgSessionTime: "5:10",
      conversionRate: 6.8
    },
    {
      name: "Outdoor & Sports",
      size: 12,
      engagement: 78,
      growth: 9,
      avgSessionTime: "2:58",
      conversionRate: 5.4
    },
    {
      name: "Value Shoppers",
      size: 6,
      engagement: 72,
      growth: 6,
      avgSessionTime: "2:20",
      conversionRate: 4.2
    }
  ],
  engagementMetrics: [
    { metric: "Query Depth", score: 85, description: "Avg questions per session" },
    { metric: "Content Interaction", score: 88, description: "Click-through on recommendations" },
    { metric: "Return Rate", score: 76, description: "Users returning within 7 days" },
    { metric: "Share Intent", score: 82, description: "Likelihood to recommend" }
  ],
  growthDrivers: [
    { driver: "Educational Content", impact: 92, trend: "up", contribution: "28%" },
    { driver: "Product Comparisons", impact: 88, trend: "up", contribution: "24%" },
    { driver: "User Reviews", impact: 85, trend: "up", contribution: "22%" },
    { driver: "How-to Guides", impact: 80, trend: "stable", contribution: "16%" },
    { driver: "Ingredient Info", impact: 75, trend: "up", contribution: "10%" }
  ]
}

export default function AnalyticsUCEGContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">UCEG Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          User-Centric Engagement Growth Analysis
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">UCEG Score</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{ucegData.overview.score}</p>
          <p className="text-xs text-accent-green-glow mt-1">+{ucegData.overview.change}%</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">User Engagement</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{ucegData.overview.userEngagement}</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Content Relevance</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{ucegData.overview.contentRelevance}</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Growth Momentum</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{ucegData.overview.growthMomentum}</p>
        </div>
      </div>

      {/* User Segments */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Segments Performance</h3>
        <div className="space-y-4">
          {ucegData.segments.map((segment, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{segment.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{segment.size}% of users</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                  +{segment.growth}% growth
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{segment.engagement}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Avg Session</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{segment.avgSessionTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Conversion</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{segment.conversionRate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Metrics & Growth Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engagement Metrics</h3>
          <div className="space-y-4">
            {ucegData.engagementMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{metric.metric}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{metric.description}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{metric.score}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div className="h-full bg-accent-green rounded-full" style={{ width: `${metric.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Drivers</h3>
          <div className="space-y-3">
            {ucegData.growthDrivers.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{driver.driver}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Contributes {driver.contribution}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{driver.impact}</span>
                  <TrendingUp className={`h-4 w-4 ${driver.trend === "up" ? "text-accent-green" : "text-gray-400"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
