# L'Arbois — Roadmap de mise en ligne

> Site vitrine pour la location de **L'Arbois**, appartement privé à **Sainte-Maxime, face à Saint-Tropez**.
> Cible : UHNW internationale · Réservation : redirection Airbnb (CTA principal) + conciergerie privée (CTA secondaire).
> Stack : Astro 5 · React islands · Tailwind v4 · GSAP/Lenis · npm · adapter Vercel.

---

## 0. État actuel (snapshot)

| | Statut |
|---|---|
| Build production | ✅ 22 pages, 0 erreur, ~12 s |
| Type-check Astro | ✅ 0 erreur, 0 warning |
| i18n | ✅ 7 locales (fr, en, it, de, es, ru, ar) — fr/en complets, autres en fallback EN |
| SEO on-page | ✅ titres + meta + OG + JSON-LD + hreflang + sitemap |
| Données réelles Airbnb | ✅ 2 ch · 4 voy · 1 king + 2 simples · 2,5 SDB · à partir de 348 €/nuit (frais inclus) · -20 % au-delà de 7 nuits |
| Lien Airbnb | ✅ fallback en dur sur `/rooms/1162242524645326844` |
| Robots / Sitemap | ✅ `robots.txt` + sitemap multilingue |
| 404 personnalisée | ✅ `/src/pages/404.astro` |

---

## 1. Bloquants Go-Live (à finir AVANT Vercel)

### 1.1 Contenu visuel pro
- [ ] **Shooting photo professionnel** (intérieur + extérieur + détails matières) — remplace les photos placeholder dans `src/assets/images/`. Conserver les noms de fichiers (`salon-view.jpg`, `terrace-view.jpg`, etc.) ou mettre à jour `src/content/images.ts`.
- [ ] **Vidéo drone 4K** (golfe + façade + toit-terrasse) — héberger via Mux ou Cloudflare Stream (HLS adaptatif), brancher dans `src/components/Hero.astro` à la place du fond CSS.
- [ ] **Vidéo intérieure** (parcours 30-45 s) — même pipeline, idéale pour le chapitre IV (l'appartement).

### 1.2 Image OG sociale
- [ ] **`/public/og.jpg`** (1200 × 630, JPG/PNG, < 200 KB) → remplace le `og.svg` placeholder actuel.
  - Scène recommandée : terrasse à l'heure dorée + Saint-Tropez en arrière-plan + filigrane "L'Arbois".
  - Une fois en place, repasser `ogImage = "/og.jpg"` dans `src/layouts/Base.astro` et `image` dans `src/components/StructuredData.astro`.

### 1.3 Branding & légal
- [ ] **Domaine définitif** (ex. `larbois.com`) → mettre à jour `astro.config.mjs:10` (`site:`) + `public/robots.txt` (URL du sitemap).
- [ ] **Email pro conciergerie** (ex. `concierge@larbois.com` via Google Workspace) → remplacer `concierge@larbois.example` dans `src/components/Footer.astro:25` et `src/components/ConciergeForm.tsx:36`.
- [ ] **Mentions légales** (`src/pages/[locale]/mentions-legales.astro`) — compléter "Éditeur du site", "Hébergement", SIRET, RCS, etc.
- [ ] **Politique de confidentialité** (RGPD) — créer `src/pages/[locale]/confidentialite.astro` si conciergerie collecte des données.
- [ ] **Bannière cookies** (si analytics tiers ajoutés) — Plausible/Vercel Analytics évitent le besoin ; GA4 le requiert.

### 1.4 Traductions pro
- [ ] **Italien** — actuellement fallback EN dans `copy.ts`, `ui.ts`, `galerie.astro`, `mentions-legales.astro`.
- [ ] **Allemand** — idem.
- [ ] **Espagnol** — idem.
- [ ] **Russe** — meta descriptions et titres déjà traduits dans `index.astro` + `StructuredData.astro` ; à compléter sur `copy.ts` et `ui.ts`.
- [ ] **Arabe** — idem ; vérifier le rendu RTL (déjà géré via `dir="rtl"` sur `<html>`).

### 1.5 Tarifs saisonniers
- [ ] **Compléter la grille** dans `src/content/copy.ts` (FR + EN), section `seasons.items` :
  - Été (juillet-août) : tarif réel ou range
  - Arrière-saison (septembre) : tarif réel
  - Hiver (octobre-mars) : "Sur demande" OK ou tarif baseline
- [ ] Vérifier alignement avec la grille Airbnb réelle (frais inclus/exclus).

---

## 2. Déploiement Vercel (le jour J)

### 2.1 Préparation repo
- [ ] Vérifier `npm run build` local → 0 erreur, `dist/` produit
- [ ] Commit + push sur `main`

### 2.2 Vercel
- [ ] Connecter le repo GitHub à Vercel
- [ ] Framework preset : **Astro** (auto-détecté)
- [ ] Build command : `npm run build` (par défaut)
- [ ] Output directory : auto (Astro adapter Vercel)
- [ ] **Variables d'environnement** :
  - `PUBLIC_AIRBNB_URL` = `https://www.airbnb.fr/rooms/1162242524645326844` *(facultatif si fallback en dur OK ; utile pour ajouter UTM)*
- [ ] Domaine custom + DNS (Vercel guide automatiquement)
- [ ] Forcer HTTPS (automatique)

### 2.3 Post-déploiement (J+0 → J+3)
- [ ] **Google Search Console** — ajouter le domaine, vérifier la propriété, **soumettre `sitemap-index.xml`**
- [ ] **Bing Webmaster Tools** (5 % du trafic, mais utile pour l'AI search)
- [ ] **Test OG/Twitter Card** : https://opengraph.xyz/ ou https://cards-dev.twitter.com/validator
- [ ] **PageSpeed Insights** mobile + desktop (cible LCP < 2,5 s, CLS < 0,1)
- [ ] **Lighthouse SEO** ≥ 95
- [ ] **Test Rich Results** (JSON-LD `LodgingBusiness`) : https://search.google.com/test/rich-results

---

## 3. SEO & acquisition (J+7 → J+90)

### 3.1 Cohérence sémantique (déjà en place)
Pyramide de mots-clés cohérente sur titles + descriptions + JSON-LD + alt images :
- **Brand** : L'Arbois
- **Intent** : location appartement / luxury rental
- **Geo** : Sainte-Maxime, golfe de Saint-Tropez, Côte d'Azur
- **USP** : Art Déco 1933, face à Saint-Tropez, vue baie, 2 chambres
- **Long-tail** : location semaine golfe Saint-Tropez, appartement vue mer Sainte-Maxime

### 3.2 Backlinks & autorité (priorité)
- [ ] **Google Business Profile** "L'Arbois Sainte-Maxime" — fiche locale, photos, lien site (ranking local)
- [ ] **Annuaires premium** : Welcome Beyond, Plum Guide, Le Collectionist (sélection éditoriale)
- [ ] **Presse design / lifestyle** : pitcher AD France, The Socialite Family, Cabana Magazine, Vogue Living (déjà cités dans `voices.press_items` du copy — à transformer en vraies retombées)
- [ ] **Office de Tourisme Sainte-Maxime** : demander listing partenaire
- [ ] **Architectes/historiens Art Déco** : article sur L'Arbois × Latitude 43 (le récit du jumeau Pingusson est un pitch presse fort)

### 3.3 Contenu de soutien (optionnel, V2)
- [ ] Page éditoriale "Histoire de L'Arbois × Latitude 43" — long-form sur l'architecture moderniste 1933
- [ ] Page "Que faire à Sainte-Maxime" — sert le long-tail local (utiliser le contenu `art_of_living.pois`)
- [ ] Pages saison "Louer un appartement à Saint-Tropez en juillet/août" — long-tail saisonnier

### 3.4 Mesure
- [ ] **Analytics** — recommander **Vercel Analytics** (gratuit, sans cookies, RGPD-friendly) ou **Plausible** (~9 €/mois, plus complet)
- [ ] **Event tracking** : clic CTA Airbnb, soumission formulaire conciergerie, scroll-depth chapitre X
- [ ] **A/B test** baseline / titres / image hero une fois 1k+ visites/mois

---

## 4. Améliorations produit (post-launch, V1.1)

### 4.1 Conciergerie
- [ ] **Endpoint serveur** pour le formulaire (actuellement fallback `mailto:`) :
  - Option A : Vercel Function + Resend / Sendgrid
  - Option B : Formspree / Basin
- [ ] **CRM/inbox** : Notion + Slack notification, ou HubSpot Free
- [ ] **Réponse automatique** sous 60 s en 7 langues
- [ ] **Calendly / Cal.com** intégré pour appel conciergerie

### 4.2 Réservation
- [ ] **Widget calendrier dispo** Airbnb (officiel, JS embed) — à tester sur le chapitre X uniquement, pas en hero, pour préserver la DA
- [ ] **UTM tracking** sur l'URL Airbnb : `?source=larbois-website&utm_medium=referral&utm_campaign=hero`
- [ ] **Conciergerie privée = direct booking** (économie sur les frais Airbnb 15 %) — page dédiée si la conciergerie devient un canal volumineux

### 4.3 Accessibilité & perf
- [ ] **Audit a11y** complet (axe DevTools) : focus rings, contrastes, `aria-labels`, navigation clavier
- [ ] **Lazy-load** vidéos (Intersection Observer + poster image)
- [ ] **`prefers-reduced-motion`** déjà respecté dans `ChapterReveal.tsx` ✅
- [ ] **Image LCP** : preload `dining-view` ou `terrace-view` (hero) en `fetchpriority="high"`

### 4.4 Polish UI
- [ ] **Favicon** : monogramme doré L'Arbois (remplace le `favicon.svg` actuel)
- [ ] **Apple Touch Icon** (180×180 PNG) → `/public/apple-touch-icon.png` + `<link rel="apple-touch-icon">`
- [ ] **PWA manifest** (`/public/manifest.webmanifest`) si home-screen iOS souhaité
- [ ] **Microcopy hover** sur les POI de la carte (chapitre VI) — déjà nickel, mais à retester sur mobile

---

## 5. Maintenance (recurrent)

| Cadence | Action |
|---|---|
| Mensuel | Vérifier Search Console (impressions, CTR, requêtes top, erreurs d'indexation) |
| Mensuel | Vérifier Vercel Analytics (visites, sources, taux de clic CTA Airbnb) |
| Trimestriel | Mettre à jour la grille tarifs saisonniers dans `copy.ts` |
| Trimestriel | Renouveler les commentaires (`copy.ts > voices.testimonials`) avec les vrais retours |
| Annuel | Refresh contenu : nouvelle photo hero + 2-3 chapitres rafraîchis |
| Annuel | Audit Lighthouse complet (perf + a11y + SEO) |
| Annuel | Renouvellement domaine + Google Workspace |

---

## 6. Pistes V2 (12+ mois)

- [ ] **Site jumeau** pour un 2ᵉ bien si l'opération s'étend (factoriser `copy.ts` en CMS Contentlayer ou Sanity)
- [ ] **Multi-property concierge** branding "L'Arbois Collection"
- [ ] **AI concierge chat** (Claude API) en sidebar — répond aux FAQ avant le formulaire (reduce time-to-quote)
- [ ] **Membership / repeat-guest** programme (codes promo conciergerie)
- [ ] **Location longue durée** hors saison (octobre-mars) avec tarif mensuel dédié

---

## Ordre d'exécution recommandé

```
Semaine 1   →  1.1 Shooting + 1.2 OG + 1.3 Domaine/Email
Semaine 2   →  1.4 Traductions IT/DE/ES + 1.5 Tarifs
Semaine 3   →  Build final + 2. Vercel deploy
Semaine 4   →  3.1-3.2 Search Console + GBP + premiers backlinks
M+2         →  4.1 Endpoint formulaire + analytics events
M+3         →  Audit perf/a11y + polish (4.3, 4.4)
M+6         →  3.3 Contenu de soutien + 4.2 widget Airbnb
```

**Bloquants minimum pour go-live propre** : 1.2 (og.jpg), 1.3 (domaine + email), 2 (Vercel).
Le reste peut suivre par itérations sans embarras.
