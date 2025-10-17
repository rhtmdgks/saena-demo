import BrandVisibility from "./brand-visibility";
import { TrendingUp, Target, Globe, Zap } from "lucide-react";

export default function HomeContent() {
  // Reportly-based actual metrics data
  const keyMetrics = [
    {
      title: "Total Score",
      value: "89",
      change: "+12.3%",
      trend: "up",
      description: "vs industry average",
      icon: Target,
    },
    {
      title: "Competitive Rank",
      value: "#2",
      change: "+1",
      trend: "up",
      description: "out of 50 brands",
      icon: TrendingUp,
    },
    {
      title: "Strongest Category",
      value: "Business Banking",
      change: "95",
      trend: "up",
      description: "highest score",
      icon: Zap,
    },
    {
      title: "Weakest Category",
      value: "Customer Support",
      change: "72",
      trend: "down",
      description: "needs improvement",
      icon: Globe,
    },
  ];

  // Reportly-based AI insights
  const recentInsights = [
    {
      type: "positive",
      title: "Strong Presence in Business Banking",
      description:
        "Your brand shows exceptional performance in business banking category with 95 points. Consistently mentioned in top 3 for expense management solutions across all AI platforms.",
      time: "Today",
    },
    {
      type: "neutral",
      title: "Customer Support Visibility Gap",
      description:
        "Customer support visibility is below industry average at 72 points. Limited mentions in customer service related queries compared to competitors.",
      time: "Today",
    },
    {
      type: "action",
      title: "Recommended Improvements",
      description:
        "Focus on creating content around customer success stories and support capabilities. Partner with review platforms like NerdWallet and FitSmallBusiness to increase support-related visibility.",
      time: "Today",
    },
  ];

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
          Percentage of AI answers about Business credit cards that mention your
          brand
        </p>
        <BrandVisibility />
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
          {[
            { name: "ChatGPT", coverage: 95, active: true },
            { name: "Perplexity", coverage: 88, active: true },
            { name: "Claude", coverage: 92, active: true },
            { name: "Gemini", coverage: 85, active: true },
            { name: "Copilot", coverage: 78, active: true },
            { name: "SearchGPT", coverage: 82, active: true },
            { name: "You.com", coverage: 75, active: true },
            { name: "Bing AI", coverage: 80, active: true },
            { name: "Bard", coverage: 0, active: false },
            { name: "Others", coverage: 65, active: true },
          ].map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-colors"
            >
              <span className="text-base font-medium text-gray-900 dark:text-white mb-2">
                {platform.name}
              </span>
              <span
                className={`text-xl font-bold ${
                  platform.active
                    ? "text-accent-green-glow"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {platform.active ? `${platform.coverage}%` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
