import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";
import { useService } from "../../hooks/useService";
import { LoadingState, ErrorState } from "../../components/StatusStates";
import type { BookingStatus } from "../../types/booking";

const STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-success-bg text-success-text",
  pending: "bg-warning-bg text-warning-text",
  cancelled: "bg-danger-bg text-danger-text",
  completed: "bg-info-bg text-info-text",
};

export function BookingDetailsPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const justBooked = Boolean(
    (location.state as { justBooked?: boolean } | null)?.justBooked,
  );

  const { data: booking, isLoading, isError, refetch } = useBooking(bookingId);
  // Booking only stores serviceId — image/price/rating live on Service,
  // so we fetch it separately rather than duplicating that data onto
  // every booking record.
  const { data: service, isLoading: isServiceLoading } = useService(
    booking?.serviceId,
  );

  if (isLoading) return <LoadingState label="Loading booking..." />;
  if (isError || !booking) {
    return (
      <ErrorState
        message="Couldn't load this booking."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/bookings")}
        className="mb-4 text-sm text-secondary hover:text-primary"
      >
        ← Back to my bookings
      </button>

      {justBooked && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-success-border bg-success-bg p-4">
          <span className="mt-0.5 text-lg text-success">✓</span>
          <div>
            <p className="font-medium text-success-text">Booking confirmed</p>
            <p className="text-sm text-success-text">
              Your booking number is{" "}
              <span className="font-semibold">{booking.bookingNumber}</span>.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: service image */}
        <div className="aspect-square w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          {isServiceLoading ? (
            <div className="h-full w-full animate-pulse bg-[var(--color-surface-muted)]" />
          ) : service?.imageUrl ? (
            <img
              src={service.imageUrl}
              alt={service.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
          )}
        </div>

        {/* Right: details */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-secondary">
            Booking #{booking.bookingNumber}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-primary">
            {booking.serviceName}
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Provided by {booking.providerName}
          </p>

          {service && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-secondary">★ {service.rating}</span>
              <span className="text-secondary">·</span>
              <span className="text-2xl font-bold text-marketplace">
                {service.currency} {service.price}
              </span>
            </div>
          )}

          <span
            className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[booking.status]}`}
          >
            {booking.status}
          </span>

          {/* Schedule */}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">
                Date
              </p>
              <p className="mt-1 font-medium text-primary">
                {booking.scheduledDate}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">
                Time
              </p>
              <p className="mt-1 font-medium text-primary">
                {booking.scheduledTime}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">
                Booking ID
              </p>
              <p className="mt-1 truncate font-medium text-primary">
                {booking.id}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-secondary">
                Booked On
              </p>
              <p className="mt-1 font-medium text-primary">
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Customer details */}
          <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
              Customer Details
            </p>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-secondary">Name</dt>
                <dd className="font-medium text-primary">
                  {booking.customer.name}
                </dd>
              </div>
              <div>
                <dt className="text-secondary">Email</dt>
                <dd className="font-medium text-primary">
                  {booking.customer.email}
                </dd>
              </div>
              <div>
                <dt className="text-secondary">Phone</dt>
                <dd className="font-medium text-primary">
                  {booking.customer.phone}
                </dd>
              </div>
              <div>
                <dt className="text-secondary">Address</dt>
                <dd className="font-medium text-primary">
                  {booking.customer.address}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
