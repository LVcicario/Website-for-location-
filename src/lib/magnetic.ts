export function initMagnetic(): void {
  if (typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none)").matches;
  if (reduced || touch) return;

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(attach);
}

function attach(el: HTMLElement): void {
  if (el.dataset.magneticAttached === "1") return;
  el.dataset.magneticAttached = "1";

  let raf = 0;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  const strength = parseFloat(el.dataset.magneticStrength ?? "0.3");
  const max = parseFloat(el.dataset.magneticMax ?? "10");

  const tick = (): void => {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
    if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      el.style.transform = "translate3d(0,0,0)";
      raf = 0;
    }
  };

  const onMove = (e: PointerEvent): void => {
    if (el.matches(":focus-visible")) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * strength;
    const dy = (e.clientY - rect.top - rect.height / 2) * strength;
    tx = Math.max(-max, Math.min(max, dx));
    ty = Math.max(-max, Math.min(max, dy));
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onLeave = (): void => {
    tx = 0;
    ty = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("blur", onLeave);
}
