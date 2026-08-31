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
      expect(screen.getByText(/Deep Tissue Massage/i)).toBeInTheDocument()
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
