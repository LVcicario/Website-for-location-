import { useState, useRef, useCallback, type WheelEvent, type PointerEvent as RPointerEvent } from "react";
import type { PoiCopy } from "~/content/copy";

interface Props {
  pois: PoiCopy[];
  active: number | null;
  onSelect: (index: number | null) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

// Cartographie réelle (OpenStreetMap, projection equirectangulaire cos(43°))
// Données générées par scripts/build-map.py — ne pas modifier à la main.
// Bounds: lat [43.205, 43.345] · lng [6.560, 6.700]
const VILLA_X = 239;  // L'Arbois (43.3065°N, 6.6452°E) — Nominatim
const VILLA_Y = 137;
const FERRY_X = 224;  // Port St-Tropez · Sénéquier (43.2722°N, 6.6391°E)
const FERRY_Y = 260;
// Côte réelle OSM, simplifiée Douglas-Peucker (tol=1.0px), 236 points
const COAST_PATH = "M 302.6,495.3 L 298.2,487.9 L 302.5,484.0 L 298.4,480.5 L 295.7,481.8 L 294.7,480.4 L 295.6,479.3 L 292.7,479.7 L 289.8,476.1 L 285.8,457.9 L 284.3,423.1 L 288.2,376.5 L 293.2,362.1 L 299.9,355.1 L 305.2,353.7 L 317.5,358.6 L 321.0,358.3 L 327.4,348.3 L 331.8,344.3 L 334.4,345.1 L 338.1,337.8 L 339.7,338.4 L 345.9,333.7 L 356.7,332.8 L 359.3,330.3 L 357.3,325.0 L 358.4,315.5 L 361.1,313.8 L 363.4,302.9 L 367.1,298.6 L 371.4,297.9 L 371.5,293.6 L 374.2,291.0 L 374.4,287.0 L 376.2,280.5 L 375.0,280.0 L 368.7,278.1 L 354.3,259.1 L 346.8,256.0 L 344.8,256.9 L 342.2,254.6 L 340.4,255.4 L 338.4,252.0 L 336.5,252.0 L 330.1,241.0 L 326.5,240.9 L 327.3,237.9 L 325.5,235.5 L 322.7,238.2 L 319.3,237.2 L 315.2,241.0 L 308.2,242.1 L 305.7,245.0 L 302.1,245.8 L 303.5,249.7 L 302.3,254.6 L 303.2,259.1 L 302.1,261.5 L 303.2,272.5 L 299.7,279.0 L 290.9,286.1 L 286.2,286.4 L 269.6,276.5 L 268.5,273.4 L 262.1,267.3 L 259.0,266.0 L 253.1,266.9 L 249.5,264.3 L 248.6,265.5 L 246.2,264.8 L 246.2,260.5 L 241.9,253.9 L 230.1,253.1 L 229.7,255.4 L 227.4,253.4 L 225.2,254.8 L 222.8,253.0 L 207.4,257.4 L 206.9,258.8 L 222.5,254.6 L 223.0,255.7 L 222.5,262.4 L 219.8,263.2 L 216.6,257.5 L 210.6,267.2 L 206.6,265.1 L 208.4,259.6 L 206.0,265.3 L 208.9,267.1 L 207.9,269.1 L 200.0,274.5 L 200.6,275.7 L 197.2,277.8 L 190.3,278.6 L 187.0,277.4 L 187.3,279.7 L 183.6,284.2 L 175.9,288.6 L 167.9,288.2 L 161.8,290.0 L 155.4,287.7 L 150.8,288.0 L 148.7,290.3 L 134.8,292.0 L 130.7,295.0 L 118.7,290.4 L 115.0,291.4 L 112.1,294.6 L 107.9,295.3 L 103.4,294.5 L 98.0,290.2 L 98.9,282.2 L 96.6,273.5 L 93.7,274.7 L 91.4,268.4 L 90.0,268.7 L 88.1,268.3 L 87.2,269.9 L 85.5,268.6 L 85.0,262.5 L 90.1,262.5 L 90.5,261.3 L 83.0,257.8 L 80.9,249.0 L 81.2,239.2 L 82.7,239.6 L 86.0,231.4 L 89.9,227.7 L 91.2,228.5 L 93.4,225.2 L 94.5,226.1 L 96.7,222.9 L 101.6,222.4 L 110.1,216.6 L 111.3,216.5 L 112.3,218.9 L 114.8,216.5 L 116.8,217.4 L 124.1,214.5 L 126.3,208.8 L 129.4,207.6 L 130.4,209.3 L 134.1,204.2 L 144.3,198.0 L 146.1,194.1 L 147.8,195.0 L 148.7,191.6 L 156.2,188.9 L 162.0,181.3 L 166.7,179.1 L 167.5,180.8 L 175.9,174.4 L 181.4,173.2 L 185.5,175.7 L 188.5,166.9 L 190.5,167.2 L 188.6,166.1 L 189.0,160.8 L 190.6,155.2 L 193.1,155.0 L 191.7,153.6 L 193.4,147.9 L 194.9,146.1 L 196.8,146.6 L 199.6,142.9 L 204.4,143.6 L 209.5,136.1 L 218.2,133.7 L 220.5,138.4 L 220.1,134.8 L 223.1,132.9 L 226.6,136.4 L 222.5,138.8 L 223.2,139.9 L 227.4,137.3 L 231.8,140.8 L 229.3,142.1 L 219.2,141.3 L 230.0,142.8 L 232.7,141.1 L 233.0,139.2 L 238.1,138.8 L 242.5,136.5 L 251.3,130.3 L 254.7,125.7 L 276.3,111.0 L 282.9,110.0 L 299.1,116.8 L 306.1,114.3 L 307.5,115.8 L 310.5,112.2 L 311.6,109.7 L 303.9,109.5 L 303.2,106.9 L 301.2,106.5 L 299.7,102.4 L 293.7,96.2 L 291.4,82.1 L 291.5,71.9 L 296.4,68.0 L 298.6,63.5 L 302.8,41.2 L 308.2,36.4 L 310.5,31.5 L 319.1,25.8 L 322.4,25.6 L 330.8,15.8 L 335.8,14.0 L 338.8,14.8 L 338.7,17.1 L 341.7,15.2 L 343.5,18.2 L 343.1,15.2 L 348.8,13.4 L 349.7,16.8 L 343.9,20.3 L 350.0,17.7 L 348.9,12.2 L 353.8,10.1 L 357.8,13.3 L 361.5,13.4 L 362.0,11.9 L 365.4,12.8 L 367.4,14.9 L 365.7,16.5 L 367.2,18.6 L 370.1,17.3 L 369.3,16.7 L 372.0,13.4 L 375.9,12.6 L 375.2,11.5 L 379.7,6.3 L 387.6,4.7 L 390.1,2.4 L 394.6,3.9 L 398.1,2.2";
// Land = coast + closure ouest (créé un polygon fermé pour le fill)
const LAND_PATH = COAST_PATH + " L 398.1,0 L 0,0 L 0,500 L 302.6,500 Z";

export default function POIMap({ pois, active, onSelect }: Props) {
  // viewBox state: x, y (top-left of view), w, h (size of view in original coords)
  // Default = full canvas (no zoom)
  const [view, setView] = useState({ x: 0, y: 0, w: 400, h: 500 });
  const dragRef = useRef<{ startX: number; startY: number; viewX: number; viewY: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const zoom = 400 / view.w;
  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM + 0.01;

  const setZoom = useCallback((newZoom: number, cx = 200, cy = 250) => {
    const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    const newW = 400 / z;
    const newH = 500 / z;
    // Anchor zoom around (cx, cy) in original coords
    setView((prev) => {
      const fx = (cx - prev.x) / prev.w;
      const fy = (cy - prev.y) / prev.h;
      let nx = cx - fx * newW;
      let ny = cy - fy * newH;
      nx = Math.max(0, Math.min(400 - newW, nx));
      ny = Math.max(0, Math.min(500 - newH, ny));
      return { x: nx, y: ny, w: newW, h: newH };
    });
  }, []);

  const reset = useCallback(() => setView({ x: 0, y: 0, w: 400, h: 500 }), []);

  const onWheel = useCallback((e: WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // Convert mouse position to SVG coords (within current view)
    const mx = view.x + ((e.clientX - rect.left) / rect.width) * view.w;
    const my = view.y + ((e.clientY - rect.top) / rect.height) * view.h;
    const factor = e.deltaY > 0 ? 0.85 : 1.18;
    setZoom(zoom * factor, mx, my);
  }, [view, zoom, setZoom]);

  const onPointerDown = useCallback((e: RPointerEvent<SVGSVGElement>) => {
    if (zoom <= MIN_ZOOM + 0.01) return;
    const target = e.target as Element;
    if (target.closest('[data-poi-marker]')) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, viewX: view.x, viewY: view.y };
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  }, [view, zoom]);

  const onPointerMove = useCallback((e: RPointerEvent<SVGSVGElement>) => {
    if (!dragRef.current) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((e.clientX - dragRef.current.startX) / rect.width) * view.w;
    const dy = ((e.clientY - dragRef.current.startY) / rect.height) * view.h;
    setView({
      x: Math.max(0, Math.min(400 - view.w, dragRef.current.viewX - dx)),
      y: Math.max(0, Math.min(500 - view.h, dragRef.current.viewY - dy)),
      w: view.w,
      h: view.h,
    });
  }, [view]);

  const onPointerUp = useCallback(() => { dragRef.current = null; }, []);

  return (
    <div className="poi-map relative w-full">
      <svg
        ref={svgRef}
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        className="w-full h-auto block touch-none"
        role="img"
        aria-label="Carte interactive des adresses autour de L’Arbois"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: zoom > MIN_ZOOM + 0.01 ? (dragRef.current ? "grabbing" : "grab") : "default" }}
      >
        <defs>
          <linearGradient id="aol-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e1e33" />
            <stop offset="100%" stopColor="#050a14" />
          </linearGradient>
          <linearGradient id="aol-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a97a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b8935a" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="aol-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#b8935a" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#b8935a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#b8935a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aol-active-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#c9a97a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b8935a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill="url(#aol-sea)" />

        {/* Water ripples — subtle drift */}
        <g stroke="#b8935a" strokeOpacity="0.08" strokeWidth="0.4" fill="none">
          <path className="aol-tide" d="M0,240 Q100,235 200,240 T400,240" />
          <path className="aol-tide aol-tide--b" d="M0,280 Q100,275 200,280 T400,280" />
          <path className="aol-tide aol-tide--c" d="M0,320 Q100,315 200,320 T400,320" />
        </g>

        {/* Land mass (côte réelle OSM) — fill avec gradient + stroke fin */}
        <path
          d={LAND_PATH}
          fill="url(#aol-land)"
          stroke="#b8935a"
          strokeOpacity="0.7"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        {/* Labels géographiques */}
        <text x="100" y="100" fill="#c9a97a" fontSize="10" letterSpacing="5" fontFamily="Satoshi, sans-serif" opacity="0.55">SAINTE-MAXIME</text>
        <text x="345" y="50" fill="#c9a97a" fontSize="6" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.6">CAP DES SARDINAUX</text>
        <text x="180" y="320" fill="#c9a97a" fontSize="10" letterSpacing="5" fontFamily="Satoshi, sans-serif" opacity="0.55">SAINT-TROPEZ</text>
        <text x="100" y="475" fill="#c9a97a" fontSize="6" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.55">RAMATUELLE</text>
        <text x="270" y="430" fill="#c9a97a" fontSize="6" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.55">PAMPELONNE</text>

        {/* Permanent ferry route — L’Arbois → St-Tropez port */}
        <path
          className="aol-boat-path"
          d={`M${VILLA_X},${VILLA_Y + 8} Q255,200 ${FERRY_X},${FERRY_Y}`}
          stroke="#b8935a"
          strokeOpacity="0.5"
          strokeWidth="0.9"
          fill="none"
          strokeDasharray="3 6"
        />
        <text x="265" y="205" fill="#c9a97a" fontSize="7" letterSpacing="4" fontFamily="Satoshi, sans-serif" opacity="0.6">15′ · BATEAU</text>

        {/* Link line from L’Arbois to active POI */}
        {active !== null && pois[active] && (
          <line
            key={`link-${active}`}
            className="aol-link-line--reveal"
            x1={VILLA_X}
            y1={VILLA_Y}
            x2={pois[active].mapX}
            y2={pois[active].mapY}
            stroke="#c9a97a"
            strokeOpacity="0.85"
            strokeWidth="1"
            fill="none"
            pathLength="300"
          />
        )}

        {/* Walking radius zones around L’Arbois (visual hint of pedestrian range) */}
        <circle cx={VILLA_X} cy={VILLA_Y} r="32" fill="none" stroke="#c9a97a" strokeOpacity="0.18" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx={VILLA_X} cy={VILLA_Y} r="55" fill="none" stroke="#c9a97a" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 4" />

        {/* L’Arbois center — double pulse ring + glow */}
        <g>
          <circle className="aol-villa-ring" cx={VILLA_X} cy={VILLA_Y} r="9" fill="none" stroke="#b8935a" strokeOpacity="0.35" />
          <circle className="aol-villa-ring aol-villa-ring--b" cx={VILLA_X} cy={VILLA_Y} r="9" fill="none" stroke="#b8935a" strokeOpacity="0.35" />
          <circle className="aol-villa-ring aol-villa-ring--c" cx={VILLA_X} cy={VILLA_Y} r="9" fill="none" stroke="#b8935a" strokeOpacity="0.35" />
          <circle className="aol-villa-glow" cx={VILLA_X} cy={VILLA_Y} r="8" fill="url(#aol-glow)" />
          <circle cx={VILLA_X} cy={VILLA_Y} r="5" fill="#b8935a" />
          <circle cx={VILLA_X} cy={VILLA_Y} r="1.8" fill="#f7f5f0" />
        </g>
        <text x={VILLA_X + 12} y={VILLA_Y - 3} fill="#c9a97a" fontSize="9" letterSpacing="3" fontFamily="Gambarino, serif" fontStyle="italic">L’Arbois</text>
        <text x={VILLA_X + 12} y={VILLA_Y + 8} fill="#c9a97a" fontSize="6" letterSpacing="3" fontFamily="Satoshi, sans-serif" opacity="0.7">SAINTE-MAXIME</text>

        {/* POI markers */}
        {pois.map((poi, i) => {
          const isActive = active === i;
          const color = poi.transport === "foot"
            ? "#c9a97a"
            : poi.transport === "boat"
              ? "#b8935a"
              : "#8a6a3e";
          return (
            <g
              key={i}
              data-poi-marker="true"
              className={`aol-poi-marker ${isActive ? "aol-poi-marker--active" : ""}`}
              style={{ cursor: "pointer", animationDelay: `${180 + i * 80}ms` }}
              onClick={() => onSelect(isActive ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(isActive ? null : i);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${poi.name} — ${poi.distance}`}
              aria-pressed={isActive}
            >
              {isActive && (
                <circle
                  className="aol-poi-halo"
                  cx={poi.mapX}
                  cy={poi.mapY}
                  r="14"
                  fill="url(#aol-active-glow)"
                />
              )}
              <circle
                className="aol-poi-dot"
                cx={poi.mapX}
                cy={poi.mapY}
                r={isActive ? 6 : 4}
                fill={color}
                stroke={isActive ? "#f7f5f0" : "none"}
                strokeWidth="1"
                style={{ transition: "r 280ms var(--ease-gentle), fill 280ms var(--ease-gentle)" }}
              />
              <circle
                cx={poi.mapX}
                cy={poi.mapY}
                r="12"
                fill="transparent"
              />
              {isActive && (() => {
                const distText = poi.distance.toUpperCase();
                const w = Math.max(poi.name.length * 5.4, distText.length * 4.6) + 20;
                const right = poi.mapX + w + 16 < 400;
                const tx = right ? poi.mapX + 10 : poi.mapX - w - 10;
                const ty = poi.mapY;
                const anchor = right ? "start" : "end";
                const textX = right ? tx + 6 : tx + w - 6;
                const lineX1 = right ? poi.mapX + 4 : tx + w;
                const lineX2 = right ? tx : poi.mapX - 4;
                return (
                  <g className="aol-poi-label" pointerEvents="none">
                    {/* Connector hairline du marker au label */}
                    <line
                      x1={lineX1} y1={ty}
                      x2={lineX2} y2={ty}
                      stroke="#c9a97a" strokeOpacity="0.45" strokeWidth="0.4"
                      strokeDasharray="1.5 1.5"
                    />
                    {/* Filet doré vertical (accent) */}
                    <line
                      x1={right ? tx : tx + w} y1={ty - 11}
                      x2={right ? tx : tx + w} y2={ty + 11}
                      stroke="#c9a97a" strokeOpacity="0.85" strokeWidth="0.7"
                    />
                    {/* Nom — Gambarino italique */}
                    <text
                      x={textX} y={ty - 1}
                      fill="#f7f5f0" fontSize="9" letterSpacing="0.3"
                      fontFamily="Gambarino, Fraunces, serif" fontStyle="italic"
                      textAnchor={anchor}
                    >
                      {poi.name}
                    </text>
                    {/* Distance — eyebrow tracking large */}
                    <text
                      x={textX} y={ty + 9}
                      fill="#c9a97a" fontSize="5.5" letterSpacing="2.5"
                      fontFamily="Satoshi, sans-serif" opacity="0.8"
                      textAnchor={anchor}
                    >
                      {distText}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(365, 45)">
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#b8935a" strokeWidth="0.5" strokeOpacity="0.6" />
          <polygon points="0,-17 -3,-9 3,-9" fill="#b8935a" opacity="0.8" />
          <text x="0" y="-21" fill="#c9a97a" fontSize="8" textAnchor="middle" letterSpacing="2">N</text>
        </g>

        {/* Legend transport */}
        <g transform="translate(20, 235)" fontFamily="Satoshi, sans-serif" fontSize="6" letterSpacing="2" fill="#c9a97a">
          <text y="0" opacity="0.5">LÉGENDE</text>
          <g transform="translate(0, 12)">
            <circle cx="3" cy="-2" r="3" fill="#c9a97a" />
            <text x="11" y="0" opacity="0.85">À PIED</text>
          </g>
          <g transform="translate(0, 24)">
            <circle cx="3" cy="-2" r="3" fill="#b8935a" />
            <text x="11" y="0" opacity="0.85">EN BATEAU</text>
          </g>
          <g transform="translate(0, 36)">
            <circle cx="3" cy="-2" r="3" fill="#8a6a3e" />
            <text x="11" y="0" opacity="0.85">EN VOITURE</text>
          </g>
          <g transform="translate(0, 50)">
            <circle cx="3" cy="-2" r="3" fill="none" stroke="#c9a97a" strokeWidth="0.5" strokeDasharray="1 1.5" />
            <text x="11" y="0" opacity="0.7">5 / 10 MIN À PIED</text>
          </g>
        </g>

        {/* Grid */}
        <g stroke="#f7f5f0" strokeOpacity="0.04" strokeWidth="0.4">
          <line x1="0" y1="250" x2="400" y2="250" />
          <line x1="200" y1="0" x2="200" y2="500" />
        </g>

        {/* Bottom caption */}
        <text x="200" y="492" fill="#f7f5f0" opacity="0.28" fontSize="7" textAnchor="middle" letterSpacing="4" fontFamily="Satoshi, sans-serif">GOLFE DE SAINT-TROPEZ</text>
      </svg>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
        <button
          type="button"
          onClick={() => setZoom(zoom * 1.4)}
          disabled={!canZoomIn}
          className="w-9 h-9 flex items-center justify-center bg-[var(--color-ink)]/85 border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoomer"
        >
          <span aria-hidden="true" className="text-lg leading-none">+</span>
        </button>
        <button
          type="button"
          onClick={() => setZoom(zoom / 1.4)}
          disabled={!canZoomOut}
          className="w-9 h-9 flex items-center justify-center bg-[var(--color-ink)]/85 border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Dézoomer"
        >
          <span aria-hidden="true" className="text-lg leading-none">−</span>
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={!canZoomOut}
          className="w-9 h-9 flex items-center justify-center bg-[var(--color-ink)]/85 border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition text-[10px] tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Vue d'ensemble"
        >
          1:1
        </button>
      </div>

      <p className="eyebrow mt-4 text-center text-[var(--color-bone-soft)]/70">
        {active === null
          ? `Molette pour zoomer · Glisser pour déplacer · Cliquez une adresse${zoom > 1.05 ? ` · ×${zoom.toFixed(1)}` : ""}`
          : pois[active].name}
      </p>
    </div>
  );
}
