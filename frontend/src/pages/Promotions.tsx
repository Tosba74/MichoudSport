import { Link } from "react-router-dom";
import { Flame, Gift, Tag, Calendar, Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { promotions } from "../data/promotions";
import { products } from "../data/products";
import Countdown from "../components/Countdown";
import ProductCard from "../components/ProductCard";

export default function Promotions() {
  const [copied, setCopied] = useState<string | null>(null);

  const flash = promotions.filter((p) => p.kind === "flash");
  const seasonal = promotions.filter((p) => p.kind === "seasonal");
  const bundles = promotions.filter((p) => p.kind === "bundle");
  const coupons = promotions.filter((p) => p.kind === "coupon");

  const promoProducts = products.filter((p) => p.comparePriceCents);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-accent-500 via-accent-600 to-red-600 py-14 text-white">
        <div className="section">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/90">
            <Flame className="h-5 w-5" /> Offres en cours
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Les meilleures offres de la saison
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Ventes flash, packs économiques, codes promo et soldes saisonniers. Quantités
            limitées, faites-vous plaisir !
          </p>
        </div>
      </section>

      {flash.length > 0 && (
        <section className="section mt-12">
          <div className="mb-6 flex items-center gap-2">
            <Flame className="h-6 w-6 text-accent-500" />
            <h2 className="font-display text-2xl font-bold text-brand-700 md:text-3xl">
              Ventes flash
            </h2>
            <span className="chip !bg-red-50 !text-red-600">Quantités limitées</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {flash.map((promo) => {
              const product = products.find((p) => p.id === promo.productIds?.[0]);
              return (
                <div
                  key={promo.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-lift"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-md bg-red-500 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lift">
                        Flash
                      </span>
                      <span className="rounded-md bg-white px-2.5 py-1 text-sm font-bold text-accent-500 shadow-lift">
                        {promo.discountLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-display text-xl font-bold">{promo.title}</h3>
                      <p className="mt-0.5 text-sm text-white/90">{promo.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 bg-brand-700 p-4 text-white">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        Se termine dans
                      </div>
                      <div className="mt-1">
                        {promo.endsAt && <Countdown endsAt={promo.endsAt} />}
                      </div>
                    </div>
                    {product && (
                      <Link
                        to={`/produits/${product.slug}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-accent-600"
                      >
                        J'en profite <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {seasonal.length > 0 && (
        <section className="section mt-16">
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-brand-500" />
            <h2 className="font-display text-2xl font-bold text-brand-700 md:text-3xl">
              Promotions saisonnières
            </h2>
          </div>
          {seasonal.map((promo) => (
            <div
              key={promo.id}
              className="overflow-hidden rounded-3xl bg-brand-700 text-white shadow-lift"
            >
              <div className="grid md:grid-cols-2">
                <div className="flex flex-col justify-center p-10">
                  <span className="chip !bg-white/10 !text-white self-start">Saison</span>
                  <h3 className="mt-3 font-display text-3xl font-bold">{promo.title}</h3>
                  <p className="mt-3 text-white/90">{promo.subtitle}</p>
                  <div className="mt-6">
                    <span className="font-display text-5xl font-bold text-accent-400">
                      {promo.discountLabel}
                    </span>
                  </div>
                  {promo.endsAt && (
                    <div className="mt-4 text-sm text-white/70">
                      Jusqu'au {new Date(promo.endsAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                  )}
                  <Link
                    to="/boutique/winter"
                    className="btn-accent mt-6 w-fit"
                  >
                    Voir la sélection <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="min-h-[300px] bg-cover bg-center" style={{ backgroundImage: `url("${promo.image}")` }} />
              </div>
            </div>
          ))}
        </section>
      )}

      {bundles.length > 0 && (
        <section className="section mt-16">
          <div className="mb-6 flex items-center gap-2">
            <Gift className="h-6 w-6 text-green-600" />
            <h2 className="font-display text-2xl font-bold text-brand-700 md:text-3xl">
              Packs & Bundles
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {bundles.map((promo) => {
              const pack = products.filter((p) => promo.productIds?.includes(p.id));
              return (
                <div key={promo.id} className="card p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-green-600 px-2.5 py-1 text-xs font-bold text-white">
                      Pack
                    </span>
                    <span className="font-display text-2xl font-bold text-green-600">
                      {promo.discountLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-brand-700">{promo.title}</h3>
                  <p className="mt-1 text-sm text-brand-700/70">{promo.subtitle}</p>
                  <div className="mt-4 flex -space-x-2">
                    {pack.map((p) => (
                      <img
                        key={p.id}
                        src={p.image}
                        alt={p.name}
                        className="h-16 w-16 rounded-xl border-2 border-white object-cover shadow"
                      />
                    ))}
                  </div>
                  <button className="btn-primary mt-5 w-full">
                    Composer le pack <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {coupons.length > 0 && (
        <section className="section mt-16">
          <div className="mb-6 flex items-center gap-2">
            <Tag className="h-6 w-6 text-accent-500" />
            <h2 className="font-display text-2xl font-bold text-brand-700 md:text-3xl">
              Codes promo
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {coupons.map((promo) => (
              <div
                key={promo.id}
                className="flex items-center justify-between rounded-2xl border-2 border-dashed border-accent-300 bg-accent-50 p-5"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-700">{promo.title}</h3>
                  <p className="mt-0.5 text-sm text-brand-700/70">{promo.subtitle}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-display text-xl font-bold text-accent-500">
                      {promo.discountLabel}
                    </span>
                  </div>
                </div>
                {promo.code && (
                  <button
                    onClick={() => copyCode(promo.code!)}
                    className="flex items-center gap-2 rounded-xl border-2 border-accent-500 bg-white px-4 py-3 font-mono text-lg font-bold text-accent-500 transition hover:bg-accent-500 hover:text-white"
                  >
                    {copied === promo.code ? (
                      <>
                        <Check className="h-5 w-5" /> Copié
                      </>
                    ) : (
                      <>
                        {promo.code} <Copy className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section mt-16">
        <h2 className="font-display text-2xl font-bold text-brand-700 md:text-3xl">
          Tous les produits en promo
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {promoProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-16 bg-brand-50 py-12">
        <div className="section text-center">
          <h2 className="font-display text-2xl font-bold text-brand-700 md:text-3xl">
            Ne ratez plus aucune offre
          </h2>
          <p className="mt-2 text-brand-700/70">
            Inscrivez-vous à notre newsletter et recevez les ventes flash en avant-première.
          </p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
            <button className="btn-accent">S'inscrire</button>
          </form>
        </div>
      </section>
    </div>
  );
}
