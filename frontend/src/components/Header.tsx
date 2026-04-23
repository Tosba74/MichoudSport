import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, MapPin } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/boutique", label: "Boutique" },
  { to: "/promos", label: "Promos", accent: true },
  { to: "/location", label: "Location ski" },
];

const universeLinks = [
  { to: "/boutique/sport", label: "Sport & Outdoor" },
  { to: "/boutique/mobility", label: "Mobilité" },
  { to: "/boutique/nutrition", label: "Nutrition" },
  { to: "/boutique/wellness", label: "Bien-être" },
  { to: "/boutique/winter", label: "Hiver" },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="bg-brand-700 text-white">
        <div className="section flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Livraison offerte dès 80€ • Retrait magasin gratuit</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span>Service client : 04 XX XX XX XX</span>
            <span>·</span>
            <Link to="/promos" className="hover:underline">
              Voir les offres flash
            </Link>
          </div>
        </div>
      </div>

      <div className="section flex h-20 items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Discount Location" className="h-12 w-12" />
          <div className="hidden sm:block">
            <div className="font-display text-lg font-bold leading-none text-brand-700">
              Discount Location
            </div>
            <div className="text-xs text-brand-400">Sport · Montagne · Bien-être</div>
          </div>
        </Link>

        <form onSubmit={handleSearch} className="relative mx-auto hidden max-w-xl flex-1 md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit, une marque..."
            className="w-full rounded-xl border border-brand-100 bg-paper py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
          />
        </form>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-4 py-2 text-sm font-semibold transition",
                  item.accent
                    ? "text-accent-500 hover:bg-accent-50"
                    : "text-brand-700 hover:bg-brand-50",
                  isActive && (item.accent ? "bg-accent-50" : "bg-brand-50")
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto lg:ml-0">
          <button
            className="hidden rounded-lg p-2.5 text-brand-700 transition hover:bg-brand-50 md:inline-flex"
            aria-label="Mon compte"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            onClick={openCart}
            className="relative rounded-lg p-2.5 text-brand-700 transition hover:bg-brand-50"
            aria-label="Panier"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2.5 text-brand-700 transition hover:bg-brand-50 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden border-t border-brand-50 lg:block">
        <div className="section flex h-11 items-center gap-6 text-sm">
          {universeLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "font-medium text-brand-700/80 transition hover:text-brand-700",
                  isActive && "text-brand-500"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-brand-100 bg-white lg:hidden">
          <div className="section space-y-1 py-3">
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full rounded-xl border border-brand-100 bg-paper py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand-500"
              />
            </form>
            {[...navItems, ...universeLinks].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-700",
                    isActive && "bg-brand-50"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
