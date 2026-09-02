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
plus a small set of shared reusable components for cross-cutting UI:
presentational states in `components/StatusStates.tsx`, primitives in
`components/ui/` (`Button`, `Avatar`, `Dropdown`, `Logo`, `SearchInput`,
`ServiceCard`, `ServiceGridCard`, `ThemeToggle`), and page-level scaffolding
in `components/layout/` (`PageContainer`, `BackLink`, `BackToTop`),
`BackToTop`).

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

---

## 6. Server-error simulation is a configurable toggle, off by default

**Chosen:** Every mock endpoint calls `maybeSimulateServerError()` after its
latency delay. The probability is a module-global (`setServerErrorChance`)
that defaults to `0`, so default runs — and the test suite — are
deterministic, while tests (and a dev/QA tool wanting to exercise the error
UI) can flip it to `1` and observe a normalized `SERVER_ERROR` anyway.

**Why:** The assignment requires the mock to *simulate server errors*, but
a permanent nonzero chance would make every manual/smoke test and unit test
flaky (a test asserting "list loads OK" could randomly fail). A toggle keeps
the error path implemented and exercisable end-to-end without sacrificing
determinism.

**Alternatives considered:** Hard-coding a small chance (e.g. 5%) into the
mock reads/writes, or exposing a query-string look like `?simulateError=1`.

**Why rejected:** A hardcoded chance makes tests non-deterministic. A
query-string switch is harder to operate from a unit test (it would require
threading the value through the client seam) and wouldn't cover mutations
like `createBooking`. The module-global chance is the smallest surface that
lets both tests and manual QA reach the server-error path.

---

## 7. Theme handled by a context provider + CSS-variable tokens, not per-component dark variants

**Chosen:** The theme is driven by a small React context persisted to
`localStorage` that toggles a `.dark` class on `<html>`. The context, hook,
and types live in `hooks/theme.ts`; the `ThemeProvider` component (the only
thing that touches effects) lives in `hooks/useTheme.tsx` — split so the
file exporting the component doesn't also export non-components (keeps
fast-refresh and the `only-export-components` lint rule happy). All themed
colors are semantic CSS custom properties (`--color-surface`,
`--color-surface-raised`, `--color-text-primary`, `--color-success`, …)
bridged into Tailwind via `@theme inline`.

**Why:** Semantic tokens keep dark mode consistent by construction: a
component either uses the tokens (and adapts automatically) or doesn't, and
that's easy to grep. Per-component `dark:` variants drift as the component
set grows, which is exactly the "some text is black in dark mode" bug class
this decision eliminates.

**Alternatives considered:** Tailwind `dark:` variants everywhere; CSS
Modules with a `.dark` cascade; a CSS-only `prefers-color-scheme` media
query.

**Why rejected:** `dark:` variants are what the project started as and were
the source of the unreadable dark-mode text. Media-query-only theming can't
honor an explicit user override persisted across sessions, which a
marketplace UI needs.

---

## 8. Client-side caching strategy (stand-in for a server/Redis cache)

**Chosen:** Three cooperating layers, since this demo has no backend to put
Redis behind:

1. **TanStack Query cache** — `staleTime` 5 min, `gcTime` 10 min,
   `refetchOnWindowFocus: false`. Revisiting a screen renders from cache
   with no network work.
2. **Warm request gate in the mock API** (`requestGate` in
   `src/api/mock/utils.ts`) — the first request for a key pays the full
   simulated latency (keeps loading states real and testable), but repeat
   requests for the same data resolve in ~20-80ms. This mimics warming a
   server-side cache key after the first hit.
3. **localStorage-persisted mock store** (`data/bookings.ts`) — bookings
   survive reloads, standing in for a real database/Redis persistence.

Plus **route-level code splitting** (`React.lazy`) so the initial bundle
only contains the shell + the one page being opened, and **prefetching on
nav-link hover** so the next route is already in cache before the click.

**Why:** The user asked for "Redis cache / fast page opens" but this repo
is 100% client-side. These layers deliver the same *felt* result — instant
revisits and reload-safe data — without introducing a fake backend, while
still keeping the loading/error states the assignment's tests depend on.

**Why rejected:** Adding a real HTTP server + Redis just to cache static
mock data; shipping a service worker cache without a TTL strategy.

---

## 9. Perceived-performance and animation handled in code, not by adding libraries

**Chosen:**

- **Perceived performance:** route-level code splitting (`React.lazy` +
  `Suspense` in `App.tsx`) so the initial bundle is shell + one page;
  TanStack Query tuned for cache-first navigation (`staleTime` 5 min,
  `gcTime` 10 min, no refetch on window focus); the warm request gate and
  localStorage-backed booking store from decision #8; and `prefetchQuery`
  on nav-link hover so the next route is already cached.
- **Scroll UX:** `BackToTop` is a floating button that appears after
  scrolling 400px and smooth-scrolls up. There is no auto jump to the top on
  route change (`ScrollToTop` was removed) — navigation keeps the page's
  scroll position, which feels smoother than being yanked to `(0, 0)`.
- **Animations:** route changes replay a 300ms `page-in` fade/lift (the
  routes wrapper is keyed by `pathname`); cards, strips, and the shared
  `Button` get hover-lift and press-scale transitions; all of it is
  disabled under `prefers-reduced-motion`.

**Why:** The user asked for "Redis / fast opens" and "smooth animated"
without a backend to attach Redis to (see #8), and without a
dependencies-for-dependencies approach. CSS keyframes plus React's own
lazy/prefetch/state-adjustment features deliver the same feel with zero
new runtime dependencies, no animation-library lock-in, and full
reduced-motion support.

**Alternatives considered:** `framer-motion` for route transitions;
`view-transitions-api`; pushing a state/value into a global router store to
drive scroll restoration.

**Why rejected:** Framer Motion is a meaningful bundle-cost and API
addition for effects that CSS handles cleanly at this scale. The
`view-transitions` API is still inconsistent across browsers and can't be
safely keyed off `pathname` the way a class animation can. Scroll restoration
is handled natively by the browser's default behavior, so a manual
history-map would duplicate work.
