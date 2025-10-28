"use client"

import { useState } from "react"
import { TrendingUp, Star, MessageSquare, Globe, MapPin, ShoppingBag, FileText } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"

const brandData = {
  visibility: {
    score: 89.8,
    trend: [
      { date: "Oct 1", score: 79.2, competitors: 75.5 },
      { date: "Oct 5", score: 82.1, competitors: 76.8 },
      { date: "Oct 9", score: 85.4, competitors: 78.2 },
      { date: "Oct 13", score: 87.9, competitors: 79.5 },
      { date: "Oct 18", score: 89.8, competitors: 80.1 }
    ],
    competitors: [
      { name: "Beauty of Joseon", score: 93 },
      { name: "suelo", score: 89.8 },
      { name: "Round Lab", score: 89 },
      { name: "Aestura", score: 88 },
      { name: "La Roche-Posay", score: 87 }
    ]
  },
  sentiment: {
    overall: 0.83,
    positive: 86,
    neutral: 12,
    negative: 2,
    trend: [
      { date: "Oct 1", positive: 78, neutral: 18, negative: 4 },
      { date: "Oct 5", positive: 80, neutral: 17, negative: 3 },
      { date: "Oct 9", positive: 82, neutral: 15, negative: 3 },
      { date: "Oct 13", positive: 84, neutral: 14, negative: 2 },
      { date: "Oct 18", positive: 86, neutral: 12, negative: 2 }
    ],
    byAspect: [
      { aspect: "Product Quality", score: 0.92 },
      { aspect: "Value for Money", score: 0.88 },
      { aspect: "Texture/Feel", score: 0.90 },
      { aspect: "No White Cast", score: 0.95 },
      { aspect: "Makeup Compatibility", score: 0.89 },
      { aspect: "Packaging", score: 0.78 }
    ]
  },
  topics: {
    clusters: [
      { topic: "No White Cast", mentions: 820, sentiment: 0.95, growth: 15 },
      { topic: "PA++++ Protection", mentions: 780, sentiment: 0.91, growth: 12 },
      { topic: "Sensitive Skin", mentions: 680, sentiment: 0.89, growth: 10 },
      { topic: "Makeup Compatible", mentions: 620, sentiment: 0.88, growth: 14 },
      { topic: "Water Resistant", mentions: 540, sentiment: 0.85, growth: 8 },
      { topic: "Lightweight Texture", mentions: 510, sentiment: 0.92, growth: 11 }
    ],
    keywords: [
      { word: "PA++++", frequency: 820, sentiment: 0.91 },
      { word: "no white cast", frequency: 780, sentiment: 0.95 },
      { word: "sensitive skin", frequency: 680, sentiment: 0.89 },
      { word: "lightweight", frequency: 620, sentiment: 0.92 },
      { word: "makeup friendly", frequency: 580, sentiment: 0.88 }
    ]
  },
  platforms: [
    { name: "ChatGPT", visibility: 95, mentions: 1450, sentiment: 0.94, growth: 8.5 },
    { name: "Perplexity", visibility: 92, mentions: 1210, sentiment: 0.90, growth: 6.1 },
    { name: "Claude", visibility: 91, mentions: 1280, sentiment: 0.92, growth: 7.2 },
    { name: "Google AI Overviews", visibility: 88, mentions: 1170, sentiment: 0.89, growth: 5.6 },
    { name: "Copilot", visibility: 86, mentions: 900, sentiment: 0.86, growth: 4.7 },
    { name: "Grok", visibility: 80, mentions: 710, sentiment: 0.82, growth: 3.9 }
  ],
  regions: [
    { region: "North America", visibility: 92, mentions: 3200, growth: 15 },
    { region: "East Asia", visibility: 95, mentions: 2800, growth: 12 },
    { region: "Europe", visibility: 85, mentions: 1500, growth: 10 },
    { region: "Southeast Asia", visibility: 88, mentions: 1200, growth: 18 },
    { region: "Oceania", visibility: 82, mentions: 600, growth: 8 }
  ],
  shopping: {
    productMentions: 1245,
    averageRating: 4.7,
    priceCompetitiveness: 92,
    availabilityScore: 88,
    platforms: [
      { name: "Olive Young Global", visibility: 95, mentions: 580 },
      { name: "Amazon", visibility: 86, mentions: 320 },
      { name: "YesStyle", visibility: 84, mentions: 290 },
      { name: "StyleKorean", visibility: 82, mentions: 270 }
    ]
  },
  citations: {
    total: 26400,
    earned: 22440,
    operated: 2640,
    owned: 1320,
    topSources: [
      { domain: "global.oliveyoung.com", mentions: 3100, type: "earned", authority: 88 },
      { domain: "vogue.com", mentions: 1960, type: "earned", authority: 95 },
      { domain: "allure.com", mentions: 1740, type: "earned", authority: 94 },
      { domain: "yesstyle.com", mentions: 1510, type: "earned", authority: 84 },
      { domain: "amazon.com", mentions: 1480, type: "earned", authority: 96 }
    ]
  }
}

const tabs = [
  { id: "visibility", label: "Visibility", icon: TrendingUp },
  { id: "sentiment", label: "Sentiment", icon: Star },
  { id: "topics", label: "Topics", icon: MessageSquare },
  { id: "platforms", label: "Platforms", icon: Globe },
  { id: "regions", label: "Regions", icon: MapPin },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "citations", label: "Citations", icon: FileText }
]

export default function AnalyticsBrandContent() {
  const [activeTab, setActiveTab] = useState("visibility")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Brand Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive brand performance across all dimensions
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-x-auto">
        <div className="flex gap-2 p-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-accent-green/10 text-accent-green"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1F1F23]"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "visibility" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.visibility.score}</p>
              <p className="text-xs text-accent-green-glow mt-1">+10.6 vs last month</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Industry Rank</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">#2</p>
              <p className="text-xs text-accent-green-glow mt-1">+1 position</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">vs Competitors</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">+9.7</p>
              <p className="text-xs text-accent-green-glow mt-1">Above average</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visibility Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={brandData.visibility.trend}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none", borderRadius: "8px", color: "#fff" }} />
                  <Line type="monotone" dataKey="score" stroke="#84cc16" strokeWidth={3} name="Your Brand" />
                  <Line type="monotone" dataKey="competitors" stroke="#888888" strokeWidth={2} strokeDasharray="5 5" name="Competitors Avg" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Competitor Comparison</h3>
            <div className="space-y-3">
              {brandData.visibility.competitors.map((comp, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 w-6">#{index + 1}</span>
                    <span className={`text-sm font-medium ${comp.name === "suelo" ? "text-accent-green" : "text-gray-900 dark:text-white"}`}>
                      {comp.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${comp.name === "suelo" ? "bg-accent-green" : "bg-gray-400"}`} style={{ width: `${comp.score}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">{comp.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "sentiment" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.sentiment.overall}</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Positive</p>
              <p className="text-3xl font-bold text-accent-green">{brandData.sentiment.positive}%</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Neutral</p>
              <p className="text-3xl font-bold text-blue-500">{brandData.sentiment.neutral}%</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Negative</p>
              <p className="text-3xl font-bold text-red-500">{brandData.sentiment.negative}%</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sentiment by Aspect</h3>
            <div className="space-y-3">
              {brandData.sentiment.byAspect.map((aspect, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900 dark:text-white">{aspect.aspect}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{(aspect.score * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                    <div className="h-full bg-accent-green rounded-full" style={{ width: `${aspect.score * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "topics" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Topic Clusters</h3>
            <div className="space-y-3">
              {brandData.topics.clusters.map((topic, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.topic}</span>
                    <span className="text-xs text-accent-green-glow">+{topic.growth}%</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>{topic.mentions} mentions</span>
                    <span>Sentiment: {(topic.sentiment * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "platforms" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandData.platforms.map((platform, index) => (
              <div key={index} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{platform.name}</span>
                  <span className="text-xs text-accent-green-glow">+{platform.growth}%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{platform.visibility}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{platform.mentions} mentions</p>
                <div className="mt-3 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div className="h-full bg-accent-green rounded-full" style={{ width: `${platform.visibility}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "regions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandData.regions.map((region, index) => (
              <div key={index} className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{region.region}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">+{region.growth}%</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Visibility Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{region.visibility}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Mentions</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{region.mentions.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "shopping" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Product Mentions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.shopping.productMentions}</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Rating</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.shopping.averageRating}</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price Competitiveness</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.shopping.priceCompetitiveness}%</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Availability</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.shopping.availabilityScore}%</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shopping Platforms</h3>
            <div className="space-y-3">
              {brandData.shopping.platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900 dark:text-white">{platform.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{platform.mentions} mentions</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{platform.visibility}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "citations" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Citations</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{brandData.citations.total.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Earned (85%)</p>
              <p className="text-3xl font-bold text-accent-green">{brandData.citations.earned.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Owned (5%)</p>
              <p className="text-3xl font-bold text-blue-500">{brandData.citations.owned.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Citation Sources</h3>
            <div className="space-y-3">
              {brandData.citations.topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{source.domain}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Authority: {source.authority} • {source.type}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{source.mentions.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
