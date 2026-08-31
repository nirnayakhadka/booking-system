import type { Booking, CreateBookingRequest, CreateBookingResult } from '../../types/booking'
import { request } from '../client/httpClient'
import { mockCreateBooking, mockGetBookingById, mockListBookings } from '../mock/bookings.mock'

export function createBooking(payload: CreateBookingRequest): Promise<CreateBookingResult> {
  return request(() => mockCreateBooking(payload))
}

export function listBookings(): Promise<Booking[]> {
  return request(() => mockListBookings())
}

export function getBooking(bookingId: string): Promise<Booking> {
  return request(() => mockGetBookingById(bookingId))
}
