/**
 * Shared, dumb presentational components for the three cross-cutting
 * states every data-driven screen needs. Centralizing them keeps the
 * "look" of loading/error/empty consistent and stops each feature
 * from re-inventing its own spinner/error markup.
 */

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center py-16 text-gray-500">
      <span className="animate-pulse">{label}</span>
    </div>
  )
}

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <p className="text-red-600 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({
  message = 'Nothing to show yet.',
}: {
  message?: string
}) {
  return (
    <div className="flex items-center justify-center py-16 text-gray-400 text-center">
      {message}
    </div>
  )
}
