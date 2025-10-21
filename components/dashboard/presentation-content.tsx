import { Globe, MapPin, Target } from "lucide-react";

export default function PresentationContent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-white mb-2">TAM–SAM–SOM</h1>
        <p className="text-lg text-gray-400">시장 규모 및 점유 목표</p>
      </div>

      {/* TAM Section */}
      <div className="w-full max-w-5xl">
        <div
          className="relative rounded-2xl p-8 border backdrop-blur-xl"
          style={{
            background: "rgba(31, 31, 35, 0.6)",
            borderColor: "rgba(198, 255, 58, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-[#1F1F23]">
              <Globe className="h-6 w-6 text-accent-green" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">TAM</h2>
              <p className="text-sm text-gray-400">Total Addressable Market</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-300">
              글로벌 AI 마케팅 인텔리전스 시장
            </p>
            <div
              className="text-5xl font-semibold"
              style={{
                color: "#C6FF3A",
                textShadow: "0 0 20px rgba(198, 255, 58, 0.6)",
              }}
            >
              ₩194조
            </div>
          </div>
        </div>
      </div>

      {/* SAM Section */}
      <div className="w-full max-w-5xl">
        <div
          className="relative rounded-2xl p-8 border backdrop-blur-xl"
          style={{
            background: "rgba(31, 31, 35, 0.6)",
            borderColor: "rgba(198, 255, 58, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-[#1F1F23]">
              <MapPin className="h-6 w-6 text-accent-green" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">SAM</h2>
              <p className="text-sm text-gray-400">
                Serviceable Available Market
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-300">
              국내 AEO·SEO 통합 분석 SaaS 시장
            </p>
            <div
              className="text-5xl font-semibold"
              style={{
                color: "#C6FF3A",
                textShadow: "0 0 20px rgba(198, 255, 58, 0.6)",
              }}
            >
              ₩2.3조
            </div>
          </div>
        </div>
      </div>

      {/* SOM Section - Highlighted */}
      <div className="w-full max-w-5xl">
        <div
          className="relative rounded-2xl p-10 border backdrop-blur-xl"
          style={{
            background: "rgba(31, 31, 35, 0.8)",
            borderColor: "rgba(198, 255, 58, 0.3)",
            boxShadow: "0 0 40px rgba(198, 255, 58, 0.2)",
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="p-3 rounded-lg"
              style={{
                background: "rgba(198, 255, 58, 0.1)",
              }}
            >
              <Target className="h-6 w-6 text-accent-green" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">SOM</h2>
              <p className="text-sm text-gray-400">
                Serviceable Obtainable Market
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-base text-gray-300 mb-2">
                국내 시장 점유 목표
              </p>
              <div className="flex items-baseline gap-3">
                <span
                  className="text-6xl font-semibold"
                  style={{
                    color: "#C6FF3A",
                    textShadow: "0 0 30px rgba(198, 255, 58, 0.8)",
                  }}
                >
                  1%
                </span>
                <span className="text-3xl text-gray-400">=</span>
                <span
                  className="text-5xl font-semibold"
                  style={{
                    color: "#C6FF3A",
                    textShadow: "0 0 20px rgba(198, 255, 58, 0.6)",
                  }}
                >
                  ₩28억
                </span>
              </div>
            </div>

            {/* Pie Chart Visualization */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="20"
                />
                {/* 1% slice */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#C6FF3A"
                  strokeWidth="20"
                  strokeDasharray="2.51 251.2"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(198, 255, 58, 0.6))",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-2xl font-semibold"
                  style={{
                    color: "#C6FF3A",
                    textShadow: "0 0 10px rgba(198, 255, 58, 0.6)",
                  }}
                >
                  1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
