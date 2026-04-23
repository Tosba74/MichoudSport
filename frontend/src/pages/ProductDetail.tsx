import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Star, Truck, Shield, RefreshCw, ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { getProductBySlug, products } from "../data/products";
import { formatPrice, cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCart();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Navigate to="/boutique" replace />;
  }

  const hasDiscount = !!product.comparePriceCents && product.comparePriceCents > product.priceCents;
  const related = products
    .filter((p) => p.universe === product.universe && p.id !== product.id)
    .slice(0, 4);

  const setVariant = (label: string, value: string) =>
    setSelectedVariants((prev) => ({ ...prev, [label]: value }));

  return (
    <div className="animate-fade-in">
      <div className="section py-4">
        <nav className="flex items-center gap-1 text-xs text-brand-400">
          <Link to="/" className="hover:text-brand-700">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/boutique" className="hover:text-brand-700">Boutique</Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to={`/boutique/${product.universe}`}
            className="hover:text-brand-700"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand-700">{product.name}</span>
        </nav>
      </div>

      <div className="section grid gap-10 pb-10 md:grid-cols-2">
        <div>
          <div className="card overflow-hidden">
            <div className="aspect-square bg-paper">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <button
                key={i}
                className={cn(
                  "overflow-hidden rounded-xl border-2 transition",
                  i === 0 ? "border-brand-500" : "border-transparent hover:border-brand-200"
                )}
              >
                <img src={src} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 text-sm text-brand-400">
            <span className="font-semibold uppercase tracking-wide">{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand-700 md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i <= Math.round(product.rating)
                      ? "fill-accent-500 text-accent-500"
                      : "text-brand-200"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-brand-700">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-brand-400">({product.reviewsCount} avis)</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span
              className={cn(
                "font-display text-4xl font-bold",
                hasDiscount ? "text-accent-500" : "text-brand-700"
              )}
            >
              {formatPrice(product.priceCents)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-brand-400 line-through">
                  {formatPrice(product.comparePriceCents!)}
                </span>
                <span className="rounded-md bg-accent-500 px-2 py-1 text-xs font-bold text-white">
                  -
                  {Math.round(
                    ((product.comparePriceCents! - product.priceCents) /
                      product.comparePriceCents!) *
                      100
                  )}
                  %
                </span>
              </>
            )}
          </div>
          <div className="mt-1 text-xs text-brand-400">TVA comprise • Livraison calculée au panier</div>

          <p className="mt-6 text-brand-700/80">{product.description}</p>

          <div className="mt-6 space-y-5">
            {product.variants?.map((v) => (
              <div key={v.label}>
                <div className="mb-2 text-sm font-semibold text-brand-700">
                  {v.label}
                  {selectedVariants[v.label] && (
                    <span className="ml-2 text-brand-400">· {selectedVariants[v.label]}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setVariant(v.label, opt)}
                      className={cn(
                        "rounded-lg border-2 px-4 py-2 text-sm font-semibold transition",
                        selectedVariants[v.label] === opt
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-brand-100 text-brand-700 hover:border-brand-300"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-xl border-2 border-brand-100">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 text-brand-700 transition hover:bg-brand-50"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2.5 text-brand-700 transition hover:bg-brand-50"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addItem(product.id, quantity)}
              className="btn-accent flex-1"
            >
              <ShoppingCart className="h-4 w-4" /> Ajouter au panier
            </button>
            <button
              className="rounded-xl border-2 border-brand-100 p-3 text-brand-700 transition hover:border-brand-300 hover:text-accent-500"
              aria-label="Ajouter aux favoris"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-brand-100 bg-paper p-4 text-sm text-brand-700 sm:grid-cols-3">
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 flex-shrink-0 text-brand-500" />
              <div>
                <div className="font-semibold">Livraison 48h</div>
                <div className="text-xs text-brand-400">Gratuite dès 80€</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <RefreshCw className="h-5 w-5 flex-shrink-0 text-brand-500" />
              <div>
                <div className="font-semibold">Retour 30j</div>
                <div className="text-xs text-brand-400">Satisfait ou remboursé</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 flex-shrink-0 text-brand-500" />
              <div>
                <div className="font-semibold">Garantie</div>
                <div className="text-xs text-brand-400">2 ans constructeur</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section mt-12">
          <h2 className="font-display text-2xl font-bold text-brand-700">
            Vous aimerez aussi
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
