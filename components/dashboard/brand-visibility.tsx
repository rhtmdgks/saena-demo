"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function BrandVisibility() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const brandRankings = [
    { rank: 1, brand: "Chase", visibility: 92, change: 5, trending: "up" },
    { rank: 2, brand: "Rho", visibility: 89.8, change: 1, trending: "up" },
    { rank: 3, brand: "American Express", visibility: 85.2, change: -1, trending: "down" },
    { rank: 4, brand: "Capital on Tap", visibility: 78, change: 5, trending: "up" },
    { rank: 5, brand: "US Bank", visibility: 76.9, change: -2, trending: "down" },
    { rank: 6, brand: "Bill", visibility: 72.3, change: 1.8, trending: "up" },
  ]

  const chartData = [65, 70, 68, 75, 82, 78, 85, 89.8]
  const dates = ["Jan 29", "Jan 30", "Jan 31", "Feb 01", "Feb 02", "Feb 03", "Feb 04", "Feb 05"]

  // Animation effect
  useEffect(() => {
    const duration = 1500 // 1.5 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      setAnimationProgress(easeOutCubic(progress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [])

  // Calculate SVG path
  const width = 600
  const height = 192
  const padding = { top: 20, right: 20, bottom: 40, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const maxValue = Math.max(...chartData)
  const minValue = Math.min(...chartData)
  const valueRange = maxValue - minValue

  const points = chartData.map((value, i) => {
    const x = padding.left + (i / (chartData.length - 1)) * chartWidth
    const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight
    return { x, y, value }
  })

  // Create path for line
  const linePath = points
    .map((point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`
      return `L ${point.x} ${point.y}`
    })
    .join(" ")

  // Create path for gradient area
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visibility Chart */}
      <div className="lg:col-span-2">
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">89.8%</span>
            <span className="text-accent-green-glow text-base font-medium flex items-center gap-1">
              <ArrowUpRight className="h-5 w-5" />
              1% vs last week
            </span>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-400">Visibility Score</p>
        </div>

        {/* Line Chart with Animation */}
        <div className="relative w-full" style={{ height: `${height}px` }}>
          <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className="[stop-color:rgb(var(--accent-green))]" stopOpacity="0.3" />
                <stop offset="100%" className="[stop-color:rgb(var(--accent-green))]" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <clipPath id="animationClip">
                <rect x="0" y="0" width={width * animationProgress} height={height} />
              </clipPath>
            </defs>

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = padding.top + chartHeight - (percent / 100) * chartHeight
              return (
                <line
                  key={percent}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-200 dark:text-gray-800"
                  strokeDasharray="4 4"
                />
              )
            })}

            {/* Area under line */}
            <path
              d={areaPath}
              fill="url(#lineGradient)"
              clipPath="url(#animationClip)"
            />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              className="[stroke:rgb(var(--accent-green))]"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              clipPath="url(#animationClip)"
              filter="url(#glow)"
            />

            {/* Data points */}
            {points.map((point, i) => (
              <g key={i} clipPath="url(#animationClip)">
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredPoint === i ? 6 : 4}
                  className="cursor-pointer transition-all duration-200 [fill:rgb(var(--accent-green))]"
                  stroke="white"
                  strokeWidth="2"
                  filter="url(#glow)"
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {hoveredPoint === i && (
                  <g>
                    <rect
                      x={point.x - 35}
                      y={point.y - 45}
                      width="70"
                      height="35"
                      rx="6"
                      className="fill-gray-900 dark:fill-gray-100"
                    />
                    <text
                      x={point.x}
                      y={point.y - 28}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-white dark:fill-gray-900"
                    >
                      {point.value}%
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 15}
                      textAnchor="middle"
                      className="text-[10px] fill-white/75 dark:fill-gray-900/75"
                    >
                      {dates[i]}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* X-axis labels */}
            {dates.map((date, i) => {
              const x = padding.left + (i / (dates.length - 1)) * chartWidth
              return (
                <text
                  key={i}
                  x={x}
                  y={height - padding.bottom + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-500 dark:fill-gray-400"
                >
                  {date}
                </text>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Brand Ranking Table */}
      <div>
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Brand Industry Ranking</h4>
        <div className="space-y-1.5">
          {brandRankings.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400 text-base w-4 font-medium">{item.rank}</span>
                <span className="font-medium text-gray-900 dark:text-white text-base group-hover:text-accent-green transition-colors">
                  {item.brand}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white text-base">{item.visibility}%</span>
                <span
                  className={`text-sm flex items-center gap-1 font-medium ${
                    item.trending === "up"
                      ? "text-accent-green-glow"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.trending === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
