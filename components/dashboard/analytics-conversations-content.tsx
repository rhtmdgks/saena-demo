"use client"

import { useState } from "react"
import { MessageSquare, Search, Filter, TrendingUp, Star, AlertCircle, ChevronRight } from "lucide-react"

const conversationsData = {
  conversations: [
    {
      id: "conv-001",
      platform: "ChatGPT",
      timestamp: "2025-10-18T14:30:00Z",
      userQuery: "What's the best Korean sunscreen for sensitive skin that doesn't leave white cast?",
      aiResponse: "For sensitive skin without white cast, I'd recommend **suelo Daily PA++++ SPF50+**. It's specifically formulated for sensitive skin and is known for its lightweight water-gel texture that leaves no white cast, even on deeper skin tones. Other excellent options include Beauty of Joseon Relief Sun and Round Lab Birch Juice Sunscreen.",
      sentiment: 0.92,
      intent: "product_inquiry",
      brandMentions: 1,
      competitorMentions: 2
    },
    {
      id: "conv-002",
      platform: "Perplexity",
      timestamp: "2025-10-18T13:15:00Z",
      userQuery: "suelo sunscreen vs beauty of joseon which is better?",
      aiResponse: "Both are excellent K-beauty sunscreens. **Suelo** excels in: no white cast on all skin tones, PA++++ protection, and makeup compatibility. **Beauty of Joseon** is known for: rice extract benefits and dewy finish. For sensitive skin and makeup wearers, suelo might be preferable. For dry skin seeking extra hydration, Beauty of Joseon could be better.",
      sentiment: 0.88,
      intent: "comparison",
      brandMentions: 2,
      competitorMentions: 2
    },
    {
      id: "conv-003",
      platform: "Claude",
      timestamp: "2025-10-18T12:00:00Z",
      userQuery: "What does PA++++ mean in sunscreen?",
      aiResponse: "PA++++ is the highest rating in the Japanese/Korean sun protection system, indicating very high UVA protection. The '+' symbols show protection levels: PA+ (some), PA++ (moderate), PA+++ (high), PA++++ (very high). Brands like **suelo**, Beauty of Joseon, and Round Lab often feature PA++++ in their formulations, offering superior protection against UVA rays that cause aging and pigmentation.",
      sentiment: 0.85,
      intent: "ingredient_question",
      brandMentions: 1,
      competitorMentions: 2
    },
    {
      id: "conv-004",
      platform: "ChatGPT",
      timestamp: "2025-10-18T11:30:00Z",
      userQuery: "How to reapply sunscreen over makeup?",
      aiResponse: "To reapply sunscreen over makeup: 1) Use a cushion or spray sunscreen, 2) Pat gently with a beauty sponge, 3) Use powder sunscreen for touch-ups. **Suelo's** lightweight formula is particularly makeup-friendly and can be patted over makeup without disturbing it. Alternatively, use a setting spray with SPF or a powder sunscreen for quick reapplication.",
      sentiment: 0.90,
      intent: "how_to",
      brandMentions: 1,
      competitorMentions: 0
    },
    {
      id: "conv-005",
      platform: "Google AI Overviews",
      timestamp: "2025-10-18T10:45:00Z",
      userQuery: "Best sunscreen for oily acne-prone skin",
      aiResponse: "For oily, acne-prone skin, look for: oil-free, non-comedogenic, lightweight formulas. Top recommendations: **Suelo Daily PA++++** (water-gel texture, sebum control), La Roche-Posay Anthelios (mattifying), and COSRX Aloe Soothing Sun Cream (calming). Avoid heavy, greasy formulas and look for ingredients like niacinamide and centella.",
      sentiment: 0.87,
      intent: "skin_type_recommendation",
      brandMentions: 1,
      competitorMentions: 2
    },
    {
      id: "conv-006",
      platform: "Perplexity",
      timestamp: "2025-10-18T09:20:00Z",
      userQuery: "Is suelo sunscreen reef safe?",
      aiResponse: "**Suelo sunscreen** uses hybrid filters (combination of chemical and physical) that are generally considered reef-safer than traditional chemical filters like oxybenzone and octinoxate. While not 100% mineral, suelo avoids the most harmful ingredients. For maximum reef safety, look for 100% mineral sunscreens with zinc oxide or titanium dioxide.",
      sentiment: 0.75,
      intent: "ingredient_question",
      brandMentions: 2,
      competitorMentions: 0
    }
  ],
  intentDistribution: [
    { intent: "Product Inquiry", percentage: 35, count: 420 },
    { intent: "Comparison", percentage: 28, count: 336 },
    { intent: "Ingredient Question", percentage: 18, count: 216 },
    { intent: "How-to", percentage: 12, count: 144 },
    { intent: "Skin Type Recommendation", percentage: 7, count: 84 }
  ],
  sentimentTrend: [
    { date: "Oct 12", positive: 78, neutral: 18, negative: 4 },
    { date: "Oct 13", positive: 80, neutral: 16, negative: 4 },
    { date: "Oct 14", positive: 82, neutral: 15, negative: 3 },
    { date: "Oct 15", positive: 83, neutral: 14, negative: 3 },
    { date: "Oct 16", positive: 84, neutral: 13, negative: 3 },
    { date: "Oct 17", positive: 85, neutral: 13, negative: 2 },
    { date: "Oct 18", positive: 86, neutral: 12, negative: 2 }
  ],
  commonQuestions: [
    "Best Korean sunscreen for sensitive skin",
    "Sunscreen without white cast",
    "PA++++ meaning",
    "Suelo vs Beauty of Joseon",
    "How to reapply sunscreen over makeup",
    "Best sunscreen for oily skin",
    "Reef safe sunscreen",
    "Water resistant sunscreen",
    "Sunscreen for acne prone skin",
    "Makeup compatible sunscreen"
  ]
}

export default function AnalyticsConversationsContent() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [filterPlatform, setFilterPlatform] = useState<string>("all")
  const [filterIntent, setFilterIntent] = useState<string>("all")

  const filteredConversations = conversationsData.conversations.filter(conv => {
    if (filterPlatform !== "all" && conv.platform !== filterPlatform) return false
    if (filterIntent !== "all" && conv.intent !== filterIntent) return false
    return true
  })

  const selectedConv = conversationsData.conversations.find(c => c.id === selectedConversation)

  const getIntentLabel = (intent: string) => {
    return intent.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.8) return "text-accent-green-glow"
    if (sentiment >= 0.6) return "text-blue-500"
    return "text-orange-500"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Conversations Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Analyze actual AI conversations mentioning your brand
        </p>
      </div>

      {/* Stats Overview - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: MessageSquare, label: "Total Conversations", value: "1,200", change: "+18% this week", color: "from-blue-500/20 to-blue-500/10" },
          { icon: Star, label: "Avg Sentiment", value: "0.86", change: "+0.08 improvement", color: "from-yellow-500/20 to-yellow-500/10" },
          { icon: TrendingUp, label: "Brand Mentions", value: "1,450", change: "+22% increase", color: "from-accent-green/20 to-accent-green/10" },
          { icon: AlertCircle, label: "Positive Rate", value: "86%", change: "+4% improvement", color: "from-purple-500/20 to-purple-500/10" }
        ].map((stat, index) => (
          <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-5 border border-gray-200/50 dark:border-[#1F1F23] hover:border-accent-green/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent-green/10 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5 text-accent-green" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
              <p className="text-3xl font-black bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-accent-green">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2B2B30] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-green"
            />
          </div>
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2B2B30] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-green"
          >
            <option value="all">All Platforms</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Claude">Claude</option>
            <option value="Perplexity">Perplexity</option>
            <option value="Google AI Overviews">Google AI Overviews</option>
          </select>
          <select
            value={filterIntent}
            onChange={(e) => setFilterIntent(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#2B2B30] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-green"
          >
            <option value="all">All Intents</option>
            <option value="product_inquiry">Product Inquiry</option>
            <option value="comparison">Comparison</option>
            <option value="ingredient_question">Ingredient Question</option>
            <option value="how_to">How-to</option>
            <option value="skin_type_recommendation">Skin Type Recommendation</option>
          </select>
        </div>
      </div>

      {/* Conversations List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations List */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Conversations ({filteredConversations.length})
            </h3>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 border-b border-gray-100 dark:border-[#1F1F23] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors ${
                  selectedConversation === conv.id ? "bg-gray-50 dark:bg-[#1F1F23]" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                      {conv.platform}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(conv.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {conv.userQuery}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    {getIntentLabel(conv.intent)}
                  </span>
                  <span className={getSentimentColor(conv.sentiment)}>
                    Sentiment: {(conv.sentiment * 100).toFixed(0)}%
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {conv.brandMentions} mentions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Detail */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Conversation Detail
            </h3>
          </div>
          <div className="p-6 overflow-y-auto max-h-[600px]">
            {selectedConv ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      User Query
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(selectedConv.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-[#1F1F23] p-4 rounded-lg">
                    {selectedConv.userQuery}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-green/10 text-accent-green">
                      {selectedConv.platform} Response
                    </span>
                  </div>
                  <div
                    className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-[#1F1F23] p-4 rounded-lg"
                    dangerouslySetInnerHTML={{
                      __html: selectedConv.aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent-green">$1</strong>')
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Intent</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {getIntentLabel(selectedConv.intent)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sentiment</p>
                    <p className={`text-sm font-medium ${getSentimentColor(selectedConv.sentiment)}`}>
                      {(selectedConv.sentiment * 100).toFixed(0)}% Positive
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Brand Mentions</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedConv.brandMentions}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Competitor Mentions</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedConv.competitorMentions}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p className="text-sm">Select a conversation to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Intent Distribution & Common Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Intent Distribution
          </h3>
          <div className="space-y-3">
            {conversationsData.intentDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 dark:text-white">{item.intent}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.percentage}% ({item.count})
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Questions
          </h3>
          <div className="space-y-2">
            {conversationsData.commonQuestions.map((question, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors"
              >
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-6">
                  #{index + 1}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">{question}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
