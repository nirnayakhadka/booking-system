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

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Book {service.name}</h1>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Select a time slot</h2>
        <SlotPicker
          slots={slots ?? []}
          selectedSlotId={selectedSlotId}
          onSelect={setSelectedSlotId}
        />
        {fieldErrors.slotId && <p className="text-sm text-red-500 mt-2">{fieldErrors.slotId}</p>}
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-sm font-medium text-gray-700">Your details</h2>
        <div>
          <input
            placeholder="Full name"
            value={customer.name}
            onChange={(e) => updateCustomerField('name', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {fieldErrors.name && <p className="text-sm text-red-500 mt-1">{fieldErrors.name}</p>}
        </div>
        <div>
          <input
            placeholder="Email"
            value={customer.email}
            onChange={(e) => updateCustomerField('email', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {fieldErrors.email && <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>}
        </div>
        <div>
          <input
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) => updateCustomerField('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {fieldErrors.phone && <p className="text-sm text-red-500 mt-1">{fieldErrors.phone}</p>}
        </div>
        <div>
          <input
            placeholder="Address"
            value={customer.address}
            onChange={(e) => updateCustomerField('address', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {fieldErrors.address && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.address}</p>
          )}
        </div>
      </section>

      {conflictMessage && (
        <p className="mt-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-3">
          {conflictMessage}
        </p>
      )}

      <section className="mt-8 border-t border-gray-200 pt-4">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Summary</h2>
        <p className="text-sm text-gray-600">
          {service.name} — {service.currency} {service.price}
        </p>
      </section>

      <button
        onClick={handleConfirm}
        disabled={createBooking.isPending || !selectedSlotId}
        className="mt-6 w-full bg-indigo-600 text-white rounded-md py-2.5 font-medium disabled:opacity-40 hover:bg-indigo-700"
      >
        {createBooking.isPending ? 'Confirming...' : 'Confirm Booking'}
      </button>
    </div>
  )
}
