import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Star, Package, Globe, Plus, ArrowRight, Target } from "lucide-react"

interface MetricItem {
  id: string
  title: string
  description?: string
  value: string
  type: "visibility" | "mentions" | "sentiment" | "ranking"
}

interface List01Props {
  totalScore?: string
  metrics?: MetricItem[]
  className?: string
}

const METRICS: MetricItem[] = [
  {
    id: "1",
    title: "Brand Visibility",
    description: "AI mention rate",
    value: "89.8%",
    type: "visibility",
  },
  {
    id: "2",
    title: "Total Mentions",
    description: "Across all LLMs",
    value: "7,400",
    type: "mentions",
  },
  {
    id: "3",
    title: "Positive Sentiment",
    description: "User reviews",
    value: "83%",
    type: "sentiment",
  },
  {
    id: "4",
    title: "Industry Rank",
    description: "Among competitors",
    value: "#2",
    type: "ranking",
  },
  {
    id: "5",
    title: "Platform Coverage",
    description: "Active LLMs",
    value: "10+",
    type: "mentions",
  },
]

export default function List01({ totalScore = "89.8", metrics = METRICS, className }: List01Props) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      {/* Total Score Section */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Overall Brand Score</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{totalScore}</h1>
      </div>

      {/* Metrics List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Key Metrics</h2>
        </div>

        <div className="space-y-1">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-emerald-100 dark:bg-emerald-900/30": metric.type === "visibility",
                    "bg-blue-100 dark:bg-blue-900/30": metric.type === "mentions",
                    "bg-purple-100 dark:bg-purple-900/30": metric.type === "sentiment",
                    "bg-amber-100 dark:bg-amber-900/30": metric.type === "ranking",
                  })}
                >
                  {metric.type === "visibility" && (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {metric.type === "mentions" && <Package className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {metric.type === "sentiment" && (
                    <Star className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                  {metric.type === "ranking" && <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{metric.title}</h3>
                  {metric.description && (
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{metric.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{metric.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Updated footer with action buttons */}
      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Analyze</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  )
}
