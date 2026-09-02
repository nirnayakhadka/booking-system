import { Button } from "../../../components/ui/Button";
import type { Service, TimeSlot } from "../../../types/service";

interface BookingSummaryCardProps {
  service: Service;
  selectedSlot: TimeSlot | undefined;
  isPending: boolean;
  onConfirm: () => void;
}

export function BookingSummaryCard({
  service,
  selectedSlot,
  isPending,
  onConfirm,
}: BookingSummaryCardProps) {
  const rows = [
    { label: "Date", value: selectedSlot?.date ?? "—" },
    {
      label: "Time",
      value: selectedSlot
        ? `${selectedSlot.startTime} – ${selectedSlot.endTime}`
        : "—",
    },
    { label: "Duration", value: `${service.durationMinutes} min` },
  ];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
        Booking Summary
      </h2>

      <div className="mt-4 space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-3">
            <span className="text-secondary">{row.label}</span>
            <span className="text-right font-medium text-primary">
              {row.value}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3">
          <span className="font-semibold text-primary">Total</span>
          <span className="text-xl font-bold text-marketplace">
            {service.currency} {service.price}
          </span>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        disabled={isPending || !selectedSlot}
        size="lg"
        className="mt-5 w-full"
      >
        {isPending ? "Confirming..." : "Confirm Booking"}
      </Button>

      {!selectedSlot && (
        <p className="mt-2 text-center text-xs text-secondary">
          Select a time slot to continue
        </p>
      )}

      <p className="mt-3 text-center text-xs text-secondary">
        🔒 Your details are only used to confirm this booking
      </p>
    </div>
  );
}
