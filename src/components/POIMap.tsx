import type { PoiCopy } from "~/content/copy";

interface Props {
  pois: PoiCopy[];
  active: number | null;
  onSelect: (index: number | null) => void;
}

// Real geographic projection
// Bounds: N=43.335 / S=43.205 / W=6.575 / E=6.690
// scaleX = 2812.9 (cos(43°) corrected), scaleY = 3846.2, x_margin = 38.3
// L'Arbois: 24 av Général Leclerc, Sainte-Maxime (43.3093°N, 6.6432°E)
const VILLA_X = 230;
const VILLA_Y = 99;
// Port de Saint-Tropez (Sénéquier, quai Jean-Jaurès, 43.2722°N, 6.6378°E)
const FERRY_X = 215;
const FERRY_Y = 242;

export default function POIMap({ pois, active, onSelect }: Props) {
  return (
    <div className="poi-map relative w-full">
      <svg viewBox="0 0 400 500" className="w-full h-auto block" role="img" aria-label="Carte interactive des adresses autour de L’Arbois">
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

        {/* Ste-Maxime peninsula (north) — Cap des Sardinaux bulge east at ~(327, 46) */}
        <path
          d="M0,0 L400,0 L400,30 C390,35 365,38 340,42 C328,48 325,62 332,72 C320,85 290,98 250,108 C220,115 195,118 170,115 C140,114 110,116 80,118 C50,120 25,121 0,122 Z"
          fill="url(#aol-land)"
          stroke="#b8935a"
          strokeOpacity="0.55"
          strokeWidth="0.7"
        />
        <text x="58" y="32" fill="#c9a97a" fontSize="10" letterSpacing="5" fontFamily="Satoshi, sans-serif" opacity="0.5">SAINTE-MAXIME</text>
        <text x="332" y="36" fill="#c9a97a" fontSize="6" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.55">CAP DES SARDINAUX</text>

        {/* Mainland west (Cogolin / interior) — connects Ste-Maxime to St-Tropez peninsula */}
        <path
          d="M0,120 C25,150 45,180 60,210 C75,240 90,265 100,290 L0,300 Z"
          fill="url(#aol-land)"
          stroke="#b8935a"
          strokeOpacity="0.4"
          strokeWidth="0.6"
        />

        {/* St-Tropez peninsula (south) — port at (215, 242), Pampelonne east coast at (259, 412), Ramatuelle inland (109, 442) */}
        <path
          d="M0,500 L400,500 L400,395 C385,400 360,418 332,425 C302,440 280,452 263,460 C240,470 215,468 188,460 C160,452 135,445 110,448 C82,455 52,462 25,460 L0,452 L0,330 C28,318 60,308 90,295 C115,285 140,270 165,260 C190,250 215,240 230,235 C220,230 200,228 178,238 C145,250 110,265 80,275 C50,285 25,290 0,290 Z"
          fill="url(#aol-land)"
          stroke="#b8935a"
          strokeOpacity="0.55"
          strokeWidth="0.7"
        />
        <text x="190" y="478" fill="#c9a97a" fontSize="10" letterSpacing="5" fontFamily="Satoshi, sans-serif" opacity="0.5">SAINT-TROPEZ</text>
        <text x="58" y="468" fill="#c9a97a" fontSize="6" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.5">RAMATUELLE</text>
        <text x="290" y="425" fill="#c9a97a" fontSize="6" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.5">PAMPELONNE</text>

        {/* Permanent ferry route — L’Arbois → St-Tropez port */}
        <path
          className="aol-boat-path"
          d={`M${VILLA_X},${VILLA_Y + 8} Q240,170 ${FERRY_X},${FERRY_Y}`}
          stroke="#b8935a"
          strokeOpacity="0.5"
          strokeWidth="0.9"
          fill="none"
          strokeDasharray="3 6"
        />
        <text x="248" y="172" fill="#c9a97a" fontSize="7" letterSpacing="4" fontFamily="Satoshi, sans-serif" opacity="0.6">15′ · BATEAU</text>

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
                const labelWidth = Math.max(poi.name.length, poi.distance.length) * 4.7 + 18;
                const offsetRight = poi.mapX + labelWidth + 14 < 400;
                const tx = offsetRight ? poi.mapX + 12 : poi.mapX - labelWidth - 12;
                return (
                  <g transform={`translate(${tx}, ${poi.mapY + 2})`}>
                    <rect x="-3" y="-14" width={labelWidth} height="32" fill="#0a0a0a" fillOpacity="0.9" stroke="#b8935a" strokeOpacity="0.6" strokeWidth="0.5" />
                    <text x="4" y="-2" fill="#f7f5f0" fontSize="8.5" letterSpacing="1.5" fontFamily="Gambarino, serif" fontStyle="italic">
                      {poi.name}
                    </text>
                    <text x="4" y="11" fill="#c9a97a" fontSize="6.5" letterSpacing="2" fontFamily="Satoshi, sans-serif" opacity="0.85">
                      {poi.distance.toUpperCase()}
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

      <p className="eyebrow mt-4 text-center text-[var(--color-bone-soft)]/70">
        {active === null ? "Cliquez une adresse pour la découvrir" : pois[active].name}
      </p>
    </div>
  );
}
