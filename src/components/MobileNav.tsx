import { useEffect, useState } from "react";
import { LOCALES, LOCALE_LABELS, LAUNCH_LOCALES, type Locale } from "~/i18n/config";
import { t } from "~/i18n/ui";

interface Props {
  locale: Locale;
}

export default function MobileNav({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const strings = t(locale);
  const prefix = `/${locale}`;

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

  const links = [
    { href: `${prefix}/#the-place`, label: strings.nav.the_place },
    { href: `${prefix}/#the-building`, label: "L’immeuble" },
    { href: `${prefix}/#the-apartment`, label: strings.nav.the_apartment },
    { href: `${prefix}/#art-of-living`, label: strings.nav.art_of_living },
    { href: `${prefix}/#seasons`, label: "Saisons & tarifs" },
    { href: `${prefix}/#voices`, label: "Voix" },
    { href: `${prefix}/#reserve`, label: strings.nav.reserve },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="mobile-nav__toggle md:hidden relative z-[60] flex h-11 w-11 items-center justify-center -mr-2"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="mobile-nav__burger relative block w-6 h-4">
          <span className={`absolute left-0 right-0 h-px bg-current transition-all duration-400 ${open ? "top-1/2 rotate-45" : "top-0"}`}></span>
          <span className={`absolute left-0 right-0 h-px bg-current transition-opacity duration-300 top-1/2 ${open ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`absolute left-0 right-0 h-px bg-current transition-all duration-400 ${open ? "top-1/2 -rotate-45" : "bottom-0 top-auto"}`}></span>
        </span>
      </button>

      <div
        className={`mobile-nav__panel fixed inset-0 z-50 md:hidden pointer-events-none transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[var(--color-ink)]/98 backdrop-blur"></div>
        <div className={`relative h-full flex flex-col pt-24 pb-10 px-[var(--gutter)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.65,0.2,1)] ${open ? "translate-y-0" : "-translate-y-4"}`}>
          <nav aria-label="Menu" className="flex-1">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="mobile-nav__link block py-3 border-b border-[var(--color-gold)]/15 font-[family-name:var(--font-display)] text-2xl sm:text-3xl tracking-tight transition-colors hover:text-[var(--color-gold)]"
                    style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                  >
                    <span className="eyebrow mr-3 text-[var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-8 border-t border-[var(--color-gold)]/15">
            <p className="eyebrow mb-3">Langue</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LOCALES.map((loc) => {
                const isLaunch = (LAUNCH_LOCALES as readonly string[]).includes(loc);
                return (
                  <li key={loc}>
                    <a
                      href={hrefFor(loc)}
                      hrefLang={loc}
                      aria-current={loc === locale ? "true" : undefined}
                      className={`text-sm tracking-wider ${loc === locale ? "text-[var(--color-gold)]" : "text-[var(--color-bone)]"} ${!isLaunch ? "opacity-50" : ""}`}
                    >
                      {LOCALE_LABELS[loc]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
