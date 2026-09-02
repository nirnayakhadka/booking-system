# Customer Service Booking System

A React + TypeScript frontend implementing a customer service booking flow
(Service List → Service Details → Select Date & Time → Confirm → My Bookings)
for the "Demo Marketplace" platform, built against a self-contained mock
API layer.

## Features

- **Service list** — search, category filter pils, loading / empty / error states, hero + category strip
- **Service details** — provider, price, duration, rating, availability
- **Booking** — date & slot picker, customer details, live sticky summary,
  validation errors, and slot-conflict handling
- **My bookings** — booking list with status badges + full booking details
- **Dark mode** — theme toggle persisted across sessions, token-based theming
- **Polish** — branded logo, responsive layout, staggered card entrances,
  page transitions, scroll-to-top + back-to-top, hover/press micro-interactions
- **Speed** — code-split routes, cache-first navigation with prefetch on hover,
  warm request cache, and reload-safe bookings (localStorage)

## Stack

React · TypeScript · Vite · Tailwind CSS · React Router · TanStack Query · Vitest + React Testing Library · oxlint

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — application architecture, layering, state management, error handling
- [`docs/api-contract.md`](docs/api-contract.md) — full API contract for all endpoints
- [`docs/decisions.md`](docs/decisions.md) — key technical decisions and alternatives considered
- [`docs/setup.md`](docs/setup.md) — installation, running, and testing instructions

## Quick Start

```bash
npm install
npm run dev
```

See [`docs/setup.md`](docs/setup.md) for full details, and
[`docs/architecture.md`](docs/architecture.md) for how the codebase is
organized.

## Testing the error paths

The mock API simulates latency and a normalized `SERVER_ERROR`. Server
errors are disabled by default so manual runs are stable — tests enable them
with `setServerErrorChance(1)` (see `servicesApi.test.ts`). The seeded
booking also lets you exercise the slot-conflict path by booking the same
slot twice.

## Demo Video

_Add Jam / demo link here before submission._
