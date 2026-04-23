export type Universe = "sport" | "mobility" | "nutrition" | "wellness" | "winter";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  universe: Universe;
  category: string;
  description: string;
  priceCents: number;
  comparePriceCents?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewsCount: number;
  badges?: Array<"new" | "bestseller" | "eco" | "flash">;
  variants?: { label: string; options: string[] }[];
  stock: number;
}

export interface CartLine {
  productId: string;
  quantity: number;
  variantSelection?: Record<string, string>;
}

export interface Promotion {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  kind: "flash" | "seasonal" | "bundle" | "coupon";
  endsAt?: string;
  discountLabel: string;
  image: string;
  productIds?: string[];
  code?: string;
}

export interface RentalItem {
  id: string;
  slug: string;
  name: string;
  category: "skis" | "boots" | "helmet" | "poles" | "pack";
  description: string;
  dailyPriceCents: number;
  depositCents: number;
  image: string;
  skillLevels: Array<"beginner" | "intermediate" | "expert">;
  sizes: string[];
}
