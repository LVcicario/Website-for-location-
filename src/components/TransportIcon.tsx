import type { Transport } from "~/content/copy";

interface Props {
  transport: Transport;
  size?: number;
  className?: string;
}

export default function TransportIcon({ transport, size = 16, className = "" }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  if (transport === "foot") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="13" cy="5.5" r="1.8" />
        <path d="M11.5 9l-2 4.5h3l2 4.5 2 2" />
        <path d="M14.5 13l1.5 1 1.5 -1" />
        <path d="M9 19l2-3" />
      </svg>
    );
  }
  if (transport === "boat") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 16l.8 2a2 2 0 0 0 1.9 1.3h10.6a2 2 0 0 0 1.9-1.3l.8-2" />
        <path d="M4 16h16l-2-4H6l-2 4z" />
        <path d="M12 3v9" />
        <path d="M12 4l6 8" />
      </svg>
    );
  }
  // car
  return (
    <svg {...common} aria-hidden="true">
      <path d="M3 14h18v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1z" />
      <path d="M5 14l1.5-4a2 2 0 0 1 1.9-1.4h7.2A2 2 0 0 1 17.5 10L19 14" />
      <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
