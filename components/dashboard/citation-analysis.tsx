"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"

export default function CitationAnalysis() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)

  const citationDomains = [
    { rank: 1, domain: "forbes.com", mentions: 1885, type: "earned", percentage: 100 },
    { rank: 2, domain: "builtin.com", mentions: 1276, type: "earned", percentage: 67.7 },
    { rank: 3, domain: "rho.co", mentions: 1086, type: "owned", percentage: 57.6 },
    { rank: 4, domain: "fitsmallbusiness.com", mentions: 1056, type: "operated", percentage: 56 },
    { rank: 5, domain: "fintechlabs.com", mentions: 750, type: "operated", percentage: 39.8 },
  ]

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
            <span className="text-gray-500 dark:text-gray-400">30,445 (95.1%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Operated</span>
            <span className="text-gray-500 dark:text-gray-400">518 (1.6%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Owned</span>
            <span className="text-gray-500 dark:text-gray-400">1,056 (3.3%)</span>
          </div>
        </div>
        <div className="h-8 flex rounded-lg overflow-hidden">
          <div className="bg-blue-500 flex-[95.1]"></div>
          <div className="bg-orange-500 flex-[1.6]"></div>
          <div className="bg-cyan-500 flex-[3.3]"></div>
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
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.domain}
              </span>
              {hoveredDomain === item.domain && (
                <ExternalLink className="h-3 w-3 text-gray-400 dark:text-gray-500" />
              )}
              {item.type === "owned" && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
                  Owned
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
