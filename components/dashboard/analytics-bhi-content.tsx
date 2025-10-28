"use client"

// BHI = Brand Health Index
export default function AnalyticsBHIContent() {
  const healthMetrics = {
    overall: 87,
    awareness: 92,
    consideration: 85,
    preference: 82,
    loyalty: 78,
    advocacy: 84
  }

  const dimensions = [
    { name: "Brand Awareness", score: 92, benchmark: 78, status: "excellent" },
    { name: "Brand Consideration", score: 85, benchmark: 72, status: "good" },
    { name: "Brand Preference", score: 82, benchmark: 68, status: "good" },
    { name: "Brand Loyalty", score: 78, benchmark: 65, status: "good" },
    { name: "Brand Advocacy", score: 84, benchmark: 70, status: "excellent" },
    { name: "Brand Trust", score: 88, benchmark: 75, status: "excellent" }
  ]

  const competitors = [
    { name: "suelo", score: 87, rank: 2 },
    { name: "Beauty of Joseon", score: 91, rank: 1 },
    { name: "Round Lab", score: 85, rank: 3 },
    { name: "Aestura", score: 82, rank: 4 },
    { name: "La Roche-Posay", score: 80, rank: 5 }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">BHI Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Brand Health Index - Comprehensive brand strength measurement
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-8 border border-gray-200 dark:border-[#1F1F23] text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Brand Health Index</p>
        <p className="text-6xl font-bold text-accent-green mb-2">{healthMetrics.overall}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Strong Brand Health</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(healthMetrics).filter(([key]) => key !== 'overall').map(([key, value]) => (
          <div key={key} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 capitalize">{key}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Dimensions vs Benchmark</h3>
        <div className="space-y-4">
          {dimensions.map((dim, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{dim.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">vs {dim.benchmark}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    dim.status === "excellent" ? "bg-accent-green/10 text-accent-green" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}>
                    {dim.status}
                  </span>
                </div>
              </div>
              <div className="relative h-8 bg-gray-200 dark:bg-[#1F1F23] rounded-lg overflow-hidden">
                <div className="absolute h-full bg-gray-300 dark:bg-gray-700" style={{ width: `${dim.benchmark}%` }} />
                <div className="absolute h-full bg-accent-green" style={{ width: `${dim.score}%` }} />
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-xs font-medium text-white">Your Brand: {dim.score}</span>
                  <span className="text-xs text-white/70">Industry: {dim.benchmark}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Competitive Positioning</h3>
        <div className="space-y-3">
          {competitors.map((comp, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 w-8">#{comp.rank}</span>
                <span className={`text-sm font-medium ${comp.name === "suelo" ? "text-accent-green" : "text-gray-900 dark:text-white"}`}>
                  {comp.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${comp.name === "suelo" ? "bg-accent-green" : "bg-gray-400"}`} style={{ width: `${comp.score}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8">{comp.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
