# Technical Decisions

## 1. Business errors modeled as data, not thrown exceptions

**Chosen:** `createBooking` returns a discriminated union
(`CreateBookingResult = success | validation_error | slot_conflict`)
rather than throwing on validation failure or slot conflict.

**Why:** Validation errors and slot conflicts are *expected, recoverable*
outcomes the UI needs to branch on explicitly (show field errors, show a
conflict banner) — they aren't exceptional in the way a network failure or
500 is. Returning them as typed data lets TypeScript enforce that every
call site handles all three outcomes, and keeps the booking form's control
flow linear instead of scattered across try/catch blocks.

**Alternatives considered:** Throwing a typed `ApiRequestError` for
validation/conflict too, same as `NOT_FOUND`/`SERVER_ERROR`.

**Why rejected:** It would conflate "this request is fundamentally broken
or the server failed" with "the user needs to fix a form field," which
are different UI treatments. It also makes the success path harder to
type — `mutateAsync` would need a try/catch just to read a booking number
back out, whereas the discriminated union gives type-safe access on the
`success` branch directly.

---

## 2. Server state (React Query) vs. UI state (local `useState`) kept strictly separate

**Chosen:** TanStack Query owns all server data (services, availability,
bookings). The booking form's in-progress selections (chosen slot,
customer fields) live in a plain `useState`-based hook
(`useBookingFlow`), not in the query cache.

**Why:** Server data needs caching, retries, and invalidation — form
state doesn't, and shouldn't survive a page refresh or be shared across
routes. Mixing the two under one state manager makes it unclear, months
later, which piece of state "belongs" to the server and which is
transient UI state.

**Alternatives considered:** Putting booking-form state in React Query as
a client-only query, or in a global store (Redux/Zustand).

**Why rejected:** A client-only query is an awkward fit — the value isn't
fetched from anywhere, so it doesn't benefit from any of Query's actual
features (caching, refetch, staleness). A global store is unnecessary
overhead for state that's scoped to a single flow and doesn't need to be
read outside the booking feature.

---

## 3. Mock API as a separate layer behind an HTTP client seam, not inline in hooks

**Chosen:** `api/mock/` implements backend-like behavior (latency,
validation, business rules) independently of React. `api/services/*`
calls into the mock through a thin `httpClient.request()` wrapper, and
hooks only ever import from `api/services/*`.

**Why:** The assignment requires the mock be "replaceable by a real HTTP
client later." Putting mock logic directly in hooks (`useServices` calling
`mockListServices` directly) would mean every hook needs rewriting when a
real backend arrives. With the seam in place, only `httpClient.ts` and the
two `api/services/*.ts` files change; hooks and components don't move.

**Alternatives considered:** Using `msw` (Mock Service Worker) to
intercept real `fetch` calls at the network level.

**Why rejected:** MSW is arguably the more "realistic" approach and worth
considering for a larger project, but it adds setup overhead (service
worker registration, handler files) disproportionate to a 2-day
assignment, and it obscures the mock/service/client separation the
assignment is explicitly asking to see in application code — the whole
point here is to show that layering directly, not hide it behind a
network-level shim.

---

## 4. Slot IDs encode date/time directly (`serviceId_date_time`) instead of opaque IDs with a separate lookup

**Chosen:** Time slot IDs are deterministic strings like
`svc-1_2026-09-05_10:00`, decoded back into date/time when a booking is
created.

**Why:** For a mock backend with no real persistence layer, this avoids
needing a second in-memory index just to resolve "which date/time does
this slot ID correspond to," and keeps the availability generation and
booking-conflict check (`getBookedSlotKeys`) trivially consistent — both
sides derive the same key format independently.

**Alternatives considered:** Opaque UUIDs per slot, looked up in a slots
table.

**Why rejected:** That's the more realistic real-backend shape, but for a
mock whose data resets on reload, it adds a lookup table with no real
benefit — the encoded-ID approach is simpler and just as testable, and
the contract (`TimeSlot.id` is an opaque string to the frontend) doesn't
actually change if a real backend later returns real UUIDs instead.

---

## 5. Tailwind utility classes directly in components, no separate component library

**Chosen:** Styling is done with Tailwind utility classes inline in JSX,
plus a small set of shared presentational components
(`StatusStates.tsx`, `NavBar.tsx`) for cross-cutting UI.

**Why:** The assignment explicitly deprioritizes visual complexity and UI
polish relative to architecture/API/testing. Utility classes let styling
stay colocated and fast to write without introducing a design-system
abstraction layer that would take time away from the parts of the
assignment that are actually being evaluated.

**Alternatives considered:** CSS Modules per component, or a component
library (e.g. shadcn/ui).

**Why rejected:** CSS Modules would add a file-per-component and mapping
overhead with no material benefit at this scope. A component library adds
setup and API-learning overhead disproportionate to a 2-day assignment
where UI is explicitly the lowest-weighted evaluation criterion.
