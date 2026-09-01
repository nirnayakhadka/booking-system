import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ServiceListPage } from './ServiceListPage'
import * as servicesApi from '../../api/services/servicesApi'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ServiceListPage', () => {
  it('renders services once loaded (success path)', async () => {
    renderWithProviders(<ServiceListPage />)

    // Loading state shows first
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      // The featured service appears twice by design — in the hero banner
      // and in the grid card — so all matches must be counted, not a unique one.
      expect(screen.getAllByText(/Deep Tissue Massage/i).length).toBeGreaterThan(0)
    })
  })

  it('renders an error state when the API call fails', async () => {
    vi.spyOn(servicesApi, 'listServices').mockRejectedValueOnce(new Error('network down'))

    renderWithProviders(<ServiceListPage />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
