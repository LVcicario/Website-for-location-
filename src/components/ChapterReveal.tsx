import { useEffect, useRef, type ReactNode, type JSX } from "react";

interface Props {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: boolean;
}

export default function ChapterReveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 28,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "1";

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    const fallback = setTimeout(() => {
      if (cancelled || !el) return;
      const targets = stagger
        ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-child]"))
        : [el];
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
    }, 1200);

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !el) return;
        clearTimeout(fallback);
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const targets = stagger
            ? Array.from(el.querySelectorAll("[data-reveal-child]"))
            : [el];

          gsap.set(targets, { opacity: 0, y });

          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay,
            ease: "power2.out",
            stagger: stagger ? 0.1 : 0,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          });
        }, el);
      },
    );

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      ctx?.revert();
    };
  }, [delay, stagger, y]);

  const Component = Tag as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error — Tag is dynamic (keyof JSX.IntrinsicElements), TS can’t narrow ref type
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
