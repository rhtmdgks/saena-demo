import TopicVisibility from "./topic-visibility"

export default function TopicContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Topic</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Rho's presence across all topics and platforms
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Topic overview</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Rho's presence across all topics and platforms
        </p>
        <TopicVisibility />
      </div>
    </div>
  )
}
