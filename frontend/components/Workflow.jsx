"use client";

import { useEffect, useRef } from "react";

export default function Workflow() {
  const steps = [
    {
      id: 1,
      label: "01",
      title: "Secure Upload",
      desc: "Drag and drop your asset. Your file is verified locally and prepared for transfer without any destructive compression.",
      /* Woodcut-style upload arrow SVG path */
      iconPath: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    },
    {
      id: 2,
      label: "02",
      title: "Zero-Knowledge Encryption",
      desc: "Before leaving your device, the file is wrapped in an unbreakable encryption layer. We never have the keys to your data.",
      iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      id: 3,
      label: "03",
      title: "Decentralized Storage",
      desc: "The encrypted packet is distributed across high-availability nodes, ensuring it remains safe and accessible globally.",
      iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    },
    {
      id: 4,
      label: "04",
      title: "Frictionless Retrieval",
      desc: "Share your unique 6-digit code or QR link. The recipient connects, downloads, and decrypts the exact bit-for-bit original.",
      iconPath: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    },
  ];

  /* Scroll reveal — IntersectionObserver */
  const sectionRef = useRef(null);
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="workflow-section"
      ref={sectionRef}
      className="bg-highlight section-pad"
      aria-label="How Blynq works"
    >
      <div className="container-main">
        {/* Eyebrow */}
        <div className="eyebrow mb-8 reveal" style={{ color: "var(--ink-60)" }}>
          <span>02 / HOW IT WORKS</span>
        </div>

        {/* Asymmetric heading layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-20 items-end">
          <h2 className="heading-section text-ink leading-none reveal">
            Engineered<br />for Absolute<br />
            <span className="accent-word">Privacy</span>.
          </h2>
          <p className="body-text body-muted reveal" style={{ alignSelf: "end" }}>
            Blynq isn't just another file host. It is a purpose-built pipeline designed to protect intellectual property, large media assets, and sensitive documents from end to end.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="reveal border border-[var(--ink-12)] p-8 flex flex-col gap-5 group hover:bg-[var(--ink-06)] transition-colors duration-200 relative"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Step number — large mono */}
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: "clamp(3rem, 6vw, 4rem)",
                  color: "var(--ink-12)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                  transition: "color 200ms ease",
                }}
              >
                {step.label}
              </span>

              {/* Woodcut icon */}
              <div
                className="w-12 h-12 border border-[var(--ink-12)] flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-200"
                aria-hidden="true"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--ink)" }}
                  className="group-hover:text-paper transition-colors duration-200"
                >
                  <path d={step.iconPath} />
                </svg>
              </div>

              {/* Title */}
              <h3 className="font-body font-bold text-ink" style={{ fontSize: "1rem", letterSpacing: "0.01em", lineHeight: 1.3 }}>
                {step.title}
              </h3>

              {/* Desc */}
              <p className="body-text body-muted" style={{ fontSize: "0.875rem", maxWidth: "none" }}>
                {step.desc}
              </p>

              {/* Connector arrow (desktop, not last item) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center absolute -right-[13px] top-1/2 -translate-y-1/2 z-10"
                  aria-hidden="true"
                >
                  <div
                    className="w-6 h-6 border border-[var(--ink-12)] bg-highlight flex items-center justify-center"
                    style={{ transform: "rotate(45deg)" }}
                  />
                </div>
              )}

              {/* Mobile down arrow */}
              {index < steps.length - 1 && (
                <div className="sm:hidden flex justify-center mt-2" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--ink-60)" }}>
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
