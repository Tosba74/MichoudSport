import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-700 text-white">
      <div className="section py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-12 w-12 rounded-full bg-white p-1" />
              <div>
                <div className="font-display text-lg font-bold">Discount Location</div>
                <div className="text-sm text-brand-200">Sport · Montagne · Bien-être</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100">
              Depuis plus de 20 ans, la référence montagne qui s'étend au sport, à la mobilité
              douce, à la nutrition et au bien-être.
            </p>
            <form className="mt-5 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-lg bg-brand-800 px-4 py-2.5 text-sm text-white placeholder:text-brand-300 outline-none focus:ring-2 focus:ring-accent-400"
              />
              <button className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600">
                <Mail className="h-4 w-4" />
                OK
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-100">
              Boutique
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
              <li><Link to="/boutique/sport" className="hover:text-white">Sport & Outdoor</Link></li>
              <li><Link to="/boutique/mobility" className="hover:text-white">Mobilité</Link></li>
              <li><Link to="/boutique/nutrition" className="hover:text-white">Nutrition</Link></li>
              <li><Link to="/boutique/wellness" className="hover:text-white">Bien-être</Link></li>
              <li><Link to="/boutique/winter" className="hover:text-white">Hiver</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-brand-100">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
              <li><Link to="/promos" className="hover:text-white">Offres flash</Link></li>
              <li><Link to="/location" className="hover:text-white">Location ski</Link></li>
              <li><a href="#" className="hover:text-white">Livraison & retours</a></li>
              <li><a href="#" className="hover:text-white">Service client</a></li>
              <li><a href="#" className="hover:text-white">Carte cadeau</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-600 pt-6 md:flex-row md:items-center">
          <div className="text-xs text-brand-300">
            © {new Date().getFullYear()} Discount Location. Maquette de démonstration.
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="rounded-full bg-brand-600 p-2 hover:bg-brand-500" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full bg-brand-600 p-2 hover:bg-brand-500" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full bg-brand-600 p-2 hover:bg-brand-500" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
