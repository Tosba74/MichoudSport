import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Check, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { formatPrice } from "../lib/utils";

export default function Checkout() {
  const { lines, subtotalCents, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  const shippingCents = subtotalCents >= 8000 || subtotalCents === 0 ? 0 : 690;
  const totalCents = subtotalCents + shippingCents;

  const cartProducts = lines
    .map((l) => ({
      product: products.find((p) => p.id === l.productId)!,
      quantity: l.quantity,
    }))
    .filter((l) => l.product);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    clearCart();
  };

  if (confirmed) {
    return (
      <div className="section py-20 animate-fade-in">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-brand-700">
            Commande confirmée !
          </h1>
          <p className="mt-3 text-brand-700/70">
            Merci pour votre commande. Un email de confirmation vient de vous être envoyé.
          </p>
          <Link to="/boutique" className="btn-primary mt-6">
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="section py-20 animate-fade-in">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <ShoppingBag className="h-8 w-8 text-brand-400" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-brand-700">
            Votre panier est vide
          </h1>
          <Link to="/boutique" className="btn-primary mt-6">
            Voir la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section py-10 animate-fade-in">
      <h1 className="font-display text-3xl font-bold text-brand-700">Commande</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="space-y-8">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-brand-700">Contact</h2>
            <div className="mt-4 space-y-3">
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-brand-700">Livraison</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Prénom"
                className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
              <input
                required
                placeholder="Nom"
                className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
              <input
                required
                placeholder="Adresse"
                className="sm:col-span-2 rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
              <input
                required
                placeholder="Code postal"
                className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
              <input
                required
                placeholder="Ville"
                className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-brand-700 flex items-center gap-2">
              <Lock className="h-4 w-4" /> Paiement
            </h2>
            <div className="mt-4 space-y-3">
              <input
                required
                placeholder="Numéro de carte (4242 4242 4242 4242)"
                className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="MM/AA"
                  className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
                <input
                  required
                  placeholder="CVC"
                  className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div className="mt-3 text-xs text-brand-400">
              Paiement sécurisé (démo — maquette non transactionnelle)
            </div>
          </div>

          <button type="submit" className="btn-accent w-full">
            Payer {formatPrice(totalCents)}
          </button>
        </form>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-brand-700">Récapitulatif</h2>
            <ul className="mt-4 divide-y divide-brand-50">
              {cartProducts.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-3">
                  <img src={product.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink">{product.name}</div>
                    <div className="text-xs text-brand-400">×{quantity}</div>
                  </div>
                  <div className="text-sm font-bold text-brand-700">
                    {formatPrice(product.priceCents * quantity)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-brand-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-700/70">Sous-total</span>
                <span className="font-semibold text-brand-700">{formatPrice(subtotalCents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-700/70">Livraison</span>
                <span className="font-semibold text-brand-700">
                  {shippingCents === 0 ? "Gratuite" : formatPrice(shippingCents)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
              <span className="font-display font-bold">Total</span>
              <span className="font-display text-xl font-bold text-brand-700">
                {formatPrice(totalCents)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
