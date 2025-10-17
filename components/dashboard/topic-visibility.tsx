"use client"

import { useState } from "react"

export default function TopicVisibility() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)

  const topThemes = [
    { rank: 1, theme: "Accounts Payable Automation", frequency: 88 },
    { rank: 2, theme: "Business Banking", frequency: 73 },
    { rank: 3, theme: "Cash Management", frequency: 70 },
    { rank: 4, theme: "Corporate Cards", frequency: 55 },
    { rank: 5, theme: "Expense Management", frequency: 55 },
    { rank: 6, theme: "Treasury Management", frequency: 49 },
  ]

  const keywords = [
    { text: "Business Banking", size: "text-5xl", color: "text-[#C6FF3A]", glow: "drop-shadow-[0_0_12px_rgba(198,255,58,0.6)]", frequency: 70 },
    { text: "Expense Management", size: "text-4xl", color: "text-blue-500", glow: "drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]", frequency: 55 },
    { text: "Investment Strategies", size: "text-6xl", color: "text-[#C6FF3A]", glow: "drop-shadow-[0_0_14px_rgba(198,255,58,0.7)]", frequency: 88 },
    { text: "Startup Banking", size: "text-3xl", color: "text-orange-500", glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]", frequency: 35 },
    { text: "Revenue Management", size: "text-5xl", color: "text-[#C6FF3A]", glow: "drop-shadow-[0_0_12px_rgba(198,255,58,0.6)]", frequency: 73 },
    { text: "Payment Infrastructure", size: "text-4xl", color: "text-blue-500", glow: "drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]", frequency: 50 },
    { text: "Treasury Management", size: "text-3xl", color: "text-orange-500", glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]", frequency: 30 },
    { text: "Cross-border Payments", size: "text-2xl", color: "text-red-500", glow: "drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]", frequency: 20 },
    { text: "Finance Automation", size: "text-3xl", color: "text-orange-500", glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]", frequency: 35 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Word Cloud */}
      <div className="lg:col-span-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Keyword Frequency</h4>
        <div className="flex flex-wrap gap-4 items-center justify-center min-h-[300px] p-6 bg-gray-50 dark:bg-[#1F1F23] rounded-lg relative">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              onClick={() => setSelectedKeyword(keyword.text)}
              className={`${keyword.size} ${keyword.color} ${keyword.glow} font-bold transition-all duration-300 cursor-pointer relative ${
                selectedKeyword === keyword.text
                  ? "opacity-100 scale-110"
                  : selectedKeyword
                    ? "opacity-40"
                    : "opacity-90 hover:opacity-100 hover:scale-105"
              }`}
            >
              {keyword.text}
              {selectedKeyword === keyword.text && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                  {keyword.frequency} mentions
                </span>
              )}
            </span>
          ))}
          {selectedKeyword && (
            <button
              onClick={() => setSelectedKeyword(null)}
              className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
            >
              Clear selection
            </button>
          )}
        </div>
        <div className="flex items-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C6FF3A] shadow-lg shadow-[#C6FF3A]/50"></div>
            <span className="text-gray-600 dark:text-gray-400">70+ mentions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
            <span className="text-gray-600 dark:text-gray-400">50+ mentions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></div>
            <span className="text-gray-600 dark:text-gray-400">30+ mentions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <span className="text-gray-600 dark:text-gray-400">20+ mentions</span>
          </div>
        </div>
      </div>

      {/* Top Themes Table */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top Themes</h4>
        <div className="space-y-2">
          {topThemes.map((item) => {
            const maxFrequency = Math.max(...topThemes.map((t) => t.frequency))
            const widthPercentage = (item.frequency / maxFrequency) * 100

            return (
              <div
                key={item.rank}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-all duration-200 cursor-pointer group relative overflow-hidden"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-accent-green-10 transition-all duration-500"
                  style={{ width: `${widthPercentage}%` }}
                />
                <div className="flex items-center gap-3 flex-1 relative z-10">
                  <span className="text-gray-500 dark:text-gray-400 text-sm w-4 font-medium">{item.rank}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent-green transition-colors">
                    {item.theme}
                  </span>
                </div>
                <span className="font-bold text-accent-green-glow relative z-10">{item.frequency}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
