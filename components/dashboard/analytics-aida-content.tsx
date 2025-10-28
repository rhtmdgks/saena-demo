"use client"

// AIDA+ = Attention, Interest, Desire, Action + Analytics
export default function AnalyticsAIDAContent() {
  const aidaData = {
    attention: { score: 92, reach: 45000, impressions: 125000, change: 15 },
    interest: { score: 85, engagement: 38000, avgTime: "3:45", change: 12 },
    desire: { score: 78, consideration: 28000, wishlist: 8500, change: 18 },
    action: { score: 72, conversions: 5400, revenue: "$124K", change: 22 }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">AIDA+ Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Attention, Interest, Desire, Action funnel analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(aidaData).map(([stage, data], index) => (
          <div key={index} className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">{stage}</h3>
            <p className="text-4xl font-bold text-accent-green mb-2">{data.score}</p>
            <div className="space-y-2 text-sm">
              {Object.entries(data).filter(([key]) => key !== 'score' && key !== 'change').map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-accent-green-glow mt-3">+{data.change}% vs last period</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Funnel Visualization</h3>
        <div className="space-y-3">
          {Object.entries(aidaData).map(([stage, data], index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{stage}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{data.score}%</span>
              </div>
              <div className="h-12 bg-gray-200 dark:bg-[#1F1F23] rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-green to-accent-green/70 flex items-center justify-center text-white font-medium text-sm"
                  style={{ width: `${data.score}%` }}
                >
                  {data.score}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
