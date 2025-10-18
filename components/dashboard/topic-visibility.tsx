"use client"

import { useState } from "react"
import type { TopicVisibilityData } from "@/types/dashboard"

interface TopicVisibilityProps {
  data?: TopicVisibilityData;
}

export default function TopicVisibility({ data }: TopicVisibilityProps) {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)

  // 실제 데이터가 없으면 로딩 표시
  if (!data) {
    return <div>Loading...</div>;
  }

  const topThemes = data.topThemes.map((theme) => ({
    rank: theme.rank,
    theme: theme.themeName,
    frequency: theme.frequency,
  }));

  // 키워드 데이터를 시각화 스타일로 변환
  const getSizeClass = (size: string) => {
    switch (size) {
      case "large": return "text-6xl";
      case "medium": return "text-4xl";
      case "small": return "text-2xl";
      default: return "text-3xl";
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary": return "text-[#C6FF3A]";
      case "secondary": return "text-blue-500";
      case "tertiary": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  const getGlowClass = (color: string) => {
    switch (color) {
      case "primary": return "drop-shadow-[0_0_14px_rgba(198,255,58,0.7)]";
      case "secondary": return "drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]";
      case "tertiary": return "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]";
      default: return "";
    }
  };

  const keywords = data.keywords.map((keyword) => ({
    text: keyword.text,
    size: getSizeClass(keyword.size),
    color: getColorClass(keyword.color),
    glow: getGlowClass(keyword.color),
    frequency: keyword.frequency,
  }));

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
