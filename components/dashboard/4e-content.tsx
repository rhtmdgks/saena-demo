"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const fourEData = [
  { name: 'Experience', value: 82, color: '#4C8EFF' },
  { name: 'Exchange', value: 68, color: '#00D9FF' },
  { name: 'Evangelism', value: 75, color: '#7C3AED' },
  { name: 'Everyplace', value: 71, color: '#10B981' },
]

const emotionData = [
  { emotion: '기대', value: 35, color: '#4C8EFF' },
  { emotion: '신뢰', value: 28, color: '#00D9FF' },
  { emotion: '만족', value: 22, color: '#10B981' },
  { emotion: '추천', value: 15, color: '#7C3AED' },
]

export default function FourEContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">4E Insight — Experience Value Map</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Experience, Exchange, Evangelism, Everyplace 가치 분석
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">4E Value Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fourEData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F1F23', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {fourEData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Emotion Distribution</h3>
        <div className="space-y-4">
          {emotionData.map((item) => (
            <div key={item.emotion} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.emotion}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${item.value}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Experience Ratio</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">82%</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">체험형 문장 비율</div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Exchange Index</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">0.68</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">교환가치 언급률</div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Evangelism Rate</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">75%</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">추천/신뢰 비율</div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Everyplace Index</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">0.71</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">접점 다양성</div>
        </div>
      </div>
    </div>
  )
}
