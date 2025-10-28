"use client"

import { Globe, TrendingUp, FileText, Award, ExternalLink, ArrowUpRight } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const websiteData = {
  domains: [
    {
      name: "suelo.kr",
      type: "owned",
      citations: 520,
      authority: 48,
      change: 12.5,
      trend: "up" as const,
      avgPosition: 2.8
    },
    {
      name: "shop.suelo.kr",
      type: "owned",
      citations: 430,
      authority: 42,
      change: 15.3,
      trend: "up" as const,
      avgPosition: 3.2
    },
    {
      name: "blog.suelo.kr",
      type: "owned",
      citations: 370,
      authority: 38,
      change: 18.7,
      trend: "up" as const,
      avgPosition: 4.1
    }
  ],
  citationTrend: [
    { date: "Oct 1", suelo: 420, shop: 350, blog: 280 },
    { date: "Oct 3", suelo: 435, shop: 365, blog: 295 },
    { date: "Oct 5", suelo: 450, shop: 380, blog: 310 },
    { date: "Oct 7", suelo: 465, shop: 395, blog: 325 },
    { date: "Oct 9", suelo: 480, shop: 405, blog: 340 },
    { date: "Oct 11", suelo: 490, shop: 415, blog: 350 },
    { date: "Oct 13", suelo: 500, shop: 420, blog: 360 },
    { date: "Oct 15", suelo: 510, shop: 425, blog: 365 },
    { date: "Oct 17", suelo: 515, shop: 428, blog: 368 },
    { date: "Oct 18", suelo: 520, shop: 430, blog: 370 }
  ],
  topPages: [
    {
      url: "/products/daily-sunscreen-pa-spf50",
      title: "Daily PA++++ SPF50+ Sunscreen",
      citations: 145,
      authority: 52,
      contentType: "product",
      platforms: ["ChatGPT", "Perplexity", "Claude"]
    },
    {
      url: "/blog/pa-rating-explained",
      title: "Understanding PA++++ Rating in Sunscreen",
      citations: 98,
      authority: 45,
      contentType: "educational",
      platforms: ["ChatGPT", "Gemini", "Perplexity"]
    },
    {
      url: "/products/sensitive-skin-sunscreen",
      title: "Sensitive Skin Sunscreen Collection",
      citations: 87,
      authority: 48,
      contentType: "product",
      platforms: ["ChatGPT", "Claude"]
    },
    {
      url: "/blog/how-to-reapply-sunscreen",
      title: "How to Reapply Sunscreen Over Makeup",
      citations: 76,
      authority: 42,
      contentType: "educational",
      platforms: ["ChatGPT", "Perplexity"]
    },
    {
      url: "/ingredients/niacinamide-benefits",
      title: "Niacinamide in Sunscreen: Benefits",
      citations: 65,
      authority: 40,
      contentType: "educational",
      platforms: ["Gemini", "Claude"]
    },
    {
      url: "/faq/white-cast-prevention",
      title: "FAQ: Preventing White Cast",
      citations: 58,
      authority: 38,
      contentType: "faq",
      platforms: ["ChatGPT", "Perplexity"]
    },
    {
      url: "/products/water-resistant-sunscreen",
      title: "Water-Resistant Sunscreen SPF50+",
      citations: 52,
      authority: 46,
      contentType: "product",
      platforms: ["ChatGPT", "Gemini"]
    },
    {
      url: "/blog/korean-vs-western-sunscreen",
      title: "Korean vs Western Sunscreen: Key Differences",
      citations: 48,
      authority: 44,
      contentType: "educational",
      platforms: ["Perplexity", "Claude"]
    },
    {
      url: "/ingredients/centella-asiatica",
      title: "Centella Asiatica for Sensitive Skin",
      citations: 42,
      authority: 39,
      contentType: "educational",
      platforms: ["Gemini", "ChatGPT"]
    },
    {
      url: "/reviews/customer-testimonials",
      title: "Customer Reviews & Testimonials",
      citations: 38,
      authority: 35,
      contentType: "review",
      platforms: ["ChatGPT", "Perplexity"]
    }
  ],
  contentTypeBreakdown: [
    { type: "Product Pages", citations: 284, percentage: 21.7, avgAuthority: 49 },
    { type: "Educational Content", citations: 329, percentage: 25.2, avgAuthority: 43 },
    { type: "FAQ Pages", citations: 186, percentage: 14.2, avgAuthority: 38 },
    { type: "Blog Posts", citations: 298, percentage: 22.8, avgAuthority: 42 },
    { type: "Ingredient Guides", citations: 147, percentage: 11.2, avgAuthority: 40 },
    { type: "Reviews", citations: 76, percentage: 5.8, avgAuthority: 35 }
  ],
  platformDistribution: [
    { platform: "ChatGPT", citations: 485, percentage: 37.1 },
    { platform: "Perplexity", citations: 342, percentage: 26.2 },
    { platform: "Claude", citations: 268, percentage: 20.5 },
    { platform: "Gemini", citations: 185, percentage: 14.2 },
    { platform: "Others", citations: 40, percentage: 3.1 }
  ],
  recommendations: [
    {
      priority: "high",
      title: "Expand PA++++ Educational Content",
      description: "PA++++ content has 45% higher citation rate. Create more guides explaining UVA protection.",
      impact: "+25% potential citations"
    },
    {
      priority: "high",
      title: "Optimize Product Page Metadata",
      description: "Add structured data and detailed specifications to product pages for better AI parsing.",
      impact: "+18% visibility"
    },
    {
      priority: "medium",
      title: "Create Comparison Guides",
      description: "Users frequently ask for comparisons. Create detailed comparison content vs competitors.",
      impact: "+15% engagement"
    },
    {
      priority: "medium",
      title: "Enhance FAQ Section",
      description: "FAQ pages have good citation rates. Expand with more common questions about application and ingredients.",
      impact: "+12% citations"
    },
    {
      priority: "low",
      title: "Add Video Content Transcripts",
      description: "Include text transcripts for video content to improve AI accessibility.",
      impact: "+8% reach"
    }
  ]
}

export default function AnalyticsWebsiteContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Website Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          How AI platforms reference your owned content
        </p>
      </div>

      {/* Domain Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {websiteData.domains.map((domain, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent-green" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{domain.name}</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                {domain.type}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{domain.citations}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Citations</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Authority: {domain.authority}</p>
                  <p className="text-xs text-accent-green-glow">+{domain.change}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Pos: #{domain.avgPosition}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Avg rank</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Citation Trend */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Citation Trend by Domain
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={websiteData.citationTrend}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff"
                }}
              />
              <Line type="monotone" dataKey="suelo" stroke="#84cc16" strokeWidth={2} name="suelo.kr" />
              <Line type="monotone" dataKey="shop" stroke="#3b82f6" strokeWidth={2} name="shop.suelo.kr" />
              <Line type="monotone" dataKey="blog" stroke="#a855f7" strokeWidth={2} name="blog.suelo.kr" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Cited Pages */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Most Cited Pages
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Page</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Citations</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Authority</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Platforms</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {websiteData.topPages.map((page, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{page.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{page.url}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300">
                      {page.contentType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{page.citations}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{page.authority}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {page.platforms.map((platform, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 rounded bg-accent-green/10 text-accent-green">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-accent-green hover:text-accent-green-glow">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Type Breakdown & Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Type Breakdown */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Type Performance
          </h3>
          <div className="space-y-3">
            {websiteData.contentTypeBreakdown.map((type, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 dark:text-white">{type.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {type.citations}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      ({type.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full"
                    style={{ width: `${type.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Avg Authority: {type.avgAuthority}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Citations by Platform
          </h3>
          <div className="space-y-3">
            {websiteData.platformDistribution.map((platform, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 dark:text-white">{platform.platform}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {platform.citations} ({platform.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full"
                    style={{ width: `${platform.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Content Optimization Recommendations
        </h3>
        <div className="space-y-3">
          {websiteData.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  rec.priority === "high"
                    ? "bg-red-500"
                    : rec.priority === "medium"
                    ? "bg-orange-500"
                    : "bg-blue-500"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{rec.title}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                    {rec.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
