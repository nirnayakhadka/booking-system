import type { Service } from "../../../types/service";

export const mockServices: Service[] = [
  {
    id: "svc-1",
    name: "Deep Tissue Massage",
    description:
      "A 60-minute therapeutic massage targeting chronic muscle tension using firm pressure techniques.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 45,
    currency: "USD",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-2",
    name: "Home Deep Cleaning",
    description:
      "Full-home deep cleaning service covering kitchen, bathrooms, and living areas. Supplies included.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 80,
    currency: "USD",
    durationMinutes: 120,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-3",
    name: "Laptop Screen Repair",
    description:
      "On-site diagnostic and screen replacement for most laptop brands.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 60,
    currency: "USD",
    durationMinutes: 45,
    rating: 4.2,
    isAvailable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-4",
    name: "Personal Yoga Session",
    description:
      "One-on-one yoga session tailored to your fitness level and goals.",
    category: "Wellness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 35,
    currency: "USD",
    durationMinutes: 50,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-5",
    name: "Garden Maintenance",
    description: "Lawn mowing, hedge trimming, and general garden upkeep.",
    category: "Home Services",
    provider: { id: "prov-5", name: "GreenScape" },
    price: 50,
    currency: "USD",
    durationMinutes: 90,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
  },
];
