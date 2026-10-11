type Tone = "dark" | "light";

// tone="dark" is for navy backgrounds (header, footer); tone="light" for white/sand backgrounds.
const palette = {
  dark: { roof: "#f2f6f7", tide: "text-night-ink", safe: "text-teal-300" },
  light: { roof: "#01254b", tide: "text-brand-navy", safe: "text-teal-600" },
} as const;

export function LogoMark({ tone = "light", className = "" }: { tone?: Tone; className?: string }) {
  return (
    <svg viewBox="0 0 770 465" className={className} aria-hidden="true">
      <path
        fill={palette[tone].roof}
        d="M58 245L397 7L560 120V59H635V177L733 251H658L397 67L170 222Q110 226 58 245Z"
      />
      <g fill="#c4a987">
        <rect x="356" y="151" width="36" height="34" />
        <rect x="400" y="151" width="36" height="34" />
        <rect x="356" y="197" width="36" height="35" />
        <rect x="400" y="197" width="36" height="35" />
      </g>
      <path
        fill="#2dc2cf"
        d="M13 347C70 285 150 247 220 247C330 247 470 315 570 320C660 325 720 308 755 285C710 330 640 372 530 372C410 372 300 310 190 297C110 290 50 315 13 347Z"
      />
      <path
        fill="#027c99"
        d="M8 398C60 350 130 324 200 324C330 324 430 400 530 399C630 398 695 360 728 338C670 420 580 454 470 454C330 454 240 375 130 372C70 370 35 382 8 398Z"
      />
    </svg>
  );
}

export default function Logo({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  const p = palette[tone];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} className="h-8 w-auto" />
      <span className="text-[1.375rem] leading-none font-extrabold tracking-tight">
        <span className={p.tide}>Tide</span>
        <span className={p.safe}>Safe</span>
      </span>
    </span>
  );
}
