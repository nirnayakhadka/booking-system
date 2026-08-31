import { useQuery } from '@tanstack/react-query'
import type { ServiceListParams } from '../types/service'
import { listServices } from '../api/services/servicesApi'
import { queryKeys } from '../api/queryKeys'

export function useServices(params: ServiceListParams) {
  return useQuery({
    queryKey: queryKeys.services.list(params),
    queryFn: () => listServices(params),
    placeholderData: (prev) => prev, // avoids list flicker while refetching on filter change
  })
}
