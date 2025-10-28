import { CheckCircle2 } from "lucide-react"

export default function ImproveContent() {
  // Improvement suggestions for Shuello sunscreen brand
  const improvements = [
    {
      title: "Strengthen presence on beauty review platforms and retail sites",
      impact: "High impact",
      effort: "Low effort",
      description:
        "Platforms like Olive Young Global, YesStyle, and StyleKorean are highly cited by AI models for K-beauty recommendations. Optimizing product listings and encouraging reviews on these platforms will improve AI visibility scores by an estimated 15-20 points.",
      steps: [
        "Enhance product descriptions on Olive Young Global with detailed ingredient breakdowns",
        "Encourage verified purchasers to leave reviews highlighting no white cast and PA++++ benefits",
        "Respond to all reviews within 24 hours in both Korean and English",
        "Create comparison guides showing advantages over Beauty of Joseon and Round Lab",
      ],
      links: ["global.oliveyoung.com", "yesstyle.com", "stylekorean.com"],
    },
    {
      title: "Expand educational content on PA++++ and UVA protection",
      impact: "High impact",
      effort: "Medium effort",
      description:
        "AI models show gaps in understanding PA++++ ratings and UVA protection differences. Creating authoritative educational content will position Shuello as a trusted source and improve citation rates in sunscreen-related queries.",
      steps: [
        "Publish comprehensive guides explaining PA++++ vs SPF ratings on owned blog",
        "Create infographics comparing Korean vs Western sunscreen standards",
        "Develop video tutorials on proper sunscreen application and reapplication",
        "Partner with dermatologists for expert-backed content on sensitive skin protection",
      ],
      links: ["blog.suelo.kr", "suelo.kr/education"],
    },
    {
      title: "Secure features in beauty editorial and influencer content",
      impact: "Medium impact",
      effort: "High effort",
      description:
        "Vogue, Allure, and Byrdie have high citation volumes in AI beauty recommendations. Securing product features and expert quotes in these publications will enhance brand authority and improve visibility in makeup-friendly sunscreen queries.",
      steps: [
        "Develop PR outreach strategy targeting Vogue, Allure, Byrdie, and Into The Gloss",
        "Pitch seasonal stories: 'Best No White Cast Sunscreens' and 'Makeup Artists' Favorite Primers'",
        "Send product samples to beauty editors with detailed PA++++ education materials",
        "Collaborate with K-beauty focused influencers for authentic review content",
      ],
      links: ["vogue.com", "allure.com", "byrdie.com"],
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
