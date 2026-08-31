import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../api/services/bookingsApi'
import { queryKeys } from '../api/queryKeys'

export function useBooking(bookingId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.bookings.detail(bookingId ?? ''),
    queryFn: () => getBooking(bookingId as string),
    enabled: Boolean(bookingId),
  })
}
