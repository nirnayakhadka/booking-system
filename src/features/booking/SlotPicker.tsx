import type { TimeSlot } from '../../types/service'

interface Props {
  slots: TimeSlot[]
  selectedSlotId: string | null
  onSelect: (slotId: string) => void
}

export function SlotPicker({ slots, selectedSlotId, onSelect }: Props) {
  const byDate = slots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    acc[slot.date] = acc[slot.date] ?? []
    acc[slot.date].push(slot)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      {Object.entries(byDate).map(([date, daySlots]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-700 mb-2">{date}</h3>
          <div className="flex flex-wrap gap-2">
            {daySlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.isAvailable}
                onClick={() => onSelect(slot.id)}
                className={`px-3 py-1.5 text-sm rounded-md border ${
                  selectedSlotId === slot.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : slot.isAvailable
                      ? 'border-gray-300 hover:border-indigo-400'
                      : 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                }`}
              >
                {slot.startTime}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
