import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  delay?: number;
}

const INITIAL: Record<NonNullable<Props["direction"]>, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

export default function ClipReveal({
  children,
  direction = "left",
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.clipPath = "inset(0 0 0 0)";
      return;
    }

    el.style.clipPath = INITIAL[direction];
    el.style.willChange = "clip-path";

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !el) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.to(el, {
            clipPath: "inset(0 0 0 0)",
            duration: 1.3,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
        }, el);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={className} style={{ clipPath: INITIAL[direction] }}>
      {children}
    </div>
  );
}
