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
    id: "svc-6",
    name: "Facial & Skincare Treatment",
    description:
      "A relaxing 45-minute facial using deep-cleansing and hydrating techniques.",
    category: "Wellness",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 40,
    currency: "USD",
    durationMinutes: 45,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
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
  {
    id: "svc-7",
    name: "Plumbing Repair",
    description:
      "Diagnosis and repair for leaks, clogs, and fixture installation.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 65,
    currency: "USD",
    durationMinutes: 60,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607472829760-2f0f97a03aa1?w=1200&q=80&auto=format&fit=crop",
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
    id: "svc-8",
    name: "Home Network Setup",
    description:
      "Router configuration, Wi-Fi optimization, and smart-device pairing.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 55,
    currency: "USD",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-9",
    name: "Data Recovery Service",
    description:
      "Recovery of lost or corrupted files from drives and damaged devices.",
    category: "Tech Support",
    provider: { id: "prov-9", name: "FixIt Tech" },
    price: 90,
    currency: "USD",
    durationMinutes: 90,
    rating: 4.1,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-10",
    name: "Bridal Makeup & Styling",
    description:
      "On-location makeup and hair styling for weddings and special events.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 70,
    currency: "USD",
    durationMinutes: 90,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
  },
];
