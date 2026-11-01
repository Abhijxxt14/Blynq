"use client";

import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  /* Style by type — all using palette tokens */
  const borderColor =
    type === "error"   ? "var(--accent)"     :
    type === "warning" ? "var(--highlight)"  :
    "var(--ink-12)";

  const dotColor =
    type === "error"   ? "var(--accent)"     :
    type === "warning" ? "var(--ink)"        :
    "var(--ink)";

  const label =
    type === "error"   ? "Error"   :
    type === "warning" ? "Warning" :
    "Done";

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[300] animate-[slideIn_0.3s_ease-out] flex items-center gap-3 px-4 py-3 border"
      style={{
        background: "var(--paper)",
        borderColor,
        borderWidth: "1.5px",
        boxShadow: `3px 3px 0 ${borderColor}`,
        minWidth: "200px",
        maxWidth: "320px",
      }}
    >
      {/* Dot indicator */}
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: dotColor }}
        aria-hidden="true"
      />

      {/* Label */}
      <span
        className="mono-label font-bold shrink-0"
        style={{ color: "var(--ink)", fontSize: "0.625rem" }}
      >
        {label}
      </span>

      {/* Message */}
      <span
        className="body-text"
        style={{ color: "var(--ink)", fontSize: "0.875rem", lineHeight: 1.4, maxWidth: "none" }}
      >
        {message}
      </span>
    </div>
  );
}
