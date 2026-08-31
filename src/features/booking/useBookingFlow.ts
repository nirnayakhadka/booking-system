import { useState } from 'react'
import type { BookingCustomer } from '../../types/booking'

export interface BookingFormState {
  selectedSlotId: string | null
  customer: BookingCustomer
}

const initialCustomer: BookingCustomer = { name: '', email: '', phone: '', address: '' }

/**
 * Local component state (not React Query) because this is transient
 * form/UI state, not server data — it doesn't need caching, background
 * refetch, or to be shared across routes. Mixing the two concerns in
 * one hook would blur what's server state vs. UI state.
 */
export function useBookingFlow() {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [customer, setCustomer] = useState<BookingCustomer>(initialCustomer)

  function updateCustomerField(field: keyof BookingCustomer, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  function reset() {
    setSelectedSlotId(null)
    setCustomer(initialCustomer)
  }

  return { selectedSlotId, setSelectedSlotId, customer, updateCustomerField, reset }
}
