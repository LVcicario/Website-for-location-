import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxLayer({
  children,
  speed = 0.85,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    if (reduced || narrow) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !el) return;
        gsap.registerPlugin(ScrollTrigger);

        const parent = el.parentElement;
        if (!parent) return;

        const distance = (1 - speed) * 100;

        ctx = gsap.context(() => {
          gsap.to(el, {
            yPercent: distance,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }, el);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
