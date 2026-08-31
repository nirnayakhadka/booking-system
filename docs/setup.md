# Setup

## Prerequisites

- Node.js 18+ and npm

## Installation

```bash
npm install
```

## Environment Configuration

No environment variables are required. The app runs entirely against the
in-memory mock API (`src/api/mock/`) — there is no backend server to point
at or configure.

## Running the Application

```bash
npm run dev
```

This starts the Vite dev server (default: `http://localhost:5173`). The
app loads with a pre-seeded mock dataset (5 services, 1 existing booking).

## Running the Mock API

The mock API is not a separate process — it runs in-process as part of the
frontend bundle (see `src/api/mock/`). There is nothing extra to start;
`npm run dev` is sufficient. Mock data resets on every full page reload
since it lives in memory only.

## Running Tests

```bash
npx vitest run
```

Or in watch mode during development:

```bash
npx vitest
```

## Building for Production

```bash
npm run build
```

Type-checks the project (`tsc -b`) and produces a production bundle in `dist/`.
