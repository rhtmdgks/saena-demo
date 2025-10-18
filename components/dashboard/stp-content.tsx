"use client"

import { useState, useEffect } from "react"
import { Users2, Target, Crosshair } from "lucide-react"
import { getSTPData } from "@/lib/api/dashboard-data"
import type { STPData } from "@/types/dashboard"

export default function STPContent() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [data, setData] = useState<STPData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const stpData = await getSTPData()
        setData(stpData)
      } catch (error) {
        console.error("Failed to fetch STP data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading STP data...</div>
      </div>
    )
  }

  if (!data) {
    return <div>Failed to load data</div>
  }

  const stpData = {
    segmentation: {
      icon: Users2,
      title: "Segmentation",
      description: "Market segmentation analysis",
      segments: data.segments.map(seg => ({
        name: seg.name,
        size: seg.sizePercent,
        characteristics: seg.characteristics,
        keywords: seg.keywords
      }))
    },
    targeting: {
      icon: Target,
      title: "Targeting",
      description: "Target market selection",
      primaryTarget: {
        segment: data.targeting.primary.segmentName,
        score: data.targeting.primary.score,
        rationale: data.targeting.primary.rationale
      },
      secondaryTarget: {
        segment: data.targeting.secondary.segmentName,
        score: data.targeting.secondary.score,
        rationale: data.targeting.secondary.rationale
      }
    },
    positioning: {
      icon: Crosshair,
      title: "Positioning",
      description: "Positioning strategy",
      statement: data.positioning.statement,
      attributes: data.positioning.attributes.map(attr => ({
        name: attr.name,
        value: attr.yourScore,
        competitor: attr.competitorAvg
      })),
      differentiators: data.positioning.differentiators
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">STP Insight</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Segmentation, Targeting, Positioning - Market strategy analysis as perceived by AI
        </p>
      </div>

      {/* Segmentation */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-3 mb-6">
          <Users2 className="h-6 w-6 text-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stpData.segmentation.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stpData.segmentation.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stpData.segmentation.segments.map((segment) => (
            <div
              key={segment.name}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedSegment === segment.name
                  ? "bg-[#C6FF3A]/10 border-[#C6FF3A] shadow-lg shadow-[#C6FF3A]/20"
                  : "border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30]"
              }`}
              onClick={() => setSelectedSegment(selectedSegment === segment.name ? null : segment.name)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{segment.name}</h4>
                <span className="text-sm font-medium text-[#C6FF3A]">{segment.size}%</span>
              </div>

              <div className="mb-3">
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#C6FF3A] transition-all duration-500"
                    style={{
                      width: `${segment.size}%`,
                      boxShadow: "0 0 8px rgba(198, 255, 58, 0.5)"
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Characteristics</p>
                  <div className="flex flex-wrap gap-1">
                    {segment.characteristics.map((char, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 rounded"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key Keywords</p>
                  <div className="flex flex-wrap gap-1">
                    {segment.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-[#C6FF3A]/10 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Targeting */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stpData.targeting.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stpData.targeting.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Target */}
          <div className="p-5 rounded-xl bg-[#C6FF3A]/5 border border-[#C6FF3A]/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Primary Target</h4>
              <span className="text-2xl font-bold text-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]">
                {stpData.targeting.primaryTarget.score}
              </span>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {stpData.targeting.primaryTarget.segment}
            </p>
            <div className="space-y-2">
              {stpData.targeting.primaryTarget.rationale.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF3A] mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Target */}
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2B2B30]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Secondary Target</h4>
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {stpData.targeting.secondaryTarget.score}
              </span>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {stpData.targeting.secondaryTarget.segment}
            </p>
            <div className="space-y-2">
              {stpData.targeting.secondaryTarget.rationale.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Positioning */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-3 mb-6">
          <Crosshair className="h-6 w-6 text-[#C6FF3A] drop-shadow-[0_0_6px_rgba(198,255,58,0.5)]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stpData.positioning.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stpData.positioning.description}</p>
          </div>
        </div>

        {/* Positioning Statement */}
        <div className="p-5 rounded-xl bg-[#C6FF3A]/5 border border-[#C6FF3A]/30 mb-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white text-center">
            &quot;{stpData.positioning.statement}&quot;
          </p>
        </div>

        {/* Positioning Map */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Positioning Map</h4>
          <div className="bg-gray-50 dark:bg-[#1F1F23] rounded-xl p-6 border border-gray-200 dark:border-[#2B2B30]">
            <svg width="100%" height="400" viewBox="0 0 500 400" className="overflow-visible">
              <defs>
                <filter id="glow-stp">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Grid */}
              <line x1="50" y1="200" x2="450" y2="200" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" strokeDasharray="4 4" />
              <line x1="250" y1="50" x2="250" y2="350" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" strokeDasharray="4 4" />

              {/* Axes */}
              <line x1="50" y1="200" x2="450" y2="200" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-600" />
              <line x1="250" y1="50" x2="250" y2="350" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-600" />

              {/* Axis Labels */}
              <text x="450" y="195" textAnchor="end" className="text-xs fill-gray-600 dark:fill-gray-400">High Price →</text>
              <text x="50" y="195" textAnchor="start" className="text-xs fill-gray-600 dark:fill-gray-400">← Low Price</text>
              <text x="255" y="60" textAnchor="start" className="text-xs fill-gray-600 dark:fill-gray-400">High Quality ↑</text>
              <text x="255" y="345" textAnchor="start" className="text-xs fill-gray-600 dark:fill-gray-400">Low Quality ↓</text>

              {/* Our Brand */}
              <circle 
                cx={data.positioning.positioningMap.yourBrand.x} 
                cy={data.positioning.positioningMap.yourBrand.y} 
                r="40" 
                fill="#C6FF3A" 
                fillOpacity="0.2" 
                stroke="#C6FF3A" 
                strokeWidth="2" 
                filter="url(#glow-stp)" 
              />
              <circle 
                cx={data.positioning.positioningMap.yourBrand.x} 
                cy={data.positioning.positioningMap.yourBrand.y} 
                r="6" 
                fill="#C6FF3A" 
                stroke="white" 
                strokeWidth="2" 
              />
              <text 
                x={data.positioning.positioningMap.yourBrand.x} 
                y={data.positioning.positioningMap.yourBrand.y - 15} 
                textAnchor="middle" 
                className="text-sm font-bold fill-gray-900 dark:fill-white"
              >
                suelo
              </text>

              {/* Competitors */}
              {data.positioning.positioningMap.competitors.map((comp, idx) => (
                <g key={idx}>
                  <circle 
                    cx={comp.x} 
                    cy={comp.y} 
                    r={comp.size} 
                    fill="#9CA3AF" 
                    fillOpacity="0.2" 
                    stroke="#9CA3AF" 
                    strokeWidth="2" 
                  />
                  <circle 
                    cx={comp.x} 
                    cy={comp.y} 
                    r="4" 
                    fill="#9CA3AF" 
                  />
                  <text 
                    x={comp.x} 
                    y={comp.y + comp.size + 15} 
                    textAnchor="middle" 
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {comp.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Competitive Comparison */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Competitive Positioning</h4>
          <div className="space-y-4">
            {stpData.positioning.attributes.map((attr) => (
              <div key={attr.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{attr.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#C6FF3A]">Us: {attr.value}</span>
                    <span className="text-sm text-gray-500">Competitor: {attr.competitor}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <div
                    className="absolute h-2 rounded-full bg-[#C6FF3A]"
                    style={{
                      width: `${attr.value}%`,
                      boxShadow: "0 0 8px rgba(198, 255, 58, 0.5)"
                    }}
                  />
                  <div
                    className="absolute h-2 rounded-full bg-gray-400 opacity-50"
                    style={{ width: `${attr.competitor}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Differentiators */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Differentiators</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stpData.positioning.differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2B2B30]"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white text-center">{diff}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
