import { useState, useRef, useEffect } from "react";
import type { PoiCopy } from "~/content/copy";

interface Props {
  pois: PoiCopy[];
  labels: { access: string; activities: string };
}

export default function POIList({ pois, labels }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ol className="poi-list">
      {pois.map((poi, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="poi group relative border-t border-[var(--color-gold)]/20">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`poi-panel-${i}`}
              className="poi__head w-full min-h-[3.5rem] flex flex-wrap items-baseline gap-x-4 md:gap-x-6 gap-y-1 md:gap-y-2 py-4 md:py-5 text-left transition-colors hover:text-[var(--color-gold)]"
            >
              <span className="chapter-index w-8 md:w-10 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-[family-name:var(--font-display)] text-xl md:text-3xl font-normal tracking-tight flex-1 min-w-[10rem]">{poi.name}</span>
              <span className="text-xs md:text-sm text-[var(--color-bone-soft)]/80 flex-1 min-w-[10rem] md:min-w-[12rem]">{poi.kind}</span>
              <span className="eyebrow text-[var(--color-gold)] whitespace-nowrap">{poi.distance}</span>
              <span
                className={`poi__chev w-5 text-[var(--color-gold)] transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            <PoiPanel id={`poi-panel-${i}`} isOpen={isOpen} poi={poi} labels={labels} />
          </li>
        );
      })}
    </ol>
  );
}

function PoiPanel({
  id,
  isOpen,
  poi,
  labels,
}: {
  id: string;
  isOpen: boolean;
  poi: PoiCopy;
  labels: { access: string; activities: string };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      id={id}
      className="poi__panel overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.2,0.65,0.2,1)]"
      style={{ height: `${height}px` }}
      aria-hidden={!isOpen}
    >
      <div ref={ref} className="grid gap-5 md:grid-cols-2 md:gap-12 pb-7 pl-2 pr-1 md:pl-14 md:pr-4">
        <div>
          <p className="eyebrow mb-2 text-[var(--color-gold)]">{labels.access}</p>
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-bone-soft)]">{poi.access}</p>
        </div>
        <div>
          <p className="eyebrow mb-2 text-[var(--color-gold)]">{labels.activities}</p>
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-bone-soft)]">{poi.activities}</p>
        </div>
      </div>
    </div>
  );
}
