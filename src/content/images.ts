export type ImageMeta = {
  objectPosition: string;
  aspect?: string;
  label?: string;
};

export const imageMeta: Record<string, ImageMeta> = {
  "dining-view": { objectPosition: "center center", aspect: "3/2", label: "Salle à manger · vue baie" },
  "salon-view": { objectPosition: "center 55%", aspect: "3/4", label: "Salon" },
  "salon-window": { objectPosition: "right 55%", aspect: "3/4", label: "Salon · vue mer" },
  "salon-art": { objectPosition: "center 60%", aspect: "3/4", label: "Salon · art" },
  "kitchen-navy": { objectPosition: "center 60%", aspect: "3/4", label: "Cuisine" },
  "terrace-view": { objectPosition: "center 55%", aspect: "3/2", label: "Terrasse" },
  "primary-bedroom": { objectPosition: "center 62%", aspect: "3/2", label: "Chambre principale" },
  "primary-bathroom": { objectPosition: "center center", aspect: "3/2", label: "Salle de bain · marbre" },
  "bathroom-gold": { objectPosition: "center 40%", aspect: "3/4", label: "Salle de bain · laiton" },
  "guest-bedroom-a": { objectPosition: "center 55%", aspect: "3/2", label: "Chambre d’hôtes" },
  "guest-bedroom-b": { objectPosition: "center 55%", aspect: "3/2", label: "Chambre d’hôtes · alt" },
  "guest-bedroom-c": { objectPosition: "center 55%", aspect: "3/2", label: "Chambre d’hôtes · prête" },
  "powder-room": { objectPosition: "center 55%", aspect: "3/2", label: "Salle d’eau" },
  "dresser-mirror": { objectPosition: "center center", aspect: "3/2", label: "Détail · console" },
  "building-exterior": { objectPosition: "center 45%", aspect: "3/2", label: "L’Arbois · extérieur" },
  "building-facade": { objectPosition: "center center", aspect: "3/2", label: "L’Arbois · façade" },
  "building-stairs": { objectPosition: "center center", aspect: "3/2", label: "Hall · granit & damier" },
};

export function getImageMeta(src: string): ImageMeta {
  return imageMeta[src] ?? { objectPosition: "center center" };
}
