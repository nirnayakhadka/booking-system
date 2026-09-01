import type { TimeSlot } from '../../types/service'

interface Props {
  slots: TimeSlot[]
  selectedSlotId: string | null
  onSelect: (slotId: string) => void
}

/**
 * Formats an ISO date ("2026-09-05") into a human-friendly label,
 * e.g. "Sat, Sep 5". Dates are always in the local timezone because the
 * mock generates them from `new Date()`, so no timezone math is needed.
 */
function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function SlotPicker({ slots, selectedSlotId, onSelect }: Props) {
  const byDate = slots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    acc[slot.date] = acc[slot.date] ?? []
    acc[slot.date].push(slot)
    return acc
  }, {})

  return (
    <div className="space-y-5">
      {Object.entries(byDate).map(([date, daySlots]) => {
        const availableCount = daySlots.filter((s) => s.isAvailable).length
        return (
          <div key={date}>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="text-sm font-medium text-primary">{formatDate(date)}</h3>
              <span className="text-xs text-secondary">
                {availableCount} of {daySlots.length} available
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {daySlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.isAvailable}
                  onClick={() => onSelect(slot.id)}
                  aria-pressed={selectedSlotId === slot.id}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    selectedSlotId === slot.id
                      ? 'border-marketplace bg-marketplace text-white shadow-sm'
                      : slot.isAvailable
                        ? 'border-[var(--color-border)] bg-[var(--color-surface-raised)] text-primary hover:border-marketplace'
                        : 'cursor-not-allowed border-[var(--color-border)] text-secondary line-through opacity-50'
                  }`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}