import { CheckCircle2 } from "lucide-react"

export default function ImproveContent() {
  // Reportly-based improvement suggestions
  const improvements = [
    {
      title: "Strengthen partnerships with fintech-focused review platforms",
      impact: "High impact",
      effort: "Low effort",
      description:
        "Platforms like NerdWallet and FitSmallBusiness are highly cited by AI models, indicating their influence in fintech decision-making. Optimizing presence on these platforms will drive credibility and improve AI visibility scores by an estimated 15-20 points.",
      steps: [
        "Create comprehensive company profiles on NerdWallet, FitSmallBusiness, and Capterra",
        "Encourage satisfied customers to leave detailed reviews highlighting specific features",
        "Respond to all reviews within 24 hours to demonstrate active engagement",
        "Publish case studies and success stories on these platforms",
      ],
      links: ["nerdwallet.com", "fitsmallbusiness.com", "capterra.com"],
    },
    {
      title: "Enhance customer support content and visibility",
      impact: "High impact",
      effort: "Medium effort",
      description:
        "Customer support category scored 72 points, significantly below the industry average of 78 points. AI models rarely mention your brand in support-related queries. Improving this area will boost overall score and competitive positioning.",
      steps: [
        "Create a comprehensive knowledge base with detailed FAQs and troubleshooting guides",
        "Publish customer success stories highlighting support experiences",
        "Develop video tutorials and webinars on common customer challenges",
        "Partner with customer service review sites to increase visibility",
      ],
      links: ["trustpilot.com", "g2.com"],
    },
    {
      title: "Leverage high-authority media coverage for thought leadership",
      impact: "Medium impact",
      effort: "High effort",
      description:
        "Forbes.com and TechCrunch have high citation volumes in AI responses. Securing more thought leadership content and PR placements on these platforms will enhance brand authority and improve citation scores.",
      steps: [
        "Develop a media outreach strategy targeting Forbes, TechCrunch, and Business Insider",
        "Publish executive thought leadership articles on fintech trends, AI in finance, and automation",
        "Participate in industry podcasts and webinars as expert speakers",
        "Create data-driven reports and studies that media outlets can reference",
      ],
      links: ["forbes.com", "techcrunch.com", "businessinsider.com"],
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
                    item.impact === "High impact" ? "bg-[#C6FF3A] shadow-lg shadow-[#C6FF3A]/50" : "bg-red-500"
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
