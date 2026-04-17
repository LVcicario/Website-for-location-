import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LABELS, LAUNCH_LOCALES, type Locale } from "~/i18n/config";

interface Props {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function hrefFor(target: Locale): string {
    if (typeof window === "undefined") return `/${target}/`;
    const { pathname } = window.location;
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length && (LOCALES as readonly string[]).includes(parts[0])) {
      parts[0] = target;
    } else {
      parts.unshift(target);
    }
    return `/${parts.join("/")}`.replace(/\/?$/, "/");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="eyebrow flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors"
      >
        <span>{locale.toUpperCase()}</span>
        <span aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s" }}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-3 min-w-[12rem] border border-[var(--color-gold)]/40 bg-[var(--color-ink)] py-2 shadow-[0_12px_40px_rgba(0,0,0,.6)]"
        >
          {LOCALES.map((loc) => {
            const isLaunch = (LAUNCH_LOCALES as readonly string[]).includes(loc);
            return (
              <li key={loc}>
                <a
                  href={hrefFor(loc)}
                  hrefLang={loc}
                  aria-current={loc === locale ? "true" : undefined}
                  className={[
                    "flex items-center justify-between px-4 py-2 text-sm tracking-wide transition-colors",
                    loc === locale ? "text-[var(--color-gold)]" : "text-[var(--color-bone)] hover:text-[var(--color-gold)]",
                    !isLaunch ? "opacity-60" : "",
                  ].join(" ")}
                >
                  <span>{LOCALE_LABELS[loc]}</span>
                  {!isLaunch && <span className="text-[0.65rem] tracking-[0.22em] uppercase">soon</span>}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
