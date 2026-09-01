import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { MyBookingsPage } from "./MyBookingsPage";
import * as bookingsApi from "../../api/services/bookingsApi";

function renderWithProviders() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <MyBookingsPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("MyBookingsPage", () => {
  it("shows the empty state when the user has no bookings", async () => {
    vi.spyOn(bookingsApi, "listBookings").mockResolvedValueOnce([]);

    renderWithProviders();

    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("You have no bookings yet.")).toBeInTheDocument();
    });
  });

  it("renders a booking once loaded", async () => {
    vi.spyOn(bookingsApi, "listBookings").mockResolvedValueOnce([
      {
        id: "bkg-1",
        bookingNumber: "BK-20260905-001",
        serviceId: "svc-1",
        serviceName: "Deep Tissue Massage",
        providerName: "Aarav Sharma",
        scheduledDate: "2026-09-05",
        scheduledTime: "10:00",
        status: "confirmed",
        customer: {
          name: "Nirnaya Khadka",
          email: "n@example.com",
          phone: "9800000000",
          address: "Kathmandu",
        },
        createdAt: "2026-09-01T10:00:00.000Z",
      },
    ]);

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText("Deep Tissue Massage")).toBeInTheDocument();
    });
    expect(screen.getByText(/BK-20260905-001/i)).toBeInTheDocument();
    expect(screen.getByText("confirmed")).toBeInTheDocument();
  });
});