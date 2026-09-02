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
 * Warm/cold request gate — a stand-in for a server-side cache (e.g.
 * Redis). The first request for a given key pays the full simulated
 * latency (so loading states stay real and testable), but every repeat
 * request for the same data resolves in ~20-80ms, which is what makes
 * navigating back to a screen you already visited feel instant.
 */
const warmKeys = new Set<string>()

export async function requestGate(key: string): Promise<void> {
  if (warmKeys.has(key)) {
    await simulateLatency(20, 80)
    return
  }
  warmKeys.add(key)
  await simulateLatency()
}

export function clearWarmCache(): void {
  warmKeys.clear()
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