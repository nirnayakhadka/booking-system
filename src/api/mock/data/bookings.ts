import type { Booking } from '../../../types/booking'

/**
 * In-memory mutable store. A `let` (not `const`) because the mock API
 * needs to append new bookings and this file is the single place that
 * happens, keeping "database" mutation out of the mock API functions
 * themselves and out of React entirely.
 */
export let mockBookings: Booking[] = [
  {
    id: 'bkg-1',
    bookingNumber: 'BK-20260901-001',
    serviceId: 'svc-1',
    serviceName: 'Deep Tissue Massage',
    providerName: 'Aarav Sharma',
    scheduledDate: '2026-09-02',
    scheduledTime: '14:00',
    status: 'confirmed',
    customer: {
      name: 'Nirnaya Khadka',
      email: 'nirnaya@example.com',
      phone: '9800000000',
      address: 'Lalitpur, Nepal',
    },
    createdAt: '2026-08-30T10:00:00.000Z',
  },
]

export function addMockBooking(booking: Booking) {
  mockBookings = [...mockBookings, booking]
}

/** Slots already booked for a given service, used to derive conflicts. */
export function getBookedSlotKeys(serviceId: string): Set<string> {
  return new Set(
    mockBookings
      .filter((b) => b.serviceId === serviceId && b.status !== 'cancelled')
      .map((b) => `${b.scheduledDate}_${b.scheduledTime}`)
  )
}
