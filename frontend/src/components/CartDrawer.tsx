import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { formatPrice } from "../lib/utils";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, subtotalCents, setQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  const cartProducts = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      return product ? { ...line, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/40 animate-fade-in"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-lift animate-slide-in-right">
        <header className="flex items-center justify-between border-b border-brand-100 p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-700" />
            <h2 className="font-display text-lg font-bold text-brand-700">Votre panier</h2>
            <span className="chip">{lines.length}</span>
          </div>
          <button
            onClick={closeCart}
            className="rounded-lg p-2 text-brand-700 transition hover:bg-brand-50"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {cartProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-brand-50 p-5">
                <ShoppingBag className="h-8 w-8 text-brand-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-brand-700">
                Votre panier est vide
              </h3>
              <p className="mt-2 max-w-xs text-sm text-brand-400">
                Découvrez nos produits sport, nutrition, bien-être et montagne.
              </p>
              <Link to="/boutique" onClick={closeCart} className="btn-primary mt-5">
                Voir la boutique
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-brand-50">
              {cartProducts.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 p-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="text-xs text-brand-400">{product.brand}</div>
                      <div className="line-clamp-2 text-sm font-semibold text-ink">
                        {product.name}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-lg border border-brand-100">
                        <button
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-brand-700 transition hover:bg-brand-50"
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-brand-700 transition hover:bg-brand-50"
                          aria-label="Augmenter"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-brand-700">
                          {formatPrice(product.priceCents * quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="rounded p-1 text-brand-400 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartProducts.length > 0 && (
          <footer className="border-t border-brand-100 bg-paper p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-brand-400">Sous-total</span>
              <span className="font-semibold text-brand-700">{formatPrice(subtotalCents)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-brand-400">Livraison</span>
              <span className="text-brand-700">
                {subtotalCents >= 8000 ? (
                  <span className="font-semibold text-green-600">Gratuite</span>
                ) : (
                  "Calculée au checkout"
                )}
              </span>
            </div>
            <div className="mb-5 flex items-center justify-between border-t border-brand-100 pt-3">
              <span className="font-display text-base font-bold">Total</span>
              <span className="font-display text-xl font-bold text-brand-700">
                {formatPrice(subtotalCents)}
              </span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="btn-accent w-full">
              Passer la commande
            </Link>
            <button onClick={closeCart} className="btn-ghost mt-2 w-full">
              Continuer mes achats
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
