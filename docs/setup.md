# Setup

## Prerequisites

- Node.js 18+ and npm

## Installation

```bash
npm install
```

## Environment Configuration

No environment variables are required. The app runs entirely against the
in-process mock API (`src/api/mock/`) — there is no backend server to
point at or configure.

## Running the Application

```bash
npm run dev
```

Starts the Vite dev server (default: `http://localhost:5173`). The app
loads with a pre-seeded mock dataset: **107 services across 9 categories**
(`Wellness`, `Home Services`, `Tech Support`, `Beauty & Personal Care`,
`Fitness`, `Automotive`, `Pet Care`, `Photography`, `Education`) and 1
seed booking.

## What the "database" is

The mock API is not a separate process — it runs in-process as part of the
frontend bundle. Two things stand in for real infrastructure:

- **Warm cache** (`requestGate` in `src/api/mock/utils.ts`) — the first
  request for a given payload pays ~300-800ms of simulated latency (so
  loading states are real and testable); repeat requests for the same data
  resolve in ~20-80ms.
- **localStorage-backed booking store** (`data/bookings.ts`) — bookings you
  create are persisted to `localStorage`, so they survive a full page
  reload. Services/categories stay read-only seed data.

## Running Tests

```bash
npx vitest run
```

Or in watch mode during development:

```bash
npx vitest
```

The suite covers the API service layer (list/search/empty/error,
detail not-found, server-error simulation) and the booking component tests
(validation errors, success navigation, slot conflict) plus the service list
and My Bookings pages.

## Linting

```bash
npm run lint
```

Runs `oxlint`. The project has **zero warnings**.

## Building for Production

```bash
npm run build
```

Type-checks the project (`tsc -b`) and produces a production bundle in
`dist/`. Routes are code-split (`React.lazy`), so the output contains one
small shared entry chunk plus a lazy chunk per page.