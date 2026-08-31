import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { ServiceListPage } from './features/services/ServiceListPage'
import { ServiceDetailsPage } from './features/services/ServiceDetailsPage'
import { BookingPage } from './features/booking/BookingPage'
import { MyBookingsPage } from './features/bookings/MyBookingsPage'
import { BookingDetailsPage } from './features/bookings/BookingDetailsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<ServiceListPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailsPage />} />
              <Route path="/services/:serviceId/book" element={<BookingPage />} />
              <Route path="/bookings" element={<MyBookingsPage />} />
              <Route path="/bookings/:bookingId" element={<BookingDetailsPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
