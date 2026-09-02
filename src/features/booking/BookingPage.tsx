import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useService } from '../../hooks/useService'
import { useServiceAvailability } from '../../hooks/useServiceAvailability'
import { useCreateBooking } from '../../hooks/useCreateBooking'
import { useBookingFlow } from './useBookingFlow'
import { SlotPicker } from './SlotPicker'
import { ServicePreviewCard } from './components/ServicePreviewCard'
import { CustomerDetailsForm } from './components/CustomerDetailsForm'
import { BookingSummaryCard } from './components/BookingSummaryCard'
import { LoadingState, ErrorState } from '../../components/StatusStates'
import { PageContainer } from '../../components/layout/PageContainer'
import { BackLink } from '../../components/layout/BackLink'

function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-marketplace text-xs font-semibold text-white">
        {step}
      </span>
      <h2 className="text-sm font-semibold text-primary">{title}</h2>
    </div>
  )
}

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
    navigate(`/bookings/${result.booking.id}`, { state: { justBooked: true } })
  }

  const selectedSlot = slots?.find((s) => s.id === selectedSlotId)

  return (
    <PageContainer className="py-6">
      <BackLink />

      <h1 className="text-2xl font-semibold text-primary">Book an Appointment</h1>
      <p className="mt-1 text-sm text-secondary">
        Choose a time and confirm your details to complete the booking.
      </p>

      <div className="mt-6">
        <ServicePreviewCard service={service} />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <StepHeader step={1} title="Select a time slot" />
            <SlotPicker
              slots={slots ?? []}
              selectedSlotId={selectedSlotId}
              onSelect={setSelectedSlotId}
            />
            {fieldErrors.slotId && (
              <p className="mt-2 text-sm text-danger" role="alert">
                {fieldErrors.slotId}
              </p>
            )}
          </section>

          <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <StepHeader step={2} title="Your details" />
            <CustomerDetailsForm
              customer={customer}
              fieldErrors={fieldErrors}
              onChange={updateCustomerField}
            />
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

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingSummaryCard
            service={service}
            selectedSlot={selectedSlot}
            isPending={createBooking.isPending}
            onConfirm={handleConfirm}
          />
        </aside>
      </div>
    </PageContainer>
  )
}