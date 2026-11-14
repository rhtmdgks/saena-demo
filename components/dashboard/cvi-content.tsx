"use client"

const modelData = [
  { model: 'ChatGPT', language: 'EN', visibility: 0.89, consistency: 0.92, penetration: 0.87 },
  { model: 'ChatGPT', language: 'KO', visibility: 0.85, consistency: 0.88, penetration: 0.82 },
]

export default function CVIContent() {
  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-gray-500 dark:text-gray-400">측정 전 · ChatGPT Search 검증 자료가 없습니다. --는 0점이나 성과 없음이 아닙니다.</p>
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">CVI — Cognitive Visibility Index</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Visibility, Context Consistency, Knowledge Penetration Analysis
        </p>
      </div>

      {/* Model Heatmap */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Model × Language Visibility Heatmap</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Model</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Language</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Visibility</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Consistency</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Penetration</th>
              </tr>
            </thead>
            <tbody>
              {modelData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-[#1F1F23]">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{"--"}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{row.language}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-accent-green rounded-full"
                          style={{ width: "0%" }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
                        {"--"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-[#00D9FF] rounded-full"
                          style={{ width: "0%" }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
                        {"--"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-[#7C3AED] rounded-full"
                          style={{ width: "0%" }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-10 text-right">
                        {"--"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CVI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Visibility</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">--</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Brand mention rate × Semantic match</div>
          <div className="mt-3 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
            <div className="h-full bg-accent-green rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Context Consistency</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">--</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Tone & semantic consistency across models</div>
          <div className="mt-3 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
            <div className="h-full bg-[#00D9FF] rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Knowledge Penetration</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">--</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Probability of existence in embedding space</div>
          <div className="mt-3 h-2 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
            <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
      </div>

      {/* Source Definition */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Model & Data Governance</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-green mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Source Definition</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                ChatGPT Search · 관측 전
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00D9FF] mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Bias Calibration</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                편향 보정 효과는 검증 전입니다.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Metric Formula Registry</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Vis = Mentions/All × Mean(cos_sim)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
