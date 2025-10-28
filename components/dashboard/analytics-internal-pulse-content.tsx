"use client"

export default function AnalyticsInternalPulseContent() {
  const teamMetrics = [
    { team: "Content Team", productivity: 88, satisfaction: 92, output: 145 },
    { team: "Marketing Team", productivity: 85, satisfaction: 88, output: 132 },
    { team: "Product Team", productivity: 90, satisfaction: 90, output: 98 },
    { team: "Analytics Team", productivity: 92, satisfaction: 94, output: 87 }
  ]

  const initiatives = [
    { name: "PA++++ Education Campaign", status: "active", progress: 78, impact: "high" },
    { name: "Competitor Analysis Project", status: "active", progress: 65, impact: "high" },
    { name: "User Review Collection", status: "active", progress: 92, impact: "medium" },
    { name: "Influencer Partnerships", status: "planning", progress: 35, impact: "high" },
    { name: "Content Localization", status: "planning", progress: 28, impact: "medium" }
  ]

  const kpis = [
    { metric: "Content Production", value: "145", unit: "pieces/month", trend: "+12%" },
    { metric: "Campaign ROI", value: "3.8x", unit: "return", trend: "+0.5x" },
    { metric: "Team Efficiency", value: "89%", unit: "score", trend: "+5%" },
    { metric: "Quality Score", value: "91", unit: "/100", trend: "+3" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Internal Pulse</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Internal team performance and initiative tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{kpi.metric}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{kpi.unit}</p>
            </div>
            <p className="text-xs text-accent-green-glow mt-1">{kpi.trend}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Performance</h3>
        <div className="space-y-4">
          {teamMetrics.map((team, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{team.team}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Productivity</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{team.productivity}%</p>
                  <div className="mt-2 h-1.5 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                    <div className="h-full bg-accent-green rounded-full" style={{ width: `${team.productivity}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Satisfaction</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{team.satisfaction}%</p>
                  <div className="mt-2 h-1.5 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${team.satisfaction}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Output</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{team.output}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">items/month</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Initiatives</h3>
        <div className="space-y-3">
          {initiatives.map((initiative, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{initiative.name}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    initiative.status === "active" 
                      ? "bg-accent-green/10 text-accent-green" 
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}>
                    {initiative.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    initiative.impact === "high"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                  }`}>
                    {initiative.impact} impact
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div className="h-full bg-accent-green rounded-full" style={{ width: `${initiative.progress}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                  {initiative.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
