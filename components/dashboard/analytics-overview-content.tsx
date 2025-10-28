"use client"

import { TrendingUp, TrendingDown, Users, Zap, Target, Award, BarChart3, PieChart, Activity, AlertTriangle } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Cell } from "recharts"

const professionalMetrics = {
  // Executive Summary Metrics
  executiveSummary: {
    avi: { value: 89.8, change: 12.3, benchmark: 75.2, percentile: 92 },
    shareOfVoice: { value: 18.5, change: 2.3, competitors: 15.2 },
    brandHealth: { value: 87, change: 5, components: { awareness: 92, consideration: 85, preference: 82, loyalty: 78 } },
    roi: { value: 3.8, change: 0.5, investment: 124000, return: 471200 }
  },
  
  // Performance Indicators
  performanceMatrix: [
    { metric: "Query Coverage", current: 94, target: 95, status: "on-track", category: "Reach" },
    { metric: "Response Accuracy", current: 91, target: 90, status: "exceeding", category: "Quality" },
    { metric: "Citation Quality Score", current: 88, target: 85, status: "exceeding", category: "Authority" },
    { metric: "Engagement Rate", current: 76, target: 80, status: "needs-attention", category: "Engagement" },
    { metric: "Conversion Attribution", current: 12.5, target: 15, status: "needs-attention", category: "Impact" }
  ],
  
  // Competitive Intelligence
  competitivePosition: {
    marketShare: 18.5,
    rank: 2,
    totalCompetitors: 50,
    gapToLeader: 3.2,
    gapToFollower: 1.6,
    momentum: "gaining"
  },
  
  // Channel Performance
  channelMix: [
    { channel: "ChatGPT", visibility: 95, volume: 38.2, quality: 94, efficiency: 92 },
    { channel: "Perplexity", visibility: 92, volume: 25.8, quality: 90, efficiency: 88 },
    { channel: "Claude", visibility: 91, volume: 21.5, quality: 92, efficiency: 90 },
    { channel: "Gemini", visibility: 88, volume: 14.5, quality: 89, efficiency: 85 }
  ],
  
  // Trend Analysis
  trendData: [
    { week: "W1", avi: 79.2, sov: 15.2, engagement: 68, conversions: 420 },
    { week: "W2", avi: 82.1, sov: 16.1, engagement: 71, conversions: 485 },
    { week: "W3", avi: 85.4, sov: 17.3, engagement: 74, conversions: 520 },
    { week: "W4", avi: 87.9, sov: 17.9, engagement: 76, conversions: 545 },
    { week: "W5", avi: 89.8, sov: 18.5, engagement: 78, conversions: 580 }
  ],
  
  // Risk & Opportunities
  insights: [
    { type: "opportunity", priority: "high", title: "Expand PA++++ Content", impact: "+15% visibility", confidence: 92 },
    { type: "risk", priority: "medium", title: "Competitor Round Lab Gaining", impact: "-2% share", confidence: 78 },
    { type: "opportunity", priority: "high", title: "Perplexity Growth Trend", impact: "+8% reach", confidence: 88 },
    { type: "achievement", priority: "low", title: "Exceeded Q4 Targets", impact: "112% of goal", confidence: 100 }
  ]
}

export default function AnalyticsOverviewContent() {
  const COLORS = ['#84cc16', '#3b82f6', '#8b5cf6', '#f59e0b']
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Analytics Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Executive dashboard with key performance indicators and strategic insights
        </p>
      </div>

      {/* Executive Summary - 4 Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* AVI Score */}
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Answer Visibility Index</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-gray-900 dark:text-white">{professionalMetrics.executiveSummary.avi.value}</p>
                <span className="text-sm font-bold text-accent-green">+{professionalMetrics.executiveSummary.avi.change}%</span>
              </div>
            </div>
            <Target className="h-8 w-8 text-accent-green/30" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">vs Benchmark</span>
              <span className="font-medium text-gray-900 dark:text-white">{professionalMetrics.executiveSummary.avi.benchmark}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Percentile Rank</span>
              <span className="font-medium text-accent-green">{professionalMetrics.executiveSummary.avi.percentile}th</span>
            </div>
          </div>
        </div>

        {/* Share of Voice */}
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Share of Voice</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-gray-900 dark:text-white">{professionalMetrics.executiveSummary.shareOfVoice.value}%</p>
                <span className="text-sm font-bold text-accent-green">+{professionalMetrics.executiveSummary.shareOfVoice.change}%</span>
              </div>
            </div>
            <PieChart className="h-8 w-8 text-blue-500/30" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Competitor Avg</span>
              <span className="font-medium text-gray-900 dark:text-white">{professionalMetrics.executiveSummary.shareOfVoice.competitors}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-accent-green rounded-full" style={{ width: `${professionalMetrics.executiveSummary.shareOfVoice.value * 5}%` }} />
            </div>
          </div>
        </div>

        {/* Brand Health */}
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Brand Health Index</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-gray-900 dark:text-white">{professionalMetrics.executiveSummary.brandHealth.value}</p>
                <span className="text-sm font-bold text-accent-green">+{professionalMetrics.executiveSummary.brandHealth.change}</span>
              </div>
            </div>
            <Activity className="h-8 w-8 text-purple-500/30" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(professionalMetrics.executiveSummary.brandHealth.components).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 capitalize">{key.slice(0, 4)}</span>
                <span className="font-medium text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROI */}
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Marketing ROI</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-gray-900 dark:text-white">{professionalMetrics.executiveSummary.roi.value}x</p>
                <span className="text-sm font-bold text-accent-green">+{professionalMetrics.executiveSummary.roi.change}x</span>
              </div>
            </div>
            <Award className="h-8 w-8 text-yellow-500/30" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Investment</span>
              <span className="font-medium text-gray-900 dark:text-white">${(professionalMetrics.executiveSummary.roi.investment / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Return</span>
              <span className="font-medium text-accent-green">${(professionalMetrics.executiveSummary.roi.return / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Matrix & Competitive Position */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Matrix */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Performance Matrix</h3>
          <div className="space-y-4">
            {professionalMetrics.performanceMatrix.map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      item.status === 'exceeding' ? 'bg-accent-green' :
                      item.status === 'on-track' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.metric}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1F1F23] text-gray-600 dark:text-gray-400">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{item.current}%</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">/ {item.target}%</span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === 'exceeding' ? 'bg-gradient-to-r from-accent-green to-green-400' :
                      item.status === 'on-track' ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                      'bg-gradient-to-r from-orange-500 to-orange-400'
                    }`}
                    style={{ width: `${(item.current / item.target) * 100}%` }}
                  />
                  <div className="absolute top-0 h-full w-0.5 bg-gray-400 dark:bg-gray-600" style={{ left: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Position */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Market Position</h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent-green/20 to-accent-green/10 mb-3">
                <div className="text-4xl font-black text-accent-green">#{professionalMetrics.competitivePosition.rank}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">out of {professionalMetrics.competitivePosition.totalCompetitors} brands</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
                <span className="text-xs text-gray-600 dark:text-gray-400">Market Share</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{professionalMetrics.competitivePosition.marketShare}%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
                <span className="text-xs text-gray-600 dark:text-gray-400">Gap to Leader</span>
                <span className="text-sm font-bold text-orange-500">-{professionalMetrics.competitivePosition.gapToLeader}%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
                <span className="text-xs text-gray-600 dark:text-gray-400">Lead over #3</span>
                <span className="text-sm font-bold text-accent-green">+{professionalMetrics.competitivePosition.gapToFollower}%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent-green/10">
                <span className="text-xs font-medium text-accent-green">Momentum</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-accent-green" />
                  <span className="text-sm font-bold text-accent-green capitalize">{professionalMetrics.competitivePosition.momentum}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Metric Trend Analysis */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-8 border border-gray-200/50 dark:border-[#1F1F23] shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Multi-Metric Trend Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">5-week performance across key indicators</p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-green" />
              <span className="text-gray-600 dark:text-gray-400">AVI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">SOV</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-gray-600 dark:text-gray-400">Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-gray-600 dark:text-gray-400">Conversions</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={professionalMetrics.trendData}>
              <defs>
                <linearGradient id="colorAvi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSov" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)", border: "none", borderRadius: "12px", color: "#fff" }} />
              <Area type="monotone" dataKey="avi" stroke="#84cc16" strokeWidth={3} fill="url(#colorAvi)" />
              <Area type="monotone" dataKey="sov" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSov)" />
              <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Performance & Strategic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Mix Analysis */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Channel Performance Matrix</h3>
          <div className="space-y-4">
            {professionalMetrics.channelMix.map((channel, index) => (
              <div key={index} className="p-4 rounded-xl bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{channel.channel}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green font-medium">
                    {channel.volume}% volume
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Visibility</div>
                    <div className="font-bold text-gray-900 dark:text-white">{channel.visibility}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Quality</div>
                    <div className="font-bold text-gray-900 dark:text-white">{channel.quality}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Efficiency</div>
                    <div className="font-bold text-gray-900 dark:text-white">{channel.efficiency}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Insights */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0F0F12] dark:to-[#1A1A1F] rounded-2xl p-6 border border-gray-200/50 dark:border-[#1F1F23] shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Strategic Insights</h3>
          <div className="space-y-3">
            {professionalMetrics.insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 ${
                insight.type === 'opportunity' ? 'bg-accent-green/5 border-accent-green' :
                insight.type === 'risk' ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-500' :
                'bg-blue-50 dark:bg-blue-900/10 border-blue-500'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {insight.type === 'opportunity' ? <Zap className="h-4 w-4 text-accent-green" /> :
                     insight.type === 'risk' ? <AlertTriangle className="h-4 w-4 text-orange-500" /> :
                     <Award className="h-4 w-4 text-blue-500" />}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      insight.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      insight.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{insight.confidence}% confidence</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Expected impact: <span className="font-medium text-gray-900 dark:text-white">{insight.impact}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
