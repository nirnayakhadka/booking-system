import { useLocation, useParams } from 'react-router-dom'
import { useBooking } from '../../hooks/useBooking'
import { LoadingState, ErrorState } from '../../components/StatusStates'

export function BookingDetailsPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const location = useLocation()
  const justBooked = Boolean((location.state as { justBooked?: boolean } | null)?.justBooked)

  const { data: booking, isLoading, isError, refetch } = useBooking(bookingId)

  if (isLoading) return <LoadingState label="Loading booking..." />
  if (isError || !booking) {
    return <ErrorState message="Couldn't load this booking." onRetry={() => refetch()} />
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {justBooked && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-md p-4">
          Booking confirmed! Your booking number is{' '}
          <span className="font-semibold">{booking.bookingNumber}</span>.
        </div>
      )}

      <h1 className="text-xl font-semibold text-gray-900">{booking.serviceName}</h1>
      <p className="text-gray-500 text-sm mt-1">Provider: {booking.providerName}</p>

      <dl className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <dt className="text-gray-400">Booking number</dt>
          <dd className="font-medium text-gray-900">{booking.bookingNumber}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Status</dt>
          <dd className="font-medium capitalize text-gray-900">{booking.status}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Date</dt>
          <dd className="font-medium text-gray-900">{booking.scheduledDate}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Time</dt>
          <dd className="font-medium text-gray-900">{booking.scheduledTime}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
        <p>{booking.customer.name}</p>
        <p>{booking.customer.email}</p>
        <p>{booking.customer.phone}</p>
        <p>{booking.customer.address}</p>
      </div>
    </div>
  )
}
