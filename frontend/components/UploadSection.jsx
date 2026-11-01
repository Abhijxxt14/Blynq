"use client";

import { useState, useRef } from "react";
import ReceiveInput from "./ReceiveInput";
import ResultCard from "./ResultCard";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";

/* ── Upload mascot SVG inline illustration ── */
function UploadMascot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 100"
      aria-label="Illustration of a vintage postal rocket ready for file upload"
      role="img"
      className="w-24 h-auto mx-auto mb-4"
    >
      <defs>
        <filter id="mascotGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5" result="n" />
          <feColorMatrix type="saturate" values="0" in="n" result="gn" />
          <feBlend in="SourceGraphic" in2="gn" mode="multiply" result="b" />
          <feComposite in="b" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g filter="url(#mascotGrain)">
        {/* Envelope body */}
        <rect x="20" y="30" width="80" height="55" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        {/* Envelope flap */}
        <path d="M20,30 L60,58 L100,30" fill="none" stroke="var(--ink)" strokeWidth="2" />
        {/* Envelope bottom fold */}
        <path d="M20,85 L48,60 M100,85 L72,60" stroke="var(--ink)" strokeWidth="1.5" opacity="0.4" />
        {/* Accent stamp */}
        <rect x="76" y="38" width="18" height="22" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="79" y="41" width="12" height="13" fill="none" stroke="var(--paper)" strokeWidth="1" />
        {/* Upload arrow */}
        <line x1="60" y1="18" x2="60" y2="2" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        <path d="M52,10 L60,2 L68,10" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {/* Stamp dots */}
        <circle cx="85" cy="47" r="2" fill="var(--paper)" opacity="0.8" />
        <line x1="79" y1="52" x2="91" y2="52" stroke="var(--paper)" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function UploadSection() {
  const [result, setResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { toasts, showToast, removeToast } = useToast();

  const processFile = async (file) => {
    setIsUploading(true);
    setProgress(0);

    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL ||
      `http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:8000`;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setProgress(percentComplete);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(xhr);
          else reject(new Error(`HTTP ${xhr.status}`));
        });

        xhr.addEventListener("error", () => reject(new Error("Upload failed")));

        xhr.open("POST", `${API_BASE}/upload`);
        xhr.send(formData);
      });

      const data = JSON.parse(response.responseText);
      setProgress(100);

      setTimeout(() => {
        setResult(data);
        setIsUploading(false);
        setProgress(0);
      }, 500);
    } catch (error) {
      setIsUploading(false);
      setProgress(0);
      console.error(error);
      showToast("Error uploading file. Check connection.", "error");
    }
  };

  return (
    /* Paper-background section wrapping the upload card */
    <section
      id="upload-section"
      className="bg-paper section-pad"
      aria-label="Upload and receive files"
    >
      <div className="container-main">
        {/* Section eyebrow */}
        <div className="eyebrow mb-10">
          <span>02 / SEND &amp; RECEIVE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left — Section heading (asymmetric) */}
          <div className="reveal">
            <h2 className="heading-section text-ink mb-6">
              Drop it.<br />
              <span className="accent-word">Share</span> it.
            </h2>
            <p className="body-text body-muted max-w-[40ch]">
              Blynq isn't just another file host. Upload once — share anywhere. The recipient gets your exact file, bit for bit, with a 6-digit code or QR link.
            </p>
          </div>

          {/* Right — Upload Card */}
          <div className="reveal w-full max-w-[500px]">
            {result ? (
              <ResultCard result={result} onReset={() => setResult(null)} />
            ) : (
              <div
                className="card card--shadow"
                style={{ padding: "clamp(28px, 5vw, 48px)" }}
              >
                {/* Drag-drop zone */}
                <div
                  id="drop-zone"
                  role="button"
                  tabIndex={isUploading ? -1 : 0}
                  aria-label="Click to select a file or drag and drop"
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
                  }}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); !isUploading && fileInputRef.current?.click(); }}}
                  className={`
                    border-2 border-dashed flex flex-col items-center justify-center
                    cursor-pointer transition-all duration-200 py-10 px-6 mb-8
                    ${isUploading
                      ? "animate-fade-out-scale pointer-events-none"
                      : isDragOver
                      ? "border-accent bg-accent/5"
                      : "border-[var(--ink-12)] hover:border-ink bg-transparent"
                    }
                  `}
                  style={{ minHeight: "200px" }}
                >
                  {isUploading ? (
                    /* Progress state */
                    <div className="w-full flex flex-col gap-4 items-center">
                      <div className="mono-label" style={{ color: "var(--ink-60)" }}>
                        Uploading...
                      </div>
                      <div
                        className="progress-bar-container progress-track w-full"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="mono-label" style={{ color: "var(--accent)" }}>
                        {progress}%
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadMascot />
                      <p
                        className="mono-label text-center mb-1"
                        style={{ color: "var(--ink)", fontSize: "0.8125rem" }}
                      >
                        Click to upload or drag &amp; drop
                      </p>
                      <p
                        className="mono-label text-center"
                        style={{ color: "var(--ink-60)" }}
                      >
                        Maximum file size: 5 GB
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => { if (e.target.files.length) processFile(e.target.files[0]); }}
                    disabled={isUploading}
                    aria-hidden="true"
                  />
                </div>

                {/* Divider */}
                <div
                  className={`flex items-center gap-4 mb-8 transition-opacity duration-300 ${
                    isUploading ? "opacity-20 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <div className="hairline flex-1" />
                  <span
                    className="mono-label"
                    style={{ color: "var(--ink-60)", fontSize: "0.625rem" }}
                  >
                    OR
                  </span>
                  <div className="hairline flex-1" />
                </div>

                {/* Receive */}
                <div
                  className={`transition-opacity duration-300 ${
                    isUploading ? "opacity-20 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <ReceiveInput disabled={isUploading} />
                </div>
              </div>
            )}
          </div>
        </div>
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
    </section>
  );
}
