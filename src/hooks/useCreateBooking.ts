import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBooking } from '../api/services/bookingsApi'
import { queryKeys } from '../api/queryKeys'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (result) => {
      // Only invalidate on a real booking — validation_error/slot_conflict
      // results are handled by the caller and don't change server state.
      if (result.status === 'success') {
        queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
      }
    },
  })
}
