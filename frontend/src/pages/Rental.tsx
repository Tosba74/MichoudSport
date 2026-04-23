import { useMemo, useState } from "react";
import { Calendar, Mountain, Shield, User, ChevronRight, Check, Info } from "lucide-react";
import { rentalItems } from "../data/rentals";
import { formatPrice, daysBetween, cn } from "../lib/utils";
import type { RentalItem } from "../data/types";

interface BookingItem {
  item: RentalItem;
  size: string;
  quantity: number;
}

type Step = 1 | 2 | 3 | 4;

export default function Rental() {
  const [step, setStep] = useState<Step>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "expert">("intermediate");
  const [skierHeight, setSkierHeight] = useState<string>("");
  const [skierShoeSize, setSkierShoeSize] = useState<string>("");
  const [cartItems, setCartItems] = useState<BookingItem[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const duration = useMemo(() => {
    if (!startDate || !endDate) return 0;
    return daysBetween(new Date(startDate), new Date(endDate));
  }, [startDate, endDate]);

  const totalItemsCents = cartItems.reduce(
    (sum, ci) => sum + ci.item.dailyPriceCents * duration * ci.quantity,
    0
  );
  const totalDepositCents = cartItems.reduce(
    (sum, ci) => sum + ci.item.depositCents * ci.quantity,
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const filteredItems = rentalItems.filter((i) => i.skillLevels.includes(skillLevel));

  const addItem = (item: RentalItem, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.item.id === item.id && p.size === size);
      if (existing) {
        return prev.map((p) =>
          p.item.id === item.id && p.size === size ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { item, size, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string, size: string) => {
    setCartItems((prev) => prev.filter((p) => !(p.item.id === itemId && p.size === size)));
  };

  const goToStep = (s: Step) => setStep(s);

  if (confirmed) {
    return (
      <div className="section py-20 animate-fade-in">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-brand-700">
            Réservation confirmée !
          </h1>
          <p className="mt-3 text-brand-700/70">
            Un email de confirmation vous a été envoyé. Votre matériel vous attend en
            magasin le {new Date(startDate).toLocaleDateString("fr-FR")}.
          </p>
          <div className="mt-8 rounded-2xl bg-brand-50 p-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-700/70">Numéro de réservation</span>
              <span className="font-mono font-bold text-brand-700">
                DL-{Math.random().toString(36).slice(2, 8).toUpperCase()}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-brand-700/70">Montant location</span>
              <span className="font-bold text-brand-700">{formatPrice(totalItemsCents)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-brand-700/70">Caution pré-autorisée</span>
              <span className="font-semibold text-brand-500">
                {formatPrice(totalDepositCents)}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setConfirmed(false);
              setCartItems([]);
              setStep(1);
              setStartDate("");
              setEndDate("");
            }}
            className="btn-ghost mt-6"
          >
            Faire une nouvelle réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-brand-700 py-14 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1551524164-6cf2ac242aed?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-700/95 to-brand-700/70" />
        <div className="section relative">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-400">
            <Mountain className="h-5 w-5" /> Location de ski
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Réservez votre matériel en ligne
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Skis, chaussures, casques, packs complets. Matériel entretenu, prix dégressifs,
            retrait en 15 minutes au magasin.
          </p>
        </div>
      </section>

      <section className="section mt-10">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {[
            { n: 1, label: "Dates" },
            { n: 2, label: "Skieur" },
            { n: 3, label: "Matériel" },
            { n: 4, label: "Confirmation" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition",
                    step >= s.n
                      ? "bg-brand-500 text-white"
                      : "bg-brand-100 text-brand-400"
                  )}
                >
                  {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-semibold md:block",
                    step >= s.n ? "text-brand-700" : "text-brand-400"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < 3 && (
                <div
                  className={cn(
                    "h-0.5 w-6 md:w-16",
                    step > s.n ? "bg-brand-500" : "bg-brand-100"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section mt-8 pb-16">
        {step === 1 && (
          <div className="mx-auto max-w-xl card p-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand-500" />
              <h2 className="font-display text-xl font-bold text-brand-700">
                Quelles sont vos dates de séjour ?
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-700">
                  Arrivée
                </label>
                <input
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-700">
                  Départ
                </label>
                <input
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {duration > 0 && (
              <div className="mt-5 rounded-xl bg-brand-50 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-brand-700/70">Durée</span>
                  <span className="font-bold text-brand-700">
                    {duration} jour{duration > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}

            <button
              disabled={!startDate || !endDate || duration <= 0}
              onClick={() => goToStep(2)}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuer <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mx-auto max-w-xl card p-8">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-brand-500" />
              <h2 className="font-display text-xl font-bold text-brand-700">
                Profil du skieur
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-700">
                  Votre niveau
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["beginner", "intermediate", "expert"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSkillLevel(lvl)}
                      className={cn(
                        "rounded-xl border-2 py-3 text-sm font-semibold transition",
                        skillLevel === lvl
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-brand-100 text-brand-700 hover:border-brand-300"
                      )}
                    >
                      {lvl === "beginner" && "Débutant"}
                      {lvl === "intermediate" && "Intermédiaire"}
                      {lvl === "expert" && "Expert"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-700">
                    Taille (cm)
                  </label>
                  <input
                    type="number"
                    value={skierHeight}
                    onChange={(e) => setSkierHeight(e.target.value)}
                    placeholder="175"
                    className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-700">
                    Pointure
                  </label>
                  <input
                    type="number"
                    value={skierShoeSize}
                    onChange={(e) => setSkierShoeSize(e.target.value)}
                    placeholder="42"
                    className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => goToStep(1)} className="btn-ghost flex-1">
                Retour
              </button>
              <button
                disabled={!skierHeight || !skierShoeSize}
                onClick={() => goToStep(3)}
                className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-700">
                Sélectionnez votre matériel
              </h2>
              <p className="mt-1 text-sm text-brand-700/70">
                Niveau : <span className="font-semibold">{
                  skillLevel === "beginner" ? "Débutant" : skillLevel === "intermediate" ? "Intermédiaire" : "Expert"
                }</span> • Durée : <span className="font-semibold">{duration} jours</span>
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    item={item}
                    duration={duration}
                    onAdd={(size) => addItem(item, size)}
                  />
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="card p-6">
                <h3 className="font-display text-lg font-bold text-brand-700">
                  Votre réservation
                </h3>
                <div className="mt-2 text-sm text-brand-700/70">
                  Du {new Date(startDate).toLocaleDateString("fr-FR")} au{" "}
                  {new Date(endDate).toLocaleDateString("fr-FR")}
                </div>

                {cartItems.length === 0 ? (
                  <div className="mt-6 rounded-xl border border-dashed border-brand-200 p-4 text-center text-sm text-brand-400">
                    Aucun article sélectionné
                  </div>
                ) : (
                  <ul className="mt-5 divide-y divide-brand-50">
                    {cartItems.map((ci) => (
                      <li key={ci.item.id + ci.size} className="flex gap-3 py-3">
                        <img
                          src={ci.item.image}
                          alt=""
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-ink">{ci.item.name}</div>
                          <div className="text-xs text-brand-400">
                            Taille {ci.size} · ×{ci.quantity}
                          </div>
                          <button
                            onClick={() => removeItem(ci.item.id, ci.size)}
                            className="mt-1 text-xs text-accent-500 hover:underline"
                          >
                            Retirer
                          </button>
                        </div>
                        <div className="text-sm font-bold text-brand-700">
                          {formatPrice(ci.item.dailyPriceCents * duration * ci.quantity)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 space-y-2 border-t border-brand-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-brand-700/70">Location ({duration}j)</span>
                    <span className="font-semibold text-brand-700">{formatPrice(totalItemsCents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-700/70">Caution (pré-autorisée)</span>
                    <span className="font-semibold text-brand-500">
                      {formatPrice(totalDepositCents)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-brand-50 p-3 text-xs text-brand-700">
                  <Info className="mb-1 inline h-3.5 w-3.5" /> La caution est pré-autorisée
                  sur votre carte et libérée au retour du matériel en bon état.
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
                  <span className="font-display text-sm font-bold">Total à payer</span>
                  <span className="font-display text-2xl font-bold text-brand-700">
                    {formatPrice(totalItemsCents)}
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button onClick={() => goToStep(2)} className="btn-ghost flex-1">
                    Retour
                  </button>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={() => goToStep(4)}
                    className="btn-accent flex-1 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Payer
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {step === 4 && (
          <div className="mx-auto max-w-xl card p-8">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-500" />
              <h2 className="font-display text-xl font-bold text-brand-700">
                Paiement sécurisé
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="vous@email.com"
                  className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-700">
                  Numéro de carte
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="rounded-xl border border-brand-200 px-4 py-3 outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-700/70">Location</span>
                <span className="font-semibold text-brand-700">{formatPrice(totalItemsCents)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-brand-700/70">Caution (pré-autorisation)</span>
                <span className="text-brand-500">{formatPrice(totalDepositCents)}</span>
              </div>
              <div className="mt-2 border-t border-brand-200 pt-2 flex justify-between font-bold text-brand-700">
                <span>À débiter aujourd'hui</span>
                <span>{formatPrice(totalItemsCents)}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={() => goToStep(3)} className="btn-ghost flex-1">
                Retour
              </button>
              <button
                onClick={() => setConfirmed(true)}
                className="btn-accent flex-1"
              >
                Confirmer la réservation
              </button>
            </div>
            <div className="mt-3 text-center text-xs text-brand-400">
              Paiement sécurisé (démo — maquette non transactionnelle)
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function RentalItemCard({
  item,
  duration,
  onAdd,
}: {
  item: RentalItem;
  duration: number;
  onAdd: (size: string) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <div className="card overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-bold text-brand-700">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-brand-700/70">{item.description}</p>

        <div className="mt-3">
          <div className="text-xs font-semibold text-brand-700 mb-1.5">Taille</div>
          <div className="flex flex-wrap gap-1.5">
            {item.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-semibold transition",
                  selectedSize === s
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-brand-100 text-brand-700 hover:border-brand-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-bold text-brand-700">
              {formatPrice(item.dailyPriceCents)}
              <span className="text-xs font-medium text-brand-400">/jour</span>
            </div>
            {duration > 0 && (
              <div className="text-xs text-brand-400">
                {formatPrice(item.dailyPriceCents * duration)} pour {duration}j
              </div>
            )}
          </div>
          <button
            disabled={!selectedSize}
            onClick={() => onAdd(selectedSize)}
            className="rounded-xl bg-brand-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
