import BrandVisibility from "./brand-visibility";
import { TrendingUp, Target, Globe, Zap } from "lucide-react";
import type { BrandVisibilityData, HomeContentData } from "@/types/dashboard";

interface HomeContentProps {
  brandVisibilityData?: BrandVisibilityData;
  homeData?: HomeContentData;
}

export default function HomeContent({ brandVisibilityData, homeData }: HomeContentProps) {
  // 실제 데이터가 없으면 기본값 사용
  const keyMetrics = homeData ? [
    {
      title: "Total Score",
      value: String(homeData.keyMetrics.totalScore.value),
      change: homeData.keyMetrics.totalScore.change,
      trend: homeData.keyMetrics.totalScore.trend,
      description: homeData.keyMetrics.totalScore.description,
      icon: Target,
    },
    {
      title: "Competitive Rank",
      value: `#${homeData.keyMetrics.competitiveRank.value}`,
      change: homeData.keyMetrics.competitiveRank.change,
      trend: homeData.keyMetrics.competitiveRank.trend,
      description: `out of ${homeData.keyMetrics.competitiveRank.totalCompetitors} brands`,
      icon: TrendingUp,
    },
    {
      title: "Strongest Category",
      value: homeData.keyMetrics.strongestCategory.categoryName || "",
      change: String(homeData.keyMetrics.strongestCategory.score),
      trend: homeData.keyMetrics.strongestCategory.trend,
      description: homeData.keyMetrics.strongestCategory.description,
      icon: Zap,
    },
    {
      title: "Weakest Category",
      value: homeData.keyMetrics.weakestCategory.categoryName || "",
      change: String(homeData.keyMetrics.weakestCategory.score),
      trend: homeData.keyMetrics.weakestCategory.trend,
      description: homeData.keyMetrics.weakestCategory.description,
      icon: Globe,
    },
  ] : [];

  // 인사이트 데이터 변환
  const recentInsights = homeData ? homeData.insights.map((insight) => ({
    type: insight.type,
    title: insight.title,
    description: insight.description,
    time: new Date(insight.timestamp).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  })) : [];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg group-hover:bg-accent-green-10 transition-colors">
                <metric.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-green transition-colors" />
              </div>
              <span
                className={`text-sm font-medium ${
                  metric.trend === "up"
                    ? "text-accent-green-glow"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Visibility Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Brand visibility
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
          Percentage of AI answers about sunscreen products that mention your brand
        </p>
        <BrandVisibility data={brandVisibilityData} />
      </div>

      {/* Recent Insights */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Insights
        </h2>
        <div className="space-y-3">
          {recentInsights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  insight.type === "positive"
                    ? "bg-accent-green shadow-lg shadow-accent-green/50"
                    : insight.type === "neutral"
                    ? "bg-accent-green"
                    : "bg-orange-500"
                }`}
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {insight.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                  {insight.description}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {insight.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Coverage */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Platform Coverage
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(homeData?.platformCoverage || []).map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors"
            >
              <span className="text-base font-medium text-gray-900 dark:text-white mb-2">
                {platform.platformName}
              </span>
              <span
                className={`text-xl font-bold ${
                  platform.isActive
                    ? "text-accent-green-glow"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {platform.isActive ? `${platform.coveragePercent}%` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
