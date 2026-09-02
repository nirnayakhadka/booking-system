import { lazy, Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/layout/BackToTop";
import { LoadingState } from "./components/StatusStates";


const ServiceListPage = lazy(() =>
  import("./features/services/ServiceListPage").then((m) => ({
    default: m.ServiceListPage,
  })),
);
const ServiceDetailsPage = lazy(() =>
  import("./features/services/ServiceDetailsPage").then((m) => ({
    default: m.ServiceDetailsPage,
  })),
);
const BookingPage = lazy(() =>
  import("./features/booking/BookingPage").then((m) => ({
    default: m.BookingPage,
  })),
);
const MyBookingsPage = lazy(() =>
  import("./features/bookings/MyBookingsPage").then((m) => ({
    default: m.MyBookingsPage,
  })),
);
const BookingDetailsPage = lazy(() =>
  import("./features/bookings/BookingDetailsPage").then((m) => ({
    default: m.BookingDetailsPage,
  })),
);
const CategoryDetailsPage = lazy(() =>
  import("./features/services/CategoryDetailsPage").then((m) => ({
    default: m.CategoryDetailsPage,
  })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // Keep previously seen data fresh for 5 minutes and never refetch
      // on window focus — combined with the mock's warm request cache,
      // revisiting a screen resolves from cache instead of hitting the
      // "network", which is what makes navigation feel instant.
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function PageRoutes() {
  const { pathname } = useLocation();

  return (
    // Keying on the current path re-runs the page-in animation on every
    // navigation, giving route changes a smooth fade/slide feel.
    <div key={pathname} className="animate-page-in">
      <Suspense fallback={<LoadingState label="Loading page..." />}>
        <Routes>
          <Route path="/" element={<ServiceListPage />} />
          <Route
            path="/services/:serviceId"
            element={<ServiceDetailsPage />}
          />
          <Route
            path="/services/:serviceId/book"
            element={<BookingPage />}
          />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route
            path="/bookings/:bookingId"
            element={<BookingDetailsPage />}
          />
          <Route
            path="/categories/:categoryName"
            element={<CategoryDetailsPage />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-[var(--color-surface-muted)] text-primary">
          <NavBar />
          <main className="flex-1">
            <PageRoutes />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}