# API Contract

Base path: `/api/v1`

All responses are JSON. Successful responses use the envelope:

```json
{ "data": <payload>, "meta": { "total": 0, "page": 1, "pageSize": 20 } }
```

`meta` is only present on list endpoints. Error responses use:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "..." } } }
```

`fields` is only present for `VALIDATION_ERROR`.

## Mock runtime behaviour

The mock substitutes for a real backend and simulates the parts of one that
shape the UI:

- **Latency with a warm cache.** Every read endpoint gates through
  `requestGate(key)` (see `src/api/mock/utils.ts`). The *first* request for
  a given key waits ~300-800ms (so loading states are real and testable);
  repeat requests for the same key resolve in ~20-80ms, standing in for a
  warmed server/Redis cache.
- **Configurable server errors.** Any endpoint can throw a normalized
  `SERVER_ERROR` (HTTP 500). Off by default for deterministic
  normal/test runs; flipped on via `setServerErrorChance(1)` in tests or
  dev tooling.
- **Persistent bookings.** `POST /bookings` writes through to the
  localStorage-backed store, so bookings survive a page reload. The seeded
  catalog is **107 services in 9 categories**; list data is paginated
  (default `pageSize: 20`).

> Note: the mock is in-process — the contract's status codes map one-to-one
> onto the normalized API layer without a real HTTP round trip.

---

## `GET /api/v1/services`

**Purpose:** List services with optional search and category filtering.

**Query parameters:**
| Param | Type | Required | Notes |
|---|---|---|---|
| `search` | string | no | Case-insensitive match against name/description |
| `category` | string | no | Exact category match |
| `page` | number | no | Default `1` |
| `pageSize` | number | no | Default `20` |

**Response body (200):**
```json
{
  "data": [
    {
      "id": "svc-1",
      "name": "Deep Tissue Massage",
      "category": "Wellness",
      "provider": { "id": "prov-1", "name": "Aarav Sharma" },
      "price": 45,
      "currency": "USD",
      "rating": 4.8,
      "isAvailable": true
    }
  ],
  "meta": { "total": 107, "page": 1, "pageSize": 20 }
}
```

**Status codes:** `200` success (including empty results), `500` server error.

**Loading behaviour:** UI shows a loading indicator while the request is in flight.
**Empty behaviour:** `data: []` with `meta.total: 0` — UI renders an empty state, not an error.
**Error behaviour:** Non-2xx renders the shared error state with a retry action.

The category filter is surfaced as a pill row on the service list page and
drives the URLs for the per-category route (`/categories/{name}`).

---

## `GET /api/v1/services/{service_id}`

**Purpose:** Full detail for a single service.

**Path parameters:** `service_id` (string, required)

**Response body (200):**
```json
{
  "data": {
    "id": "svc-1",
    "name": "Deep Tissue Massage",
    "description": "A 60-minute therapeutic massage...",
    "category": "Wellness",
    "provider": { "id": "prov-1", "name": "Aarav Sharma" },
    "price": 45,
    "currency": "USD",
    "durationMinutes": 60,
    "rating": 4.8,
    "isAvailable": true
  }
}
```

**Status codes:** `200` success, `404` service not found, `500` server error.

**Error behaviour:** `404` renders "service not found" via the shared error state.

---

## `GET /api/v1/services/{service_id}/availability`

**Purpose:** Available time slots for a service over the next several days.

**Path parameters:** `service_id` (string, required)

**Response body (200):**
```json
{
  "data": [
    { "id": "svc-1_2026-09-05_10:00", "date": "2026-09-05", "startTime": "10:00", "endTime": "11:00", "isAvailable": true },
    { "id": "svc-1_2026-09-05_11:00", "date": "2026-09-05", "startTime": "11:00", "endTime": "12:00", "isAvailable": false }
  ]
}
```

The mock generates slots for the next 5 days at a fixed set of start times
(09:00–16:00) and marks any slot already present in the booking store as
unavailable, which is what makes the slot-conflict path reachable
end-to-end.

**Status codes:** `200` success, `404` service not found, `500` server error.

**Empty behaviour:** `data: []` if a service has no configured slots at all — UI renders an empty state.

---

## `POST /api/v1/bookings`

**Purpose:** Create a booking for a given service and slot.

**Request body:**
```json
{
  "serviceId": "svc-1",
  "slotId": "svc-1_2026-09-05_10:00",
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9800000000",
    "address": "Lalitpur, Nepal"
  }
}
```

**Response body (201 — success):**
```json
{
  "data": {
    "id": "bkg-123",
    "bookingNumber": "BK-20260905-002",
    "serviceId": "svc-1",
    "serviceName": "Deep Tissue Massage",
    "providerName": "Aarav Sharma",
    "scheduledDate": "2026-09-05",
    "scheduledTime": "10:00",
    "status": "confirmed",
    "customer": { "...": "..." },
    "createdAt": "2026-08-31T12:00:00.000Z"
  }
}
```

**Validation errors (422):**
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Validation failed.", "fields": { "email": "Enter a valid email address." } } }
```
Triggered when `serviceId`/`slotId` are missing, or customer fields are missing/malformed.

**Business error — slot conflict (409):**
```json
{ "error": { "code": "SLOT_CONFLICT", "message": "This time slot was just booked by someone else. Please pick another slot." } }
```
Triggered when the selected slot was booked by another request between the
availability fetch and the booking submission.

**Status codes:** `201` created, `422` validation error, `409` slot conflict, `404` service not found, `500` server error.

**Note on modeling:** the frontend's `createBooking` service function
returns a discriminated union (`success | validation_error | slot_conflict`)
so the UI can branch on these outcomes without try/catch, even though on
the wire they arrive as different HTTP status codes.

---

## `GET /api/v1/bookings`

**Purpose:** List all bookings for the current customer.

**Response body (200):**
```json
{ "data": [ { "id": "bkg-1", "bookingNumber": "BK-...", "status": "confirmed", "...": "..." } ] }
```

**Status codes:** `200` success (including empty), `500` server error.
**Empty behaviour:** `data: []` — UI renders "You have no bookings yet."

---

## `GET /api/v1/bookings/{booking_id}`

**Purpose:** Full detail for a single booking.

**Path parameters:** `booking_id` (string, required)

**Response body (200):** same shape as a single booking object above.

**Status codes:** `200` success, `404` booking not found, `500` server error.