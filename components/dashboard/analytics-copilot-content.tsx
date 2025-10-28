"use client"

import { TrendingUp, Globe, Search, ShoppingBag, FileText, BarChart3 } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts"

const copilotData = {
  overview: {
    visibilityScore: 86,
    change: 4.7,
    trend: "up" as const,
    totalMentions: 900,
    citationRate: 78,
    shoppingTileRate: 65
  },
  visibilityTrend: [
    { date: "Oct 1", score: 78 },
    { date: "Oct 3", score: 79 },
    { date: "Oct 5", score: 80 },
    { date: "Oct 7", score: 81 },
    { date: "Oct 9", score: 82 },
    { date: "Oct 11", score: 83 },
    { date: "Oct 13", score: 84 },
    { date: "Oct 15", score: 85 },
    { date: "Oct 17", score: 85.5 },
    { date: "Oct 18", score: 86 }
  ],
  citationSources: [
    { domain: "global.oliveyoung.com", mentions: 145, authority: 88 },
    { domain: "vogue.com", mentions: 98, authority: 95 },
    { domain: "allure.com", mentions: 87, authority: 94 },
    { domain: "suelo.kr", mentions: 76, authority: 48 },
    { domain: "yesstyle.com", mentions: 72, authority: 84 },
    { domain: "amazon.com", mentions: 68, authority: 96 },
    { domain: "byrdie.com", mentions: 54, authority: 90 },
    { domain: "stylekorean.com", mentions: 48, authority: 78 }
  ],
  platformComparison: [
    { platform: "ChatGPT", visibility: 95, mentions: 1450 },
    { platform: "Perplexity", visibility: 90, mentions: 1210 },
    { platform: "Claude", visibility: 91, mentions: 1280 },
    { platform: "Google AI Overviews", visibility: 88, mentions: 1170 },
    { platform: "Copilot", visibility: 86, mentions: 900 },
    { platform: "Grok", visibility: 80, mentions: 710 }
  ],
  topQueries: [
    { query: "best Korean sunscreen for office workers", count: 45, intent: "product_inquiry" },
    { query: "sunscreen that works under makeup", count: 38, intent: "product_inquiry" },
    { query: "PA++++ sunscreen recommendations", count: 34, intent: "ingredient_question" },
    { query: "suelo sunscreen review", count: 32, intent: "review" },
    { query: "sensitive skin sunscreen options", count: 29, intent: "skin_type" },
    { query: "Korean vs Western sunscreen", count: 27, intent: "comparison" },
    { query: "water resistant sunscreen for sports", count: 24, intent: "product_inquiry" },
    { query: "sunscreen without white cast", count: 22, intent: "product_inquiry" },
    { query: "daily SPF for combination skin", count: 20, intent: "skin_type" },
    { query: "reef safe sunscreen brands", count: 18, intent: "ingredient_question" }
  ],
  geographicDistribution: [
    { region: "United States", mentions: 320, percentage: 35.6 },
    { region: "South Korea", mentions: 180, percentage: 20.0 },
    { region: "United Kingdom", mentions: 135, percentage: 15.0 },
    { region: "Canada", mentions: 90, percentage: 10.0 },
    { region: "Australia", mentions: 72, percentage: 8.0 },
    { region: "Singapore", mentions: 54, percentage: 6.0 },
    { region: "Japan", mentions: 27, percentage: 3.0 },
    { region: "Others", mentions: 22, percentage: 2.4 }
  ],
  shoppingMetrics: {
    tileAppearances: 585,
    clickThroughRate: 12.5,
    conversionRate: 3.8,
    avgPosition: 2.3
  }
}

export default function AnalyticsCopilotContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Copilot Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Microsoft Copilot specific performance metrics
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Visibility Score</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{copilotData.overview.visibilityScore}</p>
          <p className="text-xs text-accent-green-glow mt-1">+{copilotData.overview.change}% this month</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Mentions</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{copilotData.overview.totalMentions}</p>
          <p className="text-xs text-accent-green-glow mt-1">Enterprise queries</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Citation Rate</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{copilotData.overview.citationRate}%</p>
          <p className="text-xs text-accent-green-glow mt-1">High authority sources</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="h-5 w-5 text-accent-green" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Shopping Tile Rate</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{copilotData.overview.shoppingTileRate}%</p>
          <p className="text-xs text-accent-green-glow mt-1">Product visibility</p>
        </div>
      </div>

      {/* Visibility Trend */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Copilot Visibility Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={copilotData.visibilityTrend}>
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Comparison & Citation Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Comparison */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={copilotData.platformComparison}>
                <XAxis
                  dataKey="platform"
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                />
                <Bar dataKey="visibility" fill="#84cc16" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Citation Sources */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Citation Sources
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {copilotData.citationSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {source.domain}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                      Authority: {source.authority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-green rounded-full"
                        style={{ width: `${(source.mentions / 145) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">
                      {source.mentions}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Queries & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Copilot Queries
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {copilotData.topQueries.map((query, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-6">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{query.query}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{query.intent}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {query.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Geographic Distribution
          </h3>
          <div className="space-y-3">
            {copilotData.geographicDistribution.map((region, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 dark:text-white">{region.region}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {region.percentage}% ({region.mentions})
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping Integration Metrics */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Shopping Integration Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tile Appearances</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {copilotData.shoppingMetrics.tileAppearances}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Click-Through Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {copilotData.shoppingMetrics.clickThroughRate}%
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {copilotData.shoppingMetrics.conversionRate}%
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Position</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              #{copilotData.shoppingMetrics.avgPosition}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
