"use client"

// EDA+ = Emotional Depth Analysis
export default function AnalyticsEDAContent() {
  const emotions = [
    { emotion: "Joy", score: 45, mentions: 5400, trend: "up" },
    { emotion: "Trust", score: 38, mentions: 4560, trend: "up" },
    { emotion: "Anticipation", score: 30, mentions: 3600, trend: "up" },
    { emotion: "Surprise", score: 22, mentions: 2640, trend: "stable" },
    { emotion: "Sadness", score: 12, mentions: 1440, trend: "down" },
    { emotion: "Fear", score: 10, mentions: 1200, trend: "down" },
    { emotion: "Anger", score: 7, mentions: 840, trend: "down" },
    { emotion: "Disgust", score: 4, mentions: 480, trend: "down" }
  ]

  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-gray-500 dark:text-gray-400">측정 전 · ChatGPT Search 검증 자료가 없습니다. --는 0점이나 성과 없음이 아닙니다.</p>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">EDA+ Analytics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Emotional Depth Analysis - Understanding user emotions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {emotions.slice(0, 4).map((item, index) => (
          <div key={index} className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.emotion}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{"--"}%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{"--"} mentions</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emotion Distribution</h3>
        <div className="space-y-3">
          {emotions.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-900 dark:text-white">{item.emotion}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{"--"}</span>
                  <span className={`text-xs ${item.trend === "up" ? "text-accent-green" : item.trend === "down" ? "text-red-500" : "text-gray-500"}`}>
                    {"--"}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    ["Joy", "Trust", "Anticipation", "Surprise"].includes(item.emotion)
                      ? "bg-accent-green"
                      : "bg-red-500"
                  }`}
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emotional Insights</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-accent-green/10">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Emotion Analysis</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">

              검증된 관측 자료가 없어 감정 분포를 평가하지 않습니다.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Negative Sentiment</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">

              검증된 관측 자료가 없어 산업 평균과 비교하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
