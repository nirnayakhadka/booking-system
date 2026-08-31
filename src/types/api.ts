/**
 * Generic envelope types used by the HTTP client layer. Keeping these
 * separate from domain types (service.ts, booking.ts) means the client
 * layer doesn't need to know about services or bookings specifically —
 * it only deals in envelopes, and callers unwrap the `data` they expect.
 */

export interface ApiSuccess<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    pageSize?: number
  }
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'SLOT_CONFLICT'
  | 'SERVER_ERROR'

export interface ApiError {
  error: {
    code: ApiErrorCode
    message: string
    fields?: Record<string, string>
  }
}

/**
 * Thrown by the HTTP client (mock or real) on any non-2xx response.
 * Normalizing to a single error class means UI/hook code never needs
 * to know whether it's talking to the mock or a real backend.
 */
export class ApiRequestError extends Error {
  code: ApiErrorCode
  fields?: Record<string, string>

  constructor(error: ApiError['error']) {
    super(error.message)
    this.name = 'ApiRequestError'
    this.code = error.code
    this.fields = error.fields
  }
}
