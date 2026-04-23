import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "p1",
    slug: "chaussures-trail-alpine-x3",
    name: "Chaussures Trail Alpine X3",
    brand: "Salomon",
    universe: "sport",
    category: "Running",
    description:
      "Chaussures de trail ultra-légères avec semelle Contagrip et drop 8mm. Idéales pour les longues sorties en montagne.",
    priceCents: 14900,
    comparePriceCents: 17900,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 312,
    badges: ["bestseller"],
    variants: [
      { label: "Pointure", options: ["40", "41", "42", "43", "44", "45"] },
      { label: "Couleur", options: ["Noir", "Bleu", "Orange"] },
    ],
    stock: 24,
  },
  {
    id: "p2",
    slug: "sac-randonnee-summit-45l",
    name: "Sac à dos Summit 45L",
    brand: "Osprey",
    universe: "sport",
    category: "Randonnée",
    description:
      "Sac à dos de randonnée 45L avec système AirScape, housse de pluie intégrée et portage ergonomique.",
    priceCents: 18500,
    image:
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 187,
    badges: ["new"],
    variants: [{ label: "Taille dos", options: ["S/M", "M/L"] }],
    stock: 12,
  },
  {
    id: "p3",
    slug: "velo-electrique-urban-pro",
    name: "Vélo électrique Urban Pro",
    brand: "Moustache",
    universe: "mobility",
    category: "Vélos électriques",
    description:
      "VAE urbain 250W, autonomie 110 km, cadre alu, freins hydrauliques, écran couleur. Assemblé en France.",
    priceCents: 249000,
    comparePriceCents: 279000,
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 98,
    badges: ["flash", "eco"],
    stock: 6,
  },
  {
    id: "p4",
    slug: "trottinette-elec-city-glide",
    name: "Trottinette électrique CityGlide",
    brand: "Xiaomi",
    universe: "mobility",
    category: "Trottinettes",
    description:
      "Trottinette électrique homologuée 25 km/h, autonomie 40 km, pliage rapide, feux LED.",
    priceCents: 54900,
    image:
      "https://images.unsplash.com/photo-1604868189265-219ba7bf7ea3?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewsCount: 241,
    stock: 18,
  },
  {
    id: "p5",
    slug: "barre-energetique-alpine-pack12",
    name: "Barres énergétiques Alpine (pack 12)",
    brand: "Overstim's",
    universe: "nutrition",
    category: "Barres & En-cas",
    description:
      "Barres céréales & fruits secs, 200 kcal, parfaites pour l'effort. Pack de 12 barres mixées.",
    priceCents: 2490,
    comparePriceCents: 2990,
    image:
      "https://images.unsplash.com/photo-1571748982800-fa51082c2224?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewsCount: 523,
    badges: ["bestseller"],
    stock: 180,
  },
  {
    id: "p6",
    slug: "proteine-whey-isolate-vanille-1kg",
    name: "Whey Isolate Vanille 1kg",
    brand: "Nutripure",
    universe: "nutrition",
    category: "Protéines",
    description:
      "Protéine de lactosérum isolée à 90%, sans aspartame, arôme naturel vanille de Madagascar.",
    priceCents: 3490,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 892,
    badges: ["new"],
    variants: [{ label: "Parfum", options: ["Vanille", "Chocolat", "Fraise"] }],
    stock: 56,
  },
  {
    id: "p7",
    slug: "tapis-yoga-premium-pro",
    name: "Tapis Yoga Premium Pro",
    brand: "Manduka",
    universe: "wellness",
    category: "Yoga",
    description:
      "Tapis de yoga premium 6mm, antidérapant, garantie à vie. Caoutchouc naturel écologique.",
    priceCents: 8900,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 456,
    badges: ["eco"],
    variants: [{ label: "Couleur", options: ["Vert Sauge", "Bleu Orage", "Noir"] }],
    stock: 34,
  },
  {
    id: "p8",
    slug: "pistolet-massage-recovery-pro",
    name: "Pistolet de massage Recovery Pro",
    brand: "Theragun",
    universe: "wellness",
    category: "Récupération",
    description:
      "Pistolet de massage percussif, 5 vitesses, 6 embouts, batterie 150 min. Idéal post-effort.",
    priceCents: 24900,
    comparePriceCents: 29900,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 203,
    badges: ["flash"],
    stock: 15,
  },
  {
    id: "p9",
    slug: "skis-all-mountain-pulse-176",
    name: "Skis All-Mountain Pulse 176",
    brand: "Rossignol",
    universe: "winter",
    category: "Skis",
    description:
      "Skis polyvalents tous terrains, excellente accroche sur piste et neige fraîche. Fixations incluses.",
    priceCents: 44900,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewsCount: 78,
    variants: [{ label: "Taille", options: ["160", "168", "176", "184"] }],
    stock: 10,
  },
  {
    id: "p10",
    slug: "veste-ski-summit-goretex",
    name: "Veste de ski Summit Gore-Tex",
    brand: "The North Face",
    universe: "winter",
    category: "Vêtements",
    description:
      "Veste ski Gore-Tex 3 couches, imperméable, respirante, jupe pare-neige, poches ventilation.",
    priceCents: 39900,
    comparePriceCents: 49900,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 145,
    badges: ["flash"],
    variants: [
      { label: "Taille", options: ["S", "M", "L", "XL"] },
      { label: "Couleur", options: ["Noir", "Bleu nuit", "Rouge"] },
    ],
    stock: 22,
  },
  {
    id: "p11",
    slug: "casque-ski-alpine-mips",
    name: "Casque de ski Alpine MIPS",
    brand: "Smith",
    universe: "winter",
    category: "Protection",
    description:
      "Casque de ski avec technologie MIPS, 18 aérations, molette d'ajustement, compatible avec tous les masques.",
    priceCents: 14900,
    image:
      "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 167,
    variants: [{ label: "Taille", options: ["S", "M", "L"] }],
    stock: 28,
  },
  {
    id: "p12",
    slug: "gel-energetique-pack6",
    name: "Gels énergétiques (pack 6)",
    brand: "Overstim's",
    universe: "nutrition",
    category: "Gels",
    description:
      "Gels énergétiques liquides, glucides rapides + BCAA, pack assorti 6 saveurs.",
    priceCents: 1690,
    image:
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewsCount: 678,
    stock: 220,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByUniverse = (universe: Product["universe"]) =>
  products.filter((p) => p.universe === universe);

export const getProductsByIds = (ids: string[]) =>
  products.filter((p) => ids.includes(p.id));
