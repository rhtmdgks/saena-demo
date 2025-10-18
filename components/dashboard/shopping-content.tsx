"use client"

import { ShoppingCart, TrendingUp, Package, DollarSign, Star, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import { getShoppingContentData } from "@/lib/api/dashboard-data"
import type { ShoppingContentData } from "@/types/dashboard"

export default function ShoppingContent() {
  const [data, setData] = useState<ShoppingContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const shoppingData = await getShoppingContentData()
        setData(shoppingData)
      } catch (error) {
        console.error("Failed to fetch shopping data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading shopping data...</div>
      </div>
    )
  }

  if (!data) {
    return <div>Failed to load data</div>
  }

  // Shopping metrics
  const shoppingMetrics = [
    {
      title: "Product Mentions",
      value: data.metrics.productMentions.toLocaleString(),
      change: `+${data.metrics.productMentionsChange}%`,
      trend: "up" as const,
      description: "in shopping queries",
      icon: ShoppingCart,
    },
    {
      title: "Avg. Rating",
      value: `${data.metrics.averageRating}/5`,
      change: `+${data.metrics.ratingChange}`,
      trend: "up" as const,
      description: "across platforms",
      icon: Star,
    },
    {
      title: "Price Competitiveness",
      value: `${data.metrics.priceCompetitiveness}%`,
      change: "+5.2%",
      trend: "up" as const,
      description: "vs competitors",
      icon: DollarSign,
    },
    {
      title: "Availability Score",
      value: `${data.metrics.availabilityScore}%`,
      change: "+12%",
      trend: "up" as const,
      description: "product availability",
      icon: Package,
    },
  ]

  // Shopping platform performance - 실제 데이터 사용
  const shoppingPlatforms = data.platforms

  // Popular product categories - 실제 데이터 사용
  const productCategories = data.categories.map(cat => ({
    category: cat.categoryName,
    mentions: cat.mentions,
    visibility: cat.visibility,
    growth: cat.growthPercent
  }))

  // Competitor price comparison - 실제 데이터 사용
  const priceComparison = data.priceComparison.map(comp => ({
    product: comp.productName,
    ourPrice: comp.yourPrice,
    competitorAvg: comp.competitorAvg,
    savings: comp.savingsPercent,
    advantage: comp.hasAdvantage === true
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Shopping Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Track your product visibility and performance across shopping platforms and AI agents
        </p>
      </div>

      {/* Shopping Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {shoppingMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg group-hover:bg-accent-green-10 transition-colors">
                <metric.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-green transition-colors" />
              </div>
              <span
                className={`text-xs font-medium ${
                  metric.trend === "up"
                    ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]"
                    : "text-red-600 dark:text-red-400"
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

      {/* Shopping Platform Performance */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">Platform</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Visibility
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Mentions
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Rating
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {shoppingPlatforms.map((platform, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{platform.name}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-green rounded-full"
                          style={{ width: `${platform.visibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white w-10">
                        {platform.visibility}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-gray-900 dark:text-white">{platform.mentions}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-3 w-3 text-[#C6FF3A] fill-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{platform.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-sm font-medium ${
                        platform.trend === "up"
                          ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {platform.trend === "up" ? "↑" : "↓"} {Math.abs(platform.change)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Categories & Price Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Categories */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Product Categories</h3>
          <div className="space-y-4">
            {productCategories.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.mentions} mentions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-[#C6FF3A] rounded-full transition-all duration-500"
                      style={{ width: `${item.visibility}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      item.growth > 0
                        ? "text-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.growth > 0 ? "+" : ""}
                    {item.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Comparison */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Competitiveness</h3>
          <div className="space-y-4">
            {priceComparison.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.product}</span>
                  {item.advantage && (
                    <span className="px-2 py-0.5 bg-[#C6FF3A]/20 text-[#C6FF3A] text-xs rounded-full font-medium shadow-lg shadow-[#C6FF3A]/30">
                      Best Price
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Your Price</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.ourPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Competitor Avg</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.competitorAvg}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Savings</p>
                    <p className="font-semibold text-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]">
                      {item.savings}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping Insights */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shopping Insights</h3>
        <div className="space-y-3">
          {[
            {
              type: "positive",
              title: "Strong Price Competitiveness",
              description:
                "Your products are priced 38% lower than competitor average, making them highly attractive in AI shopping recommendations.",
            },
            {
              type: "neutral",
              title: "High Visibility on Google Shopping",
              description:
                "95% visibility on Google Shopping with 580 mentions. Continue optimizing product listings and reviews.",
            },
            {
              type: "action",
              title: "Expand to More Platforms",
              description:
                "Consider adding presence on Walmart Marketplace and Target Plus to increase overall shopping visibility.",
            },
          ].map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  insight.type === "positive"
                    ? "bg-[#C6FF3A] shadow-lg shadow-[#C6FF3A]/50"
                    : insight.type === "neutral"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                }`}
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
