import type { ServiceListParams } from "../types/service";

export const queryKeys = {
  services: {
    all: ["services"] as const,
    list: (params?: ServiceListParams) => ["services", "list", params] as const,
    detail: (id: string) => ["services", "detail", id] as const,
    availability: (id: string) => ["services", "availability", id] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  bookings: {
    all: ["bookings"] as const,
    list: () => ["bookings", "list"] as const,
    detail: (id: string) => ["bookings", "detail", id] as const,
  },
};
