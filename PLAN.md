# Villa Azur — Plan de route ultra-poussé

## Pourquoi ce site existe

Un appartement d'exception à **Sainte-Maxime**, **vue sur Saint-Tropez**, valorisation > 1 M€. Le site n'est pas une plaquette, c'est **un filtre** : il pré-qualifie les prospects UHNW, pose le prix avant la négociation, et convertit vers Airbnb (ou conciergerie privée pour les séjours discrets).

### Mesure de succès (quand on saura qu'on a gagné)
- Un visiteur arrive, reste 2-3 min, envoie une demande ou clique Airbnb sans hésiter.
- Le tarif nightly perçu s'aligne naturellement sur du 2-3k€/nuit haute saison.
- Des journalistes luxe hospitality (AD, Vogue Living, The Socialite Family, Cabana) demandent à shooter le lieu.
- Le listing Airbnb reçoit des inquiries payantes, pas des curieux.

### La nuance qui change tout
On n'est **PAS** à Saint-Tropez. On est à **Sainte-Maxime**, côté résidentiel, calme, villas familiales fortunées. St-Tropez est en face, visible toute la journée sous différentes lumières. L'avantage UHNW se raconte ainsi :
> « On voit St-Tropez quand on veut, on y va quand on veut, on dort ailleurs. »

Cette nuance doit traverser tout le copywriting et le storytelling — aujourd'hui elle ne l'est pas.

---

## Diagnostic actuel (17 avril 2026)

### ✓ En place
- Astro 5 + React 19 + Tailwind v4 + GSAP + Lenis
- One-pager cinématique 8 chapitres + section Conciergerie + footer + nav
- RoomScroller horizontal pinné (desktop), fallback vertical (mobile)
- Galerie avec lightbox clavier (← → Esc)
- i18n 7 langues (FR/EN traduites, IT/DE/ES/RU/AR en fallback EN)
- ScrollProgress doré
- Build vert, 21 pages en ~1s, JS ~130 kB gzip, RTL OK sur `/ar/`

### ✗ Écart vs. site signature (« ultra-luxe ultime »)
1. Tout le contenu est un placeholder CSS (gradients), pas des photos/vidéos réelles.
2. Copy que j'ai écrit = générique-luxe, pas « cet appartement spécifiquement ».
3. La localisation est fausse dans le copy (St-Tropez au lieu de Ste-Maxime vue St-Tropez).
4. Typo Fraunces open-source (qu'on voit partout dans les sites « luxe template »).
5. Aucune vraie signature DA : pas de cursor, pas d'audio, pas de clip-path reveals.
6. Pas de calendrier réel, pas de Matterport, pas de vraie carte, pas de backend conciergerie.
7. Aucun SEO structuré, pas de sitemap, pas d'OG dynamiques, pas d'analytics.
8. Pas d'audit a11y, pas de RGPD complet, mentions légales factices.

---

## Correction immédiate (à lancer en premier — ~1 jour)

**Fichiers impactés** :
- `src/content/copy.ts` : revoir tout le copy FR + EN pour positionner Ste-Maxime vue St-Tropez.
- `src/pages/[locale]/index.astro` : titres et descriptions meta.
- `src/components/Footer.astro` : tagline "Saint-Tropez" → "Sainte-Maxime · Saint-Tropez, vue baie".
- `src/components/ThePlace.astro` : la carte SVG est générique, ajouter un repère spécifique côté Ste-Maxime face à St-Tropez, une ligne pointillée entre les deux.
- `src/components/Hero.astro` : eyebrow et baseline.
- **POIs** (`copy.ts` → `art_of_living.pois`) : reconstruire la liste :
  - Ste-Maxime : plage de la Nartelle (à pied), port de Ste-Maxime, La Croisette, marché du mardi/samedi, Sémaphore
  - St-Tropez via bateau : Sénéquier, Place des Lices, Byblos, Pampelonne (via taxi-boat ou navette Bateaux Verts)
  - Arrière-pays : Ramatuelle, Gassin, vignobles de Provence
  - Préciser les temps : bateau ≈ 15 min, voiture ≈ 20-30 min par la coastal
- Coordonnées : `43.31° N · 6.64° E` (Ste-Maxime).

Ce n'est pas juste un find/replace : c'est réécrire le positionnement.

---

## Les 4 chantiers parallélisables

### Chantier A — Contenu (production externe, bloque tout le reste)

**C'est le chantier n°1.** Un shell parfait avec des placeholders gradient reste un shell. Il faut absolument faire produire :

| Livrable | Ressource | Budget indicatif | Durée | Priorité |
|---|---|---|---|---|
| Shooting photo pro ~40 plans | Photographe hospitality luxe (réfs : The Socialite Family, Stephen Kent Johnson, François Halard) | 4-10k€ | 1 journée + post-prod 1 semaine | P0 |
| Vidéo drone 4K (baie + toit terrasse, golden hour) | Vidéaste drone certifié DGAC/licencié | 2-4k€ | 1 journée + post-prod 2 semaines | P0 |
| Vidéo intérieure cinématique (Fuji GFX, slider, prompte) | Même vidéaste ou binôme | Inclus ou +2k€ | Inclus | P0 |
| Copywriting FR + EN par un rédacteur de marque | Agence (ex. Gentil Garçon, La Marque, Berwind) | 3-6k€ | 2-3 semaines | P0 |
| Traductions pro IT, DE, ES | Agence spé. luxe (ex. Prestige Translations, Alphatrad premium) | 600-1200€/langue | 1-2 semaines | P1 |
| Traductions pro RU, AR (audit RTL inclus pour AR) | Agence spé. avec native speaker + relecteur luxe | 1-2k€/langue | 2-3 semaines | P2 |
| Branding : nom définitif, monogramme, logotype, favicon signature | Studio design (ex. Ill-Studio, Base Design, Irma Boom studio light) | 5-15k€ | 3-4 semaines | P1 |

**Timeline recommandée** :
- Semaine 1 : brief photographe + vidéaste + brief rédacteur + brief studio branding
- Semaine 2-3 : shooting + tournage (1 jour combiné si possible, golden hour matin + soir)
- Semaine 4-6 : post-production + premier draft copy + premier logo
- Semaine 6-8 : livraisons finales
- Semaine 8-10 : traductions FR/EN → IT/DE/ES
- Semaine 10-12 : RU + AR

**Pendant ce temps, le dev avance sur B et D.**

### Chantier B — DA qui signe (code — ~1-2 semaines dev)

Ce qui fait qu'on n'est plus sur un template luxe mais sur un **site signature**.

| # | Livrable | Fichiers | Notes |
|---|---|---|---|
| B1 | **Typographie premium licenciée** — GT Super Display (Grilli Type) ou Canela Deck (Commercial Type), self-hosted via `src/fonts/` | `public/fonts/`, `src/styles/tokens.css`, `src/layouts/Base.astro` | ~250-500€ licence. Gain visuel énorme. Vérifier support cyrillique + arabe ou prévoir Noto Serif Display en fallback. |
| B2 | **Cursor custom sur hero + section vidéo** — cercle or-transparent, grossit sur CTAs magnétiques | nouveau `src/components/CustomCursor.tsx`, `src/styles/cursor.css` | Client-side only, désactivé touch/reduced-motion. |
| B3 | **Magnetic hover sur CTAs** — le bouton vient légèrement vers le curseur | `BookingCTA.astro`, `Reserve.astro`, `ConciergeForm.tsx` | 20 lignes de JS, effet d'attention. |
| B4 | **Image reveals en clip-path** — les photos se dévoilent en diagonale au scroll | nouveau `src/components/ClipReveal.tsx` | GSAP + clip-path inset/polygon, anime sur scroll-trigger. |
| B5 | **Slow parallax sur photos hero + sections** — la photo bouge à 85% de la vitesse du scroll | `Hero.astro`, `RoomScroller.tsx` | GSAP ScrollTrigger scrub, léger (0.1-0.3). |
| B6 | **Audio ambient optionnel** — cigales + mer muted par défaut, toggle discret or en bas à droite | nouveau `src/components/AmbientAudio.tsx`, audio file ~30s loop | Divise mais c'est ce que font Les Airelles et Cheval Blanc. Persister l'état dans localStorage. |
| B7 | **Monogramme + favicon signature** | `public/favicon.svg`, `src/components/Logo.astro` | Dépend de B0 (branding). |
| B8 | **OG image personnalisée** | `public/og.jpg` (1200×630) | Soit photo du shooting, soit image typographique générée. |
| B9 | **Transitions de page View Transitions API** — Home ↔ Galerie ↔ Mentions légales | `Base.astro` avec `<ViewTransitions />` | Natif Astro 5. |
| B10 | **Dark-to-light inversion sur sections** — une section très lumineuse (blanc + bois) au milieu des noires pour respiration | `Materials.astro` peut basculer en clair | Casse la monotonie du noir. |

### Chantier C — Fonctionnalités qui crédibilisent (code + intégrations)

Ce qui fait la différence entre un joli site et un site qui convertit.

| # | Livrable | Intégration | Notes |
|---|---|---|---|
| C1 | **Calendrier de disponibilités iCal** (lecture seule, synced avec Airbnb) | Airbnb exporte une URL iCal par listing. On parse, on affiche un mini-calendrier sobre (mois par mois, dates barrées en or) | Montre la disponibilité réelle → crédibilise le listing. Pas de réservation custom. |
| C2 | **Visite virtuelle Matterport 3D** embarquée | Matterport Pro3 ou prestataire externe, ~800-1500€ | Standard absolu dans l'immo luxe 2026. À ne pas rater. |
| C3 | **Carte Mapbox custom dark+or** (remplace le SVG actuel) | Token Mapbox, style custom (dark base + waterways bleu marine + route or) + POIs animés au scroll | Le SVG actuel fait le minimum, une vraie carte fait l'interactivité. |
| C4 | **Backend Resend pour conciergerie** | Adaptateur Astro pour Vercel ou Cloudflare Workers + `/api/concierge` route avec `prerender = false` + Resend API | Email direct, pas de mailto. Template HTML dans l'email. |
| C5 | **Anti-spam** : honeypot (déjà là) + Cloudflare Turnstile ou hCaptcha invisible | Script léger, invisible UHNW | Honeypot seul = pas suffisant à terme. |
| C6 | **Rate limiting** sur l'API conciergerie | Upstash Redis ou KV + middleware Astro | Protection bot + usage. |
| C7 | **Short press kit PDF** téléchargeable (protégé par email) | Route serveur + génération PDF à la volée (react-pdf ou puppeteer) | Pour les journalistes / brokers. |
| C8 | **Meta Booking CTA tracking** — UTM par langue/section pour savoir d'où viennent les clics Airbnb | `BookingCTA.astro` | Savoir ce qui convertit. |
| C9 | **Guest book discret** (optionnel, controversé) — 2-3 testimonials courts anonymisés « L., June 2025 » | `src/content/testimonials.ts` | À activer seulement si le client a de vrais retours. |

### Chantier D — Rigueur invisible (code — ~3-4 jours dev)

Ce qu'on ne voit pas mais qui fait qu'on nous prend au sérieux.

| # | Livrable | Fichiers |
|---|---|---|
| D1 | **Schema.org `LodgingBusiness` + `Accommodation`** avec `amenityFeature`, `addressLocality: "Sainte-Maxime"`, `geo`, `priceRange` | `src/components/StructuredData.astro` injecté dans `Base.astro` |
| D2 | **Sitemap auto-généré** via `@astrojs/sitemap` + **hreflang** entre les locales | `astro.config.mjs`, déjà prévu |
| D3 | **OG images générées dynamiquement** par route/locale avec Satori + @resvg/resvg-js | `src/pages/og/[...slug].png.ts` |
| D4 | **Robots.txt + canonical fixes** | `public/robots.txt`, `Base.astro` |
| D5 | **Analytics Plausible** (self-hosted ou SaaS, RGPD-friendly) + events sur CTA Airbnb, CTA Conciergerie, langue switcher | `Base.astro` + `BookingCTA.astro` |
| D6 | **Audit accessibilité WCAG AA** : focus visible, aria-labels, tab order, contraste, lecteur d'écran (VoiceOver) | Tous les composants, checklist |
| D7 | **Cookies / RGPD** : bandeau discret or (seulement si Plausible est tracking avec cookies — ou self-host pour éviter) + politique de confidentialité réelle | nouveau `src/components/CookieBanner.tsx`, `src/pages/[locale]/confidentialite.astro` |
| D8 | **Mentions légales réelles** (actuellement « à compléter ») | `src/pages/[locale]/mentions-legales.astro` |
| D9 | **Image pipeline pro** — AVIF + WebP + blurhash placeholders + preloading intelligent + lazy-loading sur everything below-the-fold | `src/components/Picture.astro` wrapper autour d'Astro `<Image>` |
| D10 | **Audit performance Lighthouse CI** dans le pipeline de build | `package.json` scripts, GitHub Action |
| D11 | **Adaptateur Vercel ou Cloudflare Pages** + déploiement automatique sur push main | `astro.config.mjs`, `vercel.json` ou `wrangler.toml` |
| D12 | **Domaine custom + email pro** — ex. `villa-azur.com`, `concierge@villa-azur.com` via Google Workspace | Externe, pas de code |

---

## Phasage recommandé

### Sprint 0 — Correction positionnement (demi-journée)
Corriger Ste-Maxime vs St-Tropez dans tout le copy + carte SVG + POIs. Sans ça, tout le reste est désaxé.

### Sprint 1 — Fondations DA & rigueur (1-2 semaines, en parallèle du shooting)
- B1 Typographie premium
- B3 Magnetic CTAs
- B4 Clip-path reveals
- B5 Slow parallax
- B9 View Transitions
- D1 Schema.org
- D2 Sitemap + hreflang
- D11 Adaptateur Vercel + déploiement preview
- **Commander** le shooting photo, vidéo drone, rédacteur de marque, studio branding

### Sprint 2 — Intégration contenu (1-2 semaines après livraison shooting)
- Remplacer tous les placeholders gradients par vraies photos via `Picture.astro` (D9)
- Remplacer hero CSS par vraie vidéo drone (HLS via Mux ou Cloudflare Stream)
- Remplacer copy placeholder par copy de la rédactrice
- Intégrer le monogramme + favicon + OG image (B7, B8)
- B6 Audio ambient avec les bons sons (pas la peine d'acheter avant le feel final)

### Sprint 3 — Fonctionnalités qui convertissent (1-2 semaines)
- C1 Calendrier iCal synced Airbnb
- C2 Matterport embarqué
- C3 Carte Mapbox custom
- C4 Backend Resend conciergerie
- C5 Turnstile
- C8 UTM tracking
- D5 Plausible

### Sprint 4 — Scale internationale (continu)
- Traductions IT + DE + ES intégrées
- Audit RTL pour AR quand on y arrive
- C7 Press kit PDF
- Contact presse (AD France, Vogue Living, The Socialite Family, Cabana)

### Sprint 5 — Polish & optim (continu)
- D6 Audit a11y complet
- D7 Cookie banner (si applicable)
- D8 Mentions légales réelles
- D10 Lighthouse CI
- A/B testing copy + CTA position

---

## Budgets indicatifs (fourchettes)

| Poste | Fourchette basse | Fourchette haute |
|---|---|---|
| Shooting photo pro | 4 000 € | 10 000 € |
| Vidéo drone + intérieur | 4 000 € | 8 000 € |
| Rédaction FR + EN | 3 000 € | 6 000 € |
| Traductions 5 langues (IT/DE/ES/RU/AR) | 5 000 € | 9 000 € |
| Branding (nom, logo, monogramme, favicon) | 5 000 € | 15 000 € |
| Typographie licenciée (GT Super ou Canela) | 300 € | 800 € |
| Matterport 3D | 800 € | 1 500 € |
| Mapbox + token + style custom dev | 500 € | 1 500 € |
| Hébergement Vercel Pro + domaine + email pro | 300 € / an | 600 € / an |
| **Total mise en scène initiale** | **~23 000 €** | **~52 000 €** |

À mettre en face : 1 semaine haute saison = 15-25k€ de loyer. Le site se rentabilise sur 1-2 réservations.

---

## Risques & arbitrages

- **L'audio ambient divise.** Si le client n'est pas sûr, on démarre sans et on l'ajoute après retour utilisateurs.
- **Matterport vs. vidéo cinématique** : complémentaires, pas substituables. Le Matterport crédibilise, la vidéo émeut. Garder les deux.
- **Ste-Maxime positionnement** : attention, certains UHNW cherchent littéralement « St-Tropez intra-muros ». Le copy doit transformer l'emplacement en **avantage** (calme, vue, accès bateau) plutôt qu'en moindre mal.
- **Traductions RU/AR** : si la part de marché russe est affectée par le contexte géopolitique 2026, prioriser AR (Moyen-Orient stable, clientèle UHNW continue).
- **Typographie premium** : tentation de partir sur du très fantaisiste (style *Dazed*, *Kaleidoscope*). Rester dans l'éditorial classique — on veut que ça vieillisse bien, pas que ça fasse 2026.

---

## Critical files (cartographie du code)

Pour retrouver les choses rapidement :

```
src/
├── content/copy.ts                 ← tout le texte éditorial (FR + EN, à traduire ensuite)
├── i18n/{config,ui}.ts             ← structure multi-langues, strings UI
├── layouts/Base.astro              ← HTML shell + meta + fonts
├── styles/{tokens,global}.css      ← palette + typo + composants
├── pages/
│   ├── index.astro                 ← redirect → /fr/
│   └── [locale]/
│       ├── index.astro             ← orchestrateur one-pager
│       ├── galerie.astro           ← lightbox
│       └── mentions-legales.astro
└── components/
    ├── Hero.astro                  ← à remplacer par vraie vidéo (Mux/CF Stream)
    ├── Prologue, ThePlace, TheApartment (+ RoomScroller.tsx),
    │   Materials, ArtOfLiving, Seasons, Reserve, Concierge, Footer.astro
    ├── BookingCTA.astro            ← CTA Airbnb (URL via PUBLIC_AIRBNB_URL)
    ├── ConciergeForm.tsx           ← fallback mailto, à brancher sur Resend
    ├── Lightbox.tsx                ← galerie keyboard
    ├── LanguageSwitcher.tsx        ← 7 langues, 2 actives
    ├── SmoothScrollProvider.tsx    ← Lenis
    ├── ChapterReveal.tsx           ← GSAP ScrollTrigger
    └── ScrollProgress.astro        ← barre or de progression
```

---

## Le nord

On ne fait pas un site de location. On fait un **objet de désir** qui, quand on le partage en DM à un ami fortuné, lui donne envie de payer 20k€ la semaine pour voir St-Tropez d'en face, dans des draps en lin lavé, avec une cafetière en laiton qui chauffe dans une cuisine en marbre.

Tout ce qui ne sert pas cet objectif, on le coupe.
