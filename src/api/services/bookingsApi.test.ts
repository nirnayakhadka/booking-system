import { describe, it, expect } from 'vitest'
import { createBooking, listBookings } from './bookingsApi'
import { getServiceAvailability } from './servicesApi'

const validCustomer = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '9800000000',
  address: '123 Test Street',
}

describe('bookingsApi.createBooking — validation', () => {
  it('returns validation_error when required fields are missing', async () => {
    const result = await createBooking({
      serviceId: '',
      slotId: '',
      customer: { name: '', email: '', phone: '', address: '' },
    })

    expect(result.status).toBe('validation_error')
    if (result.status === 'validation_error') {
      expect(result.errors.serviceId).toBeDefined()
      expect(result.errors.email).toBeDefined()
    }
  })

  it('flags an invalid email format', async () => {
    const slots = await getServiceAvailability('svc-4')
    const availableSlot = slots.find((s) => s.isAvailable)!

    const result = await createBooking({
      serviceId: 'svc-4',
      slotId: availableSlot.id,
      customer: { ...validCustomer, email: 'not-an-email' },
    })

    expect(result.status).toBe('validation_error')
    if (result.status === 'validation_error') {
      expect(result.errors.email).toBeDefined()
    }
  })
})

describe('bookingsApi.createBooking — success', () => {
  it('creates a booking and it appears in the bookings list', async () => {
    const slots = await getServiceAvailability('svc-4')
    const availableSlot = slots.find((s) => s.isAvailable)!

    const result = await createBooking({
      serviceId: 'svc-4',
      slotId: availableSlot.id,
      customer: validCustomer,
    })

    expect(result.status).toBe('success')
    if (result.status === 'success') {
      expect(result.booking.serviceId).toBe('svc-4')
      expect(result.booking.status).toBe('confirmed')

      const all = await listBookings()
      expect(all.some((b) => b.id === result.booking.id)).toBe(true)
    }
  })
})

describe('bookingsApi.createBooking — slot conflict', () => {
  it('returns slot_conflict when the same slot is booked twice', async () => {
    const slots = await getServiceAvailability('svc-5')
    const availableSlot = slots.find((s) => s.isAvailable)!

    const first = await createBooking({
      serviceId: 'svc-5',
      slotId: availableSlot.id,
      customer: validCustomer,
    })
    expect(first.status).toBe('success')

    const second = await createBooking({
      serviceId: 'svc-5',
      slotId: availableSlot.id,
      customer: validCustomer,
    })
    expect(second.status).toBe('slot_conflict')
  })
})
