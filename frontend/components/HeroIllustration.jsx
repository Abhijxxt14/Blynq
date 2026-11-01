/**
 * HeroIllustration — Inline SVG
 * Style: vintage line-art / data network skyline
 * Colors: --ink + --accent + --paper only
 * Technique: SVG feTurbulence grain, visible strokes, halftone dots
 * Subject: abstract file/data transfer scene — satellite dish, network nodes,
 *           signal cables, a vintage rocket mascot, city-like skyline of server towers.
 */
export default function HeroIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 480"
      aria-label="Line-art illustration of a data transmission network: server towers, signal cables, and a rocket mascot representing instant file delivery"
      role="img"
      className="w-full h-auto float-slow"
      style={{ maxWidth: "560px" }}
    >
      <defs>
        {/* Grain filter */}
        <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            seed="8"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Halftone dot pattern */}
        <pattern id="halftone" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.2" fill="var(--accent)" opacity="0.35" />
        </pattern>

        {/* Accent halftone */}
        <pattern id="halftoneInk" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1" fill="var(--ink)" opacity="0.18" />
        </pattern>

        <clipPath id="svgClip">
          <rect width="560" height="480" />
        </clipPath>
      </defs>

      <g clipPath="url(#svgClip)" filter="url(#grain)">

        {/* ── BACKGROUND HALFTONE BAND (bottom) ── */}
        <rect x="0" y="340" width="560" height="140" fill="url(#halftone)" />

        {/* ── GROUND / BASE LINE ── */}
        <line x1="0" y1="390" x2="560" y2="390" stroke="var(--accent)" strokeWidth="2" />

        {/* ── SERVER TOWER 1 (far left) ── */}
        <rect x="30" y="270" width="52" height="120" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        {/* floors */}
        {[285, 300, 315, 330, 345, 360, 375].map((y, i) => (
          <line key={i} x1="30" y1={y} x2="82" y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
        ))}
        {/* window slots */}
        <rect x="38" y="278" width="10" height="6" fill="var(--accent)" opacity="0.8" />
        <rect x="54" y="278" width="10" height="6" fill="var(--ink)" opacity="0.3" />
        <rect x="38" y="292" width="10" height="6" fill="var(--ink)" opacity="0.3" />
        <rect x="54" y="292" width="10" height="6" fill="var(--accent)" opacity="0.6" />
        {/* antenna */}
        <line x1="56" y1="270" x2="56" y2="248" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="56" cy="246" r="4" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <circle cx="56" cy="246" r="1.5" fill="var(--accent)" />

        {/* ── SERVER TOWER 2 (main center-left) ── */}
        <rect x="115" y="200" width="72" height="190" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        {[220, 240, 260, 280, 300, 320, 340, 360, 378].map((y, i) => (
          <line key={i} x1="115" y1={y} x2="187" y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.4" />
        ))}
        {/* Big LED panel */}
        <rect x="124" y="208" width="54" height="28" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
        {/* LED dots */}
        {[0,1,2,3].map(col => [0,1,2].map(row => (
          <circle key={`${col}-${row}`} cx={130 + col*12} cy={216 + row*8} r="2" fill="var(--accent)" opacity={col + row === 0 ? 1 : 0.4} />
        )))}
        <rect x="124" y="244" width="20" height="10" fill="var(--ink)" opacity="0.2" />
        <rect x="150" y="244" width="28" height="10" fill="var(--accent)" opacity="0.5" />
        {/* Ventilation slits */}
        {[262, 270, 278].map((y, i) => (
          <line key={i} x1="124" y1={y} x2="168" y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.3" />
        ))}
        {/* Antenna mast */}
        <line x1="151" y1="200" x2="151" y2="168" stroke="var(--ink)" strokeWidth="2.5" />
        <line x1="151" y1="168" x2="131" y2="184" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="151" y1="168" x2="171" y2="184" stroke="var(--ink)" strokeWidth="1.5" />
        {/* Signal arcs */}
        <path d="M151,168 m-18,0 a18,18 0 0,1 36,0" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.7" />
        <path d="M151,168 m-28,0 a28,28 0 0,1 56,0" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />

        {/* ── SERVER TOWER 3 (right-center) ── */}
        <rect x="330" y="240" width="60" height="150" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        {[258, 274, 290, 306, 322, 338, 356, 374].map((y, i) => (
          <line key={i} x1="330" y1={y} x2="390" y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.4" />
        ))}
        <rect x="338" y="248" width="44" height="18" fill="var(--ink)" opacity="0.08" stroke="var(--ink)" strokeWidth="1" />
        {[0,1,2].map(i => (
          <circle key={i} cx={344 + i * 14} cy={257} r="3" fill={i===0 ? "var(--accent)" : "var(--ink)"} opacity={i===0 ? 1 : 0.3} />
        ))}
        {/* Small antenna */}
        <line x1="360" y1="240" x2="360" y2="220" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="360" cy="218" r="3" fill="none" stroke="var(--accent)" strokeWidth="1.5" />

        {/* ── SERVER TOWER 4 (far right, small) ── */}
        <rect x="450" y="300" width="44" height="90" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        {[316, 330, 344, 360, 376].map((y, i) => (
          <line key={i} x1="450" y1={y} x2="494" y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.4" />
        ))}
        <rect x="457" y="306" width="30" height="12" fill="var(--highlight)" opacity="0.6" stroke="var(--ink)" strokeWidth="1" />
        <line x1="472" y1="300" x2="472" y2="282" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="472" cy="280" r="3" fill="var(--accent)" />

        {/* ── SIGNAL CABLES between towers ── */}
        {/* Cable 1: Tower1 antenna → Tower2 */}
        <path
          d="M56,246 C90,220 110,215 151,168"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.6"
        />
        {/* Cable 2: Tower2 → Tower3 */}
        <path
          d="M187,250 C240,230 290,230 330,260"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.4"
        />
        {/* Cable 3: Tower3 → Tower4 */}
        <path
          d="M390,280 C410,265 435,270 450,300"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.5"
        />
        {/* Drooping cable bottom */}
        <path
          d="M82,320 C150,370 260,370 330,320"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1"
          opacity="0.2"
        />

        {/* ── NETWORK NODES (floating data packets) ── */}
        {/* Node 1 */}
        <g transform="translate(248, 190)">
          <rect x="-22" y="-14" width="44" height="28" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="-14" y1="-5" x2="14" y2="-5" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
          <line x1="-14" y1="0" x2="8" y2="0" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="-14" y1="5" x2="14" y2="5" stroke="var(--ink)" strokeWidth="1" opacity="0.3" />
        </g>
        {/* Node 2 */}
        <g transform="translate(420, 210)">
          <rect x="-18" y="-12" width="36" height="24" rx="3" fill="var(--highlight)" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="var(--ink)" opacity="0.3" />
          <line x1="6" y1="-5" x2="14" y2="-5" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
          <line x1="6" y1="0" x2="14" y2="0" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
          <line x1="6" y1="5" x2="14" y2="5" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
        </g>
        {/* Node 3 — status chip */}
        <g transform="translate(280, 150)">
          <rect x="-30" y="-10" width="60" height="20" rx="10" fill="var(--accent)" />
          <circle cx="-18" cy="0" r="3" fill="var(--paper)" opacity="0.8" />
          <line x1="-10" y1="-4" x2="20" y2="-4" stroke="var(--paper)" strokeWidth="1" opacity="0.8" />
          <line x1="-10" y1="4" x2="12" y2="4" stroke="var(--paper)" strokeWidth="1" opacity="0.6" />
        </g>

        {/* ── ROCKET MASCOT (center-right, floating) ── */}
        <g transform="translate(490, 155)">
          {/* Body */}
          <ellipse cx="0" cy="0" rx="18" ry="34" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          {/* Nose cone */}
          <path d="M-18,0 Q0,-52 18,0" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
          {/* Window porthole */}
          <circle cx="0" cy="4" r="9" fill="none" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="0" cy="4" r="5" fill="var(--ink)" opacity="0.12" />
          <circle cx="-2" cy="2" r="2" fill="var(--paper)" opacity="0.6" />
          {/* Fins */}
          <path d="M-18,18 L-32,42 L-18,34" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
          <path d="M18,18 L32,42 L18,34" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
          {/* Belly band */}
          <rect x="-18" y="10" width="36" height="6" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.3" />
          {/* Exhaust plume */}
          <path d="M-10,34 Q0,56 10,34" fill="var(--highlight)" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M-5,40 Q0,62 5,40" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1" opacity="0.6" />
          {/* Speed lines */}
          <line x1="-38" y1="-10" x2="-26" y2="-10" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
          <line x1="-42" y1="0" x2="-28" y2="0" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
          <line x1="-36" y1="10" x2="-26" y2="10" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
        </g>

        {/* ── ORBITAL DOTTED RING around rocket ── */}
        <ellipse
          cx="490"
          cy="155"
          rx="60"
          ry="22"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.25"
          transform="rotate(-15, 490, 155)"
        />

        {/* ── SCATTERED DATA DOTS (halftone feel) ── */}
        {[
          [95, 175], [220, 115], [350, 130], [430, 165],
          [60, 355], [195, 350], [300, 355], [440, 345],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="var(--accent)" opacity={0.25 + (i % 3) * 0.15} />
        ))}

        {/* ── GROUND HALFTONE DOTS ── */}
        <rect x="0" y="390" width="560" height="90" fill="url(#halftoneInk)" />

        {/* ── FOREGROUND ACCENT LINE (bottom edge — the "skyline" stroke) ── */}
        <polyline
          points="0,390 30,390 30,330 82,330 82,390 115,390 115,280 187,280 187,390 260,390 260,390 330,390 330,280 390,280 390,390 450,390 450,340 494,340 494,390 560,390"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}
