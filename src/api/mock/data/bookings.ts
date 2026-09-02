import type { Booking } from '../../../types/booking'

/**
 * In-memory mutable store. A `let` (not `const`) because the mock API
 * needs to append new bookings and this file is the single place that
 * happens, keeping "database" mutation out of the mock API functions
 * themselves and out of React entirely.
 *
 * The store is mirrored to localStorage so bookings you create survive
 * a page reload (the browser tab is the "database" here, standing in for
 * the server/Redis that a real deployment would have). Writes go through
 * `addMockBooking` and are persisted there; reads stay synchronous.
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

const STORAGE_KEY = 'marketplace/bookings/v1'

function hydrateMockBookings(): Booking[] {
  if (typeof localStorage === 'undefined') return mockBookings
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Booking[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // Corrupt or blocked storage — fall back to the seed data.
  }
  return mockBookings
}

mockBookings = hydrateMockBookings()

function persistMockBookings(): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBookings))
  } catch {
    // Storage full or disabled — in-memory store still works this session.
  }
}

export function addMockBooking(booking: Booking) {
  mockBookings = [...mockBookings, booking]
  persistMockBookings()
}

/** Slots already booked for a given service, used to derive conflicts. */
export function getBookedSlotKeys(serviceId: string): Set<string> {
  return new Set(
    mockBookings
      .filter((b) => b.serviceId === serviceId && b.status !== 'cancelled')
      .map((b) => `${b.scheduledDate}_${b.scheduledTime}`)
  )
}
