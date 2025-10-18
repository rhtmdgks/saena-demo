"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import type { CitationAnalysisData } from "@/types/dashboard"

interface CitationAnalysisProps {
  data?: CitationAnalysisData;
}

export default function CitationAnalysis({ data }: CitationAnalysisProps) {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)

  // 실제 데이터가 없으면 로딩 표시
  if (!data) {
    return <div>Loading...</div>;
  }

  const citationDomains = data.domains.map((domain) => ({
    rank: domain.rank,
    domain: domain.domainName,
    mentions: domain.mentionCount,
    type: domain.type,
    percentage: domain.percentage,
    authority: domain.authorityScore,
    url: domain.url,
  }));

  const getTypeColor = (type: string) => {
    switch (type) {
      case "earned":
        return "bg-blue-500"
      case "operated":
        return "bg-orange-500"
      case "owned":
        return "bg-cyan-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "earned":
        return "Earned Media"
      case "operated":
        return "Operated"
      case "owned":
        return "Owned"
      default:
        return type
    }
  }

  return (
    <div>
      {/* Citation Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Earned</span>
            <span className="text-gray-500 dark:text-gray-400">
              {data.citationsByType.earned.count.toLocaleString()} ({data.citationsByType.earned.percentage}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Operated</span>
            <span className="text-gray-500 dark:text-gray-400">
              {data.citationsByType.operated.count.toLocaleString()} ({data.citationsByType.operated.percentage}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Owned</span>
            <span className="text-gray-500 dark:text-gray-400">
              {data.citationsByType.owned.count.toLocaleString()} ({data.citationsByType.owned.percentage}%)
            </span>
          </div>
        </div>
        <div className="h-8 flex rounded-lg overflow-hidden">
          <div 
            className="bg-blue-500" 
            style={{ flex: data.citationsByType.earned.percentage }}
          ></div>
          <div 
            className="bg-orange-500" 
            style={{ flex: data.citationsByType.operated.percentage }}
          ></div>
          <div 
            className="bg-cyan-500" 
            style={{ flex: data.citationsByType.owned.percentage }}
          ></div>
        </div>
      </div>

      {/* Domain Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium px-4 mb-2">
          <span className="col-span-1">Rank</span>
          <span className="col-span-6">Domain</span>
          <span className="col-span-5 text-right">Number of mentions</span>
        </div>
        {citationDomains.map((item) => (
          <div
            key={item.rank}
            onMouseEnter={() => setHoveredDomain(item.domain)}
            onMouseLeave={() => setHoveredDomain(null)}
            className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-all duration-200 cursor-pointer group"
          >
            <span className="col-span-1 text-gray-500 dark:text-gray-400 font-medium">{item.rank}</span>
            <div className="col-span-6 flex items-center gap-2">
              {item.url ? (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {item.domain}
                </a>
              ) : (
                <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.domain}
                </span>
              )}
              {hoveredDomain === item.domain && item.url && (
                <ExternalLink className="h-3 w-3 text-gray-400 dark:text-gray-500" />
              )}
              {item.type === "owned" && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
                  Owned
                </span>
              )}
              {item.type === "operated" && (
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
                  Operated
                </span>
              )}
            </div>
            <div className="col-span-5 flex items-center justify-end gap-3">
              <span className="font-semibold text-gray-900 dark:text-white">{item.mentions.toLocaleString()}</span>
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full ${getTypeColor(item.type)} transition-all duration-500`}
                  style={{
                    width: hoveredDomain === item.domain ? `${Math.min(item.percentage + 5, 100)}%` : `${item.percentage}%`,
                  }}
                >
                  {hoveredDomain === item.domain && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-white font-semibold">
                      {item.percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
