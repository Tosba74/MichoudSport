import type { Promotion } from "./types";

const inHours = (h: number) => new Date(Date.now() + h * 3600 * 1000).toISOString();
const inDays = (d: number) => new Date(Date.now() + d * 86400 * 1000).toISOString();

export const promotions: Promotion[] = [
  {
    id: "promo-flash-1",
    slug: "flash-trail-x3",
    title: "Vente flash — Trail Alpine X3",
    subtitle: "-30% sur la best-seller running, quantités limitées",
    kind: "flash",
    endsAt: inHours(8),
    discountLabel: "-30%",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    productIds: ["p1"],
  },
  {
    id: "promo-flash-2",
    slug: "flash-recovery",
    title: "Pistolet Recovery Pro",
    subtitle: "Récupération premium — offre 48h",
    kind: "flash",
    endsAt: inHours(48),
    discountLabel: "-17%",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    productIds: ["p8"],
  },
  {
    id: "promo-seasonal-winter",
    slug: "soldes-hiver",
    title: "Soldes Hiver",
    subtitle: "Jusqu'à -40% sur l'équipement montagne",
    kind: "seasonal",
    endsAt: inDays(14),
    discountLabel: "Jusqu'à -40%",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    productIds: ["p9", "p10", "p11"],
  },
  {
    id: "promo-bundle-1",
    slug: "bundle-nutrition-pro",
    title: "Pack Nutrition Pro",
    subtitle: "Whey 1kg + Barres x12 + Gels x6 = -20%",
    kind: "bundle",
    discountLabel: "-20%",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1200&q=80",
    productIds: ["p5", "p6", "p12"],
  },
  {
    id: "promo-coupon-welcome",
    slug: "bienvenue",
    title: "Bienvenue chez Discount Location",
    subtitle: "-10% sur votre première commande avec le code",
    kind: "coupon",
    discountLabel: "-10%",
    code: "WELCOME10",
    image:
      "https://images.unsplash.com/photo-1522120691811-1afa7e1ebd77?auto=format&fit=crop&w=1200&q=80",
  },
];

export const getFlashPromotions = () => promotions.filter((p) => p.kind === "flash");
export const getActivePromotions = () => promotions;
