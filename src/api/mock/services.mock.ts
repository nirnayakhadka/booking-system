import type { Service, ServiceListParams, ServiceSummary, TimeSlot } from '../../types/service'
import { ApiRequestError } from '../../types/api'
import { mockServices } from './data/services'
import { getBookedSlotKeys } from './data/bookings'
import { simulateLatency } from './utils'

function toSummary(service: Service): ServiceSummary {
  const { id, name, category, provider, price, currency, rating, isAvailable } = service
  return { id, name, category, provider, price, currency, rating, isAvailable }
}

export async function mockListServices(
  params: ServiceListParams = {}
): Promise<{ items: ServiceSummary[]; total: number }> {
  await simulateLatency()

  const { search, category, page = 1, pageSize = 20 } = params

  let filtered = mockServices
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    )
  }
  if (category) {
    filtered = filtered.filter((s) => s.category === category)
  }

  const start = (page - 1) * pageSize
  const pageItems = filtered.slice(start, start + pageSize)

  return { items: pageItems.map(toSummary), total: filtered.length }
}

export async function mockGetServiceById(serviceId: string): Promise<Service> {
  await simulateLatency()

  const service = mockServices.find((s) => s.id === serviceId)
  if (!service) {
    throw new ApiRequestError({
      code: 'NOT_FOUND',
      message: `Service ${serviceId} was not found.`,
    })
  }
  return service
}

/**
 * Generates a fixed set of slots for the next 5 days and marks any
 * already-booked slot (per the mock bookings store) as unavailable,
 * so the conflict path is reachable end-to-end without special-casing
 * it in the UI layer.
 */
export async function mockGetServiceAvailability(serviceId: string): Promise<TimeSlot[]> {
  await simulateLatency()

  const service = mockServices.find((s) => s.id === serviceId)
  if (!service) {
    throw new ApiRequestError({
      code: 'NOT_FOUND',
      message: `Service ${serviceId} was not found.`,
    })
  }

  const bookedKeys = getBookedSlotKeys(serviceId)
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']
  const slots: TimeSlot[] = []

  for (let dayOffset = 1; dayOffset <= 5; dayOffset++) {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    const dateStr = date.toISOString().split('T')[0]

    for (const startTime of times) {
      const key = `${dateStr}_${startTime}`
      const [h, m] = startTime.split(':').map(Number)
      const endDate = new Date(0, 0, 0, h, m + service.durationMinutes)
      const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(
        endDate.getMinutes()
      ).padStart(2, '0')}`

      slots.push({
        id: `${serviceId}_${key}`,
        date: dateStr,
        startTime,
        endTime,
        isAvailable: !bookedKeys.has(key),
      })
    }
  }

  return slots
}
