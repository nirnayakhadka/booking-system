import { useNavigate, useParams } from 'react-router-dom'
import { useService } from '../../hooks/useService'
import { useServiceAvailability } from '../../hooks/useServiceAvailability'
import { useCreateBooking } from '../../hooks/useCreateBooking'
import { useBookingFlow } from './useBookingFlow'
import { SlotPicker } from './SlotPicker'
import { LoadingState, ErrorState } from '../../components/StatusStates'
import { useState } from 'react'

export function BookingPage() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()

  const { data: service, isLoading: serviceLoading, isError: serviceError } = useService(serviceId)
  const {
    data: slots,
    isLoading: slotsLoading,
    isError: slotsError,
  } = useServiceAvailability(serviceId)

  const { selectedSlotId, setSelectedSlotId, customer, updateCustomerField } = useBookingFlow()
  const createBooking = useCreateBooking()

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [conflictMessage, setConflictMessage] = useState<string | null>(null)

  if (serviceLoading || slotsLoading) return <LoadingState label="Loading booking options..." />
  if (serviceError || slotsError || !service) {
    return <ErrorState message="Couldn't load booking details." />
  }

  async function handleConfirm() {
    if (!service || !selectedSlotId) return

    setFieldErrors({})
    setConflictMessage(null)

    const result = await createBooking.mutateAsync({
      serviceId: service.id,
      slotId: selectedSlotId,
      customer,
    })

    if (result.status === 'validation_error') {
      setFieldErrors(result.errors)
      return
    }
    if (result.status === 'slot_conflict') {
      setConflictMessage(result.message)
      return
    }
    // success
    navigate(`/bookings/${result.booking.id}`, { state: { justBooked: true } })
  }

  const inputClass = (field?: string) =>
    `w-full rounded-lg border bg-[var(--color-surface-raised)] px-3 py-2.5 text-sm text-primary placeholder:text-secondary transition focus:outline-none focus:ring-2 focus:ring-marketplace ${
      field
        ? 'border-danger'
        : 'border-[var(--color-border)] focus:border-marketplace'
    }`

  const selectedSlot = slots?.find((s) => s.id === selectedSlotId)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-secondary transition hover:text-primary"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold text-primary">Book {service.name}</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left column: slot + customer details */}
        <div className="space-y-6">
          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-marketplace text-xs font-semibold text-white">
                1
              </span>
              <h2 className="text-sm font-semibold text-primary">Select a time slot</h2>
            </div>
            <SlotPicker
              slots={slots ?? []}
              selectedSlotId={selectedSlotId}
              onSelect={setSelectedSlotId}
            />
            {fieldErrors.slotId && (
              <p className="mt-2 text-sm text-danger" role="alert">{fieldErrors.slotId}</p>
            )}
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-marketplace text-xs font-semibold text-white">
                2
              </span>
              <h2 className="text-sm font-semibold text-primary">Your details</h2>
            </div>
            <div className="space-y-3">
              <div>
                <input
                  placeholder="Full name"
                  aria-label="Full name"
                  value={customer.name}
                  onChange={(e) => updateCustomerField('name', e.target.value)}
                  className={inputClass(fieldErrors.name)}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-danger" role="alert">{fieldErrors.name}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Email"
                  aria-label="Email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => updateCustomerField('email', e.target.value)}
                  className={inputClass(fieldErrors.email)}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-danger" role="alert">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Phone"
                  aria-label="Phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => updateCustomerField('phone', e.target.value)}
                  className={inputClass(fieldErrors.phone)}
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-danger" role="alert">{fieldErrors.phone}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="Address"
                  aria-label="Address"
                  value={customer.address}
                  onChange={(e) => updateCustomerField('address', e.target.value)}
                  className={inputClass(fieldErrors.address)}
                />
                {fieldErrors.address && (
                  <p className="mt-1 text-sm text-danger" role="alert">{fieldErrors.address}</p>
                )}
              </div>
            </div>
          </section>

          {conflictMessage && (
            <p
              className="rounded-xl border border-warning-border bg-warning-bg px-4 py-3 text-sm text-warning-text"
              role="alert"
            >
              {conflictMessage}
            </p>
          )}
        </div>

        {/* Right column: sticky summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
              Booking summary
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-secondary">Service</span>
                <span className="text-right font-medium text-primary">{service.name}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-secondary">Date</span>
                <span className="font-medium text-primary">
                  {selectedSlot ? selectedSlot.date : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-secondary">Time</span>
                <span className="font-medium text-primary">
                  {selectedSlot ? `${selectedSlot.startTime} – ${selectedSlot.endTime}` : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-secondary">Duration</span>
                <span className="font-medium text-primary">{service.durationMinutes} min</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-[var(--color-border)] pt-3">
                <span className="font-semibold text-primary">Total</span>
                <span className="text-lg font-bold text-marketplace">
                  {service.currency} {service.price}
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={createBooking.isPending || !selectedSlotId}
              className="mt-5 w-full rounded-lg bg-marketplace py-3 font-medium text-white transition hover:bg-marketplace-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {createBooking.isPending ? 'Confirming...' : 'Confirm Booking'}
            </button>
            {!selectedSlotId && (
              <p className="mt-2 text-center text-xs text-secondary">
                Select a time slot to continue
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}