import { useQuery } from '@tanstack/react-query'
import { getService } from '../api/services/servicesApi'
import { queryKeys } from '../api/queryKeys'

export function useService(serviceId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.services.detail(serviceId ?? ''),
    queryFn: () => getService(serviceId as string),
    enabled: Boolean(serviceId),
  })
}
