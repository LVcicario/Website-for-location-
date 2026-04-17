import type { PoiCopy } from "~/content/copy";

interface Props {
  pois: PoiCopy[];
  active: number | null;
  onSelect: (index: number | null) => void;
}

const VILLA_X = 200;
const VILLA_Y = 150;

export default function POIMap({ pois, active, onSelect }: Props) {
  return (
    <div className="poi-map relative w-full">
      <svg viewBox="0 0 400 500" className="w-full h-auto block" role="img" aria-label="Carte interactive des adresses autour de L'Arbois">
        <defs>
          <linearGradient id="aol-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e1e33" />
            <stop offset="100%" stopColor="#050a14" />
          </linearGradient>
          <linearGradient id="aol-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a97a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#b8935a" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="aol-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#b8935a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b8935a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill="url(#aol-sea)" />

        <path
          d="M0,0 L400,0 L400,130 C340,135 290,175 230,185 C170,195 110,170 40,185 L0,185 Z"
          fill="url(#aol-land)"
          stroke="#b8935a"
          strokeOpacity="0.55"
          strokeWidth="0.7"
        />
        <text x="60" y="40" fill="#c9a97a" fontSize="10" letterSpacing="5" fontFamily="Satoshi, sans-serif" opacity="0.5">SAINTE-MAXIME</text>

        <path
          d="M0,500 L400,500 L400,385 C360,372 320,350 280,345 C240,340 200,360 160,370 C120,380 80,372 40,385 L0,390 Z"
          fill="url(#aol-land)"
          stroke="#b8935a"
          strokeOpacity="0.55"
          strokeWidth="0.7"
        />
        <text x="220" y="475" fill="#c9a97a" fontSize="10" letterSpacing="5" fontFamily="Satoshi, sans-serif" opacity="0.5">SAINT-TROPEZ</text>

        {/* Subtle water lines */}
        <g stroke="#b8935a" strokeOpacity="0.06" strokeWidth="0.4" fill="none">
          <path d="M0,240 Q100,235 200,240 T400,240" />
          <path d="M0,280 Q100,275 200,280 T400,280" />
        </g>

        {/* Villa Azur center marker */}
        <g>
          <circle cx={VILLA_X} cy={VILLA_Y} r="5" fill="#b8935a" />
          <circle cx={VILLA_X} cy={VILLA_Y} r="12" fill="none" stroke="#b8935a" strokeOpacity="0.35" />
          <text x={VILLA_X + 10} y={VILLA_Y - 3} fill="#c9a97a" fontSize="9" letterSpacing="3" fontFamily="Gambarino, serif" fontStyle="italic">Villa Azur</text>
        </g>

        {/* Connection lines from Villa Azur to active POI */}
        {active !== null && pois[active] && (
          <line
            x1={VILLA_X}
            y1={VILLA_Y}
            x2={pois[active].mapX}
            y2={pois[active].mapY}
            stroke="#b8935a"
            strokeOpacity="0.5"
            strokeWidth="0.7"
            strokeDasharray="3 4"
          />
        )}

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
              className="poi-marker"
              style={{ cursor: "pointer" }}
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
                <circle cx={poi.mapX} cy={poi.mapY} r="16" fill="url(#aol-glow)">
                  <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={poi.mapX}
                cy={poi.mapY}
                r={isActive ? 6 : 4}
                fill={color}
                stroke={isActive ? "#f7f5f0" : "none"}
                strokeWidth="1"
                style={{ transition: "r 300ms ease" }}
              />
              {isActive && (
                <g transform={`translate(${poi.mapX + 12}, ${poi.mapY + 4})`}>
                  <rect x="-2" y="-12" width="120" height="20" fill="#0a0a0a" fillOpacity="0.85" />
                  <text x="4" y="2" fill="#c9a97a" fontSize="8" letterSpacing="2" fontFamily="Satoshi, sans-serif">
                    {poi.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(365, 45)">
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#b8935a" strokeWidth="0.5" strokeOpacity="0.6" />
          <polygon points="0,-17 -3,-9 3,-9" fill="#b8935a" opacity="0.8" />
          <text x="0" y="-21" fill="#c9a97a" fontSize="8" textAnchor="middle" letterSpacing="2">N</text>
        </g>

        {/* Grid */}
        <g stroke="#f7f5f0" strokeOpacity="0.04" strokeWidth="0.4">
          <line x1="0" y1="250" x2="400" y2="250" />
          <line x1="200" y1="0" x2="200" y2="500" />
        </g>
      </svg>

      <p className="eyebrow mt-4 text-center text-[var(--color-bone-soft)]/70">Cliquez une adresse pour la découvrir</p>
    </div>
  );
}
