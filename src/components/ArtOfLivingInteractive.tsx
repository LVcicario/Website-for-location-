import { useState } from "react";
import type { PoiCopy } from "~/content/copy";
import POIList from "./POIList";
import POIMap from "./POIMap";

interface Props {
  pois: PoiCopy[];
  labels: {
    access: string;
    activities: string;
    by_foot: string;
    by_boat: string;
    by_car: string;
  };
}

export default function ArtOfLivingInteractive({ pois, labels }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 items-start">
      <div className="lg:sticky lg:top-24">
        <POIMap pois={pois} active={active} onSelect={setActive} />
      </div>
      <div>
        <POIList pois={pois} labels={labels} active={active} onSelect={setActive} />
      </div>
    </div>
  );
}
