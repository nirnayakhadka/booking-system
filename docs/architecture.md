# Architecture

## Overview

This is a React + TypeScript single-page application implementing a customer
service booking flow. The application is API-first: every screen consumes
data through a service layer that talks to a mock API today and can be
pointed at a real HTTP backend later with no changes to UI code.

## Folder Structure

```
src/
├── api/
│   ├── client/        # HTTP client abstraction (the only network seam)
│   ├── services/      # App-facing API functions (what hooks call)
│   ├── mock/          # Mock backend: data, validation, business rules
│   └── queryKeys.ts   # Centralized React Query cache key factory
├── features/
│   ├── services/      # Service list + service details pages
│   ├── booking/        # Booking flow (slot picker, form, confirm)
│   └── bookings/       # My Bookings list + booking details/confirmation
├── components/         # Shared, reusable UI (NavBar, loading/error/empty states)
├── hooks/               # React Query hooks wrapping the API service layer
└── types/               # Domain types shared across all layers
```

## Layering & Responsibilities

The app is organized in strict layers, each with a single responsibility,
matching the assignment's required separation:

1. **Components** (`features/*`, `components/`) — render UI, capture user
   input, and branch on loading/success/empty/error state. They contain no
   API or fetch logic directly.
2. **Hooks** (`hooks/`) — wrap React Query around the service layer. They
   own cache keys, retry/stale-time policy, and mutation side-effects
   (e.g. invalidating the bookings list after a successful booking).
3. **API services** (`api/services/`) — the app-facing API. Functions here
   are what hooks call; they know about domain types (`Service`, `Booking`)
   but nothing about how the request is actually transported.
4. **HTTP client** (`api/client/httpClient.ts`) — the single seam between
   "how we talk to a backend" and everything above it. Currently it just
   awaits a mock handler; replacing it with `fetch`/`axios` requires
   changing only this one file.
5. **Mock API** (`api/mock/`) — simulates a real backend: latency,
   validation, and business rules (like slot conflicts) live here, reading
   and writing an in-memory mock data store (`api/mock/data/`).

Data flows one direction only: Component → Hook → API service → HTTP
client → Mock (or, later, a real API). No layer reaches "up" or skips a
layer.

## State Management

Two distinct kinds of state are kept deliberately separate:

- **Server state** (services, bookings) is owned by **TanStack Query**.
  It handles caching, loading/error flags, retries, and invalidation. All
  reads/writes to server data go through the hooks in `hooks/`.
- **UI/form state** (selected slot, customer form fields, validation
  messages shown while typing) is owned by local component state
  (`useState`) inside the relevant feature, e.g. `useBookingFlow`. This is
  transient and doesn't need caching or background refetch, so mixing it
  into React Query would blur the distinction between "data from the
  server" and "what the user is currently doing."

## Error Handling

- The mock API and (eventually) a real HTTP client both normalize errors
  into a single `ApiRequestError` class carrying a typed `code`
  (`VALIDATION_ERROR`, `NOT_FOUND`, `SLOT_CONFLICT`, `SERVER_ERROR`).
  Components never need to know whether an error came from the mock or a
  real backend.
- **Read errors** (list/detail fetch failures) surface through React
  Query's `isError` flag and are rendered with the shared `ErrorState`
  component, with a retry action wired to `refetch()`.
- **Business errors on write** (validation failures, slot conflicts) are
  modeled as **data, not exceptions** — `createBooking` returns a
  discriminated union (`CreateBookingResult`) with a `status` field
  (`success | validation_error | slot_conflict`). This lets the booking
  form branch on expected, recoverable outcomes explicitly instead of
  relying on try/catch for control flow, and keeps the failure paths
  type-checked at compile time.

## Communication with the API

Screens never import the mock module directly — they only ever import from
`api/services/*`. This indirection is what makes the mock genuinely
replaceable: swapping in a real backend means rewriting the internals of
`api/services/servicesApi.ts` and `bookingsApi.ts` (and the `request`
function in `httpClient.ts`) to perform real HTTP calls, with zero changes
required in hooks, features, or components.
