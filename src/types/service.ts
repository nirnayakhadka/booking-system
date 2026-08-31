/**
 * Domain types for services. These mirror the API contract in
 * docs/api-contract.md and are the single source of truth for the
 * shape of service data across mock API, real API, and UI layers.
 */

export interface Service {
  id: string
  name: string
  description: string
  category: string
  provider: {
    id: string
    name: string
  }
  price: number
  currency: string
  durationMinutes: number
  rating: number
  isAvailable: boolean
}

/** Lightweight shape used in list views — avoids over-fetching full descriptions. */
export type ServiceSummary = Pick<
  Service,
  'id' | 'name' | 'category' | 'provider' | 'price' | 'currency' | 'rating' | 'isAvailable'
>

export interface ServiceListParams {
  search?: string
  category?: string
  page?: number
  pageSize?: number
}

export interface TimeSlot {
  id: string
  date: string // ISO date, e.g. "2026-09-05"
  startTime: string // "10:00"
  endTime: string // "10:30"
  isAvailable: boolean
}
