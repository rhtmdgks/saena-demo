import CitationAnalysis from "./citation-analysis"

export default function CitationContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Citation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Percentage of AI-generated answers that cite your brand's domain or related sources
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Citation Domain Count</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Percentage of open-ended AI answers
        </p>
        <CitationAnalysis />
      </div>
    </div>
  )
}
