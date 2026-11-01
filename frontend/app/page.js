"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import Workflow from "@/components/Workflow";
import Footer from "@/components/Footer";

export default function Page() {
  /* Global scroll-reveal: attach IntersectionObserver to all .reveal elements */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/*
        Page background alternation — reading top to bottom:
        1. Navbar  — transparent → ink on scroll
        2. Hero    — ink (dark)
        3. Upload  — paper (cream)   ← UploadSection handles its own bg
        4. Workflow — highlight (butter yellow) ← Workflow handles its own bg
        5. Footer  — ink (dark)
      */}
      <a
        href="#upload-section"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:btn-primary"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>

      <main className="relative min-h-screen overflow-x-hidden flex flex-col bg-ink">
        <Navbar />

        {/* 1 — Hero: dark ink section */}
        <Hero />

        {/* 2 — Upload & Receive: cream paper section */}
        <UploadSection />

        {/* 3 — Workflow: butter yellow highlight section */}
        <Workflow />

        {/* 4 — Footer: dark ink section */}
        <Footer />
      </main>

      {/* Floating Action Pill — primary conversion CTA */}
      <a
        href="#upload-section"
        className="fab"
        aria-label="Send a file now"
      >
        Send a File ↑
      </a>
    </>
  );
}
