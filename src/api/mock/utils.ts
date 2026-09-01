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
 * Configurable chance of a server error (HTTP 500). Defaults to 0 so
 * tests and default manual runs are deterministic; opted into by tests
 * (see servicesApi.test.ts) or by dev tooling wanting to exercise the
 * error UI. Kept module-global so mock endpoints share one toggle
 * instead of threading a probability through every call site.
 */
let serverErrorChance = 0

export function setServerErrorChance(chance: number): void {
  serverErrorChance = Math.max(0, Math.min(1, chance))
}

export function getServerErrorChance(): number {
  return serverErrorChance
}

export function maybeSimulateServerError(chance = serverErrorChance): void {
  if (chance > 0 && Math.random() < chance) {
    throw new ApiRequestError({
      code: 'SERVER_ERROR',
      message: 'An unexpected server error occurred. Please try again.',
    })
  }
}