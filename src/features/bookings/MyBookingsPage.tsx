import { useNavigate } from 'react-router-dom'
import { useBookings } from '../../hooks/useBookings'
import { LoadingState, ErrorState, EmptyState } from '../../components/StatusStates'

const statusColor: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-gray-100 text-gray-500',
  completed: 'bg-blue-100 text-blue-700',
}

export function MyBookingsPage() {
  const navigate = useNavigate()
  const { data: bookings, isLoading, isError, refetch } = useBookings()

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">My Bookings</h1>

      {isLoading && <LoadingState label="Loading bookings..." />}
      {isError && <ErrorState message="Couldn't load your bookings." onRetry={() => refetch()} />}
      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState message="You have no bookings yet." />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <button
                onClick={() => navigate(`/bookings/${booking.id}`)}
                className="w-full text-left border border-gray-200 rounded-lg p-4 hover:border-indigo-400 hover:shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{booking.serviceName}</p>
                    <p className="text-sm text-gray-500">{booking.providerName}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${statusColor[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
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
