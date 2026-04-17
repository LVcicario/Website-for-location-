import type { Locale } from "~/i18n/config";

export type RoomCopy = {
  label: string;
  title: string;
  body: string;
};

export type MaterialCopy = {
  label: string;
  note: string;
  image: string;
};

export type Transport = "foot" | "boat" | "car";

export type PoiCopy = {
  name: string;
  kind: string;
  distance: string;
  access: string;
  activities: string;
  transport: Transport;
  mapX: number;
  mapY: number;
};

export type SeasonCopy = {
  label: string;
  window: string;
  note: string;
  price: string;
  image: string;
};

export type AmenityCopy = {
  label: string;
  icon: string;
};

export type TestimonialCopy = {
  quote: string;
  author: string;
};

export type BuildingTimelineItem = {
  year: string;
  label: string;
  detail: string;
};

export type ChapterCopy = {
  hero: {
    eyebrow: string;
    title_line_1: string;
    title_line_2: string;
    baseline: string;
  };
  prologue: {
    index: string;
    eyebrow: string;
    text: string;
    signature: string;
  };
  the_place: {
    index: string;
    eyebrow: string;
    title: string;
    body: string;
    coordinates: string;
    landmarks: {
      villa: string;
      dock: string;
      twin: string;
      boat: string;
    };
  };
  the_building: {
    index: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    body_1: string;
    body_2: string;
    body_3: string;
    quote: string;
    labels: {
      architect: string;
      twin: string;
      listed: string;
    };
    timeline: BuildingTimelineItem[];
  };
  the_apartment: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    rooms: RoomCopy[];
  };
  materials: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    items: MaterialCopy[];
  };
  art_of_living: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    labels: {
      access: string;
      activities: string;
      by_foot: string;
      by_boat: string;
      by_car: string;
    };
    pois: PoiCopy[];
  };
  amenities: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    capacity: {
      rooms: string;
      guests: string;
      beds: string;
      baths: string;
      min_stay: string;
    };
    stat_bar: { value: string; label: string }[];
    included: AmenityCopy[];
    services_included_label: string;
    services_on_demand_label: string;
    services_included: string[];
    services_on_demand: string[];
    equipment_label: string;
  };
  seasons: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    minimum_stay: string;
    items: SeasonCopy[];
  };
  voices: {
    index: string;
    eyebrow: string;
    title: string;
    intro: string;
    testimonials: TestimonialCopy[];
    press_label: string;
    press_items: string[];
  };
  reserve: {
    index: string;
    eyebrow: string;
    title: string;
    body: string;
    stats: { value: string; label: string }[];
  };
  breath_1: string;
  breath_2: string;
  signature: string;
};

const fr: ChapterCopy = {
  hero: {
    eyebrow: "Sainte-Maxime · Golfe de Saint-Tropez",
    title_line_1: "Face",
    title_line_2: "à Saint-Tropez",
    baseline: "Un appartement privé à Sainte-Maxime, de l'autre côté de la baie.",
  },
  prologue: {
    index: "I",
    eyebrow: "Prologue",
    text:
      "On vient ici pour regarder Saint-Tropez changer d'heure en heure, depuis l'autre rive. Un silence de pierre blanche, la lumière de cinq heures, l'air qui sent le pin et l'iode. Sainte-Maxime tient la meilleure place de la baie.",
    signature: "Villa Azur",
  },
  the_place: {
    index: "II",
    eyebrow: "Chapitre II — Le lieu",
    title: "De l'autre côté du golfe, la meilleure place",
    body:
      "Sainte-Maxime, rive nord du golfe. L'appartement ouvre ses terrasses plein sud. De l'autre côté de l'eau, Saint-Tropez tient la lumière du matin au soir. Les navettes Bateaux Verts partent à deux cents mètres à pied, toutes les trente minutes en haute saison — quinze minutes de traversée, la baie franchie.",
    coordinates: "43.31° N · 6.64° E",
    landmarks: {
      villa: "Villa Azur · L'Arbois",
      dock: "Jetée · Bateaux Verts · 200 m à pied",
      twin: "Latitude 43 · le jumeau paquebot",
      boat: "15 min · bateau",
    },
  },
  the_building: {
    index: "III",
    eyebrow: "Chapitre III — L'immeuble",
    title: "L'Arbois, côté nord. Latitude 43, côté sud.",
    subtitle: "Un dialogue de paquebots, depuis 1933.",
    body_1:
      "Sainte-Maxime, janvier 1933. Jean Gianotti, Parisien, commande à René Darde — architecte-urbaniste de la ville — un hôtel d'une autre espèce. L'Arbois ouvre en 1935 : façade courbe, balcons filants, verticalité d'un seul trait de béton. Le Grand Hôtel et son restaurant, La Tartane, deviennent une adresse.",
    body_2:
      "En face, Saint-Tropez, 1932. Georges-Henri Pingusson a livré un an plus tôt le Latitude 43 — un paquebot échoué de cent mètres, cent chambres, un casino, une piscine. L'Arbois a probablement été dessiné en écho : plus compact, plus retenu, mais du même mouvement moderne. L'un a inspiré l'autre ; ils se regardent.",
    body_3:
      "Après la guerre, les deux paquebots deviennent des résidences. Ils continuent à se faire face à travers le golfe, témoins d'une Côte d'Azur qui n'a jamais fini de se rêver. L'Arbois est aujourd'hui labellisé Architecture Contemporaine Remarquable.",
    quote: "Elles se regardent depuis un siècle.",
    labels: {
      architect: "Architecte · René Darde (1933)",
      twin: "Jumeau · Latitude 43 · Georges-Henri Pingusson (1932) · Saint-Tropez",
      listed: "Labellisé Architecture Contemporaine Remarquable",
    },
    timeline: [
      { year: "1930–32", label: "Latitude 43", detail: "Pingusson livre son paquebot moderniste à Saint-Tropez" },
      { year: "Janv. 1933", label: "Chantier L'Arbois", detail: "Jean Gianotti commande à René Darde l'hôtel face au golfe" },
      { year: "1935", label: "Inauguration", detail: "Grand Hôtel L'Arbois · restaurant La Tartane" },
      { year: "1945 →", label: "Résidences", detail: "Les deux paquebots deviennent des appartements ; ils se regardent toujours" },
    ],
  },
  the_apartment: {
    index: "IV",
    eyebrow: "Chapitre IV — L'appartement",
    title: "Trois chambres, un salon, une vue",
    intro:
      "Murs blancs, parquet bois chaud, meubles bleu marine, éclairages dorés. Une écriture contemporaine, retenue, tenue par les matières.",
    rooms: [
      { label: "Entrée", title: "Le seuil", body: "Un couloir clair, une console de laiton, une sculpture discrète. Le ton est donné avant même d'avoir posé ses bagages." },
      { label: "Salon", title: "Le grand volume", body: "Des canapés bleu marine faits sur mesure, un tapis de laine écrue, une cheminée de marbre. La baie est toujours au fond, comme un tableau qui change d'heure en heure." },
      { label: "Cuisine", title: "La table de famille", body: "Marbre blanc veiné, robinetterie dorée, four professionnel. De quoi recevoir six convives comme on reçoit à la maison — avec simplicité." },
      { label: "Chambre principale", title: "La chambre d'honneur", body: "Lit king-size, tête de lit capitonnée bleu nuit, dressing attenant, salle de bain en marbre. Les volets s'ouvrent plein sud, sur la baie." },
      { label: "Chambres d'hôtes", title: "Deux chambres d'hôtes", body: "Chacune avec sa salle de bain privative, son linge de maison en lin lavé, son calme. Pour ceux qu'on aime, rien de moins." },
      { label: "Terrasse", title: "La terrasse sud", body: "Une grande table en teck, des bains de soleil, un coin d'ombre. Saint-Tropez en filigrane toute la journée, ses lampes qui s'allument à la nuit. Les soirées s'éternisent." },
    ],
  },
  materials: {
    index: "V",
    eyebrow: "Chapitre V — Matières",
    title: "La grammaire du lieu",
    intro:
      "Quatre matières, tenues par une palette : blanc, or, bleu marine, bois. Rien de plus, rien de moins.",
    items: [
      { label: "Marbre blanc veiné", note: "Cuisine, salles de bain, cheminée.", image: "primary-bathroom" },
      { label: "Laiton brossé doré", note: "Robinetterie, luminaires, patines mates.", image: "bathroom-gold" },
      { label: "Parquet chêne massif", note: "Lames larges, chevrons, huile naturelle.", image: "salon-window" },
      { label: "Velours bleu marine", note: "Canapés, têtes de lit — sur mesure.", image: "guest-bedroom-b" },
      { label: "Chaux blanche", note: "Murs qui respirent la lumière de la côte.", image: "salon-view" },
      { label: "Granit & damier", note: "Le hall Art Déco de l'immeuble.", image: "building-stairs" },
    ],
  },
  art_of_living: {
    index: "VI",
    eyebrow: "Chapitre VI — L'art de vivre",
    title: "À pied, en bateau, en voiture",
    intro:
      "La vie de Sainte-Maxime à quelques pas, Saint-Tropez à un quart d'heure de bateau, l'arrière-pays à vingt minutes. Cliquez chaque adresse — sur la carte ou dans la liste — pour savoir comment y aller, quoi y faire.",
    labels: {
      access: "Comment y aller",
      activities: "Quoi y faire",
      by_foot: "À pied",
      by_boat: "En bateau",
      by_car: "En voiture",
    },
    pois: [
      {
        name: "La Croisette",
        kind: "Promenade, port, yachts",
        distance: "2 min à pied",
        access: "À la sortie de L'Arbois, tournez à gauche sur le front de mer ombragé.",
        activities: "Promenade sous les pins parasols, port de plaisance, terrasses de café, glaciers artisanaux, bars à cocktails au crépuscule.",
        transport: "foot",
        mapX: 170,
        mapY: 172,
      },
      {
        name: "Plage de la Nartelle",
        kind: "Sable blanc, pieds dans l'eau",
        distance: "7 min à pied",
        access: "Suivez le front de mer à l'est, puis le sentier littoral. Navette gratuite en été.",
        activities: "Sable fin, eau calme (idéale enfants), paillotes de plage (Mahi Plage, La Gaillarde), paddle, transats, déjeuner les pieds dans le sable.",
        transport: "foot",
        mapX: 295,
        mapY: 163,
      },
      {
        name: "Marché couvert",
        kind: "Produits de Provence · mardi & samedi",
        distance: "5 min à pied",
        access: "Par la rue Gabriel Péri, derrière l'église. Mardi et samedi matin, 7h–13h.",
        activities: "Fromages fermiers, poissons du matin, fruits de saison, fleurs, huile d'olive du Var, tapenades, rosé local.",
        transport: "foot",
        mapX: 155,
        mapY: 108,
      },
      {
        name: "Le Sémaphore",
        kind: "Point de vue sur tout le golfe",
        distance: "20 min à pied",
        access: "Montée par le sentier du littoral, derrière la Nartelle. Prévoir des chaussures fermées.",
        activities: "Panorama complet sur le golfe de Saint-Tropez, les meilleurs couchers de soleil, aire de pique-nique.",
        transport: "foot",
        mapX: 320,
        mapY: 90,
      },
      {
        name: "Sénéquier · Saint-Tropez",
        kind: "Café iconique du port",
        distance: "15 min en bateau",
        access: "Navettes Bateaux Verts depuis la jetée de Sainte-Maxime (200 m à pied de L'Arbois). Toutes les 30 min en haute saison. Ou taxi-boat privé sur demande de la conciergerie.",
        activities: "Institution depuis 1887. Terrasse rouge vif sur le port, petit-déjeuner matinal, apéritif au coucher du soleil, le meilleur poste d'observation des yachts.",
        transport: "boat",
        mapX: 210,
        mapY: 365,
      },
      {
        name: "Place des Lices",
        kind: "Pétanque, platanes, marché",
        distance: "15 min bateau + 3 min à pied",
        access: "Descendez des Bateaux Verts au port, remontez la rue Gambetta sur 300 m. Marché mardi & samedi.",
        activities: "Pétanque sous les platanes centenaires, marché provençal, terrasses à l'ombre, Le Café (brasserie historique), boutiques de créateurs.",
        transport: "boat",
        mapX: 195,
        mapY: 395,
      },
      {
        name: "Plage de Pampelonne",
        kind: "Club 55, Loulou, La Réserve, Nikki Beach",
        distance: "25 min bateau ou 40 min voiture",
        access: "Taxi-boat privé jusqu'au ponton Club 55 ou Loulou (réservation conciergerie). Ou voiture par la route des plages via Ramatuelle.",
        activities: "Déjeuners longs au Club 55, bains de soleil Loulou, cocktails Nikki Beach. Eau turquoise, sortie en annexe, ski nautique.",
        transport: "boat",
        mapX: 360,
        mapY: 430,
      },
      {
        name: "Ramatuelle & Gassin",
        kind: "Villages perchés, vignobles",
        distance: "30 min en voiture",
        access: "Voiture par la D61 via Port Grimaud et La Foux. Parking en bas des villages.",
        activities: "Villages médiévaux, ruelles ombragées, vignobles (Château Minuty, Domaines Ott), restaurants avec vue. Dégustations sur réservation.",
        transport: "car",
        mapX: 305,
        mapY: 455,
      },
    ],
  },
  amenities: {
    index: "VII",
    eyebrow: "Chapitre VII — Équipements & services",
    title: "Ce qui est compris, ce qui se demande",
    intro: "Trois chambres, six voyageurs, ce qu'il faut pour recevoir — et ce qui se dit à l'oreille de la conciergerie.",
    capacity: {
      rooms: "3 chambres",
      guests: "6 voyageurs",
      beds: "1 king-size · 2 lits jumeaux · 2 lits jumeaux",
      baths: "2 salles de bain",
      min_stay: "7 nuits minimum",
    },
    stat_bar: [
      { value: "3", label: "chambres" },
      { value: "6", label: "voyageurs" },
      { value: "2", label: "salles de bain" },
      { value: "7", label: "nuits min" },
    ],
    equipment_label: "Équipements",
    services_included_label: "Inclus",
    services_on_demand_label: "Sur demande · Conciergerie",
    included: [
      { label: "WiFi fibre haut débit", icon: "wifi" },
      { label: "Climatisation réversible", icon: "climate" },
      { label: "Parking privé", icon: "parking" },
      { label: "Ascenseur", icon: "elevator" },
      { label: "Lave-linge & sèche-linge", icon: "washer" },
      { label: "Lave-vaisselle", icon: "dishwasher" },
      { label: "Four professionnel + micro-ondes", icon: "oven" },
      { label: "Machine Nespresso", icon: "coffee" },
      { label: "TV 4K · chaîne hi-fi Bluetooth", icon: "tv" },
      { label: "Sèche-cheveux haut de gamme", icon: "hair" },
      { label: "Coffre-fort", icon: "safe" },
      { label: "Linge de maison premium", icon: "linen" },
    ],
    services_included: [
      "Ménage à l'arrivée et au départ",
      "Linge de maison et de bain",
      "Kit d'accueil (huile d'olive, confiture, vin local)",
      "Assistance check-in personnalisée",
    ],
    services_on_demand: [
      "Chef privé (menu sur mesure)",
      "Baby-sitter, gouvernante",
      "Transferts voiture ou taxi-boat",
      "Location de bateau (avec ou sans skipper)",
      "Réservations restaurants, plages, golfs",
      "Ménage quotidien en option",
    ],
  },
  seasons: {
    index: "VIII",
    eyebrow: "Chapitre VIII — Saisons & tarifs",
    title: "Quatre saisons, quatre atmosphères",
    intro:
      "La haute saison brille, les entre-saisons appartiennent aux initiés. Tarifs indicatifs, sur la base de la semaine.",
    minimum_stay: "Séjour minimum : 7 nuits.",
    items: [
      { label: "Printemps", window: "Avril — Juin", note: "Mimosa, mistral doux, village encore calme.", price: "3 500 € – 5 500 € / semaine", image: "terrace-view" },
      { label: "Été", window: "Juillet — Août", note: "Haute saison, yachts dans la baie, Pampelonne à son apogée.", price: "9 500 € – 15 000 € / semaine", image: "dining-view" },
      { label: "Arrière-saison", window: "Septembre", note: "Voiles de Saint-Tropez, lumière dorée, eau encore chaude.", price: "5 500 € – 8 500 € / semaine", image: "salon-window" },
      { label: "Hiver", window: "Octobre — Mars", note: "Sur demande, pour les séjours privés.", price: "Sur demande", image: "building-exterior" },
    ],
  },
  voices: {
    index: "IX",
    eyebrow: "Chapitre IX — Voix",
    title: "Ce que disent ceux qui sont venus",
    intro: "Quelques mots, laissés avec pudeur, après un séjour.",
    testimonials: [
      { quote: "Un silence qu'on n'imagine plus — et pourtant, Saint-Tropez en face. Le genre de semaine qui recadre une année.", author: "L., juin 2025" },
      { quote: "La lumière change d'heure en heure. On ne bouge pas de la terrasse. Les enfants se sont endormis au son des cigales.", author: "M. & P., août 2024" },
      { quote: "Le bateau jusqu'au Sénéquier : quinze minutes, pas de foule. On revient dîner à la maison. Rare.", author: "C., septembre 2025" },
    ],
    press_label: "Tel que vu dans",
    press_items: ["AD France", "Vogue Living", "The Socialite Family", "Cabana Magazine"],
  },
  reserve: {
    index: "X",
    eyebrow: "Chapitre X — Réserver",
    title: "Votre séjour, à votre rythme",
    body:
      "La réservation se fait sur Airbnb, ou directement auprès de notre conciergerie privée pour les séjours sur mesure.",
    stats: [
      { value: "3", label: "chambres" },
      { value: "6", label: "voyageurs" },
      { value: "180°", label: "de baie" },
      { value: "15′", label: "de St-Tropez en bateau" },
    ],
  },
  breath_1: "Elle brille aussi,<br/><em>quand on ne la regarde pas.</em>",
  breath_2: "Ici, on <em>regarde</em>.<br/>On n'est pas regardé.",
  signature: "— Villa Azur",
};

const en: ChapterCopy = {
  hero: {
    eyebrow: "Sainte-Maxime · Gulf of Saint-Tropez",
    title_line_1: "Across",
    title_line_2: "from Saint-Tropez",
    baseline: "A private apartment in Sainte-Maxime, on the quieter side of the bay.",
  },
  prologue: {
    index: "I",
    eyebrow: "Prologue",
    text:
      "One comes here to watch Saint-Tropez change hour by hour, from the other shore. The silence of white stone, the slow five o'clock light, air scented with pine and salt. Sainte-Maxime holds the finest seat in the bay.",
    signature: "Villa Azur",
  },
  the_place: {
    index: "II",
    eyebrow: "Chapter II — The place",
    title: "Across the gulf, the finest seat",
    body:
      "Sainte-Maxime, northern shore of the gulf. The apartment's terraces face due south. Across the water, Saint-Tropez catches the light from morning to nightfall. The Bateaux Verts shuttles leave from the jetty, two hundred metres on foot, every thirty minutes in high season — a fifteen-minute crossing.",
    coordinates: "43.31° N · 6.64° E",
    landmarks: {
      villa: "Villa Azur · L'Arbois",
      dock: "Jetty · Bateaux Verts · 200 m walk",
      twin: "Latitude 43 · the ocean-liner twin",
      boat: "15 min · by boat",
    },
  },
  the_building: {
    index: "III",
    eyebrow: "Chapter III — The building",
    title: "L'Arbois, north side. Latitude 43, south side.",
    subtitle: "A dialogue of ocean-liners since 1933.",
    body_1:
      "Sainte-Maxime, January 1933. Jean Gianotti, a Parisian patron, commissions from René Darde — the town's architect-urbanist — a hotel of another kind. L'Arbois opens in 1935: curved façade, ribbon balconies, the whole vertical held by a single stroke of concrete. The Grand Hôtel and its restaurant, La Tartane, become an address.",
    body_2:
      "Across the water, Saint-Tropez, 1932. Georges-Henri Pingusson had delivered, a year earlier, the Latitude 43 — a beached ocean-liner of a hundred metres, a hundred rooms, a casino, a pool. L'Arbois was very likely drawn in reply: more compact, more restrained, but of the same Modern Movement. One inspired the other; they face each other.",
    body_3:
      "After the war, the two ocean-liners became residences. They still face each other across the gulf, witnesses to a Riviera that has never finished dreaming itself. L'Arbois is today listed as Architecture Contemporaine Remarquable.",
    quote: "They have been looking at each other for a century.",
    labels: {
      architect: "Architect · René Darde (1933)",
      twin: "Twin · Latitude 43 · Georges-Henri Pingusson (1932) · Saint-Tropez",
      listed: "Listed Architecture Contemporaine Remarquable",
    },
    timeline: [
      { year: "1930–32", label: "Latitude 43", detail: "Pingusson delivers his modernist liner in Saint-Tropez" },
      { year: "Jan 1933", label: "L'Arbois begins", detail: "Jean Gianotti commissions René Darde with the hotel facing the gulf" },
      { year: "1935", label: "Inauguration", detail: "Grand Hôtel L'Arbois · restaurant La Tartane" },
      { year: "1945 →", label: "Residences", detail: "Both liners become apartments; they still face each other" },
    ],
  },
  the_apartment: {
    index: "IV",
    eyebrow: "Chapter IV — The apartment",
    title: "Three bedrooms, one living room, one view",
    intro:
      "White walls, warm wooden floors, deep navy furniture, gilded light. A quiet contemporary hand, held by its materials.",
    rooms: [
      { label: "Entrance", title: "The threshold", body: "A bright hallway, a brass console, a discreet sculpture. The tone is set before you have even set down your bags." },
      { label: "Living room", title: "The open volume", body: "Custom navy sofas, a cream wool rug, a marble fireplace. The bay is always there at the back, changing with the hours." },
      { label: "Kitchen", title: "The family table", body: "Veined white marble, brass fittings, professional oven. Enough to host six guests as one would at home — with quiet generosity." },
      { label: "Primary bedroom", title: "The principal suite", body: "King-size bed, navy upholstered headboard, adjoining dressing room, marble bathroom. The shutters open due south, onto the bay." },
      { label: "Guest bedrooms", title: "Two guest rooms", body: "Each with its own bathroom, washed linen sheets, its own quiet. For those you love, nothing less." },
      { label: "Terrace", title: "The south terrace", body: "A long teak table, sun loungers, a shaded corner. Saint-Tropez traced across the water all day long, its lamps lighting up at dusk. Evenings last until the night." },
    ],
  },
  materials: {
    index: "V",
    eyebrow: "Chapter V — Materials",
    title: "The grammar of the place",
    intro:
      "Four materials, held by a single palette: white, gold, navy, wood. Nothing more, nothing less.",
    items: [
      { label: "Veined white marble", note: "Kitchen, bathrooms, fireplace.", image: "primary-bathroom" },
      { label: "Brushed brass", note: "Fittings, lighting, matte patinas.", image: "bathroom-gold" },
      { label: "Solid oak parquet", note: "Wide planks, herringbone, natural oil.", image: "salon-window" },
      { label: "Navy velvet", note: "Sofas, headboards — made to measure.", image: "guest-bedroom-b" },
      { label: "Lime-washed walls", note: "Walls that breathe the coast light.", image: "salon-view" },
      { label: "Granite & chessboard", note: "The Art Déco hall of the building.", image: "building-stairs" },
    ],
  },
  art_of_living: {
    index: "VI",
    eyebrow: "Chapter VI — Art of living",
    title: "On foot, by boat, by car",
    intro:
      "Life in Sainte-Maxime a few steps away, Saint-Tropez fifteen minutes by boat, the hinterland twenty minutes inland. Click each address — on the map or in the list — for how to get there and what to do.",
    labels: {
      access: "Getting there",
      activities: "What to do",
      by_foot: "On foot",
      by_boat: "By boat",
      by_car: "By car",
    },
    pois: [
      { name: "La Croisette", kind: "Seafront promenade, port, yachts", distance: "2 min walk", access: "Step out of L'Arbois, turn left along the shaded seafront.", activities: "Promenade under umbrella pines, marina, café terraces, artisanal ice cream, sunset cocktail bars.", transport: "foot", mapX: 170, mapY: 172 },
      { name: "Nartelle beach", kind: "White sand, steps from the water", distance: "7 min walk", access: "Walk east along the seafront then the coastal path. Free shuttle in summer.", activities: "Fine sand, calm water (ideal for children), beach clubs (Mahi Plage, La Gaillarde), paddle, loungers, lunch on the sand.", transport: "foot", mapX: 295, mapY: 163 },
      { name: "Covered market", kind: "Provence produce · Tue & Sat", distance: "5 min walk", access: "Via Rue Gabriel Péri, behind the church. Tuesday & Saturday mornings, 7–13h.", activities: "Farm cheeses, morning-catch fish, seasonal fruit, flowers, local olive oil, tapenades, rosé.", transport: "foot", mapX: 155, mapY: 108 },
      { name: "Le Sémaphore", kind: "Viewpoint over the entire gulf", distance: "20 min walk", access: "Coastal path above Nartelle. Wear closed shoes.", activities: "Full panorama of the gulf, the finest sunsets, picnic area.", transport: "foot", mapX: 320, mapY: 90 },
      { name: "Sénéquier · Saint-Tropez", kind: "Iconic café on the port", distance: "15 min by boat", access: "Bateaux Verts from the Sainte-Maxime jetty (200 m walk from L'Arbois). Every 30 min in high season. Or private taxi-boat through the concierge.", activities: "Institution since 1887. Vivid red terrace on the port, early breakfast, sunset apéritif, the finest yacht-watching seat.", transport: "boat", mapX: 210, mapY: 365 },
      { name: "Place des Lices", kind: "Pétanque, plane trees, market", distance: "15 min boat + 3 min walk", access: "Off the Bateaux Verts at the port, 300 m up Rue Gambetta. Market Tuesday & Saturday.", activities: "Pétanque under centennial plane trees, Provence market, shaded terraces, Le Café (historic brasserie), designer shops.", transport: "boat", mapX: 195, mapY: 395 },
      { name: "Pampelonne beach", kind: "Club 55, Loulou, La Réserve, Nikki Beach", distance: "25 min boat or 40 min drive", access: "Private taxi-boat to Club 55 or Loulou pontoon (concierge booking). Or by car via Ramatuelle.", activities: "Long lunches at Club 55, loungers at Loulou, cocktails at Nikki Beach. Turquoise water, tender rides, water-skiing.", transport: "boat", mapX: 360, mapY: 430 },
      { name: "Ramatuelle & Gassin", kind: "Hilltop villages, vineyards", distance: "30 min drive", access: "Car via D61 through Port Grimaud and La Foux. Parking at village entrance.", activities: "Medieval villages, shaded lanes, vineyards (Château Minuty, Domaines Ott), restaurants with view. Tastings by appointment.", transport: "car", mapX: 305, mapY: 455 },
    ],
  },
  amenities: {
    index: "VII",
    eyebrow: "Chapter VII — Amenities & services",
    title: "What's included, what's on request",
    intro: "Three bedrooms, six guests, everything needed to host — and what can be whispered to the concierge.",
    capacity: {
      rooms: "3 bedrooms",
      guests: "6 guests",
      beds: "1 king · 2 twin · 2 twin",
      baths: "2 bathrooms",
      min_stay: "7 nights minimum",
    },
    stat_bar: [
      { value: "3", label: "bedrooms" },
      { value: "6", label: "guests" },
      { value: "2", label: "bathrooms" },
      { value: "7", label: "nights min" },
    ],
    equipment_label: "Equipment",
    services_included_label: "Included",
    services_on_demand_label: "On request · Concierge",
    included: [
      { label: "Fibre WiFi", icon: "wifi" },
      { label: "Reversible air conditioning", icon: "climate" },
      { label: "Private parking", icon: "parking" },
      { label: "Elevator", icon: "elevator" },
      { label: "Washer & dryer", icon: "washer" },
      { label: "Dishwasher", icon: "dishwasher" },
      { label: "Professional oven + microwave", icon: "oven" },
      { label: "Nespresso machine", icon: "coffee" },
      { label: "4K TV · Bluetooth hi-fi", icon: "tv" },
      { label: "Premium hair dryer", icon: "hair" },
      { label: "Safe", icon: "safe" },
      { label: "Premium bed & bath linen", icon: "linen" },
    ],
    services_included: [
      "Arrival and departure cleaning",
      "Bed and bath linens",
      "Welcome kit (olive oil, jam, local wine)",
      "Personalised check-in",
    ],
    services_on_demand: [
      "Private chef (bespoke menu)",
      "Baby-sitter, housekeeper",
      "Car or taxi-boat transfers",
      "Boat hire (with or without skipper)",
      "Bookings: restaurants, beaches, golf",
      "Optional daily cleaning",
    ],
  },
  seasons: {
    index: "VIII",
    eyebrow: "Chapter VIII — Seasons & rates",
    title: "Four seasons, four atmospheres",
    intro:
      "The high season shines, the shoulder seasons belong to those in the know. Indicative rates, per week.",
    minimum_stay: "Minimum stay: 7 nights.",
    items: [
      { label: "Spring", window: "April — June", note: "Mimosa, gentle mistral, the village still quiet.", price: "€3,500 – €5,500 / week", image: "terrace-view" },
      { label: "Summer", window: "July — August", note: "High season, yachts in the bay, Pampelonne at its peak.", price: "€9,500 – €15,000 / week", image: "dining-view" },
      { label: "Late season", window: "September", note: "Voiles de Saint-Tropez, golden light, water still warm.", price: "€5,500 – €8,500 / week", image: "salon-window" },
      { label: "Winter", window: "October — March", note: "On request, for private stays.", price: "On request", image: "building-exterior" },
    ],
  },
  voices: {
    index: "IX",
    eyebrow: "Chapter IX — Voices",
    title: "A few words from those who stayed",
    intro: "Left with restraint, after a week.",
    testimonials: [
      { quote: "A silence one no longer imagines — and yet, Saint-Tropez right across. The kind of week that recalibrates a year.", author: "L., June 2025" },
      { quote: "The light shifts hour by hour. We did not leave the terrace. The children fell asleep to the sound of cicadas.", author: "M. & P., August 2024" },
      { quote: "The boat to Sénéquier: fifteen minutes, no crowd. We came back home for dinner. Rare.", author: "C., September 2025" },
    ],
    press_label: "As seen in",
    press_items: ["AD France", "Vogue Living", "The Socialite Family", "Cabana Magazine"],
  },
  reserve: {
    index: "X",
    eyebrow: "Chapter X — Reserve",
    title: "Your stay, at your own pace",
    body:
      "Book on Airbnb, or reach our private concierge directly for bespoke stays.",
    stats: [
      { value: "3", label: "bedrooms" },
      { value: "6", label: "guests" },
      { value: "180°", label: "of bay" },
      { value: "15′", label: "from St-Tropez by boat" },
    ],
  },
  breath_1: "She shines also,<br/><em>when no one is looking.</em>",
  breath_2: "Here, you <em>look</em>.<br/>You are not looked at.",
  signature: "— Villa Azur",
};

export const copy: Record<Locale, ChapterCopy> = {
  fr,
  en,
  it: en,
  de: en,
  es: en,
  ru: en,
  ar: en,
};

export function getCopy(locale: Locale): ChapterCopy {
  return copy[locale] ?? copy.fr;
}
