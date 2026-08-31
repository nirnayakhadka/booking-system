import { useNavigate, useParams } from 'react-router-dom'
import { useService } from '../../hooks/useService'
import { LoadingState, ErrorState } from '../../components/StatusStates'

export function ServiceDetailsPage() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()
  const { data: service, isLoading, isError, refetch } = useService(serviceId)

  if (isLoading) return <LoadingState label="Loading service..." />
  if (isError || !service) {
    return <ErrorState message="Couldn't load this service." onRetry={() => refetch()} />
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)} className="text-sm text-indigo-600 mb-4">
        &larr; Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-900">{service.name}</h1>
      <p className="text-gray-500 mt-1">
        {service.category} · {service.provider.name}
      </p>

      <p className="mt-4 text-gray-700">{service.description}</p>

      <dl className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <dt className="text-gray-400">Price</dt>
          <dd className="font-medium text-gray-900">
            {service.currency} {service.price}
          </dd>
        </div>
        <div>
          <dt className="text-gray-400">Duration</dt>
          <dd className="font-medium text-gray-900">{service.durationMinutes} min</dd>
        </div>
        <div>
          <dt className="text-gray-400">Rating</dt>
          <dd className="font-medium text-gray-900">★ {service.rating}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Availability</dt>
          <dd
            className={`font-medium ${service.isAvailable ? 'text-green-600' : 'text-red-500'}`}
          >
            {service.isAvailable ? 'Available' : 'Unavailable'}
          </dd>
        </div>
      </dl>

      <button
        onClick={() => navigate(`/services/${service.id}/book`)}
        disabled={!service.isAvailable}
        className="mt-8 w-full bg-indigo-600 text-white rounded-md py-2.5 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700"
      >
        Book this service
      </button>
    </div>
  )
}
