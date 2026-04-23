import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "../data/types";
import { formatPrice, cn } from "../lib/utils";
import { useCart } from "../context/CartContext";

const badgeStyles: Record<string, string> = {
  new: "bg-brand-500 text-white",
  bestseller: "bg-accent-500 text-white",
  eco: "bg-green-600 text-white",
  flash: "bg-red-500 text-white",
};

const badgeLabels: Record<string, string> = {
  new: "Nouveau",
  bestseller: "Best",
  eco: "Éco",
  flash: "Flash",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const hasDiscount = !!product.comparePriceCents && product.comparePriceCents > product.priceCents;
  const discount = hasDiscount
    ? Math.round(
        ((product.comparePriceCents! - product.priceCents) / product.comparePriceCents!) * 100
      )
    : 0;

  return (
    <div className="card group overflow-hidden">
      <Link to={`/produits/${product.slug}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden bg-paper">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-md bg-accent-500 px-2 py-1 text-xs font-bold text-white shadow">
              -{discount}%
            </span>
          )}
          {product.badges?.map((b) => (
            <span
              key={b}
              className={cn(
                "inline-flex items-center rounded-md px-2 py-1 text-xs font-bold shadow",
                badgeStyles[b]
              )}
            >
              {badgeLabels[b]}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium uppercase tracking-wide text-brand-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-brand-700">
            <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-brand-400">({product.reviewsCount})</span>
          </div>
        </div>

        <Link to={`/produits/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-ink transition hover:text-brand-500">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            {hasDiscount && (
              <div className="text-xs text-brand-400 line-through">
                {formatPrice(product.comparePriceCents!)}
              </div>
            )}
            <div
              className={cn(
                "font-display text-xl font-bold",
                hasDiscount ? "text-accent-500" : "text-brand-700"
              )}
            >
              {formatPrice(product.priceCents)}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product.id);
            }}
            className="rounded-xl bg-brand-500 p-2.5 text-white transition hover:bg-brand-600 hover:shadow-lift"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
