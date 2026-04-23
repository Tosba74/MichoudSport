# MichoudSport — Plan de développement

> Document de pilotage pour Cursor. Sert de feuille de route, de référentiel d'architecture et de checklist d'avancement.
> Stack : **Rails API + React (SPA) + PostgreSQL + TailwindCSS + Stripe**
> Méthode : livraison incrémentale, un espace à la fois, production-ready dès la Phase 1.

---

## 0. Décisions à trancher avant code (⚠️ bloquant)

Ces points conditionnent l'architecture. À figer avant la Phase 1.

| # | Question | Options | Reco par défaut |
|---|----------|---------|-----------------|
| D1 | Panier unifié ou séparé entre espaces ? | Unifié / Séparé vente+promo + location isolée | **Unifié vente+promo, séparé location** (flux, fiscalité et caution différents) |
| D2 | Mono-repo ou deux dépôts ? | Monorepo / Split | **Monorepo** (`/backend` + `/frontend`) |
| D3 | Auth | JWT (stateless) / Sessions Rails | **Devise + JWT httpOnly cookies** (sécurité + SPA) |
| D4 | Recherche | pg_search / Meilisearch / Elasticsearch | **pg_search** en V1, Meilisearch si besoin |
| D5 | i18n / devise | FR seule / FR+EN, EUR/CHF | **FR+EUR V1**, i18n-ready |
| D6 | Hébergement | Scalingo / Heroku / AWS / OVH | **Scalingo** (FR, PCI-friendly) |
| D7 | Paiement location | Stripe (capture différée pour caution) | **Stripe PaymentIntent + manual capture** |
| D8 | Médias produits | Active Storage + S3 / Cloudinary | **Active Storage + S3 + CDN** |

---

## 1. Vue d'ensemble des phases

```
Phase 0  — Fondations (repo, CI, sécurité, design system)        [~1 sem]
Phase 1  — Espace 1 : E-commerce principal                       [HAUTE]
Phase 2  — Espace 2 : Promos & offres flash                      [HAUTE]
Phase 3  — Espace 3 : Location ski                               [MOYENNE]
Phase 4  — Back-office unifié                                    (en continu dès P1)
Phase 5  — Hardening, perfs, SEO, observabilité                  [clôture]
```

---

## 2. Phase 0 — Fondations

### 2.1 Repo & tooling
- [ ] Monorepo `MichoudSport/` : `/backend` (Rails 7.1+ API-only), `/frontend` (Vite + React 18 + TS)
- [ ] `.editorconfig`, `.nvmrc`, `.ruby-version`, `Procfile`, `docker-compose.yml` (postgres, redis, mailcatcher)
- [ ] Scripts racine : `bin/setup`, `bin/dev` (foreman pour lancer back+front)
- [ ] `AGENTS.md` + `.cursor/rules/` (conventions Rails/React/Secure by Design)

### 2.2 Backend Rails (squelette)
- [ ] Rails 7 API + Postgres + Redis (cache, Sidekiq, rate limiter)
- [ ] Gems : `devise`, `devise-jwt`, `pundit`, `rack-attack`, `rack-cors`, `strong_migrations`, `pg_search`, `pagy`, `sidekiq`, `dotenv-rails`, `lograge`, `bullet` (dev), `brakeman`, `rubocop-rails-omakase`, `rspec-rails`, `factory_bot`, `faker`, `shoulda-matchers`
- [ ] Arborescence : `app/controllers/api/v1/`, `app/services/`, `app/policies/`, `app/serializers/` (jsonapi-serializer ou alba)
- [ ] Namespacing API : `/api/v1/...`
- [ ] Versionnage schéma, UUID par défaut sur toutes les tables (`pgcrypto`)

### 2.3 Frontend React (squelette)
- [ ] Vite + React 18 + TypeScript + TailwindCSS + shadcn/ui
- [ ] Routing : `react-router-dom` v6
- [ ] État serveur : **TanStack Query** (cache, retries, invalidations)
- [ ] État UI : Context + `zustand` si besoin global léger
- [ ] Forms : `react-hook-form` + `zod`
- [ ] Axios instance avec interceptor CSRF / 401
- [ ] Design system : tokens couleurs par univers (sport, nutrition, bien-être, hiver, promo, location)

### 2.4 Sécurité transverse (Secure by Design — activé dès J1)
- [ ] `Rack::Attack` : login, signup, paiement, réservation (throttle IP + user)
- [ ] Headers (`secure_headers` gem) : CSP stricte, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy
- [ ] CORS whitelist explicite (env `ALLOWED_ORIGINS`)
- [ ] JWT en **cookie httpOnly SameSite=Lax/Strict**, jamais localStorage
- [ ] `filter_parameter_logging` : password, token, card, cvc, iban, authorization
- [ ] UUID exposés, jamais d'ID séquentiel dans URLs publiques
- [ ] Pundit sur 100% des endpoints sensibles (default deny)
- [ ] Webhooks Stripe : vérification signature obligatoire
- [ ] Audit log : table `audit_events(actor_id, action, resource, metadata jsonb, ip, created_at)`

### 2.5 CI/CD
- [ ] GitHub Actions : lint (rubocop, eslint, prettier), tests (rspec, vitest), `brakeman`, `bundler-audit`, `npm audit`
- [ ] Environnements : `development`, `staging`, `production`
- [ ] Secrets : Rails credentials chiffrés + variables CI

**Critère de sortie Phase 0** : `bin/dev` lance back+front, login test fonctionne, CI verte, headers sécu OK.

---

## 3. Phase 1 — Espace 1 : E-commerce principal

### 3.1 Modèle de données (cœur catalogue)

```text
users (UUID, email, encrypted_password, role[client|staff|admin], ...)
addresses (user_id, line1, line2, city, zip, country, kind[billing|shipping])

categories (id, parent_id, slug, name, position, universe[sport|mobility|nutrition|wellness|winter])
  → index (parent_id), (slug unique), (universe)

brands (id, slug, name)

products (id, slug UNIQUE, name, description, brand_id, status[draft|active|archived],
          base_price_cents, tax_rate, weight_g, searchable tsvector, created_at)
  → index GIN sur searchable, index (status), (brand_id)

product_categories (product_id, category_id)  — N:N
  → index (category_id, product_id)

product_variants (id, product_id, sku UNIQUE, name, option_values jsonb,
                  price_cents, compare_at_price_cents, stock, weight_g, barcode)
  → index (product_id), (sku), index partiel (stock > 0)

product_images (id, product_id, variant_id NULL, position, blob_id)

product_attributes (id, product_id, key, value)    — usage, niveau, saison…

reviews (id, user_id, product_id, rating 1..5, title, body, status, created_at)
  → index (product_id, status), unicité (user_id, product_id)

carts (id, user_id NULL, session_token, currency, created_at)
cart_items (id, cart_id, variant_id, quantity, unit_price_cents)

orders (id, user_id, number UNIQUE, status[pending|paid|shipped|delivered|cancelled|refunded],
        subtotal_cents, shipping_cents, tax_cents, discount_cents, total_cents,
        currency, stripe_payment_intent_id, placed_at)
  → index (user_id, placed_at desc), (status), (number)

order_items (id, order_id, variant_id, sku_snapshot, name_snapshot, unit_price_cents, quantity)

shipments (id, order_id, carrier, tracking_number, status, shipped_at, delivered_at)
```

Conventions : **UUID partout**, **prix en centimes (int)**, **devise par ligne**.

### 3.2 API (REST v1)
- `GET /api/v1/catalog/categories` (arbre)
- `GET /api/v1/catalog/products?category=&brand=&price_min=&price_max=&q=&sort=&page=`
- `GET /api/v1/catalog/products/:slug`
- `POST /api/v1/cart/items` / `PATCH` / `DELETE` (avec token panier si invité)
- `GET /api/v1/cart`
- `POST /api/v1/checkout/session` → Stripe PaymentIntent
- `POST /api/v1/webhooks/stripe` (signature vérifiée)
- `GET /api/v1/account/orders` (auth)
- `POST /api/v1/products/:id/reviews` (auth, ownership order vérifiée)

### 3.3 Frontend
- [ ] Pages : Home par univers, Liste catégorie (filtres + tri + pagination), Fiche produit (galerie, variantes, avis, cross-sell), Recherche, Panier, Checkout, Confirmation, Compte (commandes, adresses, avis)
- [ ] Composants : `ProductCard`, `VariantSelector`, `FacetFilters`, `SearchBar`, `CartDrawer`, `PriceTag` (gère promo), `Rating`
- [ ] Hooks : `useCart`, `useCatalog`, `useDebouncedSearch`, `useInfiniteProducts`
- [ ] SEO : SSR optionnel ou pre-render (sitemap, meta, JSON-LD Product)

### 3.4 Perfs & qualité
- [ ] Zéro N+1 (Bullet en dev, tests en CI)
- [ ] Pagination curseur sur listings (Pagy keyset)
- [ ] Cache fragment Russian-doll sur pages catégories (Redis)
- [ ] Images : variants WebP/AVIF, `srcset`, lazy loading
- [ ] Lighthouse ≥ 90 (Perf/SEO/Access.)

**Critère de sortie Phase 1** : parcours invité → ajout panier → compte → paiement Stripe test → email confirmation. Tous endpoints Pundit/testés.

---

## 4. Phase 2 — Espace 2 : Promos & offres flash

### 4.1 Modèle de données

```text
promotions (id, slug, name, kind[flash|seasonal|bundle|coupon|banner],
            starts_at, ends_at, status, stock_limit, priority, rules jsonb,
            discount_type[percent|fixed|bogo|bundle_price],
            discount_value_cents_or_pct, currency, created_at)
  → index (starts_at, ends_at), (status)

promotion_products (promotion_id, product_id, variant_id NULL)
coupons (id, code UNIQUE CITEXT, promotion_id, max_uses, used_count, user_scope)
coupon_redemptions (coupon_id, user_id, order_id, redeemed_at)
promotion_bundles (promotion_id, items jsonb) — pour offres groupées
newsletter_subscriptions (id, email CITEXT UNIQUE, confirmed_at, tags[], unsubscribe_token)
```

Règle : un produit peut appartenir à **N promotions** simultanées → résolveur de prix déterministe côté serveur (priorité, cumul interdit par défaut, date active).

### 4.2 Service objects clés
- `Pricing::ResolveForVariant` → retourne `{ base, final, applied_promotions[], badge }`
- `Promotions::ValidateCoupon`
- `Promotions::ApplyToCart`

### 4.3 API
- `GET /api/v1/promotions/active` (home flash)
- `GET /api/v1/promotions/:slug`
- `POST /api/v1/cart/coupon` / `DELETE`
- `POST /api/v1/newsletter/subscribe` (double opt-in + rate limit)

### 4.4 Frontend
- [ ] Page "Promos" avec sections : flash (timer JS avec resync serveur), offres du moment, bundles, saisonnières
- [ ] Composants : `CountdownTimer` (source de vérité = `ends_at` serveur), `PromoBadge`, `FlashSaleStrip`
- [ ] Affichage prix barré + réduction sur fiches produit Espace 1 (lecture via `Pricing::ResolveForVariant`)
- [ ] Opt-in newsletter (double opt-in, honeypot anti-spam)

### 4.5 Sécurité spécifique
- Rate-limit strict sur validation coupon (brute force)
- Coupons **case-insensitive** (CITEXT), jamais devinables (alphanum 8+)
- Vérification temps serveur sur timers (jamais `Date.now()` client seul)

**Impacts cross-espaces** : résolveur de prix **unique** utilisé par Espace 1 (fiche, panier, checkout). Aucun calcul de promo côté client.

**Critère de sortie Phase 2** : créer une vente flash en admin → visible home → timer exact → ajout panier → paiement remise appliquée et loggée.

---

## 5. Phase 3 — Espace 3 : Location ski

### 5.1 Modèle de données

```text
rental_categories (id, slug, name)  — skis, chaussures, casques, bâtons, forfaits...

rental_items (id, slug, name, category_id, description,
              size_range, skill_level[beginner|intermediate|expert|all],
              daily_price_cents, deposit_cents, status, active)

rental_units (id, rental_item_id, serial_number, size, condition, status[available|maintenance|retired])
  — 1 unité physique = 1 paire de skis ; gestion stock réel

rental_bookings (id, number UNIQUE, user_id, starts_on, ends_on,
                 status[pending|confirmed|in_progress|returned|cancelled],
                 total_cents, deposit_cents, stripe_payment_intent_id,
                 deposit_capture_id, created_at)
  → index (starts_on, ends_on), (user_id), (status)
  → contrainte CHECK (ends_on >= starts_on)

rental_booking_items (id, booking_id, rental_unit_id, rental_item_id,
                      size, skill_level, price_cents_snapshot)
  → contrainte : pas de chevauchement sur (rental_unit_id, [starts_on, ends_on])
    via EXCLUDE USING gist + btree_gist sur daterange

rental_returns (id, booking_id, returned_at, damage_notes, damage_fee_cents)
```

**Clé technique** : `EXCLUDE CONSTRAINT` PostgreSQL (`btree_gist`) pour garantir en DB qu'une unité ne peut être louée deux fois sur des dates qui se chevauchent. Pas seulement dans le code.

### 5.2 Disponibilité
- Service `Rentals::Availability` : given (item, starts_on, ends_on) → unités dispo, tailles dispo
- Cache Redis court (60s) sur calendriers très consultés
- Calendrier côté React (`react-day-picker`) avec API `/api/v1/rentals/:slug/availability?from=&to=`

### 5.3 API
- `GET /api/v1/rentals/catalog`
- `GET /api/v1/rentals/:slug`
- `GET /api/v1/rentals/:slug/availability`
- `POST /api/v1/rentals/bookings` (verrou DB + check dispo)
- `POST /api/v1/rentals/bookings/:id/payment` → Stripe PI (capture immédiate location) + PI séparé caution (manual capture)
- `POST /api/v1/rentals/bookings/:id/cancel` (règles d'annulation)
- Webhook Stripe étendu pour bookings + captures de caution

### 5.4 Frontend
- [ ] Étapes : 1) dates → 2) skieurs (taille/pointure/niveau) → 3) sélection matériel → 4) récap + prix + caution → 5) paiement → 6) confirmation
- [ ] Composants : `DateRangePicker`, `SkierProfileForm`, `RentalItemCard`, `DepositNotice`
- [ ] Emails : confirmation, rappel J-3, retour, libération caution

### 5.5 Back-office locations
- Planning (vue semaine) des unités, états retour, litiges, captures/libérations de caution

**Critère de sortie Phase 3** : réservation test sur dates futures → paiement + caution pré-autorisée → email → passage `in_progress` → retour → libération caution.

---

## 6. Phase 4 — Back-office unifié (en continu)

- Auth staff/admin (Devise + rôle) — MFA recommandé admin
- Sections : Catalogue, Stocks, Promotions, Locations, Commandes, Clients, Avis, Audit, KPIs
- Stack admin : **React admin custom** (cohérence design) ou Rails + Hotwire isolé — à décider (reco : React admin sur même SPA, route `/admin` protégée)
- KPIs : CA vente/location/promo par période, taux conversion, top produits, stock critique, réservations à venir
- Exports CSV (commandes, locations, clients — RGPD ready)

---

## 7. Phase 5 — Hardening & clôture

- [ ] Tests end-to-end (Playwright) sur parcours critiques des 3 espaces
- [ ] Pentest léger interne + checklist OWASP Top 10
- [ ] Observabilité : Sentry (front+back), Lograge, uptime
- [ ] Backups Postgres chiffrés + test de restore
- [ ] RGPD : page politique, export/suppression compte, consentement cookies granulaire
- [ ] SEO : sitemap dynamique, balises canoniques, données structurées Product/Offer
- [ ] Accessibilité : audit axe-core, navigation clavier, contraste
- [ ] Documentation : `README.md`, `ARCHITECTURE.md`, runbooks incidents

---

## 8. Conventions rappel

- Ruby : MVC + service objects (`app/services/Domain/ActionName`), concerns pour comportements partagés
- React : composants fonctionnels, custom hooks, pas de classes, pas de HOC legacy
- Tests : **RSpec** backend (≥ 80% modèles/services), **Vitest + Testing Library** front
- Commits : Conventional Commits (`feat(cart): ...`)
- Branches : `main` protégée, PR review obligatoire, squash merge

---

## 9. Checklist Secure by Design (à cocher par PR)

- [ ] Endpoint protégé par authentification **ET** autorisation (Pundit)
- [ ] Params filtrés côté serveur (strong params + validations modèle)
- [ ] Aucune donnée sensible loggée
- [ ] Pas d'ID séquentiel exposé
- [ ] Requêtes paramétrées uniquement
- [ ] Rate limit si endpoint sensible
- [ ] Tests d'autorisation (utilisateur non autorisé → 403/404)
- [ ] Pas de secret en front (`REACT_APP_*` / `VITE_*` publics uniquement)

---

## 10. Prochaine action proposée

Trancher les décisions **D1 → D8** (section 0), puis j'attaque la **Phase 0** (init monorepo + squelettes Rails/React + socle sécurité) en un PR unique et revue.
