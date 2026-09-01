import { useQuery } from "@tanstack/react-query";
import { listCategories } from "../api/services/servicesApi";
import { queryKeys } from "../api/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: listCategories,
  });
}
