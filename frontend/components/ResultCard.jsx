"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";

/* ── Transfer-complete stamp SVG ── */
function SuccessStamp({ expired }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      aria-label={expired ? "Transfer expired stamp" : "Transfer complete stamp"}
      role="img"
      className="w-20 h-20 mb-6"
    >
      <defs>
        <filter id="stampGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="12" result="n" />
          <feColorMatrix type="saturate" values="0" in="n" result="gn" />
          <feBlend in="SourceGraphic" in2="gn" mode="multiply" result="b" />
          <feComposite in="b" in2="SourceGraphic" operator="in" />
        </filter>
        <pattern id="stampDots" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="0.9" fill={expired ? "var(--ink)" : "var(--accent)"} opacity="0.25" />
        </pattern>
      </defs>
      <g filter="url(#stampGrain)">
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke={expired ? "var(--ink)" : "var(--accent)"} strokeWidth="3" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="38" fill="none" stroke={expired ? "var(--ink)" : "var(--accent)"} strokeWidth="1" strokeDasharray="4 2" />
        {/* Halftone fill */}
        <circle cx="50" cy="50" r="37" fill="url(#stampDots)" />
        {/* Checkmark or X */}
        {expired ? (
          <>
            <line x1="34" y1="34" x2="66" y2="66" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
            <line x1="66" y1="34" x2="34" y2="66" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <path
            d="M30,50 L44,64 L70,36"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {/* Text arc label */}
        <path
          id="topArc"
          d="M16,50 a34,34 0 0,1 68,0"
          fill="none"
        />
        <text
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "7px", letterSpacing: "3px", textTransform: "uppercase", fill: expired ? "var(--ink)" : "var(--accent)" }}
        >
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            {expired ? "• EXPIRED •" : "• TRANSFER •"}
          </textPath>
        </text>
        <path
          id="bottomArc"
          d="M16,50 a34,34 0 0,0 68,0"
          fill="none"
        />
        <text
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "7px", letterSpacing: "3px", textTransform: "uppercase", fill: expired ? "var(--ink)" : "var(--accent)" }}
        >
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            {expired ? "• FILE GONE •" : "• COMPLETE •"}
          </textPath>
        </text>
      </g>
    </svg>
  );
}

export default function ResultCard({ result, onReset }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [codeCopied, setCodeCopied] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:8000`;

  const expired = timeLeft === "Expired";

  useEffect(() => {
    const updateCountdown = () => {
      const expiresAt = result.expires_at * 1000;
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [result]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(result.code);
    setCodeCopied(true);
    showToast("Code copied!", "success", 2000);
    setTimeout(() => setCodeCopied(false), 600);
  };

  return (
    <div className="card card--shadow animate-fade-in-scale" style={{ padding: "clamp(28px, 5vw, 48px)" }}>
      {/* Success stamp illustration */}
      <div className="flex flex-col items-center text-center">
        <SuccessStamp expired={expired} />

        {/* Eyebrow */}
        <div className="eyebrow mb-4" style={{ color: "var(--ink-60)", justifyContent: "center" }}>
          <span>Transfer Ready</span>
        </div>

        <h2
          className="heading-card text-ink mb-2"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          Your file is <span className="accent-word">secured</span>.
        </h2>
        <p className="body-text body-muted mb-8 text-center" style={{ fontSize: "0.9375rem" }}>
          Share the code or QR link. The recipient downloads the exact, uncompressed original.
        </p>

        {/* Expiry countdown */}
        <div className="flex items-center gap-3 mb-8 py-3 px-5 border border-[var(--ink-12)]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            style={{ color: expired ? "var(--accent)" : "var(--ink-60)", flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="mono-label" style={{ color: "var(--ink-60)" }}>
            Expires in&nbsp;
          </span>
          <span
            className="mono-label font-bold"
            style={{ color: expired ? "var(--accent)" : "var(--ink)", fontWeight: "700" }}
          >
            {timeLeft}
          </span>
        </div>

        {/* Code display — big mono, clickable to copy */}
        <button
          id="copy-code-btn"
          onClick={handleCopyCode}
          className="w-full border-2 border-dashed flex flex-col items-center py-8 px-4 mb-8 transition-all duration-200 cursor-pointer group"
          style={{
            borderColor: codeCopied ? "var(--accent)" : "var(--ink-12)",
            background: codeCopied ? "rgba(240, 71, 28, 0.05)" : "var(--ink-06)",
          }}
          aria-label={`Copy access code ${result.code} to clipboard`}
        >
          <span className="mono-label mb-3" style={{ color: "var(--ink-60)" }}>
            Access Code — click to copy
          </span>
          <span
            className="font-mono font-bold tracking-[0.2em]"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              color: codeCopied ? "var(--accent)" : "var(--ink)",
              transition: "color 0.2s ease, transform 0.2s ease",
              transform: codeCopied ? "scale(1.08)" : "scale(1)",
              display: "block",
              letterSpacing: "0.2em",
            }}
          >
            {result.code}
          </span>
        </button>

        {/* QR + action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
          {/* QR Code */}
          <div
            className="border border-[var(--ink-12)] p-3 shrink-0"
            style={{ background: "white" }}
          >
            <img
              src={`${API_BASE}/qr/${result.code}`}
              alt={`QR code for file access code ${result.code}`}
              width="128"
              height="128"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              id="copy-link-btn"
              onClick={() => { navigator.clipboard.writeText(result.url); showToast("Link copied!"); }}
              className="btn-primary w-full"
              aria-label="Copy shareable link to clipboard"
            >
              Copy Link
            </button>
            <a
              id="open-browser-link"
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary btn-secondary--ink w-full text-center"
              aria-label="Open file link in a new browser tab"
            >
              Open in Browser
            </a>
          </div>
        </div>

        {/* Reset */}
        <button
          id="send-another-btn"
          onClick={onReset}
          className="mt-10 mono-label hover:text-accent transition-colors"
          style={{ color: "var(--ink-60)", borderBottom: "1px solid var(--ink-12)", paddingBottom: "4px" }}
          aria-label="Reset and send another file"
        >
          Send another file →
        </button>
      </div>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
