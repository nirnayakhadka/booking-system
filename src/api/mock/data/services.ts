import type { Service } from "../../../types/service";

export const mockServices: Service[] = [
  // ============ WELLNESS (15 services) ============
  {
    id: "svc-1",
    name: "Deep Tissue Massage",
    description:
      "A 60-minute therapeutic massage targeting chronic muscle tension using firm pressure techniques. Ideal for athletes and those with persistent pain.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-2",
    name: "Swedish Relaxation Massage",
    description:
      "A gentle full-body massage using long, flowing strokes to ease tension and promote deep relaxation. Perfect for stress relief and overall well-being.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-3",
    name: "Personal Yoga Session",
    description:
      "One-on-one yoga session tailored to your fitness level and goals. Includes breathing exercises, asanas, and guided meditation for holistic wellness.",
    category: "Wellness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 50,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-4",
    name: "Group Yoga Class",
    description:
      "A 45-minute group yoga session suitable for all levels. Focus on flexibility, strength, and mindfulness in a supportive community setting.",
    category: "Wellness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 2600,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-5",
    name: "Facial & Skincare Treatment",
    description:
      "A relaxing 45-minute facial using deep-cleansing, exfoliating, and hydrating techniques. Includes a personalized skincare consultation and product recommendations.",
    category: "Wellness",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-6",
    name: "Anti-Aging Facial Treatment",
    description:
      "Advanced facial treatment using collagen-boosting serums and LED light therapy to reduce fine lines and improve skin elasticity. Recommended for mature skin types.",
    category: "Wellness",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 7150,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-7",
    name: "Meditation & Mindfulness Coaching",
    description:
      "Guided meditation session focused on stress reduction, breathing techniques, and mindfulness practices. Suitable for beginners and experienced practitioners alike.",
    category: "Wellness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 3250,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-8",
    name: "Nutrition Consultation",
    description:
      "Personalized diet planning session with a certified nutritionist. Includes body composition analysis, meal planning, and lifestyle recommendations for optimal health.",
    category: "Wellness",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 7150,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.5,
    isAvailable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-9",
    name: "Aromatherapy Session",
    description:
      "A soothing aromatherapy session using essential oils to promote relaxation, improve mood, and alleviate stress. Includes a custom oil blend to take home.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-10",
    name: "Sports Massage Therapy",
    description:
      "Targeted massage therapy designed for athletes to prevent injury, improve performance, and accelerate recovery. Includes stretching and mobility work.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-11",
    name: "Prenatal Massage",
    description:
      "Gentle massage therapy specifically designed for expecting mothers. Focuses on relieving pregnancy-related discomforts like back pain and swelling.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-12",
    name: "Hot Stone Massage",
    description:
      "A deeply relaxing massage using heated volcanic stones to relieve muscle tension, improve circulation, and promote deep relaxation. The heat penetrates deep into muscles for maximum benefit.",
    category: "Wellness",
    provider: { id: "prov-1", name: "Aarav Sharma" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-13",
    name: "Reflexology Therapy",
    description:
      "A therapeutic foot massage that applies pressure to specific points on the feet, corresponding to different organs and systems in the body. Promotes overall health and relaxation.",
    category: "Wellness",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 50,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-14",
    name: "Acupuncture Treatment",
    description:
      "Traditional Chinese medicine treatment using fine needles to stimulate specific points on the body. Effective for pain management, stress reduction, and overall wellness.",
    category: "Wellness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-15",
    name: "Wellness Retreat Package",
    description:
      "A comprehensive half-day wellness package combining yoga, meditation, massage, and nutritional counseling. Includes a healthy meal and take-home wellness kit.",
    category: "Wellness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 13000,
    currency: "NPR",
    durationMinutes: 240,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ HOME SERVICES (20 services) ============
  {
    id: "svc-16",
    name: "Home Deep Cleaning",
    description:
      "Full-home deep cleaning service covering kitchen, bathrooms, living areas, and bedrooms. Includes disinfecting, dusting, vacuuming, and mopping. Supplies and eco-friendly products included.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 10400,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-17",
    name: "Standard Home Cleaning",
    description:
      "Regular home cleaning service including dusting, vacuuming, mopping, and bathroom cleaning. Perfect for weekly or bi-weekly maintenance.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-18",
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding, and general garden upkeep. Includes leaf blowing and debris removal to keep your outdoor space pristine.",
    category: "Home Services",
    provider: { id: "prov-5", name: "GreenScape" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-19",
    name: "Garden Landscaping Design",
    description:
      "Professional garden design and landscaping service. Includes plant selection, layout planning, hardscaping, and complete installation of your dream garden.",
    category: "Home Services",
    provider: { id: "prov-5", name: "GreenScape" },
    price: 15600,
    currency: "NPR",
    durationMinutes: 240,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-20",
    name: "Plumbing Repair",
    description:
      "Diagnosis and repair for leaks, clogs, burst pipes, and fixture installation. All work is guaranteed and uses high-quality parts.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 8450,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607472829760-2f0f97a03aa1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-21",
    name: "Water Heater Installation",
    description:
      "Professional installation of electric and gas water heaters. Includes removal of old unit and proper disposal. All connections are safety-checked and guaranteed.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 11700,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607472829760-2f0f97a03aa1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-22",
    name: "AC Installation & Repair",
    description:
      "Installation, servicing, and repair of split and window air-conditioning units. Includes gas refilling, filter cleaning, and performance optimization.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 9750,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-23",
    name: "Interior Painting",
    description:
      "Professional wall and ceiling painting service, including surface prep, priming, and cleanup. Wide range of colors and finishes available.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 15600,
    currency: "NPR",
    durationMinutes: 240,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-24",
    name: "Exterior House Painting",
    description:
      "Complete exterior painting service including pressure washing, scraping, priming, and two coats of premium weather-resistant paint. Includes all prep work and cleanup.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 26000,
    currency: "NPR",
    durationMinutes: 480,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-25",
    name: "Pest Control Treatment",
    description:
      "Safe and effective indoor/outdoor pest control for common household pests including cockroaches, ants, termites, and rodents. Uses eco-friendly, pet-safe products.",
    category: "Home Services",
    provider: { id: "prov-5", name: "GreenScape" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.2,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1632933265780-9c26d9dc1c8f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-26",
    name: "Carpet Cleaning Service",
    description:
      "Deep steam cleaning for carpets and rugs. Removes stains, allergens, and odors using professional-grade equipment and eco-friendly cleaning solutions.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 9100,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-27",
    name: "Window Cleaning",
    description:
      "Professional interior and exterior window cleaning. Includes frame wiping, streak-free glass cleaning, and screen cleaning. Safe for all window types.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-28",
    name: "Electrical Repair & Installation",
    description:
      "Professional electrical services including wiring, fixture installation, circuit repairs, and safety inspections. All work meets safety codes.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 10400,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607472829760-2f0f97a03aa1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-29",
    name: "Tile & Grout Cleaning",
    description:
      "Deep cleaning of tile floors and grout lines. Removes dirt, stains, and mildew using specialized steam cleaning equipment. Restores floors to like-new condition.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-30",
    name: "Roof Repair & Maintenance",
    description:
      "Professional roof inspection, repair, and maintenance service. Includes replacing damaged shingles, sealing leaks, and gutter cleaning.",
    category: "Home Services",
    provider: { id: "prov-5", name: "GreenScape" },
    price: 13000,
    currency: "NPR",
    durationMinutes: 180,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-31",
    name: "Furniture Assembly Service",
    description:
      "Professional assembly of flat-pack furniture including beds, wardrobes, shelves, and desks. Includes all tools and hardware.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-32",
    name: "Move-In/Move-Out Cleaning",
    description:
      "Comprehensive cleaning service for move-in or move-out situations. Includes deep cleaning of all surfaces, appliances, windows, and floors to ensure the property is spotless.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 13000,
    currency: "NPR",
    durationMinutes: 180,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-33",
    name: "Floor Polishing & Waxing",
    description:
      "Professional floor polishing and waxing for hardwood, marble, and tile floors. Includes deep cleaning, buffing, and application of protective coating.",
    category: "Home Services",
    provider: { id: "prov-2", name: "CleanCo Services" },
    price: 11700,
    currency: "NPR",
    durationMinutes: 150,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-34",
    name: "Waterproofing Service",
    description:
      "Professional waterproofing for basements, roofs, and exterior walls. Uses high-quality sealants and membranes to prevent water damage and leaks.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 19500,
    currency: "NPR",
    durationMinutes: 240,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607472829760-2f0f97a03aa1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-35",
    name: "CCTV Installation",
    description:
      "Professional installation of CCTV security cameras for home or office. Includes camera placement, wiring, DVR setup, and remote viewing configuration.",
    category: "Home Services",
    provider: { id: "prov-7", name: "RapidFix Plumbing" },
    price: 11700,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607472829760-2f0f97a03aa1?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ TECH SUPPORT (18 services) ============
  {
    id: "svc-36",
    name: "Laptop Screen Repair",
    description:
      "On-site diagnostic and screen replacement for most laptop brands including Dell, HP, Lenovo, and Apple. Uses original-quality parts with a 90-day warranty.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.2,
    isAvailable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-37",
    name: "Home Network Setup",
    description:
      "Complete home network setup including router configuration, Wi-Fi optimization, and smart-device pairing. Ensures optimal coverage and speed throughout your home.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 7150,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-38",
    name: "Data Recovery Service",
    description:
      "Recovery of lost or corrupted files from hard drives, SSDs, USB drives, and damaged devices. Uses advanced recovery techniques for maximum data retrieval.",
    category: "Tech Support",
    provider: { id: "prov-9", name: "FixIt Tech" },
    price: 11700,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.1,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-39",
    name: "Smart Home Device Installation",
    description:
      "Setup and configuration of smart locks, cameras, thermostats, voice assistants, and lighting systems. Includes integration with existing home automation platforms.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 8450,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-40",
    name: "Custom PC Build",
    description:
      "Professional component selection, assembly, and OS setup for a custom desktop build. Tailored to your specific needs including gaming, video editing, or office work.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 14300,
    currency: "NPR",
    durationMinutes: 150,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-41",
    name: "Phone Screen Replacement",
    description:
      "Fast screen replacement service for most iOS and Android devices. Uses high-quality OEM-equivalent parts and includes a 90-day warranty.",
    category: "Tech Support",
    provider: { id: "prov-9", name: "FixIt Tech" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 40,
    rating: 4.3,
    isAvailable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-42",
    name: "Computer Virus Removal",
    description:
      "Comprehensive virus and malware removal service. Includes system scan, threat removal, and security optimization to prevent future infections.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-43",
    name: "Printer Setup & Troubleshooting",
    description:
      "Setup, configuration, and troubleshooting for printers and scanners. Includes network configuration, driver installation, and print quality optimization.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.2,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-44",
    name: "Software Installation & Training",
    description:
      "Professional installation and configuration of software applications. Includes personalized training sessions to help you and your team get up to speed.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-45",
    name: "Network Security Audit",
    description:
      "Comprehensive security assessment of your home or business network. Identifies vulnerabilities, provides recommendations, and implements security measures.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 10400,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-46",
    name: "Email & Server Setup",
    description:
      "Professional configuration of business email servers, domain setup, and email security protocols. Includes migration from existing services if needed.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 9750,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-47",
    name: "Data Backup & Recovery Plan",
    description:
      "Implementation of automated backup solutions for your important files. Includes recovery plan creation and disaster recovery testing.",
    category: "Tech Support",
    provider: { id: "prov-9", name: "FixIt Tech" },
    price: 8450,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-48",
    name: "MacBook Repair Service",
    description:
      "Specialized repair and maintenance for Apple MacBooks including keyboard replacement, battery service, logic board repair, and screen replacement.",
    category: "Tech Support",
    provider: { id: "prov-9", name: "FixIt Tech" },
    price: 10400,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-49",
    name: "Cloud Storage Setup",
    description:
      "Configuration of cloud storage solutions including Google Drive, OneDrive, and Dropbox. Includes file organization, sharing permissions, and synchronization setup.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-50",
    name: "Website Development Consultation",
    description:
      "Professional consultation for website development including platform selection, design advice, SEO strategy, and hosting setup.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-51",
    name: "Gaming Console Repair",
    description:
      "Diagnosis and repair for gaming consoles including PS5, Xbox Series X, and Nintendo Switch. Includes disc drive repair, overheating solutions, and controller fixes.",
    category: "Tech Support",
    provider: { id: "prov-9", name: "FixIt Tech" },
    price: 7150,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-52",
    name: "Virtual Private Network (VPN) Setup",
    description:
      "Professional setup of VPN for secure remote access and privacy. Includes configuration on all your devices and security best practices training.",
    category: "Tech Support",
    provider: { id: "prov-8", name: "NetPro Solutions" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-53",
    name: "IT Support & Maintenance Plan",
    description:
      "Comprehensive monthly IT support plan including hardware maintenance, software updates, security monitoring, and priority technical support for your business.",
    category: "Tech Support",
    provider: { id: "prov-3", name: "FixIt Tech" },
    price: 19500,
    currency: "NPR",
    durationMinutes: 180,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ BEAUTY & PERSONAL CARE (15 services) ============
  {
    id: "svc-54",
    name: "Bridal Makeup & Styling",
    description:
      "On-location makeup and hair styling for weddings and special events. Includes trial session, professional products, and long-lasting formulas for photo-ready results.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 9100,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-55",
    name: "Haircut & Styling",
    description:
      "Precision haircut and blow-dry styling tailored to your face shape, hair texture, and personal preference. Includes professional consultation and product recommendations.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-56",
    name: "Manicure & Pedicure",
    description:
      "Full nail care treatment including shaping, cuticle care, exfoliation, and polish. Choose from a wide range of colors or opt for gel or acrylic enhancements.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-57",
    name: "Gel Nail Extension",
    description:
      "Professional gel nail extension service for added length and strength. Includes shaping, base coat, color application, and high-gloss top coat.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-58",
    name: "Eyebrow Threading & Tinting",
    description:
      "Precise eyebrow threading and shaping followed by tinting for fuller, more defined brows. Customized to your face shape and desired look.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 2600,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-59",
    name: "Eyelash Extension",
    description:
      "High-quality eyelash extension application using premium materials. Available in various styles from natural to dramatic volume. Includes aftercare advice.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-60",
    name: "Hair Coloring & Highlights",
    description:
      "Professional hair coloring service including full color, highlights, balayage, or ombré. Uses premium products that nourish and protect your hair.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 9100,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-61",
    name: "Keratin Hair Treatment",
    description:
      "Professional keratin smoothing treatment for frizz-free, manageable, and shiny hair. Results last 3-5 months with proper aftercare.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 10400,
    currency: "NPR",
    durationMinutes: 150,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-62",
    name: "Microdermabrasion Treatment",
    description:
      "Advanced skin resurfacing treatment that exfoliates dead skin cells and promotes new cell growth. Effective for acne scars, fine lines, and uneven skin tone.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-63",
    name: "Waxing Service",
    description:
      "Professional waxing service for smooth, hair-free skin. Uses gentle, hypoallergenic wax suitable for all skin types. Available for all body areas.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 3250,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-64",
    name: "Makeup Lesson & Tutorial",
    description:
      "Personalized makeup lesson tailored to your skill level and preferences. Learn techniques for everyday looks, special occasions, or professional settings.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-65",
    name: "Scalp Treatment & Hair Mask",
    description:
      "Deep conditioning scalp treatment and hair mask for damaged or dry hair. Includes massage, steam treatment, and professional product application.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-66",
    name: "Men's Grooming Package",
    description:
      "Comprehensive grooming service including haircut, beard trimming, facial, and brow shaping. Tailored specifically for men's grooming needs.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-67",
    name: "Bridal Makeup Trial",
    description:
      "Pre-wedding makeup trial session to finalize your bridal look. Includes full makeup application, hair styling consultation, and product recommendations.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-10", name: "Glow Studio" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-68",
    name: "Chemical Peel Treatment",
    description:
      "Professional chemical peel to exfoliate and rejuvenate the skin. Effective for reducing acne, hyperpigmentation, and fine lines. Customizable strength for all skin types.",
    category: "Beauty & Personal Care",
    provider: { id: "prov-6", name: "Sita Gurung" },
    price: 7150,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596178060810-72660ee8f349?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ FITNESS (10 services) ============
  {
    id: "svc-69",
    name: "Personal Training Session",
    description:
      "One-on-one strength and conditioning session with a certified trainer. Includes personalized workout plans, form coaching, and progress tracking.",
    category: "Fitness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-70",
    name: "Group HIIT Class",
    description:
      "High-intensity interval training class suitable for all fitness levels. Combines cardio and strength exercises in a fast-paced, motivating group environment.",
    category: "Fitness",
    provider: { id: "prov-11", name: "PulseFit Studio" },
    price: 2600,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-71",
    name: "Zumba Dance Class",
    description:
      "Fun and energetic Zumba class that combines Latin rhythms with dance moves. Great for cardio fitness and full-body workout in a party-like atmosphere.",
    category: "Fitness",
    provider: { id: "prov-11", name: "PulseFit Studio" },
    price: 2600,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-72",
    name: "Pilates Reformer Class",
    description:
      "Small group Pilates reformer class focusing on core strength, flexibility, and posture. Suitable for all fitness levels with modifications provided.",
    category: "Fitness",
    provider: { id: "prov-11", name: "PulseFit Studio" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 50,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-73",
    name: "Boxing Fitness Class",
    description:
      "High-energy boxing fitness class combining shadow boxing, bag work, and conditioning exercises. Great for cardio, stress relief, and full-body toning.",
    category: "Fitness",
    provider: { id: "prov-11", name: "PulseFit Studio" },
    price: 3250,
    currency: "NPR",
    durationMinutes: 50,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-74",
    name: "Yoga for Beginners",
    description:
      "Gentle yoga class designed specifically for beginners. Focuses on basic postures, breathing techniques, and relaxation in a supportive environment.",
    category: "Fitness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 2600,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-75",
    name: "Outdoor Bootcamp",
    description:
      "Challenging outdoor group fitness class combining running, bodyweight exercises, and strength training in a scenic park setting.",
    category: "Fitness",
    provider: { id: "prov-11", name: "PulseFit Studio" },
    price: 3250,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-76",
    name: "Nutrition & Fitness Consultation",
    description:
      "Comprehensive consultation combining fitness assessment with nutritional planning. Includes body composition analysis, goal setting, and personalized exercise and diet plans.",
    category: "Fitness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-77",
    name: "Swimming Lessons (Adult)",
    description:
      "Private swimming lessons for adults of all skill levels. Focus on water safety, stroke technique, and building confidence in the water.",
    category: "Fitness",
    provider: { id: "prov-4", name: "Priya Thapa" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-78",
    name: "Marathon Training Program",
    description:
      "Comprehensive 12-week marathon training program including group runs, personalized training plans, nutrition advice, and running technique coaching.",
    category: "Fitness",
    provider: { id: "prov-11", name: "PulseFit Studio" },
    price: 15600,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ AUTOMOTIVE (8 services) ============
  {
    id: "svc-79",
    name: "Car Wash & Detailing",
    description:
      "Exterior wash, interior vacuuming, and detailing for cars, SUVs, and trucks. Includes wheel cleaning, window polishing, and interior surface conditioning.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-80",
    name: "Mobile Oil Change",
    description:
      "On-site oil and filter change service at your home or office. Includes free fluid top-up and a comprehensive vehicle inspection.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-81",
    name: "Full Car Polishing & Waxing",
    description:
      "Complete exterior polishing and waxing service to restore shine and protect your car's paint. Includes paint decontamination and ceramic coating application.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-82",
    name: "Tire Change & Balancing",
    description:
      "Professional tire change and balancing service. Includes removal of old tires, installation of new tires, balancing, and pressure check.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-83",
    name: "Car Battery Replacement",
    description:
      "Professional car battery testing and replacement service. Includes battery disposal, terminal cleaning, and 12-month warranty on new battery.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-84",
    name: "Interior Deep Cleaning",
    description:
      "Comprehensive interior cleaning including upholstery shampooing, leather conditioning, carpet steam cleaning, and air vent sanitation. Removes stains, odors, and allergens.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 7800,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-85",
    name: "Windshield Chip Repair",
    description:
      "Professional repair of windshield chips and cracks. Prevents further damage and restores structural integrity. Guaranteed results.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.3,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-86",
    name: "Headlight Restoration",
    description:
      "Professional restoration of cloudy, yellowed headlights. Includes sanding, polishing, and UV sealant application to improve visibility and appearance.",
    category: "Automotive",
    provider: { id: "prov-12", name: "ShineCar Detailing" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.4,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ PET CARE (7 services) ============
  {
    id: "svc-87",
    name: "Dog Walking",
    description:
      "30-minute neighborhood walk for your dog, including water and a treat. Ensures your pet gets essential exercise and socialization while you're away.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 1950,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-88",
    name: "Pet Grooming",
    description:
      "Full pet grooming service including bath, brush-out, nail trim, ear cleaning, and sanitary trim for dogs and cats. Uses gentle, pet-safe products.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 5850,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-89",
    name: "Pet Sitting Service",
    description:
      "Professional pet sitting service in your home. Includes feeding, playtime, medication administration if needed, and daily updates with photos.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 3250,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-90",
    name: "Dog Training Session",
    description:
      "Private dog training session focusing on basic obedience, socialization, and behavior modification. Positive reinforcement methods used by certified trainers.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 50,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-91",
    name: "Pet Taxi Service",
    description:
      "Safe and comfortable transportation for your pet to vet appointments, grooming salons, or daycare. Includes pet-friendly vehicle with climate control.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 2600,
    currency: "NPR",
    durationMinutes: 30,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-92",
    name: "Cat Grooming Service",
    description:
      "Specialized grooming service for cats including gentle brushing, nail trimming, ear cleaning, and sanitary trimming. Designed to minimize stress for your feline friend.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.5,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-93",
    name: "Overnight Pet Boarding",
    description:
      "Safe and comfortable overnight pet boarding in a loving home environment. Includes feeding, walks, playtime, and regular updates for pet parents.",
    category: "Pet Care",
    provider: { id: "prov-13", name: "PawPals Pet Care" },
    price: 6500,
    currency: "NPR",
    durationMinutes: 1440,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ PHOTOGRAPHY (7 services) ============
  {
    id: "svc-94",
    name: "Portrait Photography Session",
    description:
      "One-hour outdoor or studio portrait session with 20+ edited digital photos. Includes professional lighting, posing guidance, and retouching.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 11050,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-95",
    name: "Event Photography",
    description:
      "Full-event photo coverage for parties, birthdays, corporate events, and small gatherings. Includes candid shots, group photos, and professionally edited images.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 19500,
    currency: "NPR",
    durationMinutes: 180,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-96",
    name: "Wedding Photography Package",
    description:
      "Complete wedding photography coverage including pre-wedding shoot, full-day event coverage, and beautifully edited photos in a digital gallery.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 32500,
    currency: "NPR",
    durationMinutes: 480,
    rating: 4.9,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-97",
    name: "Product Photography",
    description:
      "Professional product photography for e-commerce and catalog use. Includes clean white background shots, lifestyle images, and detailed editing.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 9750,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-98",
    name: "Family Portrait Session",
    description:
      "Relaxed outdoor or studio family portrait session. Includes 30+ professionally edited digital images and a beautiful online gallery for sharing.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 13000,
    currency: "NPR",
    durationMinutes: 75,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-99",
    name: "Real Estate Photography",
    description:
      "Professional real estate photography for property listings. Includes HDR interior shots, exterior photos, and virtual tour creation.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 11700,
    currency: "NPR",
    durationMinutes: 90,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-100",
    name: "Drone Photography & Videography",
    description:
      "Stunning aerial photography and videography using professional drones. Perfect for real estate, weddings, events, and landscape projects.",
    category: "Photography",
    provider: { id: "prov-14", name: "Lens & Light Studio" },
    price: 15600,
    currency: "NPR",
    durationMinutes: 120,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  },

  // ============ EDUCATION (7 services) ============
  {
    id: "svc-101",
    name: "Math Tutoring (High School)",
    description:
      "One-on-one tutoring session covering algebra, geometry, trigonometry, and calculus fundamentals. Includes practice problems and exam preparation strategies.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-102",
    name: "Conversational English Practice",
    description:
      "Speaking-focused English practice session for intermediate to advanced learners. Includes pronunciation improvement, vocabulary building, and real-world conversation scenarios.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 2860,
    currency: "NPR",
    durationMinutes: 45,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-103",
    name: "Science Tutoring (Physics & Chemistry)",
    description:
      "Personalized tutoring for high school and college-level physics and chemistry. Covers core concepts, problem-solving techniques, and exam preparation.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-104",
    name: "IELTS / TOEFL Preparation",
    description:
      "Comprehensive test preparation for IELTS and TOEFL exams. Includes practice tests, speaking practice, writing evaluation, and test-taking strategies.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.8,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-105",
    name: "Computer Science Tutoring",
    description:
      "One-on-one tutoring for programming languages (Python, Java, C++), data structures, algorithms, and web development. Includes project guidance and debugging help.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 4550,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-106",
    name: "College Application Essay Coaching",
    description:
      "Personalized coaching for college application essays and personal statements. Includes brainstorming, drafting, editing, and final review to help you stand out.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 5200,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.6,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "svc-107",
    name: "Language Learning (Spanish, French, Japanese)",
    description:
      "Private language lessons for Spanish, French, or Japanese. Customized to your level and learning goals with emphasis on practical conversation and cultural context.",
    category: "Education",
    provider: { id: "prov-15", name: "Bright Minds Tutoring" },
    price: 3900,
    currency: "NPR",
    durationMinutes: 60,
    rating: 4.7,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop",
  },
];
