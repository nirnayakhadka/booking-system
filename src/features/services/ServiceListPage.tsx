import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../../hooks/useServices'
import { LoadingState, ErrorState, EmptyState } from '../../components/StatusStates'

const CATEGORIES = ['Wellness', 'Home Services', 'Tech Support']

export function ServiceListPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  const { data, isLoading, isError, refetch } = useServices({
    search: search || undefined,
    category: category || undefined,
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Browse Services</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <LoadingState label="Loading services..." />}
      {isError && <ErrorState message="Couldn't load services." onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.items.length === 0 && (
        <EmptyState message="No services match your search." />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-4">
          {data.items.map((service) => (
            <li key={service.id}>
              <button
                onClick={() => navigate(`/services/${service.id}`)}
                disabled={!service.isAvailable}
                className={`w-full text-left border rounded-lg p-4 transition ${
                  service.isAvailable
                    ? 'border-gray-200 hover:border-indigo-400 hover:shadow-sm'
                    : 'border-gray-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h2 className="font-medium text-gray-900">{service.name}</h2>
                  <span className="text-sm text-gray-500">★ {service.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{service.category}</p>
                <p className="text-sm text-gray-400 mt-1">{service.provider.name}</p>
                <p className="mt-2 font-semibold text-gray-900">
                  {service.currency} {service.price}
                </p>
                {!service.isAvailable && (
                  <p className="text-xs text-red-500 mt-1">Currently unavailable</p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
