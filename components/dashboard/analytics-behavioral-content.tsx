"use client"

export default function AnalyticsBehavioralContent() {
  const behaviors = [
    { pattern: "Research-Driven", percentage: 42, users: 18900, avgQueries: 8.5 },
    { pattern: "Quick Decision", percentage: 28, users: 12600, avgQueries: 2.3 },
    { pattern: "Comparison Shoppers", percentage: 18, users: 8100, avgQueries: 12.4 },
    { pattern: "Brand Loyal", percentage: 12, users: 5400, avgQueries: 1.8 }
  ]

  const actions = [
    { action: "Product Page Views", count: 45000, conversion: 12.5 },
    { action: "Review Reading", count: 38000, conversion: 18.2 },
    { action: "Comparison Checks", count: 28000, conversion: 22.8 },
    { action: "Ingredient Research", count: 24000, conversion: 15.4 },
    { action: "Add to Cart", count: 8500, conversion: 63.5 },
    { action: "Purchase", count: 5400, conversion: 100 }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Behavioral Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          User behavior patterns and action analysis
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Behavior Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {behaviors.map((behavior, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{behavior.pattern}</h4>
                <span className="text-lg font-bold text-accent-green">{behavior.percentage}%</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Users:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{behavior.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Avg Queries:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{behavior.avgQueries}</span>
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                <div className="h-full bg-accent-green rounded-full" style={{ width: `${behavior.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Actions & Conversion</h3>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-900 dark:text-white">{action.action}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{action.count.toLocaleString()}</span>
                  <span className="text-sm font-medium text-accent-green">{action.conversion}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                <div className="h-full bg-accent-green rounded-full" style={{ width: `${action.conversion}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Session Duration</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">4:32</p>
          <p className="text-xs text-accent-green-glow mt-1">+18% vs last month</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pages per Session</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">6.8</p>
          <p className="text-xs text-accent-green-glow mt-1">+12% vs last month</p>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Return Rate</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">42%</p>
          <p className="text-xs text-accent-green-glow mt-1">+8% vs last month</p>
        </div>
      </div>
    </div>
  )
}
