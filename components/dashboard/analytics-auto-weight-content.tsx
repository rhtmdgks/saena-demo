"use client"

export default function AnalyticsAutoWeightContent() {
  const weights = [
    { metric: "Brand Visibility", current: 25, recommended: 28, impact: "high", adjustment: "+3" },
    { metric: "Sentiment Score", current: 20, recommended: 22, impact: "high", adjustment: "+2" },
    { metric: "Citation Quality", current: 18, recommended: 20, impact: "medium", adjustment: "+2" },
    { metric: "Platform Coverage", current: 15, recommended: 12, impact: "low", adjustment: "-3" },
    { metric: "Engagement Rate", current: 12, recommended: 10, impact: "medium", adjustment: "-2" },
    { metric: "Conversion Rate", current: 10, recommended: 8, impact: "low", adjustment: "-2" }
  ]

  const scenarios = [
    { name: "Current Weights", score: 87.5, description: "Your current metric weighting" },
    { name: "Recommended Weights", score: 91.2, description: "AI-optimized weighting for your goals" },
    { name: "Competitor Average", score: 82.3, description: "Industry standard weighting" },
    { name: "Growth Focused", score: 89.8, description: "Optimized for rapid growth" }
  ]

  const recommendations = [
    {
      priority: "high",
      title: "Increase Brand Visibility Weight",
      description: "Your visibility is outperforming other metrics. Increase weight from 25% to 28% to better reflect this strength.",
      expectedImpact: "+3.7 points"
    },
    {
      priority: "high",
      title: "Boost Sentiment Score Weight",
      description: "Positive sentiment is a key differentiator. Increase from 20% to 22% to capitalize on this advantage.",
      expectedImpact: "+2.1 points"
    },
    {
      priority: "medium",
      title: "Reduce Platform Coverage Weight",
      description: "You've achieved good platform coverage. Reduce weight from 15% to 12% to focus on quality over quantity.",
      expectedImpact: "+1.8 points"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Auto-Weight Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          AI-powered metric weighting optimization
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current vs Recommended Weights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-optimized weighting for maximum performance</p>
          </div>
          <button className="px-4 py-2 bg-accent-green text-black rounded-lg text-sm font-medium hover:bg-accent-green/90 transition-colors">
            Apply Recommended
          </button>
        </div>
        <div className="space-y-4">
          {weights.map((weight, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{weight.metric}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{weight.impact} impact metric</p>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  weight.adjustment.startsWith("+") 
                    ? "bg-accent-green/10 text-accent-green" 
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                }`}>
                  {weight.adjustment}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: `${weight.current * 3.33}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-10">{weight.current}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Recommended</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                      <div className="h-full bg-accent-green rounded-full" style={{ width: `${weight.recommended * 3.33}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-10">{weight.recommended}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((scenario, index) => (
          <div key={index} className={`rounded-xl p-5 border ${
            scenario.name === "Recommended Weights"
              ? "bg-accent-green/10 border-accent-green"
              : "bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23]"
          }`}>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{scenario.name}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{scenario.score}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{scenario.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Optimization Recommendations</h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23]">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    rec.priority === "high" ? "bg-red-500" : "bg-orange-500"
                  }`} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green whitespace-nowrap">
                  {rec.expectedImpact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About Auto-Weight</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Auto-Weight uses machine learning to analyze your brand's performance across all metrics and recommends optimal weighting to maximize your overall score. The system considers your strengths, industry benchmarks, and competitive positioning to suggest adjustments.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Potential Score Improvement:</span>
          <span className="text-xl font-bold text-accent-green">+3.7 points</span>
          <span className="text-gray-600 dark:text-gray-400">(87.5 → 91.2)</span>
        </div>
      </div>
    </div>
  )
}
