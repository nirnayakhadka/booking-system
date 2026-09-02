# Architecture

## Overview

This is a React 19 + TypeScript single-page application implementing a
customer service booking flow
(Service List → Service Details → Booking → My Bookings → Booking Details)
for the "Demo Marketplace" platform. The application is API-first: every
screen consumes data through a service layer that talks to a mock API today
and can be pointed at a real HTTP backend later with no changes to UI code.

## Folder Structure

```
src/
├── api/
│   ├── client/            # HTTP client abstraction (the only network seam)
│   ├── services/          # App-facing API functions (what hooks call)
│   ├── mock/              # Mock backend: warm cache, validation, business rules
│   │   └── data/          # dummy data image from url, bookings (localStorage-backed), user
│   └── queryKeys.ts       # Centralized React Query cache key factory
├── features/              # Feature-scoped pages, one folder per route family
│   ├── services/          # Service list, category page, details, hero, strip
│   ├── booking/           # Booking flow: page + useBookingFlow + sub-components/
│   └── bookings/          # My Bookings list + booking details/confirmation
├── components/
│   ├── layout/            # PageContainer, BackLink, BackToTop
│   ├── ui/                # Button, Avatar, Dropdown, Logo, SearchInput,
│   │                      # ServiceCard, ServiceGridCard, ThemeToggle
│   └── StatusStates.tsx   # Shared loading / error / empty presentational states
├── hooks/                 # React Query hooks (useServices, useBooking, …)
│   └── theme.ts / useTheme.tsx   # Theme context + provider (split for fast-refresh)
├── test/                  # Vitest setup
└── types/                 # Domain types shared across all layers
```

Deliberate conventions:

- **Feature code stays inside its feature folder.** A page owns its local
  state hook (`booking/useBookingFlow.ts`) and its private building blocks
  (`booking/components/{ServicePreviewCard,CustomerDetailsForm,BookingSummaryCard}.tsx`).
  Only genuinely shared pieces belong in `components/`.
- **`components/ui/` is for reusable primitives** (buttons, inputs,
  cards); **`components/layout/` for page-level scaffolding** (width
  container, back link, scroll behavior).
- **No dead code** — components that are not wired into a route or another
  component (e.g. an early `ProductTile`) are removed rather than kept.

## Layering & Responsibilities

The app is organized in strict layers, each with a single responsibility:

1. **Components** (`features/*`, `components/*`) — render UI, capture
   input, and branch on loading/success/empty/error state. They contain no
   API or fetch logic directly.
2. **Hooks** (`hooks/`) — wrap React Query around the service layer. They
   own cache keys, retry/stale-time policy, and mutation side-effects
   (invalidating the bookings list after a successful booking).
3. **API services** (`api/services/`) — the app-facing API. Functions here
   are what hooks call; they know about domain types (`Service`, `Booking`)
   but nothing about how the request is transported.
4. **HTTP client** (`api/client/httpClient.ts`) — the single seam between
   "how we talk to a backend" and everything above it. Replacing the mock
   with real `fetch`/`axios` requires changing only this file plus the two
   `api/services/*` files.
5. **Mock API** (`api/mock/`) — simulates a backend: warm/cold request
   latency, validation, and business rules (slot conflicts) live here,
   reading and writing the mock data store (`api/mock/data/`).

Data flows one direction only: Component → Hook → API service → HTTP
client → Mock (or, later, a real API). No layer reaches "up" or skips a
layer.

## State Management

Three kinds of state are kept deliberately separate:

- **Server state** (services, availability, bookings) is owned by
  **TanStack Query**. It handles caching, loading/error flags, retries,
  and invalidation. Reads/writes go through the hooks in `hooks/`.
- **UI/form state** (selected slot, customer fields, validation messages)
  lives in local component state — `useBookingFlow` — and is transient.
- **User preferences** (theme) live in a React context (`hooks/theme.ts`
  + `useTheme.tsx`) persisted to `localStorage`, applied as a `.dark`
  class on `<html>`.

## Performance & Perceived Speed

Because there is no backend to put Redis behind, the demo caches on the
client in three cooperating layers (see decisions #8):

1. **TanStack Query** — `staleTime` 5 min, `gcTime` 10 min,
   `refetchOnWindowFocus: false`, so revisits render from cache without
   network work or flicker.
2. **Warm request gate** (`requestGate`) — cold requests pay ~300-800ms of
   simulated latency; repeat requests for the same key resolve in
   ~20-80ms. This mimics a warmed server-side cache key.
3. **localStorage-persisted bookings** — created bookings survive reloads,
   standing in for database/Redis persistence.

On top of that: **route-level code splitting** (`React.lazy` + `Suspense`
in `App.tsx`) keeps the initial bundle to the shell + one page, and the
`NavBar` **prefetches** the Services and My Bookings queries on nav-link
hover so the next route is already cached before the click.

## Animations & Scroll UX

- Every route change re-mounts the page wrapper keyed by `pathname`, which
  replays the `page-in` transition (a short fade + lift) via
  `animate-page-in` in `src/index.css`.
- `BackToTop` is a floating button that appears after scrolling and
  smooth-scrolls to the top. There is deliberately **no** auto jump to the
  top on route change — navigation keeps the page's current scroll
  position so the transition is smooth and the user isn't yanked.
- Hover/keyboard affordances are consistent: cards lift and zoom images,
  the shared `Button` has a press scale (`active:scale`), focus rings are
  visible everywhere.
- All animation respects `prefers-reduced-motion` (disabled under that
  media query).

## Error Handling

- The mock API and any real HTTP client normalize errors into a single
  `ApiRequestError` class carrying a typed `code` (`VALIDATION_ERROR`,
  `NOT_FOUND`, `SLOT_CONFLICT`, `SERVER_ERROR`). Components never know
  whether an error came from the mock or a real backend.
- **Read errors** surface through React Query's `isError` and are rendered
  with the shared `ErrorState`, retry wired to `refetch()`.
- **Business errors on write** (validation failures, slot conflicts) are
  **data, not exceptions** — `createBooking` returns a discriminated union
  (`success | validation_error | slot_conflict`) so the form branches on
  expected outcomes explicitly and type-safely.

## Theming

Colors are semantic CSS custom properties (`--color-surface`,
`--color-surface-muted`, `--color-surface-raised`, `--color-text-primary`,
`--color-success`, …) in `src/index.css`, bridged into Tailwind via
`@theme inline`. A three-level surface hierarchy (page background → cards →
controls inside cards, like inputs and slot chips) is identical in both
themes, so nested "card in card" layouts always read correctly. `color-scheme`
and dark autofill handling are set so native form controls follow the theme.

## Communication with the API

Screens never import the mock module directly — only `api/services/*`.
Swapping in a real backend means rewriting the internals of the
`api/services/*` files (and the `request` function in `httpClient.ts`) to
perform real HTTP calls, with zero changes in hooks, features, or
components.