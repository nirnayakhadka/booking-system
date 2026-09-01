import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route, useParams } from "react-router-dom";
import { BookingPage } from "./BookingPage";
import type { Booking } from "../../types/booking";
import type { Service, TimeSlot } from "../../types/service";

// Mock the API layer the hooks consume, so each test controls the
// booking outcome (validation_error / slot_conflict / success) precisely
// instead of depending on the shared in-memory mock bookings store.
const mocks = vi.hoisted(() => ({
  getService: vi.fn(),
  getServiceAvailability: vi.fn(),
  createBooking: vi.fn(),
}));

vi.mock("../../api/services/servicesApi", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../api/services/servicesApi")>();
  return {
    ...actual,
    getService: mocks.getService,
    getServiceAvailability: mocks.getServiceAvailability,
  };
});

vi.mock("../../api/services/bookingsApi", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../api/services/bookingsApi")>();
  return { ...actual, createBooking: mocks.createBooking };
});

const service: Service = {
  id: "svc-1",
  name: "Deep Tissue Massage",
  description: "A 60-minute therapeutic massage.",
  category: "Wellness",
  provider: { id: "p-1", name: "Aarav Sharma" },
  price: 45,
  currency: "USD",
  durationMinutes: 60,
  rating: 4.8,
  isAvailable: true,
  imageUrl: "https://example.com/massage.jpg",
};

const slots: TimeSlot[] = [
  {
    id: "svc-1_2026-09-05_10:00",
    date: "2026-09-05",
    startTime: "10:00",
    endTime: "11:00",
    isAvailable: true,
  },
  {
    id: "svc-1_2026-09-05_11:00",
    date: "2026-09-05",
    startTime: "11:00",
    endTime: "12:00",
    isAvailable: false,
  },
];

const successBooking: Booking = {
  id: "bkg-123",
  bookingNumber: "BK-20260905-001",
  serviceId: "svc-1",
  serviceName: "Deep Tissue Massage",
  providerName: "Aarav Sharma",
  scheduledDate: "2026-09-05",
  scheduledTime: "10:00",
  status: "confirmed",
  customer: {
    name: "Nirnaya Khadka",
    email: "nirnaya@example.com",
    phone: "9800000000",
    address: "Kathmandu",
  },
  createdAt: "2026-09-01T10:00:00.000Z",
};

function ConfirmationStub() {
  const { bookingId } = useParams();
  return <div>Confirmed {bookingId}</div>;
}

function renderBookingPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/services/svc-1/book"]}>
        <Routes>
          <Route path="/services/:serviceId/book" element={<BookingPage />} />
          <Route path="/bookings/:bookingId" element={<ConfirmationStub />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  mocks.getService.mockReset().mockResolvedValue(service);
  mocks.getServiceAvailability.mockReset().mockResolvedValue(slots);
  mocks.createBooking.mockReset();
});

describe("BookingPage", () => {
  it("shows field-level validation errors when the server rejects the request", async () => {
    const user = userEvent.setup();
    mocks.createBooking.mockResolvedValueOnce({
      status: "validation_error",
      errors: { name: "Name is required.", email: "Enter a valid email address." },
    });

    renderBookingPage();
    await screen.findByRole("button", { name: "10:00" });

    await user.click(screen.getByRole("button", { name: "10:00" }));
    await user.click(screen.getByRole("button", { name: "Confirm Booking" }));

    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    // mutateAsync invokes the mutation fn with (variables, context) — only the
    // variables payload matters here.
    expect(mocks.createBooking.mock.calls[0][0]).toEqual({
      serviceId: "svc-1",
      slotId: "svc-1_2026-09-05_10:00",
      customer: { name: "", email: "", phone: "", address: "" },
    });
  });

  it("navigates to the confirmation screen on a successful booking", async () => {
    const user = userEvent.setup();
    mocks.createBooking.mockResolvedValueOnce({
      status: "success",
      booking: successBooking,
    });

    renderBookingPage();
    await screen.findByRole("button", { name: "10:00" });

    await user.click(screen.getByRole("button", { name: "10:00" }));
    await user.type(screen.getByLabelText("Full name"), "Nirnaya Khadka");
    await user.type(screen.getByLabelText("Email"), "nirnaya@example.com");
    await user.type(screen.getByLabelText("Phone"), "9800000000");
    await user.type(screen.getByLabelText("Address"), "Kathmandu");
    await user.click(screen.getByRole("button", { name: "Confirm Booking" }));

    expect(await screen.findByText("Confirmed bkg-123")).toBeInTheDocument();
  });

  it("shows a slot conflict message instead of navigating", async () => {
    const user = userEvent.setup();
    mocks.createBooking.mockResolvedValueOnce({
      status: "slot_conflict",
      message:
        "This time slot was just booked by someone else. Please pick another slot.",
    });

    renderBookingPage();
    await screen.findByRole("button", { name: "10:00" });

    await user.click(screen.getByRole("button", { name: "10:00" }));
    await user.click(screen.getByRole("button", { name: "Confirm Booking" }));

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(/just booked by someone else/i);
  });
});