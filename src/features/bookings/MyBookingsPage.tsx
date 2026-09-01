import { useNavigate } from 'react-router-dom'
import { useBookings } from '../../hooks/useBookings'
import { LoadingState, ErrorState, EmptyState } from '../../components/StatusStates'

const statusColor: Record<string, string> = {
  confirmed: 'bg-success-bg text-success-text',
  pending: 'bg-warning-bg text-warning-text',
  cancelled: 'bg-danger-bg text-danger-text',
  completed: 'bg-info-bg text-info-text',
}

export function MyBookingsPage() {
  const navigate = useNavigate()
  const { data: bookings, isLoading, isError, refetch } = useBookings()

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-semibold text-primary">My Bookings</h1>

      {isLoading && <LoadingState label="Loading bookings..." />}
      {isError && <ErrorState message="Couldn't load your bookings." onRetry={() => refetch()} />}
      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState message="You have no bookings yet." />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <ul className="space-y-3">
          {bookings.map((booking, index) => (
            <li
              key={booking.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
            >
              <button
                onClick={() => navigate(`/bookings/${booking.id}`)}
                className="w-full text-left rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-marketplace hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-primary">{booking.serviceName}</p>
                    <p className="text-sm text-secondary">{booking.providerName}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs capitalize ${statusColor[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-secondary">
                  {booking.scheduledDate} at {booking.scheduledTime} · {booking.bookingNumber}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
