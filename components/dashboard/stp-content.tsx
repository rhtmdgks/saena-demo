"use client"

import { useState } from "react"
import { Users2, Target, Crosshair } from "lucide-react"

export default function STPContent() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const stpData = {
    segmentation: {
      icon: Users2,
      title: "Segmentation",
      description: "Market segmentation analysis",
      segments: [
        {
          name: "Tech-Savvy Professionals",
          size: 35,
          characteristics: ["25-40 years old", "High income", "Digital native"],
          keywords: ["Innovation", "Efficiency", "Automation", "AI"]
        },
        {
          name: "Small Business Owners",
          size: 28,
          characteristics: ["30-50 years old", "SMB operators", "Cost-sensitive"],
          keywords: ["Value for money", "Simplicity", "Integrated solution"]
        },
        {
          name: "Enterprise Decision Makers",
          size: 22,
          characteristics: ["35-55 years old", "Enterprise executives", "Security-focused"],
          keywords: ["Reliability", "Scalability", "Security", "Support"]
        },
        {
          name: "Freelancers & Creators",
          size: 15,
          characteristics: ["20-35 years old", "Freelancers", "Flexibility-seeking"],
          keywords: ["Flexibility", "Mobile", "Easy payment"]
        }
      ]
    },
    targeting: {
      icon: Target,
      title: "Targeting",
      description: "Target market selection",
      primaryTarget: {
        segment: "Tech-Savvy Professionals",
        score: 92,
        rationale: [
          "Highest purchasing power and product understanding",
          "Fast technology adoption and recommendation intent",
          "Highest long-term customer value (LTV)"
        ]
      },
      secondaryTarget: {
        segment: "Small Business Owners",
        score: 78,
        rationale: [
          "Market with high growth potential",
          "Good conversion rate with focus on practical value",
          "Community with strong word-of-mouth effect"
        ]
      }
    },
    positioning: {
      icon: Crosshair,
      title: "Positioning",
      description: "Positioning strategy",
      statement: "An innovative platform that maximizes business efficiency through AI-powered financial automation",
      attributes: [
        { name: "Innovation", value: 95, competitor: 72 },
        { name: "Ease of Use", value: 88, competitor: 65 },
        { name: "Price Competitiveness", value: 82, competitor: 78 },
        { name: "Customer Support", value: 90, competitor: 70 }
      ],
      differentiators: [
        "AI-powered real-time insights",
        "Intuitive UX/UI",
        "Integrated financial management solution"
      ]
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
              <circle cx="350" cy="120" r="40" fill="#C6FF3A" fillOpacity="0.2" stroke="#C6FF3A" strokeWidth="2" filter="url(#glow-stp)" />
              <circle cx="350" cy="120" r="6" fill="#C6FF3A" stroke="white" strokeWidth="2" />
              <text x="350" y="105" textAnchor="middle" className="text-sm font-bold fill-gray-900 dark:fill-white">Our Brand</text>

              {/* Competitors */}
              <circle cx="180" cy="180" r="25" fillOpacity="0.2" strokeWidth="2" style={{ fill: 'rgb(var(--accent-green))', stroke: 'rgb(var(--accent-green))' }} />
              <circle cx="180" cy="180" r="4" style={{ fill: 'rgb(var(--accent-green))' }} />
              <text x="180" y="210" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Competitor A</text>

              <circle cx="320" cy="250" r="30" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="320" cy="250" r="4" fill="#F59E0B" />
              <text x="320" y="285" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Competitor B</text>

              <circle cx="150" cy="280" r="20" fill="#EC4899" fillOpacity="0.2" stroke="#EC4899" strokeWidth="2" />
              <circle cx="150" cy="280" r="4" fill="#EC4899" />
              <text x="150" y="310" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Competitor C</text>
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
