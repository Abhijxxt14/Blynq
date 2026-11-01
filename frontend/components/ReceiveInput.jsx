"use client";

import { useState } from "react";

export default function ReceiveInput({ disabled }) {
  const [code, setCode] = useState("");

  const handleAccess = () => {
    if (code.length === 6) {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL ||
        `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:8000`;
      window.open(`${API_BASE}/file/${code}`, "_blank");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAccess();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Section label */}
      <div className="eyebrow" style={{ color: "var(--ink-60)" }}>
        <span>Retrieve File</span>
      </div>

      <p className="body-text body-muted" style={{ fontSize: "0.875rem", maxWidth: "none" }}>
        Enter your 6-digit code to download.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="receive-code-input"
          type="text"
          inputMode="numeric"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={6}
          aria-label="6-digit file access code"
          className="input-field"
          style={{
            fontFamily: "var(--font-mono), 'Space Mono', monospace",
            background: "var(--ink-06)",
            borderColor: "var(--ink-12)",
            color: "var(--ink)",
            flex: "1",
          }}
        />
        <button
          id="receive-access-btn"
          onClick={handleAccess}
          disabled={disabled || code.length !== 6}
          className="btn-secondary btn-secondary--ink"
          style={{ flex: "0 0 auto", minWidth: "100px" }}
          aria-label="Access file with entered code"
        >
          Access
        </button>
      </div>
    </div>
  );
}
