import { CheckCircle2 } from "lucide-react"

export default function ImproveContent() {
  const improvements = [
    {
      title: "Strengthen partnerships with fintech-focused review platforms",
      impact: "High impact",
      effort: "Low effort",
      description:
        "Platforms like NerdWallet and FitSmallBusiness are highly cited, indicating their influence in fintech decision-making. Rho should optimize its presence on these platforms to drive credibility and customer acquisition.",
      steps: [
        "Conduct interviews with CFOs to identify key challenges in accounts payable",
        "Publish whitepapers, webinars, and blog posts tailored to CFOs on topics like cost optimization and automation",
        "Promote content through LinkedIn and CFO-specific forums",
      ],
      links: ["fitsmallbusiness.com", "nerdwallet.com"],
    },
    {
      title: "Leverage high-authority media coverage to enhance brand credibility",
      impact: "Low impact",
      effort: "High effort",
      description:
        "Forbes.com has the highest citation volume, indicating strong media presence. Rho should capitalize on this by securing more thought leadership content and PR placements.",
      steps: [
        "Develop a media outreach strategy targeting Forbes and similar high-authority publications",
        "Publish executive thought leadership articles on fintech trends and innovations",
      ],
      links: [],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Improve</h2>
      </div>

      <div className="space-y-4">
        {improvements.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`h-1 w-12 rounded-full ${
                    item.impact === "High impact" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.impact} / {item.effort}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
              {item.links.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {item.links.map((link, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#1F1F23] text-xs text-gray-700 dark:text-gray-300"
                    >
                      {link}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-l-2 border-gray-200 dark:border-[#1F1F23] pl-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Steps</h4>
              <div className="space-y-3">
                {item.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-[#1F1F23] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
                Discard
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Mark as done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
