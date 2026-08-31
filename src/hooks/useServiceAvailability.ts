import { useQuery } from '@tanstack/react-query'
import { getServiceAvailability } from '../api/services/servicesApi'
import { queryKeys } from '../api/queryKeys'

export function useServiceAvailability(serviceId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.services.availability(serviceId ?? ''),
    queryFn: () => getServiceAvailability(serviceId as string),
    enabled: Boolean(serviceId),
  })
}
