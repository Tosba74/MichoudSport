import type { RentalItem } from "./types";

export const rentalItems: RentalItem[] = [
  {
    id: "r1",
    slug: "skis-alpins-debutant",
    name: "Pack skis alpins Débutant",
    category: "skis",
    description:
      "Skis paraboliques faciles à tourner, parfaits pour progresser en toute sécurité. Fixations incluses.",
    dailyPriceCents: 1900,
    depositCents: 30000,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["beginner"],
    sizes: ["140", "150", "160", "170"],
  },
  {
    id: "r2",
    slug: "skis-alpins-intermediaire",
    name: "Pack skis alpins Intermédiaire",
    category: "skis",
    description:
      "Skis polyvalents, bonne accroche sur piste, tolérants sur hors-piste léger.",
    dailyPriceCents: 2500,
    depositCents: 40000,
    image:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["intermediate"],
    sizes: ["155", "165", "172", "180"],
  },
  {
    id: "r3",
    slug: "skis-freeride-expert",
    name: "Pack skis Freeride Expert",
    category: "skis",
    description:
      "Skis freeride 105mm patin, parfaits pour la neige fraîche et tous les terrains.",
    dailyPriceCents: 3900,
    depositCents: 60000,
    image:
      "https://images.unsplash.com/photo-1544737151784-9b1eec7d13a7?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["expert"],
    sizes: ["170", "178", "184", "190"],
  },
  {
    id: "r4",
    slug: "chaussures-ski",
    name: "Chaussures de ski",
    category: "boots",
    description:
      "Chaussures de ski confortables, séchées et désinfectées entre chaque location.",
    dailyPriceCents: 1200,
    depositCents: 15000,
    image:
      "https://images.unsplash.com/photo-1551524164-6cf2ac242aed?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["beginner", "intermediate", "expert"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
  },
  {
    id: "r5",
    slug: "casque-ski-location",
    name: "Casque de ski",
    category: "helmet",
    description: "Casque de ski homologué, intérieur désinfecté entre chaque location.",
    dailyPriceCents: 500,
    depositCents: 8000,
    image:
      "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["beginner", "intermediate", "expert"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "r6",
    slug: "batons-ski",
    name: "Bâtons de ski",
    category: "poles",
    description: "Bâtons aluminium légers, dragonnes ajustables.",
    dailyPriceCents: 300,
    depositCents: 3000,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["beginner", "intermediate", "expert"],
    sizes: ["100", "110", "120", "130"],
  },
  {
    id: "r7",
    slug: "pack-enfant-complet",
    name: "Pack Enfant Complet",
    category: "pack",
    description: "Skis + chaussures + casque + bâtons pour enfants. Tout compris.",
    dailyPriceCents: 2900,
    depositCents: 30000,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["beginner", "intermediate"],
    sizes: ["80", "90", "100", "110", "120", "130"],
  },
  {
    id: "r8",
    slug: "pack-adulte-premium",
    name: "Pack Adulte Premium",
    category: "pack",
    description:
      "Skis intermédiaires + chaussures + casque + bâtons. La formule la plus populaire.",
    dailyPriceCents: 4200,
    depositCents: 50000,
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=800&q=80",
    skillLevels: ["intermediate", "expert"],
    sizes: ["S", "M", "L", "XL"],
  },
];

export const getRentalBySlug = (slug: string) =>
  rentalItems.find((r) => r.slug === slug);
