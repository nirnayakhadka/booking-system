import type { ServiceListParams } from '../types/service'

/**
 * Centralized query keys. Keeping these in one place (rather than
 * inline arrays scattered across hooks) prevents cache-key drift —
 * e.g. two hooks accidentally using slightly different keys for the
 * "same" data, which would silently break cache invalidation.
 */
export const queryKeys = {
  services: {
    all: ['services'] as const,
    list: (params?: ServiceListParams) => ['services', 'list', params] as const,
    detail: (id: string) => ['services', 'detail', id] as const,
    availability: (id: string) => ['services', 'availability', id] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    list: () => ['bookings', 'list'] as const,
    detail: (id: string) => ['bookings', 'detail', id] as const,
  },
}
