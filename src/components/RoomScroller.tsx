import { useEffect, useRef } from "react";
import type { RoomCopy } from "~/content/copy";

export interface RoomImage {
  avif: string;
  webp: string;
  fallback: string;
  width: number;
  height: number;
}

interface Props {
  rooms: RoomCopy[];
  images: (RoomImage | null)[];
}

export default function RoomScroller({ rooms, images }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    if (reduced || narrow) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const distance = () => track.scrollWidth - window.innerWidth;

          const mainTween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          const slides = track.querySelectorAll<HTMLElement>(".room-slide__media");
          slides.forEach((slide) => {
            gsap.fromTo(
              slide,
              { scale: 1.08 },
              {
                scale: 1.0,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: mainTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        }, section);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="room-scroller relative overflow-hidden" aria-roledescription="carousel">
      <div ref={trackRef} className="room-scroller__track flex gap-0">
        {rooms.map((room, i) => {
          const img = images[i] ?? null;
          return (
            <article
              key={room.label}
              className="room-slide relative h-[100vh] w-[100vw] shrink-0 flex items-end md:w-[72vw] overflow-hidden bg-[var(--color-ink)]"
            >
              <div className="room-slide__media absolute inset-0" style={{ willChange: "transform" }}>
                {img ? (
                  <picture>
                    <source srcSet={img.avif} type="image/avif" />
                    <source srcSet={img.webp} type="image/webp" />
                    <img
                      src={img.fallback}
                      alt=""
                      width={img.width}
                      height={img.height}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: ["linear-gradient(135deg, #0e1e33, #1a2d4a)"][0] }}
                  />
                )}
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/20 to-transparent" />
              </div>

              <div className="relative z-10 p-10 md:p-16 lg:p-20 max-w-[52ch]">
                <p className="chapter-index">{String(i + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}</p>
                <p className="eyebrow mt-3">{room.label}</p>
                <h3 className="display mt-4 text-4xl md:text-6xl">{room.title}</h3>
                <hr className="rule-gold" />
                <p className="text-base md:text-lg leading-relaxed text-[var(--color-bone-soft)]">{room.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
