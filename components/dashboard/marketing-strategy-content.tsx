"use client";

import { useState } from "react";
import {
  Package,
  DollarSign,
  MapPin,
  Megaphone,
  Star,
  ArrowRightLeft,
  Heart,
  Globe,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function MarketingStrategyContent() {
  const [selectedView, setSelectedView] = useState<"4p" | "4e">("4p");
  const [selectedP, setSelectedP] = useState<string | null>(null);
  const [selectedE, setSelectedE] = useState<string | null>(null);

  // 4P data
  const fourPData = {
    Product: {
      icon: Package,
      score: 92,
      change: 8.5,
      trend: "up" as const,
      color: "#4C8EFF",
      metrics: {
        "USP Share": "78%",
        "Feature Mentions": "1,245",
        "Product Clarity": "94%",
        "Innovation Score": "89%",
      },
      topMentions: [
        { text: "Advanced expense management automation", sentiment: 0.92 },
        { text: "Real-time financial insights and reporting", sentiment: 0.88 },
        { text: "Seamless integration with existing tools", sentiment: 0.85 },
      ],
      trendData: [
        { month: "Jan", value: 78 },
        { month: "Feb", value: 82 },
        { month: "Mar", value: 85 },
        { month: "Apr", value: 88 },
        { month: "May", value: 90 },
        { month: "Jun", value: 92 },
      ],
    },
    Price: {
      icon: DollarSign,
      score: 85,
      change: 5.2,
      trend: "up" as const,
      color: "#10B981",
      metrics: {
        "Price Tone Index": "72%",
        "Value Mentions": "890",
        "Cost Perception": "Positive",
        "ROI Score": "88%",
      },
      topMentions: [
        {
          text: "Competitive pricing for enterprise features",
          sentiment: 0.85,
        },
        { text: "Great value compared to traditional banks", sentiment: 0.82 },
        { text: "Transparent pricing with no hidden fees", sentiment: 0.9 },
      ],
      trendData: [
        { month: "Jan", value: 72 },
        { month: "Feb", value: 75 },
        { month: "Mar", value: 78 },
        { month: "Apr", value: 80 },
        { month: "May", value: 83 },
        { month: "Jun", value: 85 },
      ],
    },
    Place: {
      icon: MapPin,
      score: 88,
      change: 12.3,
      trend: "up" as const,
      color: "#F59E0B",
      metrics: {
        "Channel Spread": "65%",
        "Platform Coverage": "8/10",
        Accessibility: "High",
        "Omnichannel Score": "91%",
      },
      topMentions: [
        {
          text: "Available through multiple digital channels",
          sentiment: 0.88,
        },
        { text: "Strong online and mobile presence", sentiment: 0.92 },
        { text: "Easy to access from anywhere", sentiment: 0.86 },
      ],
      trendData: [
        { month: "Jan", value: 68 },
        { month: "Feb", value: 72 },
        { month: "Mar", value: 76 },
        { month: "Apr", value: 80 },
        { month: "May", value: 84 },
        { month: "Jun", value: 88 },
      ],
    },
    Promotion: {
      icon: Megaphone,
      score: 76,
      change: -2.1,
      trend: "down" as const,
      color: "#EC4899",
      metrics: {
        "Promo KW Ratio": "42%",
        "Campaign Mentions": "320",
        "Message Reach": "Medium",
        "Engagement Rate": "68%",
      },
      topMentions: [
        { text: "Limited promotional messaging visibility", sentiment: 0.45 },
        { text: "Word-of-mouth recommendations strong", sentiment: 0.88 },
        { text: "Need more active marketing campaigns", sentiment: 0.52 },
      ],
      trendData: [
        { month: "Jan", value: 82 },
        { month: "Feb", value: 80 },
        { month: "Mar", value: 79 },
        { month: "Apr", value: 78 },
        { month: "May", value: 77 },
        { month: "Jun", value: 76 },
      ],
    },
  };

  // 4E data
  const fourEData = {
    Experience: {
      icon: Star,
      score: 89,
      change: 12.4,
      trend: "up" as const,
      ratio: 0.67,
      color: "#4C8EFF",
      description: "Experience-based sentence ratio",
      formula: "Experience sentences / Total sentences",
      insights: [
        "High mentions of user reviews and satisfaction",
        "Increase in experience-based recommendations",
        "Active sharing of positive experiences",
      ],
    },
    Exchange: {
      icon: ArrowRightLeft,
      score: 82,
      change: 8.7,
      trend: "up" as const,
      ratio: 0.74,
      color: "#00D9FF",
      description: "Exchange value mention rate",
      formula: "Benefit/Value sentences / Total sentences",
      insights: [
        "Positive perception of value for money",
        "Mentions of benefit advantage over competitors",
        "High satisfaction with ROI",
      ],
    },
    Evangelism: {
      icon: Heart,
      score: 76,
      change: 15.2,
      trend: "up" as const,
      ratio: 0.58,
      color: "#7C3AED",
      description: "Recommendation/Trust/Share ratio",
      formula: "Recommendation/Trust sentences / Total sentences",
      insights: [
        "High customer recommendation intent",
        "Increase in trust-based word-of-mouth effect",
        "Rising brand loyalty",
      ],
    },
    Everyplace: {
      icon: Globe,
      score: 85,
      change: 6.3,
      trend: "up" as const,
      ratio: 0.71,
      color: "#10B981",
      description: "Touchpoint diversity & distribution",
      formula: "1 - Herfindahl(Index)",
      insights: [
        "Balanced exposure across various platforms",
        "Good distribution by region and language",
        "Effective multi-channel strategy",
      ],
    },
  };

  // Radar chart calculation
  const radarData = Object.entries(fourPData).map(([key, data]) => ({
    axis: key,
    value: data.score,
  }));

  const maxValue = 100;
  const center = { x: 200, y: 200 };
  const radius = 150;

  const points = radarData.map((item, index) => {
    const angle = (index * 90 - 90) * (Math.PI / 180);
    const value = (item.value / maxValue) * radius;
    return {
      x: center.x + Math.cos(angle) * value,
      y: center.y + Math.sin(angle) * value,
      axis: item.axis,
      value: item.value,
    };
  });

  const pathData =
    points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ") + " Z";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Marketing Strategy
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Integrated analysis of Marketing Mix (4P) and Customer Experience
            Value (4E) as perceived by AI
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1F1F23] p-1 rounded-lg">
          <button
            onClick={() => setSelectedView("4p")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedView === "4p"
                ? "bg-white dark:bg-[#0F0F12] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            4P Mix
          </button>
          <button
            onClick={() => setSelectedView("4e")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedView === "4e"
                ? "bg-white dark:bg-[#0F0F12] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            4E Value
          </button>
        </div>
      </div>

      {/* 4P View */}
      {selectedView === "4p" && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(fourPData).map(([key, data]) => {
              const IconComponent = data.icon;
              return (
                <div
                  key={key}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedP === key
                      ? "bg-accent-green/10 border-accent-green shadow-lg shadow-accent-green/20"
                      : "bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30]"
                  }`}
                  onClick={() => setSelectedP(selectedP === key ? null : key)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div className="flex items-center gap-1">
                      {data.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-accent-green" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          data.trend === "up"
                            ? "text-accent-green"
                            : "text-red-500"
                        }`}
                      >
                        {data.change > 0 ? "+" : ""}
                        {data.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {data.score}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {key}
                  </div>

                  {/* Mini trend sparkline */}
                  <div className="mt-3 h-8">
                    <svg
                      width="100%"
                      height="100%"
                      className="overflow-visible"
                    >
                      <polyline
                        points={data.trendData
                          .map(
                            (d, i) =>
                              `${(i / (data.trendData.length - 1)) * 100},${
                                40 - (d.value / 100) * 30
                              }`
                          )
                          .join(" ")}
                        fill="none"
                        stroke={data.color}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Radar Chart & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radar Chart */}
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                4P Strategy Radar
              </h3>

              <div className="flex items-center justify-center">
                <svg 
                  width="400" 
                  height="400" 
                  className="overflow-visible"
                  role="img"
                  aria-label="4P Marketing Strategy Radar Chart"
                >
                  <defs>
                    <filter id="glow-4p">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient
                      id="radarGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C6FF3A" stopOpacity={0.3} />
                      <stop
                        offset="100%"
                        stopColor="#C6FF3A"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  {/* Grid circles */}
                  {[20, 40, 60, 80, 100].map((percent) => (
                    <circle
                      key={percent}
                      cx={center.x}
                      cy={center.y}
                      r={(percent / 100) * radius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-gray-200 dark:text-gray-800"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Axis lines */}
                  {radarData.map((item, index) => {
                    const angle = (index * 90 - 90) * (Math.PI / 180);
                    const endX = center.x + Math.cos(angle) * radius;
                    const endY = center.y + Math.sin(angle) * radius;
                    return (
                      <line
                        key={index}
                        x1={center.x}
                        y1={center.y}
                        x2={endX}
                        y2={endY}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-gray-300 dark:text-gray-700"
                      />
                    );
                  })}

                  {/* Data area */}
                  <path
                    d={pathData}
                    fill="url(#radarGradient)"
                    stroke="#C6FF3A"
                    strokeWidth="3"
                    filter="url(#glow-4p)"
                  />

                  {/* Data points */}
                  {points.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="6"
                        fill="#C6FF3A"
                        stroke="white"
                        strokeWidth="3"
                        className="cursor-pointer drop-shadow-[0_0_8px_rgba(198,255,58,0.8)]"
                        onClick={() => setSelectedP(point.axis)}
                      />
                      <text
                        x={point.x}
                        y={point.y - 15}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-900 dark:fill-white"
                      >
                        {point.value}
                      </text>
                    </g>
                  ))}

                  {/* Axis labels */}
                  {radarData.map((item, index) => {
                    const angle = (index * 90 - 90) * (Math.PI / 180);
                    const labelX = center.x + Math.cos(angle) * (radius + 40);
                    const labelY = center.y + Math.sin(angle) * (radius + 40);
                    return (
                      <text
                        key={index}
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm font-semibold fill-gray-900 dark:fill-white"
                      >
                        {item.axis}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Selected P Details */}
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
              {selectedP ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    {(() => {
                      const IconComponent =
                        fourPData[selectedP as keyof typeof fourPData].icon;
                      return (
                        <IconComponent
                          className="h-6 w-6"
                          style={{
                            color:
                              fourPData[selectedP as keyof typeof fourPData]
                                .color,
                          }}
                        />
                      );
                    })()}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedP} Analysis
                    </h3>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(
                      fourPData[selectedP as keyof typeof fourPData].metrics
                    ).map(([metric, value]) => (
                      <div
                        key={metric}
                        className="p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23]"
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {metric}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top Mentions */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Top Mentions
                    </h4>
                    <div className="space-y-3">
                      {fourPData[
                        selectedP as keyof typeof fourPData
                      ].topMentions.map((mention, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-lg"
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            &quot;{mention.text}&quot;
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${mention.sentiment * 100}%`,
                                  backgroundColor:
                                    fourPData[
                                      selectedP as keyof typeof fourPData
                                    ].color,
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {(mention.sentiment * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Select a 4P element to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 4E View */}
      {selectedView === "4e" && (
        <>
          {/* 4E Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(fourEData).map(([key, data]) => {
              const IconComponent = data.icon;

              return (
                <div
                  key={key}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${
                    selectedE === key
                      ? "bg-accent-green/10 border-accent-green shadow-lg shadow-accent-green/20"
                      : "bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30]"
                  }`}
                  onClick={() => setSelectedE(selectedE === key ? null : key)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-accent-green" />
                      <span className="text-sm font-medium text-accent-green">
                        +{data.change}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {key}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {data.description}
                  </p>

                  {/* Circular Progress */}
                  <div className="relative w-28 h-28 mx-auto">
                    <svg className="transform -rotate-90 w-28 h-28">
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-800"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        stroke={data.color}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 50 * (1 - data.score / 100)
                        }`}
                        strokeLinecap="round"
                        style={{
                          filter: `drop-shadow(0 0 6px ${data.color}80)`,
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {data.score}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Score
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ratio: {(data.ratio * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected E Details */}
          {selectedE && (
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const IconComponent =
                    fourEData[selectedE as keyof typeof fourEData].icon;
                  return (
                    <IconComponent
                      className="h-6 w-6"
                      style={{
                        color:
                          fourEData[selectedE as keyof typeof fourEData].color,
                      }}
                    />
                  );
                })()}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedE} Deep Dive
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formula */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Calculation Formula
                  </h4>
                  <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg border border-gray-200 dark:border-[#2B2B30]">
                    <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                      {fourEData[selectedE as keyof typeof fourEData].formula}
                    </code>
                  </div>
                </div>

                {/* Insights */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Insights
                  </h4>
                  <div className="space-y-2">
                    {fourEData[
                      selectedE as keyof typeof fourEData
                    ].insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{
                            backgroundColor:
                              fourEData[selectedE as keyof typeof fourEData]
                                .color,
                          }}
                        />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Emotion Distribution */}
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Emotion Distribution Analysis
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { emotion: "Joy", value: 45 },
                { emotion: "Trust", value: 38 },
                { emotion: "Anticipation", value: 32 },
                { emotion: "Surprise", value: 28 },
                { emotion: "Fear", value: 15 },
                { emotion: "Sadness", value: 12 },
              ].map((emotionData) => (
                <div key={emotionData.emotion} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg 
                      className="transform -rotate-90 w-20 h-20"
                      role="img"
                      aria-label={`${emotionData.emotion}: ${emotionData.value}%`}
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-gray-200 dark:text-gray-800"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        className="[stroke:rgb(var(--accent-green))]"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 35}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 35 * (1 - emotionData.value / 100)
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {emotionData.value}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {emotionData.emotion}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
