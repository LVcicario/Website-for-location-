# Villa Azur

Site vitrine pour la location d'un appartement d'exception à **Saint-Tropez**, vue baie.
Direction artistique cinématique immersive, pour une clientèle UHNW internationale.
Réservation via **Airbnb** (CTA principal) + conciergerie privée (secondaire).

## Stack

- **Astro 5** (SSG) + islands **React 19** ciblées
- **Tailwind CSS v4** via `@tailwindcss/vite` + tokens CSS dans `src/styles/tokens.css`
- **GSAP + ScrollTrigger** pour les reveals chapitrés
- **Lenis** pour le smooth scroll
- i18n natif Astro, 7 langues prévues (FR/EN actives, IT/DE/ES/RU/AR en fallback)
- Police : **Fraunces** (serif éditoriale) + **Inter** via Google Fonts

## Démarrer

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # génère dist/
npm run preview # sert le build
npm run check   # astro check (types)
```

## Structure

```
src/
├── components/       # Hero, Chapter, RoomCards, Footer, BookingCTA, LanguageSwitcher...
├── content/copy.ts   # textes FR + EN de tous les chapitres
├── i18n/             # config + strings UI
├── layouts/Base.astro
├── pages/
│   ├── index.astro             → redirige vers /fr/
│   └── [locale]/
│       ├── index.astro         → one-pager cinématique
│       ├── galerie.astro       → galerie placeholder
│       └── mentions-legales.astro
└── styles/
    ├── tokens.css    # palette blanc/or/bleu marine/bois
    └── global.css
```

## Palette (alignée sur l'appartement)

| Token | Hex | Usage |
|---|---|---|
| `--color-bone` | `#F7F5F0` | texte principal, fond clair |
| `--color-ink` | `#0A0A0A` | fond principal |
| `--color-gold` | `#B8935A` | accent principal (laiton mat) |
| `--color-navy` | `#0E1E33` | accent profond |
| `--color-oak` | `#C9A97A` | bois chêne clair |

## Structure narrative

One-pager scrolly en 8 chapitres :

| # | Chapitre | Composant |
|---|---|---|
| 00 | Ouverture (hero) | `Hero.astro` |
| 01 | Prologue | `Prologue.astro` |
| 02 | Le lieu | `ThePlace.astro` |
| 03 | L'appartement | `TheApartment.astro` |
| 04 | Matières | `Materials.astro` |
| 05 | L'art de vivre | `ArtOfLiving.astro` |
| 06 | Saisons | `Seasons.astro` |
| 07 | Réserver | `Reserve.astro` |

## Variables d'environnement

Créer un `.env` à la racine :

```bash
PUBLIC_AIRBNB_URL=https://www.airbnb.com/rooms/XXXXXXX   # URL Airbnb réelle du listing
RESEND_API_KEY=re_xxx                                    # pour le formulaire conciergerie (phase 2)
CONCIERGE_TO_EMAIL=contact@villa-azur.example            # destinataire
```

## À produire avant le vrai lancement

Le dev peut avancer avec des placeholders, mais ces éléments sont des **prérequis de lancement public** :

1. **Shooting photo pro** (~40 photos pièces + détails matériaux) — référence : *The Socialite Family*, *AD France*.
2. **Vidéo drone 4K** (baie + toit terrasse) + **vidéo intérieure** — 1 journée de tournage. Héberger via **Mux** ou **Cloudflare Stream** (HLS adaptatif). Remplacer le hero CSS actuel dans `src/components/Hero.astro`.
3. **Copywriting** FR + EN par un rédacteur de marque (ton sobre, évocateur, 40-60 mots par chapitre). Sources : `src/content/copy.ts`.
4. **Traductions pro** IT/DE/ES/RU/AR (ajouter les objets dans `copy.ts` + `ui.ts` — actuellement fallback EN).
5. **URL Airbnb** finale (variable `PUBLIC_AIRBNB_URL`).
6. **Branding** : nom définitif (placeholder *Villa Azur*) + éventuel monogramme doré pour le favicon.

## Phasage

- [x] **Phase 0** — Fondations (Astro + Tailwind + tokens + i18n + Lenis + GSAP)
- [x] **Phase 1** — Squelette narratif (8 chapitres + CTA Airbnb + Footer + Nav)
- [ ] **Phase 2** — Polish DA : carte Mapbox custom, formulaire conciergerie (Resend), galerie plein écran clavier + swipe
- [ ] **Phase 3** — Intégration du contenu pro (photos + vidéo + copy final)
- [ ] **Phase 4** — Déploiement (Vercel/Cloudflare Pages) + domaine + analytics (Plausible)
- [ ] **Phase 5** — Langues additionnelles (IT, DE, ES, puis RU, AR avec audit RTL)

## Targets performance (non-négociables pour la perception luxe)

- LCP < 1.8s sur 4G
- CLS < 0.05
- Lighthouse Perf > 90 desktop, > 80 mobile
