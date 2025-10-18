"use client"

import { Bot, Zap, Shield, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { getModelContentData } from "@/lib/api/dashboard-data"
import type { ModelContentData } from "@/types/dashboard"

export default function ModelContent() {
  const [data, setData] = useState<ModelContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const modelData = await getModelContentData()
        setData(modelData)
      } catch (error) {
        console.error("Failed to fetch model data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading model data...</div>
      </div>
    )
  }

  if (!data) {
    return <div>Failed to load data</div>
  }

  // AI model performance data - 실제 데이터 사용
  const aiModels = data.models

  // Model comprehensive metrics - 실제 데이터 사용
  const modelMetrics = [
    {
      title: "Average Visibility",
      value: `${data.overallMetrics.averageVisibility}%`,
      description: "across all AI models",
      icon: Bot,
    },
    {
      title: "Accuracy Score",
      value: `${data.overallMetrics.accuracyScore}%`,
      description: "information accuracy",
      icon: Shield,
    },
    {
      title: "Total Mentions",
      value: data.overallMetrics.totalMentions.toLocaleString(),
      description: "across all platforms",
      icon: Zap,
    },
    {
      title: "Positive Sentiment",
      value: `${data.overallMetrics.positiveSentimentPercent}%`,
      description: "of all mentions",
      icon: Globe,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">AI Model Performance</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Track how different AI models represent your brand
        </p>
      </div>

      {/* Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg group-hover:bg-accent-green-10 transition-colors">
                <metric.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-green transition-colors" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Model Comparison Table */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">Model</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Provider
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Visibility
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Accuracy
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Sentiment
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Mentions
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {aiModels.map((model, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{model.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{model.provider}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${model.visibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white w-10">
                        {model.visibility}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-gray-900 dark:text-white">{model.accuracy}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        model.sentiment === "positive"
                          ? "bg-[#C6FF3A]/20 text-[#C6FF3A] shadow-lg shadow-[#C6FF3A]/30"
                          : "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {model.sentiment}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-gray-900 dark:text-white">{model.mentions.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-sm font-medium ${
                        model.trend === "up"
                          ? "text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {model.trend === "up" ? "↑" : "↓"} {Math.abs(model.change)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Performing</h3>
          <div className="space-y-3">
            {aiModels
              .sort((a, b) => b.visibility - a.visibility)
              .slice(0, 3)
              .map((model, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{model.name}</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{model.visibility}%</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fastest Growing</h3>
          <div className="space-y-3">
            {aiModels
              .sort((a, b) => b.change - a.change)
              .slice(0, 3)
              .map((model, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{model.name}</span>
                  <span className="text-sm font-semibold text-[#C6FF3A] drop-shadow-[0_0_8px_rgba(198,255,58,0.5)]">
                    +{model.change}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Most Accurate</h3>
          <div className="space-y-3">
            {aiModels
              .sort((a, b) => b.accuracy - a.accuracy)
              .slice(0, 3)
              .map((model, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{model.name}</span>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {model.accuracy}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
