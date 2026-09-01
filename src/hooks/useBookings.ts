import { useQuery } from "@tanstack/react-query";
import { listBookings } from "../api/services/bookingsApi";
import { queryKeys } from "../api/queryKeys";

export function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings.list(),
    queryFn: listBookings,
  });
}
