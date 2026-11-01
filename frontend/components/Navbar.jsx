"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-[var(--ink)] border-b border-[var(--paper-12)]" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="container-main h-16 flex items-center justify-between">
          {/* Logo + Wordmark */}
          <a href="/" className="flex items-center gap-2.5 group" aria-label="Blynq home">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-7 w-auto object-contain"
            />
            <span
              className="font-display text-2xl tracking-[var(--ls-display)] text-[var(--paper)] uppercase leading-none"
              style={{ letterSpacing: "0.04em" }}
            >
              Blynq
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#workflow-section"
              className="mono-label mono-label text-[var(--paper-60)] hover:text-[var(--paper)] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#upload-section"
              className="btn-primary text-sm"
              style={{ padding: "10px 22px" }}
              aria-label="Send a file"
            >
              Send a File
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={mobileOpen}
          >
            <span className="w-6 h-[1.5px] bg-[var(--paper)]" />
            <span className="w-6 h-[1.5px] bg-[var(--paper)]" />
            <span className="w-4 h-[1.5px] bg-[var(--paper)]" />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu — ink overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[200] bg-ink flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Close */}
          <div className="container-main h-16 flex items-center justify-between">
            <span className="font-display text-2xl text-paper uppercase" style={{ letterSpacing: "0.04em" }}>
              Blynq
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-paper p-2"
              aria-label="Close mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center container-main gap-8 pb-16">
            <hr className="hairline hairline--light" />
            <a
              href="#workflow-section"
              onClick={() => setMobileOpen(false)}
              className="font-display text-[clamp(2.5rem,12vw,4rem)] text-paper uppercase tracking-display leading-none hover:text-accent transition-colors"
            >
              How It Works
            </a>
            <hr className="hairline hairline--light" />
            <a
              href="#upload-section"
              onClick={() => setMobileOpen(false)}
              className="font-display text-[clamp(2.5rem,12vw,4rem)] text-paper uppercase tracking-display leading-none hover:text-accent transition-colors"
            >
              Send a File
            </a>
            <hr className="hairline hairline--light" />
          </div>

          <div className="container-main pb-10">
            <p className="mono-label eyebrow--light" style={{ "--before-display": "none" }}>
              © {new Date().getFullYear()} Blynq
            </p>
          </div>
        </div>
      )}
    </>
  );
}
