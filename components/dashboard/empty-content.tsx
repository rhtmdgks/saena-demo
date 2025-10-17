interface EmptyContentProps {
  title: string
  description?: string
}

export default function EmptyContent({ title, description }: EmptyContentProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Coming soon...</p>
      </div>
    </div>
  )
}
