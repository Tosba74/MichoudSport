import { Link } from "react-router-dom";
import { ArrowRight, Mountain, Zap, Leaf, Dumbbell, Bike, Clock } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Countdown from "../components/Countdown";
import { products } from "../data/products";
import { getFlashPromotions } from "../data/promotions";

const universes = [
  {
    slug: "sport",
    name: "Sport & Outdoor",
    desc: "Running, rando, fitness, yoga",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
    color: "from-brand-500 to-brand-700",
  },
  {
    slug: "mobility",
    name: "Mobilité",
    desc: "VAE, trottinettes, vélos",
    icon: Bike,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    color: "from-accent-400 to-accent-600",
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    desc: "Barres, gels, protéines",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
    color: "from-green-500 to-green-700",
  },
  {
    slug: "wellness",
    name: "Bien-être",
    desc: "Récupération, yoga, sommeil",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500 to-teal-700",
  },
  {
    slug: "winter",
    name: "Hiver",
    desc: "Skis, snowboard, vêtements",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    color: "from-brand-400 to-brand-700",
  },
];

export default function Home() {
  const flash = getFlashPromotions()[0];
  const flashProduct = flash?.productIds ? products.find((p) => p.id === flash.productIds![0]) : null;
  const featured = products.slice(0, 8);
  const winter = products.filter((p) => p.universe === "winter").slice(0, 4);

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-brand-700 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-700/95 via-brand-700/85 to-transparent" />
        <div className="section relative py-20 md:py-28">
          <div className="max-w-2xl animate-slide-up">
            <span className="chip !bg-accent-500/20 !text-accent-100 mb-4">
              Nouvelle saison
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Équipez-vous pour <br />
              <span className="text-accent-400">toutes vos aventures</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-brand-100">
              De la randonnée estivale au ski alpin, en passant par la nutrition sportive et
              le bien-être. La boutique qui couvre toute votre vie active.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/boutique" className="btn-accent">
                Découvrir la boutique
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/location"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-brand-700"
              >
                <Mountain className="h-4 w-4" />
                Louer mes skis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section -mt-10 relative z-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {universes.map((u) => (
            <Link
              key={u.slug}
              to={`/boutique/${u.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lift transition hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={u.image}
                  alt={u.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${u.color} opacity-75 mix-blend-multiply`} />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <u.icon className="mb-1.5 h-5 w-5 opacity-90" />
                <div className="font-display text-base font-bold leading-tight">{u.name}</div>
                <div className="mt-1 text-xs opacity-90">{u.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {flash && flashProduct && (
        <section className="section mt-20">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent-500 via-accent-600 to-red-600 shadow-lift">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 text-white md:p-12">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Clock className="h-4 w-4" /> Vente flash
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {flash.title}
                </h2>
                <p className="mt-3 text-white/90">{flash.subtitle}</p>
                <div className="mt-6">
                  <Countdown endsAt={flash.endsAt!} />
                </div>
                <Link
                  to={`/produits/${flashProduct.slug}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-accent-600 shadow-lift transition hover:-translate-y-0.5"
                >
                  Profiter de l'offre <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-[280px] overflow-hidden">
                <img
                  src={flash.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section mt-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="chip">Sélection</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-700 md:text-4xl">
              Nos coups de cœur
            </h2>
          </div>
          <Link to="/boutique" className="hidden items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-700 md:inline-flex">
            Tout voir <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-20 bg-brand-50 py-16">
        <div className="section grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="chip">L'ADN de la maison</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-700 md:text-4xl">
              Location de ski en ligne, <br />
              simple et rapide
            </h2>
            <p className="mt-4 text-brand-700/80">
              Réservez vos skis, chaussures et équipements en quelques clics. Sélectionnez vos
              dates, retirez en magasin, partez sur les pistes. C'est aussi simple que ça.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-brand-700">
              <li className="flex gap-2"><Mountain className="h-5 w-5 text-accent-500" /> Matériel entretenu et testé chaque saison</li>
              <li className="flex gap-2"><Mountain className="h-5 w-5 text-accent-500" /> Tarifs dégressifs selon la durée</li>
              <li className="flex gap-2"><Mountain className="h-5 w-5 text-accent-500" /> Échange gratuit pendant votre séjour</li>
            </ul>
            <Link to="/location" className="btn-primary mt-8">
              Réserver mon matériel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {winter.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section mt-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { title: "Livraison offerte", desc: "Dès 80€ d'achat en France métropolitaine" },
            { title: "Retrait en magasin", desc: "Gratuit sous 2h, dans nos points relais" },
            { title: "Paiement sécurisé", desc: "Carte bancaire, 3x sans frais dès 200€" },
          ].map((b) => (
            <div key={b.title} className="card p-6">
              <div className="font-display text-lg font-bold text-brand-700">{b.title}</div>
              <div className="mt-1 text-sm text-brand-700/70">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
