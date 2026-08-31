/**
 * The HTTP client is the single seam between "how we talk to a backend"
 * and everything else. Today it delegates to the mock implementations;
 * swapping to a real backend later means rewriting only this file's
 * `request` function (e.g. to use fetch/axios) — no changes needed in
 * api/services, hooks, or components, since they only depend on this
 * module's exported function signature.
 */

export type MockHandler<T> = () => Promise<T>

/**
 * Executes a request. In mock mode this just awaits the provided
 * handler (which already simulates latency/errors internally). A real
 * implementation would instead perform `fetch(url, options)`, parse
 * JSON, and map non-2xx responses to ApiRequestError.
 */
export async function request<T>(handler: MockHandler<T>): Promise<T> {
  return handler()
}
