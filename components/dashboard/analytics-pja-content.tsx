"use client"

// PJA = Purchase Journey Analysis
export default function AnalyticsPJAContent() {
  const journeyStages = [
    { stage: "Awareness", users: 45000, conversion: 84, avgTime: "0:45", dropoff: 16 },
    { stage: "Consideration", users: 37800, conversion: 74, avgTime: "2:30", dropoff: 26 },
    { stage: "Evaluation", users: 27972, conversion: 65, avgTime: "4:15", dropoff: 35 },
    { stage: "Purchase Intent", users: 18182, conversion: 48, avgTime: "1:20", dropoff: 52 },
    { stage: "Purchase", users: 8727, conversion: 100, avgTime: "0:30", dropoff: 0 }
  ]

  const touchpoints = [
    { name: "AI Search", influence: 92, interactions: 38000 },
    { name: "Product Reviews", influence: 88, interactions: 28000 },
    { name: "Social Media", influence: 82, interactions: 24000 },
    { name: "Comparison Sites", influence: 78, interactions: 18000 },
    { name: "Brand Website", influence: 85, interactions: 15000 }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">PJA Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Purchase Journey Analysis - Track user path to conversion
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Journey Funnel</h3>
        <div className="space-y-4">
          {journeyStages.map((stage, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{stage.stage}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                    {stage.users.toLocaleString()} users
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Avg: {stage.avgTime}</span>
                  <span className={stage.dropoff > 0 ? "text-red-500" : "text-accent-green"}>
                    {stage.dropoff > 0 ? `${stage.dropoff}% dropoff` : "Complete"}
                  </span>
                </div>
              </div>
              <div className="h-16 bg-gray-200 dark:bg-[#1F1F23] rounded-lg overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-accent-green to-accent-green/70 flex items-center justify-center text-white font-medium"
                  style={{ width: `${stage.conversion}%` }}
                >
                  {stage.conversion}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Touchpoints</h3>
          <div className="space-y-3">
            {touchpoints.map((touchpoint, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 dark:text-white">{touchpoint.name}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {touchpoint.influence}% influence
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div className="h-full bg-accent-green rounded-full" style={{ width: `${touchpoint.influence}%` }} />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {touchpoint.interactions.toLocaleString()} interactions
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Journey Insights</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-accent-green/10">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Strong Awareness</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                84% conversion from Awareness to Consideration shows effective brand messaging.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Evaluation Bottleneck</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                35% drop-off at Evaluation stage. Consider adding more comparison content and reviews.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">AI Search Impact</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                92% influence score for AI Search indicates strong discovery channel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
