export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'

export interface BookingCustomer {
  name: string
  email: string
  phone: string
  address: string
}

export interface Booking {
  id: string
  bookingNumber: string
  serviceId: string
  serviceName: string
  providerName: string
  scheduledDate: string // ISO date
  scheduledTime: string // "10:00"
  status: BookingStatus
  customer: BookingCustomer
  createdAt: string
}

/** Payload the client sends to create a booking. */
export interface CreateBookingRequest {
  serviceId: string
  slotId: string
  customer: BookingCustomer
}

/**
 * Discriminated union for booking creation outcomes.
 * Modeling business errors (slot conflicts) as data rather than thrown
 * exceptions lets the UI branch on them explicitly instead of relying
 * on try/catch control flow for expected, recoverable states.
 */
export type CreateBookingResult =
  | { status: 'success'; booking: Booking }
  | { status: 'validation_error'; errors: Record<string, string> }
  | { status: 'slot_conflict'; message: string }
