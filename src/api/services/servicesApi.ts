import type {
  Service,
  ServiceListParams,
  ServiceSummary,
  TimeSlot,
} from "../../types/service";
import type { CategorySummary } from "../../types/category";
import { request } from "../client/httpClient";
import {
  mockGetServiceAvailability,
  mockGetServiceById,
  mockListServices,
  mockListCategories,
} from "../mock/services.mock";

/**
 * These functions are what features/hooks import — never the mock
 * module directly. That indirection is what makes the mock replaceable:
 * flipping to a real backend later only means changing the body of
 * these functions to call `request(() => fetch(...))` instead of
 * `request(() => mockListServices(...))`.
 */

export function listServices(
  params?: ServiceListParams,
): Promise<{ items: ServiceSummary[]; total: number }> {
  return request(() => mockListServices(params));
}

export function getService(serviceId: string): Promise<Service> {
  return request(() => mockGetServiceById(serviceId));
}

export function getServiceAvailability(serviceId: string): Promise<TimeSlot[]> {
  return request(() => mockGetServiceAvailability(serviceId));
}

export function listCategories(): Promise<CategorySummary[]> {
  return request(() => mockListCategories());
}
