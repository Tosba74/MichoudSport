import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import type { Universe } from "../data/types";
import { cn } from "../lib/utils";

const universeTitles: Record<Universe | "all", { title: string; desc: string }> = {
  all: { title: "Toute la boutique", desc: "L'intégralité de nos produits sport, mobilité, nutrition, bien-être et hiver" },
  sport: { title: "Sport & Outdoor", desc: "Randonnée, running, fitness, yoga — tout pour bouger" },
  mobility: { title: "Mobilité", desc: "Vélos électriques, trottinettes, vélos classiques" },
  nutrition: { title: "Nutrition sportive", desc: "Barres, gels, protéines, boissons, lyophilisés" },
  wellness: { title: "Bien-être", desc: "Récupération, sommeil, mobilité, yoga" },
  winter: { title: "Hiver & Montagne", desc: "Skis, snowboard, vêtements, équipements" },
};

export default function Catalog() {
  const { universe } = useParams<{ universe?: Universe }>();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (universe) list = list.filter((p) => p.universe === universe);
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (selectedBrands.length)
      list = list.filter((p) => selectedBrands.includes(p.brand));
    list = list.filter(
      (p) =>
        p.priceCents / 100 >= priceRange[0] && p.priceCents / 100 <= priceRange[1]
    );
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [universe, q, selectedBrands, priceRange, sort]);

  const availableBrands = useMemo(() => {
    const pool = universe ? products.filter((p) => p.universe === universe) : products;
    return Array.from(new Set(pool.map((p) => p.brand))).sort();
  }, [universe]);

  const meta = universeTitles[universe ?? "all"];

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-700">
          Marque
        </h3>
        <div className="mt-3 space-y-2">
          {availableBrands.map((b) => (
            <label
              key={b}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="h-4 w-4 rounded border-brand-200 text-brand-500 focus:ring-brand-400"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-700">
          Prix maximum
        </h3>
        <div className="mt-3">
          <input
            type="range"
            min={10}
            max={3000}
            step={10}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-brand-500"
          />
          <div className="mt-1 flex items-center justify-between text-xs font-semibold text-brand-700">
            <span>0 €</span>
            <span>{priceRange[1]} €</span>
          </div>
        </div>
      </div>

      {(selectedBrands.length > 0 || priceRange[1] < 3000) && (
        <button
          onClick={() => {
            setSelectedBrands([]);
            setPriceRange([0, 3000]);
          }}
          className="text-xs font-semibold text-accent-500 hover:underline"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );

  return (
    <div className="section py-8 animate-fade-in">
      <div className="border-b border-brand-100 pb-6">
        <h1 className="font-display text-3xl font-bold text-brand-700 md:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-2 text-brand-700/70">{meta.desc}</p>
        {q && (
          <div className="mt-3 text-sm text-brand-500">
            Résultats pour "<span className="font-semibold">{q}</span>"
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <Filters />
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-brand-700/70">
              <span className="font-bold text-brand-700">{filtered.length}</span>{" "}
              produit{filtered.length > 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-xl border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-700 outline-none focus:border-brand-500"
              >
                <option value="relevance">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-200 p-12 text-center">
              <div className="font-display text-lg font-bold text-brand-700">
                Aucun produit trouvé
              </div>
              <p className="mt-1 text-sm text-brand-400">
                Essayez d'élargir vos critères de recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-xs bg-white p-5 shadow-lift animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-brand-100 pb-3">
              <h2 className="font-display text-lg font-bold text-brand-700">Filtres</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded p-2 hover:bg-brand-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <Filters />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              Voir {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
