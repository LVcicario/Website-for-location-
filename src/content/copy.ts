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
    baseline: "Un appartement privé à Sainte-Maxime, face à Saint-Tropez.",
  },
  prologue: {
    index: "I",
    eyebrow: "Prologue",
    text:
      "Saint-Tropez est mon enfance, ma jeunesse, ma liberté.",
    signature: "Brigitte Bardot",
  },
  the_place: {
    index: "II",
    eyebrow: "Chapitre II — Le lieu",
    title: "Face à Saint-Tropez, la meilleure place",
    body:
      "Sainte-Maxime, rive nord du golfe. L’appartement ouvre ses terrasses plein sud, face à Saint-Tropez qui tient la lumière du matin au soir. Les navettes Bateaux Verts partent à deux cents mètres à pied — quinze minutes de traversée, la baie franchie.",
    coordinates: "43.31° N · 6.64° E",
    landmarks: {
      villa: "L’Arbois",
      dock: "Jetée · Bateaux Verts · 200 m à pied",
      twin: "Latitude 43 · le jumeau paquebot",
      boat: "15 min · bateau",
    },
  },
  the_building: {
    index: "III",
    eyebrow: "Chapitre III — L’immeuble",
    title: "L’Arbois, côté nord. Latitude 43, côté sud.",
    subtitle: "Un dialogue de paquebots, depuis 1933.",
    body_1:
      "Sainte-Maxime, janvier 1933. Jean Gianotti, Parisien, commande à René Darde — architecte-urbaniste de la ville — un hôtel d’une autre espèce. L’Arbois ouvre en 1935 : façade courbe, balcons filants, verticalité d’un seul trait de béton. Le Grand Hôtel et son restaurant, La Tartane, deviennent une adresse.",
    body_2:
      "En face, Saint-Tropez, 1932. Georges-Henri Pingusson a livré un an plus tôt le Latitude 43 — un paquebot échoué de cent mètres, cent chambres, un casino, une piscine. L’Arbois a probablement été dessiné en écho : plus compact, plus retenu, mais du même mouvement moderne. L’un a inspiré l’autre ; ils se regardent.",
    body_3:
      "Après la guerre, les deux paquebots deviennent des résidences. Ils continuent à se faire face à travers le golfe, témoins d’une Côte d’Azur qui n’a jamais fini de se rêver. L’Arbois est aujourd’hui labellisé Architecture Contemporaine Remarquable.",
    quote: "Elles se regardent depuis un siècle.",
    labels: {
      architect: "Architecte · René Darde (1933)",
      twin: "Jumeau · Latitude 43 · Georges-Henri Pingusson (1932) · Saint-Tropez",
      listed: "Labellisé Architecture Contemporaine Remarquable",
    },
    timeline: [
      { year: "1930–32", label: "Latitude 43", detail: "Pingusson livre son paquebot moderniste à Saint-Tropez" },
      { year: "Janv. 1933", label: "Chantier L’Arbois", detail: "Jean Gianotti commande à René Darde l’hôtel face au golfe" },
      { year: "1935", label: "Inauguration", detail: "Grand Hôtel L’Arbois · restaurant La Tartane" },
      { year: "1945 →", label: "Résidences", detail: "Les deux paquebots deviennent des appartements ; ils se regardent toujours" },
    ],
  },
  the_apartment: {
    index: "IV",
    eyebrow: "Chapitre IV — L’appartement",
    title: "Deux chambres, un salon, une vue",
    intro:
      "Murs blancs, parquet bois chaud, mobilier en gris perle et bleu nuit, éclairages dorés. Une écriture contemporaine, feutrée, portée par les matières.",
    rooms: [
      { label: "Entrée", title: "Le seuil", body: "Un couloir clair, une console de laiton, une sculpture discrète. Le ton est donné avant même d’avoir posé ses bagages." },
      { label: "Salon", title: "Le grand volume", body: "Des canapés gris perle faits sur mesure, un tapis de laine écrue, une cheminée de marbre. La baie est toujours au fond, comme un tableau qui change d’heure en heure." },
      { label: "Cuisine", title: "La table de famille", body: "Marbre blanc veiné, robinetterie dorée, four professionnel. De quoi recevoir comme on reçoit à la maison — avec simplicité." },
      { label: "Chambre principale", title: "La chambre d’honneur", body: "Lit king-size, tête de lit capitonnée bleu nuit, dressing attenant, salle de bain en marbre. Les volets s’ouvrent plein sud, sur la baie." },
      { label: "Chambre d’hôtes", title: "Une chambre d’hôtes", body: "Sa salle de bain privative, son linge de maison en lin lavé, son calme. Pour ceux qu’on aime, rien de moins." },
      { label: "Terrasse", title: "La terrasse sud", body: "Une grande table en teck, des bains de soleil, un coin d’ombre. Saint-Tropez en filigrane toute la journée, ses lampes qui s’allument à la nuit tombée. Les soirées s’éternisent." },
    ],
  },
  materials: {
    index: "V",
    eyebrow: "Chapitre V — Matières",
    title: "La grammaire du lieu",
    intro:
      "Quatre matières, tenues par une palette : blanc, or, gris, bleu nuit, bois. Rien de plus, rien de moins.",
    items: [
      { label: "Marbre blanc veiné", note: "Cuisine, salles de bain, cheminée.", image: "primary-bathroom" },
      { label: "Laiton brossé doré", note: "Robinetterie, luminaires, patines mates.", image: "bathroom-gold" },
      { label: "Parquet chêne massif", note: "Lames larges, chevrons, huile naturelle.", image: "salon-window" },
      { label: "Velours sur mesure", note: "Gris perle pour les canapés, bleu nuit pour les têtes de lit.", image: "guest-bedroom-b" },
      { label: "Chaux blanche", note: "Murs qui respirent la lumière de la côte.", image: "salon-view" },
      { label: "Granit & damier", note: "Le hall Art Déco de l’immeuble.", image: "building-stairs" },
    ],
  },
  art_of_living: {
    index: "VI",
    eyebrow: "Chapitre VI — L’art de vivre",
    title: "À pied, en bateau, en voiture",
    intro:
      "La vie de Sainte-Maxime à quelques pas, Saint-Tropez à un quart d’heure de bateau, l’arrière-pays à vingt minutes. Cliquez chaque adresse — sur la carte ou dans la liste — pour savoir comment y aller, quoi y faire.",
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
        kind: "Promenade Aymeric Simon-Lorière · front de mer",
        distance: "Sur le pas de la porte",
        access: "L’Arbois donne directement sur la promenade. À gauche : le port et la plage du centre. À droite : la Pointe de la Croisette et la plage de la Nartelle.",
        activities: "Promenade sous les pins parasols, port de plaisance à 5 min, terrasses de café, glaciers, bars à cocktails au crépuscule.",
        transport: "foot",
        mapX: 195,
        mapY: 175,
      },
      {
        name: "Marché couvert",
        kind: "Place du Marché · rue Fernand Bessy",
        distance: "5 min à pied",
        access: "Par les ruelles du centre, derrière l’église. Marché couvert : mardi-dimanche 8h-14h. Marché forain provençal : jeudi matin sur les places adjacentes.",
        activities: "Boulangerie, primeurs, poissonnier du matin, fromagerie, épicerie fine, fleuriste. Tout le terroir varois sous une halle.",
        transport: "foot",
        mapX: 168,
        mapY: 110,
      },
      {
        name: "La Gaudina",
        kind: "Restaurant & plage privée · centre-ville",
        distance: "10 min à pied",
        access: "Par la promenade, en passant le port. Avenue de Lattre de Tassigny, sur la plage du centre-ville.",
        activities: "Cuisine méditerranéenne, terrasse face au golfe, transats sur le sable. Déjeuner et dîner.",
        transport: "foot",
        mapX: 162,
        mapY: 178,
      },
      {
        name: "Le Sémaphore",
        kind: "Point de vue · 127 m d’altitude",
        distance: "45 min de montée",
        access: "Sentier depuis la Pointe de la Croisette, par le Préconil. Boucle balisée. Prévoir des chaussures fermées et de l’eau.",
        activities: "Panorama complet sur le golfe de Saint-Tropez, le massif des Maures, les îles d’Hyères au loin. Couchers de soleil saisissants.",
        transport: "foot",
        mapX: 215,
        mapY: 65,
      },
      {
        name: "Plage de la Nartelle",
        kind: "Sable fin · 1 km de littoral",
        distance: "8 min en voiture",
        access: "3 km à l’est par l’avenue Romée de Villeneuve (D559). Parking sur la plage. Navette Sainte-Maxime gratuite l’été.",
        activities: "Sable fin, eau calme (idéale enfants), paillotes (Mahi Plage, La Gaillarde, Havana), paddle, transats, déjeuner les pieds dans le sable.",
        transport: "car",
        mapX: 340,
        mapY: 168,
      },
      {
        name: "Le Prao",
        kind: "Restaurant & plage privée · La Nartelle",
        distance: "8 min en voiture",
        access: "39 avenue du Général Touzet du Vigier, sur la plage de la Nartelle. Voiturier l’été.",
        activities: "Une des plus anciennes plages privées de la Riviera. Restaurant méditerranéen, lounge bar, transats face à la mer.",
        transport: "car",
        mapX: 348,
        mapY: 172,
      },
      {
        name: "Sénéquier",
        kind: "Café iconique du port · Saint-Tropez",
        distance: "15 min en bateau",
        access: "Navettes Bateaux Verts depuis la Jetée Olivier Bausset (5 min à pied de L’Arbois). 1 à 4 rotations par heure, 7 j/7, dix mois sur douze.",
        activities: "Institution depuis 1887. Terrasse rouge vif sur le port, petit-déjeuner matinal, apéritif au coucher du soleil, le meilleur poste d’observation des yachts.",
        transport: "boat",
        mapX: 210,
        mapY: 360,
      },
      {
        name: "Place des Lices",
        kind: "Pétanque, platanes, marché provençal",
        distance: "15 min bateau + 5 min à pied",
        access: "Descendez du bateau au port, remontez la rue Gambetta sur 300 m. Marché les mardi & samedi matin (8h-13h).",
        activities: "Pétanque sous les platanes centenaires, marché des producteurs, terrasses ombragées, Le Café (brasserie historique), boutiques de créateurs.",
        transport: "boat",
        mapX: 200,
        mapY: 380,
      },
      {
        name: "La Vague d’Or · Cheval Blanc",
        kind: "Gastronomique · 3 étoiles Michelin",
        distance: "15 min bateau + 7 min à pied",
        access: "Bateaux Verts jusqu’au port, puis traversée à pied vers la plage de la Bouillabaisse. Hôtel Cheval Blanc Saint-Tropez.",
        activities: "Cuisine méditerranéenne du chef Arnaud Donckele. Vue mer panoramique, jardins, service d’exception. Réservation longtemps à l’avance.",
        transport: "boat",
        mapX: 178,
        mapY: 358,
      },
      {
        name: "La Voile · La Réserve Ramatuelle",
        kind: "Gastronomique · 2 étoiles Michelin",
        distance: "30 min en voiture",
        access: "Par le chemin des Tournels via Ramatuelle. Hôtel La Réserve Ramatuelle, sur les hauteurs.",
        activities: "Cuisine méditerranéenne du chef Eric Canino, autour des herbes du jardin et des poissons de petits bateaux. Vue plongeante sur la baie de Pampelonne.",
        transport: "car",
        mapX: 290,
        mapY: 440,
      },
      {
        name: "Plage de Pampelonne",
        kind: "Club 55, Loulou, Verde Beach, La Réserve",
        distance: "30 min en voiture",
        access: "Route des plages via Ramatuelle. Parking voiturier dans chaque club. Possibilité de taxi-boat privé jusqu’aux pontons.",
        activities: "Déjeuners longs au Club 55, transats Loulou, cocktails Verde Beach. Eau turquoise, sortie en annexe, ski nautique.",
        transport: "car",
        mapX: 350,
        mapY: 445,
      },
      {
        name: "Ramatuelle & Gassin",
        kind: "Villages perchés, vignobles",
        distance: "30 min en voiture",
        access: "Par la D61 via Port Grimaud et La Foux. Stationnement en bas des villages, montée à pied.",
        activities: "Villages médiévaux, ruelles ombragées, vignobles (Château Minuty, Domaines Ott, Tropez). Dégustations sur réservation.",
        transport: "car",
        mapX: 305,
        mapY: 460,
      },
    ],
  },
amenities: {
    index: "VII",
    eyebrow: "Chapitre VII — Équipements & services",
    title: "Ce qui est compris, ce qui se demande",
    intro: "Deux chambres, quatre voyageurs, ce qu’il faut pour recevoir.",
    capacity: {
      rooms: "2 chambres",
      guests: "4 voyageurs",
      beds: "1 king-size · 2 lits simples",
      baths: "2 salles de bain + WC séparé",
      min_stay: "3 nuits minimum",
    },
    stat_bar: [
      { value: "2", label: "chambres" },
      { value: "4", label: "voyageurs" },
      { value: "2,5", label: "salles de bain" },
      { value: "3", label: "nuits min" },
    ],
    equipment_label: "Équipements",
    services_included_label: "Inclus",
    services_on_demand_label: "",
    included: [
      { label: "WiFi fibre haut débit", icon: "wifi" },
      { label: "Climatisation réversible", icon: "climate" },
      { label: "Ascenseur", icon: "elevator" },
      { label: "Lave-linge & sèche-linge", icon: "washer" },
      { label: "Lave-vaisselle", icon: "dishwasher" },
      { label: "Four & micro-ondes", icon: "oven" },
      { label: "Machine Nespresso", icon: "coffee" },
      { label: "TV 4K · hi-fi Bluetooth", icon: "tv" },
      { label: "Sèche-cheveux", icon: "hair" },
      { label: "Linge de maison", icon: "linen" },
    ],
    services_included: [
      "Ménage à l’arrivée et au départ",
      "Linge de maison et de bain",
      "Kit d’accueil (huile d’olive, confiture, vin local)",
      "Assistance check-in personnalisée",
    ],
    services_on_demand: [],
  },
  seasons: {
    index: "VIII",
    eyebrow: "Chapitre VIII — Saisons & tarifs",
    title: "Quatre saisons, quatre atmosphères",
    intro:
      "La haute saison brille, les entre-saisons appartiennent aux initiés. Tarifs indicatifs, sur la base de la semaine.",
    minimum_stay: "Séjour minimum : 3 nuits. — 20 % de réduction à partir de 7 nuits.",
    items: [
      { label: "Printemps", window: "Avril — Juin", note: "Mimosa, mistral doux, village encore calme.", price: "À partir de 348 € / nuit (frais Airbnb inclus)", image: "terrace-view" },
      { label: "Été", window: "Juillet — Août", note: "Haute saison, yachts dans la baie, Pampelonne à son apogée.", price: "Tarifs sur Airbnb", image: "dining-view" },
      { label: "Arrière-saison", window: "Septembre", note: "Voiles de Saint-Tropez, lumière dorée, eau encore chaude.", price: "Tarifs sur Airbnb", image: "salon-window" },
      { label: "Hiver", window: "Octobre — Mars", note: "Voir Airbnb pour les disponibilités.", price: "Tarifs sur Airbnb", image: "building-exterior" },
    ],
  },
  voices: {
    index: "IX",
    eyebrow: "Chapitre IX — Voix",
    title: "Saint-Tropez en quelques mots",
    intro: "Trois citations de Brigitte Bardot, qui depuis La Madrague raconte la baie depuis soixante ans.",
    testimonials: [
      { quote: "Je suis Tropézienne avant d’être française.", author: "Brigitte Bardot" },
      { quote: "Je vis à Saint-Tropez parce que c’est le seul endroit au monde où je peux respirer.", author: "Brigitte Bardot" },
      { quote: "La Madrague, c’est mon paradis.", author: "Brigitte Bardot — La Madrague" },
    ],
    press_label: "Tel que vu dans",
    press_items: ["AD France", "Vogue Living", "The Socialite Family", "Cabana Magazine"],
  },
  reserve: {
    index: "X",
    eyebrow: "Chapitre X — Réserver",
    title: "Votre séjour, à votre rythme",
    body:
      "La réservation se fait sur Airbnb — paiement sécurisé, calendrier en temps réel.",
    stats: [
      { value: "2", label: "chambres" },
      { value: "4", label: "voyageurs" },
      { value: "180°", label: "de baie" },
      { value: "15′", label: "de St-Tropez en bateau" },
    ],
  },
  breath_1: "Elle brille aussi,<br/><em>quand on ne la regarde pas.</em>",
  breath_2: "Ici, on <em>regarde</em>.<br/>On n’est pas regardé.",
  signature: "— L’Arbois",
};

const en: ChapterCopy = {
  hero: {
    eyebrow: "Sainte-Maxime · Gulf of Saint-Tropez",
    title_line_1: "Across",
    title_line_2: "from Saint-Tropez",
    baseline: "A private apartment in Sainte-Maxime, facing Saint-Tropez.",
  },
  prologue: {
    index: "I",
    eyebrow: "Prologue",
    text:
      "Saint-Tropez is my childhood, my youth, my freedom.",
    signature: "Brigitte Bardot",
  },
  the_place: {
    index: "II",
    eyebrow: "Chapter II — The place",
    title: "Facing Saint-Tropez, the finest seat",
    body:
      "Sainte-Maxime, northern shore of the gulf. The apartment’s terraces face due south, towards Saint-Tropez, which catches the light from morning to nightfall. The Bateaux Verts shuttles leave from the jetty, two hundred metres on foot — a fifteen-minute crossing.",
    coordinates: "43.31° N · 6.64° E",
    landmarks: {
      villa: "L’Arbois",
      dock: "Jetty · Bateaux Verts · 200 m walk",
      twin: "Latitude 43 · the ocean-liner twin",
      boat: "15 min · by boat",
    },
  },
  the_building: {
    index: "III",
    eyebrow: "Chapter III — The building",
    title: "L’Arbois, north side. Latitude 43, south side.",
    subtitle: "A dialogue of ocean-liners since 1933.",
    body_1:
      "Sainte-Maxime, January 1933. Jean Gianotti, a Parisian patron, commissions from René Darde — the town’s architect-urbanist — a hotel of another kind. L’Arbois opens in 1935: curved façade, ribbon balconies, the whole vertical held by a single stroke of concrete. The Grand Hôtel and its restaurant, La Tartane, become an address.",
    body_2:
      "Across the water, Saint-Tropez, 1932. Georges-Henri Pingusson had delivered, a year earlier, the Latitude 43 — a beached ocean-liner of a hundred metres, a hundred rooms, a casino, a pool. L’Arbois was very likely drawn in reply: more compact, more restrained, but of the same Modern Movement. One inspired the other; they face each other.",
    body_3:
      "After the war, the two ocean-liners became residences. They still face each other across the bay, witnesses to a Riviera that has never finished dreaming itself. L’Arbois is today listed as Architecture Contemporaine Remarquable.",
    quote: "They have been looking at each other for a century.",
    labels: {
      architect: "Architect · René Darde (1933)",
      twin: "Twin · Latitude 43 · Georges-Henri Pingusson (1932) · Saint-Tropez",
      listed: "Listed Architecture Contemporaine Remarquable",
    },
    timeline: [
      { year: "1930–32", label: "Latitude 43", detail: "Pingusson delivers his modernist liner in Saint-Tropez" },
      { year: "Jan 1933", label: "L’Arbois begins", detail: "Jean Gianotti commissions René Darde with the hotel facing the gulf" },
      { year: "1935", label: "Inauguration", detail: "Grand Hôtel L’Arbois · restaurant La Tartane" },
      { year: "1945 →", label: "Residences", detail: "Both liners become apartments; they still face each other" },
    ],
  },
  the_apartment: {
    index: "IV",
    eyebrow: "Chapter IV — The apartment",
    title: "Two bedrooms, one living room, one view",
    intro:
      "White walls, warm wooden floors, pearl-grey and deep-navy furniture, gilded light. A quiet contemporary hand, carried by its materials.",
    rooms: [
      { label: "Entrance", title: "The threshold", body: "A bright hallway, a brass console, a discreet sculpture. The tone is set before you have even set down your bags." },
      { label: "Living room", title: "The open volume", body: "Custom pearl-grey sofas, a cream wool rug, a marble fireplace. The bay is always there at the back, changing with the hours." },
      { label: "Kitchen", title: "The family table", body: "Veined white marble, brass fittings, professional oven. Enough to host as one would at home — with quiet generosity." },
      { label: "Primary bedroom", title: "The principal suite", body: "King-size bed, navy upholstered headboard, adjoining dressing room, marble bathroom. The shutters open due south, onto the bay." },
      { label: "Guest bedroom", title: "A guest room", body: "Its own bathroom, washed linen sheets, its own quiet. For those you love, nothing less." },
      { label: "Terrace", title: "The south terrace", body: "A long teak table, sun loungers, a shaded corner. Saint-Tropez in view all day long, its lamps lighting up at nightfall. Evenings stretch on." },
    ],
  },
  materials: {
    index: "V",
    eyebrow: "Chapter V — Materials",
    title: "The grammar of the place",
    intro:
      "Four materials, held by a single palette: white, gold, grey, deep navy, wood. Nothing more, nothing less.",
    items: [
      { label: "Veined white marble", note: "Kitchen, bathrooms, fireplace.", image: "primary-bathroom" },
      { label: "Brushed brass", note: "Fittings, lighting, matte patinas.", image: "bathroom-gold" },
      { label: "Solid oak parquet", note: "Wide planks, herringbone, natural oil.", image: "salon-window" },
      { label: "Bespoke velvet", note: "Pearl-grey for sofas, deep navy for headboards.", image: "guest-bedroom-b" },
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
      { name: "La Croisette", kind: "Promenade Aymeric Simon-Lorière · seafront", distance: "On the doorstep", access: "L’Arbois opens directly onto the seafront promenade. To the left: the harbour and the town beach. To the right: Pointe de la Croisette and Nartelle beach.", activities: "Promenade under umbrella pines, marina 5 min away, café terraces, ice cream, sunset cocktail bars.", transport: "foot", mapX: 195, mapY: 175 },
      { name: "Covered market", kind: "Place du Marché · Rue Fernand Bessy", distance: "5 min walk", access: "Through the old town lanes, behind the church. Covered market: Tue-Sun 8am-2pm. Provençal open-air market: Thursday morning across the adjoining squares.", activities: "Bakery, fresh produce, morning-catch fish, cheese, fine grocery, florist. The whole Var terroir under one roof.", transport: "foot", mapX: 168, mapY: 110 },
      { name: "La Gaudina", kind: "Restaurant & private beach · town centre", distance: "10 min walk", access: "Via the seafront, past the harbour. Avenue de Lattre de Tassigny, on the town-centre beach.", activities: "Mediterranean cuisine, terrace facing the gulf, loungers on the sand. Lunch and dinner.", transport: "foot", mapX: 162, mapY: 178 },
      { name: "Le Sémaphore", kind: "Viewpoint · 127 m altitude", distance: "45 min uphill walk", access: "Trail from Pointe de la Croisette, via the Préconil. Marked loop. Wear closed shoes and bring water.", activities: "Full panorama of the gulf of Saint-Tropez, the Maures massif, the Hyères islands beyond. Striking sunsets.", transport: "foot", mapX: 215, mapY: 65 },
      { name: "Nartelle beach", kind: "Fine sand · 1 km of shoreline", distance: "8 min by car", access: "3 km east via Avenue Romée de Villeneuve (D559). Beach parking. Free Sainte-Maxime shuttle in summer.", activities: "Fine sand, calm water (ideal for children), beach clubs (Mahi Plage, La Gaillarde, Havana), paddle, loungers, lunch on the sand.", transport: "car", mapX: 340, mapY: 168 },
      { name: "Le Prao", kind: "Restaurant & private beach · La Nartelle", distance: "8 min by car", access: "39 Avenue du Général Touzet du Vigier, on Nartelle beach. Valet parking in summer.", activities: "One of the oldest private beaches on the Riviera. Mediterranean restaurant, lounge bar, loungers facing the sea.", transport: "car", mapX: 348, mapY: 172 },
      { name: "Sénéquier", kind: "Iconic harbour café · Saint-Tropez", distance: "15 min by boat", access: "Bateaux Verts shuttles from Jetée Olivier Bausset (5 min walk from L’Arbois). 1 to 4 rotations per hour, 7 days a week, ten months a year.", activities: "Institution since 1887. Vivid red terrace on the harbour, early breakfast, sunset apéritif, the finest yacht-watching seat.", transport: "boat", mapX: 210, mapY: 360 },
      { name: "Place des Lices", kind: "Pétanque, plane trees, Provençal market", distance: "15 min boat + 5 min walk", access: "Off the boat at the harbour, 300 m up Rue Gambetta. Market Tuesday & Saturday morning (8am-1pm).", activities: "Pétanque under centennial plane trees, growers’ market, shaded terraces, Le Café (historic brasserie), designer shops.", transport: "boat", mapX: 200, mapY: 380 },
      { name: "La Vague d’Or · Cheval Blanc", kind: "Gastronomic · 3 Michelin stars", distance: "15 min boat + 7 min walk", access: "Bateaux Verts to the harbour, then walk along the Bouillabaisse beach. Cheval Blanc Saint-Tropez hotel.", activities: "Mediterranean cuisine by chef Arnaud Donckele. Panoramic sea view, gardens, exceptional service. Booking far in advance.", transport: "boat", mapX: 178, mapY: 358 },
      { name: "La Voile · La Réserve Ramatuelle", kind: "Gastronomic · 2 Michelin stars", distance: "30 min by car", access: "Via Chemin des Tournels through Ramatuelle. La Réserve Ramatuelle hotel, on the heights.", activities: "Mediterranean cuisine by chef Eric Canino, around garden herbs and small-boat fish. Sweeping view over Pampelonne bay.", transport: "car", mapX: 290, mapY: 440 },
      { name: "Pampelonne beach", kind: "Club 55, Loulou, Verde Beach, La Réserve", distance: "30 min by car", access: "Route des plages via Ramatuelle. Valet parking at every club. Private taxi-boat to club pontoons also possible.", activities: "Long lunches at Club 55, loungers at Loulou, cocktails at Verde Beach. Turquoise water, tender rides, water-skiing.", transport: "car", mapX: 350, mapY: 445 },
      { name: "Ramatuelle & Gassin", kind: "Hilltop villages, vineyards", distance: "30 min by car", access: "D61 via Port Grimaud and La Foux. Park at village entrance, then walk up.", activities: "Medieval villages, shaded lanes, vineyards (Château Minuty, Domaines Ott, Tropez). Tastings by appointment.", transport: "car", mapX: 305, mapY: 460 },
    ],
  },
  amenities: {
    index: "VII",
    eyebrow: "Chapter VII — Amenities & services",
    title: "What’s included, what’s on request",
    intro: "Two bedrooms, four guests, everything needed to host.",
    capacity: {
      rooms: "2 bedrooms",
      guests: "4 guests",
      beds: "1 king · 2 singles",
      baths: "2 bathrooms + separate WC",
      min_stay: "3 nights minimum",
    },
    stat_bar: [
      { value: "2", label: "bedrooms" },
      { value: "4", label: "guests" },
      { value: "2.5", label: "bathrooms" },
      { value: "3", label: "nights min" },
    ],
    equipment_label: "Equipment",
    services_included_label: "Included",
    services_on_demand_label: "",
    included: [
      { label: "Fibre WiFi", icon: "wifi" },
      { label: "Reversible air conditioning", icon: "climate" },
      { label: "Elevator", icon: "elevator" },
      { label: "Washer & dryer", icon: "washer" },
      { label: "Dishwasher", icon: "dishwasher" },
      { label: "Oven & microwave", icon: "oven" },
      { label: "Nespresso machine", icon: "coffee" },
      { label: "4K TV · Bluetooth hi-fi", icon: "tv" },
      { label: "Hair dryer", icon: "hair" },
      { label: "Bed & bath linen", icon: "linen" },
    ],
    services_included: [
      "Arrival and departure cleaning",
      "Bed and bath linens",
      "Welcome kit (olive oil, jam, local wine)",
      "Personalised check-in",
    ],
    services_on_demand: [],
  },
  seasons: {
    index: "VIII",
    eyebrow: "Chapter VIII — Seasons & rates",
    title: "Four seasons, four atmospheres",
    intro:
      "The high season shines, the shoulder seasons belong to those in the know. Indicative rates, per week.",
    minimum_stay: "Minimum stay: 3 nights. — 20% off from 7 nights.",
    items: [
      { label: "Spring", window: "April — June", note: "Mimosa, gentle mistral, the village still quiet.", price: "From €348 / night (Airbnb fees included)", image: "terrace-view" },
      { label: "Summer", window: "July — August", note: "High season, yachts in the bay, Pampelonne at its peak.", price: "Rates on Airbnb", image: "dining-view" },
      { label: "Late season", window: "September", note: "Voiles de Saint-Tropez, golden light, water still warm.", price: "Rates on Airbnb", image: "salon-window" },
      { label: "Winter", window: "October — March", note: "See Airbnb for availability.", price: "Rates on Airbnb", image: "building-exterior" },
    ],
  },
  voices: {
    index: "IX",
    eyebrow: "Chapter IX — Voices",
    title: "Saint-Tropez in a few words",
    intro: "Three quotes from Brigitte Bardot, who has chronicled the bay from La Madrague for sixty years.",
    testimonials: [
      { quote: "I am Tropezian before I am French.", author: "Brigitte Bardot" },
      { quote: "I live in Saint-Tropez because it is the only place in the world where I can breathe.", author: "Brigitte Bardot" },
      { quote: "La Madrague is my paradise.", author: "Brigitte Bardot — La Madrague" },
    ],
    press_label: "As seen in",
    press_items: ["AD France", "Vogue Living", "The Socialite Family", "Cabana Magazine"],
  },
  reserve: {
    index: "X",
    eyebrow: "Chapter X — Reserve",
    title: "Your stay, at your own pace",
    body:
      "Booking via Airbnb — secure payment, real-time availability.",
    stats: [
      { value: "2", label: "bedrooms" },
      { value: "4", label: "guests" },
      { value: "180°", label: "of bay" },
      { value: "15′", label: "from St-Tropez by boat" },
    ],
  },
  breath_1: "She shines also,<br/><em>when no one is looking.</em>",
  breath_2: "Here, you <em>look</em>.<br/>You are not looked at.",
  signature: "— L’Arbois",
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
