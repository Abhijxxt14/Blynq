"use client";

import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section
      className="bg-ink relative overflow-hidden"
      aria-label="Hero section"
      style={{ paddingTop: "clamp(100px, 14vw, 160px)", paddingBottom: "clamp(60px, 10vw, 120px)" }}
    >
      {/* Thin accent top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent"
        aria-hidden="true"
      />

      <div className="container-main">
        {/*
          Two-column split — strict 50/50 on lg+
          Left: headline + body + CTA
          Right: illustration pinned to bottom-right
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-end">

          {/* ── LEFT COLUMN — text ── */}
          <div className="flex flex-col items-start">

            {/* Eyebrow label */}
            <div className="eyebrow eyebrow--light mb-6 stagger-1">
              <span>01 / WHAT WE DO</span>
            </div>

            {/* Giant headline — scaled to fit a ~50% column */}
            <h1
              className="text-paper uppercase mb-8 stagger-2"
              aria-label="The frictionless way to move massive files globally."
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(3.25rem, 6.5vw, 7.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="block stagger-2">The</span>
              <span className="block stagger-3">
                <span className="accent-word">frictionless</span>
              </span>
              <span className="block stagger-4">way to move</span>
              <span className="block stagger-5">massive files.</span>
            </h1>

            {/* Body + chips + CTA */}
            <div className="stagger-5">
              <p className="body-text body-muted--light mb-8 max-w-[44ch]">
                Blynq eliminates the bottleneck of traditional file sharing. Upload gigabytes of data securely, share the encrypted link instantly, and retrieve the exact, uncompressed file with absolute fidelity.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <span className="chip chip--accent">Zero Compression</span>
                <span className="chip" style={{ borderColor: "var(--paper-12)", color: "var(--paper-60)" }}>
                  Up to 5 GB
                </span>
                <span className="chip" style={{ borderColor: "var(--paper-12)", color: "var(--paper-60)" }}>
                  5-hour window
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  document.getElementById("workflow-section")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-secondary"
                aria-label="Scroll to How It Works"
              >
                Explore How it Works
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M8 3v10M3 8l5 5 5-5" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN — illustration, flush right, aligned to bottom ── */}
          <div
            className="hidden lg:flex items-end justify-end stagger-4 self-end"
            aria-hidden="true"
          >
            <HeroIllustration />
          </div>
        </div>

        {/* Mobile: illustration below text */}
        <div className="lg:hidden mt-10 -mx-2" aria-hidden="true">
          <HeroIllustration />
        </div>
      </div>

      {/* Bottom accent gradient stroke */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, var(--accent) 0%, transparent 60%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
