import { useRef, useEffect } from "react";
import type { PoiCopy, Transport } from "~/content/copy";
import TransportIcon from "./TransportIcon";

interface Props {
  pois: PoiCopy[];
  labels: {
    access: string;
    activities: string;
    by_foot: string;
    by_boat: string;
    by_car: string;
  };
  active?: number | null;
  onSelect?: (index: number | null) => void;
}

export default function POIList({ pois, labels, active = null, onSelect }: Props) {
  const groups: { transport: Transport; label: string; items: { poi: PoiCopy; index: number }[] }[] = [
    { transport: "foot", label: labels.by_foot, items: [] },
    { transport: "boat", label: labels.by_boat, items: [] },
    { transport: "car", label: labels.by_car, items: [] },
  ];
  pois.forEach((poi, index) => {
    const group = groups.find((g) => g.transport === poi.transport);
    if (group) group.items.push({ poi, index });
  });

  return (
    <div className="poi-list-wrapper">
      {groups.filter((g) => g.items.length > 0).map((group) => (
        <section key={group.transport} className="poi-group mb-8 last:mb-0">
          <header className="poi-group__header flex items-center gap-4 mb-2">
            <span className="text-[var(--color-gold)]" aria-hidden="true">
              <TransportIcon transport={group.transport} size={18} />
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--color-gold)] italic">
              {group.label}
            </h3>
            <span className="flex-1 h-px bg-[var(--color-gold)]/30"></span>
            <span className="eyebrow text-[var(--color-bone-soft)]/60">{String(group.items.length).padStart(2, "0")}</span>
          </header>

          <ol className="poi-list">
            {group.items.map(({ poi, index }) => (
              <PoiRow
                key={index}
                poi={poi}
                index={index}
                labels={labels}
                isOpen={active === index}
                onToggle={() => onSelect?.(active === index ? null : index)}
              />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

interface RowProps {
  poi: PoiCopy;
  index: number;
  labels: {
    access: string;
    activities: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

function PoiRow({ poi, index, labels, isOpen, onToggle }: RowProps) {
  const rowRef = useRef<HTMLLIElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect();
      const headerOffset = 90;
      if (rect.top < headerOffset || rect.bottom > window.innerHeight) {
        rowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isOpen]);

  return (
    <li
      ref={rowRef}
      className={`poi relative border-t border-[var(--color-gold)]/20 ${isOpen ? "poi--open" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`poi-panel-${index}`}
        className="poi__head w-full min-h-[3.5rem] flex flex-wrap items-baseline gap-x-4 md:gap-x-6 gap-y-1 md:gap-y-2 py-4 md:py-5 text-left transition-colors hover:text-[var(--color-gold)]"
      >
        <span className="chapter-index w-8 md:w-10 flex-shrink-0">{String(index + 1).padStart(2, "0")}</span>
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

      <div
        id={`poi-panel-${index}`}
        ref={panelRef}
        className={`poi__panel overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.65,0.2,1)] grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-5 md:grid-cols-2 md:gap-12 pb-7 pl-2 pr-1 md:pl-14 md:pr-4">
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
      </div>
    </li>
  );
}
