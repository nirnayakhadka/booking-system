import type { Booking, CreateBookingRequest, CreateBookingResult } from '../../types/booking'
import { ApiRequestError } from '../../types/api'
import { mockServices } from './data/services'
import { mockBookings, addMockBooking, getBookedSlotKeys } from './data/bookings'
import { maybeSimulateServerError, simulateLatency } from './utils'

/**
 * Validation lives here (server-side, in the mock) rather than only in
 * the UI form, mirroring how a real backend would re-validate on write.
 * This is what the assignment's "validation errors" and "business
 * errors" distinction is testing.
 */
function validateBookingRequest(request: CreateBookingRequest): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!request.serviceId) errors.serviceId = 'Service is required.'
  if (!request.slotId) errors.slotId = 'A time slot must be selected.'
  if (!request.customer?.name?.trim()) errors.name = 'Name is required.'
  if (!request.customer?.email?.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(request.customer.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!request.customer?.phone?.trim()) errors.phone = 'Phone number is required.'
  if (!request.customer?.address?.trim()) errors.address = 'Address is required.'

  return errors
}

function generateBookingNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const seq = String(mockBookings.length + 1).padStart(3, '0')
  return `BK-${date}-${seq}`
}

export async function mockCreateBooking(
  request: CreateBookingRequest
): Promise<CreateBookingResult> {
  await simulateLatency()
  maybeSimulateServerError()

  const errors = validateBookingRequest(request)
  if (Object.keys(errors).length > 0) {
    return { status: 'validation_error', errors }
  }

  const service = mockServices.find((s) => s.id === request.serviceId)
  if (!service) {
    throw new ApiRequestError({ code: 'NOT_FOUND', message: 'Service not found.' })
  }

  // slotId is `${serviceId}_${date}_${time}` — decode it back to date/time
  const [, date, time] = request.slotId.split('_')
  const bookedKeys = getBookedSlotKeys(request.serviceId)
  if (bookedKeys.has(`${date}_${time}`)) {
    return {
      status: 'slot_conflict',
      message: 'This time slot was just booked by someone else. Please pick another slot.',
    }
  }

  const booking: Booking = {
    id: `bkg-${Date.now()}`,
    bookingNumber: generateBookingNumber(),
    serviceId: service.id,
    serviceName: service.name,
    providerName: service.provider.name,
    scheduledDate: date,
    scheduledTime: time,
    status: 'confirmed',
    customer: request.customer,
    createdAt: new Date().toISOString(),
  }

  addMockBooking(booking)
  return { status: 'success', booking }
}

export async function mockListBookings(): Promise<Booking[]> {
  await simulateLatency()
  maybeSimulateServerError()
  return [...mockBookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function mockGetBookingById(bookingId: string): Promise<Booking> {
  await simulateLatency()
  maybeSimulateServerError()
  const booking = mockBookings.find((b) => b.id === bookingId)
  if (!booking) {
    throw new ApiRequestError({
      code: 'NOT_FOUND',
      message: `Booking ${bookingId} was not found.`,
    })
  }
  return booking
}
