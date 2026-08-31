import { ApiRequestError } from '../../types/api'

/**
 * Simulates realistic network latency. A fixed range (not 0ms) is
 * deliberate: it forces every screen to actually implement and be
 * testable against loading states, rather than loading states being
 * unreachable in local dev because responses resolve instantly.
 */
export function simulateLatency(minMs = 300, maxMs = 800): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs)) + minMs
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * Small deliberate chance of a server error on read endpoints, so the
 * error UI path is exercised during normal manual testing instead of
 * only in unit tests. Disabled by default; call sites opt in.
 */
export function maybeSimulateServerError(chance = 0): void {
  if (chance > 0 && Math.random() < chance) {
    throw new ApiRequestError({
      code: 'SERVER_ERROR',
      message: 'An unexpected server error occurred. Please try again.',
    })
  }
}
