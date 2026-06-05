import { useMemo } from "react";
import type { MalaType } from "@/lib/storage";

const MALA_COLORS: Record<MalaType, { unlit: string; lit: string; ring: string }> = {
  rudraksha: { unlit: "#8b5a2b", lit: "#d97706", ring: "#7a2e1a" },
  tulsi: { unlit: "#7a8a5e", lit: "#a3b76a", ring: "#3f4d2a" },
  crystal: { unlit: "#cfd8e3", lit: "#fff1c2", ring: "#7a8aa3" },
  sandalwood: { unlit: "#c9a07a", lit: "#f1c98a", ring: "#7a4d2a" },
};

interface MalaProps {
  count: number;
  malaType: MalaType;
  size?: number;
  /** Number of beads in one round. 108 by default. */
  beads?: number;
}

/**
 * Circular 108-bead mala. Beads light up as `count` increases.
 * After every full round (108), all beads reset and re-light.
 */
export function Mala({ count, malaType, size = 280, beads = 108 }: MalaProps) {
  const colors = MALA_COLORS[malaType];
  const lit = count % beads;
  const radius = size / 2 - 18;
  const center = size / 2;
  const beadR = Math.max(3.5, (2 * Math.PI * radius) / beads / 2.2);
  const rounds = Math.floor(count / beads);

  const positions = useMemo(() => {
    return Array.from({ length: beads }, (_, i) => {
      const angle = (i / beads) * Math.PI * 2 - Math.PI / 2;
      return { x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius };
    });
  }, [beads, center, radius]);

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id={`bead-lit-${malaType}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="60%" stopColor={colors.lit} />
            <stop offset="100%" stopColor={colors.ring} />
          </radialGradient>
          <radialGradient id={`bead-unlit-${malaType}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={colors.unlit} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.ring} />
          </radialGradient>
        </defs>
        {positions.map((p, i) => {
          const isLit = i < lit || (lit === 0 && rounds > 0);
          const isCurrent = i === lit - 1;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={beadR + (isCurrent ? 1.5 : 0)}
              fill={`url(#bead-${isLit ? "lit" : "unlit"}-${malaType})`}
              stroke={colors.ring}
              strokeOpacity={0.35}
              strokeWidth={0.5}
              className={isCurrent ? "animate-bead-pop" : ""}
            />
          );
        })}
        {/* Guru bead */}
        <circle
          cx={center}
          cy={center + radius + 6}
          r={beadR * 1.6}
          fill={colors.ring}
          stroke="#7a2e1a"
          strokeWidth={1}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-display font-semibold text-foreground tabular-nums">
          {count}
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          {rounds > 0 ? `Round ${rounds + 1}` : "chants"}
        </div>
      </div>
    </div>
  );
}
