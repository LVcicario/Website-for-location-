import { useEffect, useState } from "react";

export interface LightboxImage {
  avif: string;
  webp: string;
  fallback: string;
  thumbAvif: string;
  thumbWebp: string;
  thumbFallback: string;
  width: number;
  height: number;
  label: string;
}

interface Props {
  items: LightboxImage[];
}

export default function Lightbox({ items }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? 0 : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length]);

  return (
    <>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[var(--content-max)]">
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-gold)]/20 cursor-pointer focus-visible:outline-[var(--color-gold)] bg-[var(--color-ink)]"
              aria-label={`Agrandir : ${item.label}`}
            >
              <picture>
                <source srcSet={item.thumbAvif} type="image/avif" />
                <source srcSet={item.thumbWebp} type="image/webp" />
                <img
                  src={item.thumbFallback}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.65,0.2,1)] group-hover:scale-[1.04]"
                />
              </picture>
              <span className="absolute inset-0 bg-[var(--color-ink)]/0 group-hover:bg-[var(--color-ink)]/15 transition-colors duration-500" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-6">
                <span className="eyebrow">{item.label}</span>
              </span>
              <span className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-gold)] text-xs tracking-[0.22em] uppercase">
                View ↗
              </span>
            </button>
          </li>
        ))}
      </ol>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo : ${items[index].label}`}
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-[var(--color-gold)] text-2xl md:text-3xl hover:scale-110 transition-transform w-12 h-12 md:w-14 md:h-14 flex items-center justify-center z-10 bg-[var(--color-ink)]/40 rounded-full"
            aria-label="Précédent"
          >
            ←
          </button>

          <div
            className="relative mx-auto h-[82vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <source srcSet={items[index].avif} type="image/avif" />
              <source srcSet={items[index].webp} type="image/webp" />
              <img
                src={items[index].fallback}
                alt={items[index].label}
                className="max-h-[82vh] max-w-[90vw] w-auto h-auto object-contain"
              />
            </picture>
            <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 pointer-events-none">
              <p className="chapter-index">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <p className="eyebrow mt-2">{items[index].label}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? 0 : (i + 1) % items.length));
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-[var(--color-gold)] text-2xl md:text-3xl hover:scale-110 transition-transform w-12 h-12 md:w-14 md:h-14 flex items-center justify-center z-10 bg-[var(--color-ink)]/40 rounded-full"
            aria-label="Suivant"
          >
            →
          </button>

          <button
            type="button"
            onClick={() => setIndex(null)}
            className="absolute right-4 top-4 md:right-6 md:top-6 text-[var(--color-bone)] hover:text-[var(--color-gold)] transition-colors text-xs tracking-[0.22em] uppercase z-10 min-w-[44px] min-h-[44px] flex items-center justify-center px-2"
            aria-label="Fermer"
          >
            Esc ✕
          </button>
        </div>
      )}
    </>
  );
}
