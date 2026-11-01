export default function Footer() {
  const links = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "#workflow-section" },
    { label: "Send a File", href: "#upload-section" },
    { label: "Contact", href: "mailto:abhijeetsoren222@gmail.com" },
  ];

  return (
    <footer
      className="bg-ink"
      style={{ paddingTop: "clamp(60px, 10vw, 120px)", paddingBottom: "clamp(32px, 5vw, 48px)" }}
      aria-label="Footer"
    >
      {/* Top hairline */}
      <div className="container-main">
        <div className="hairline hairline--light mb-16" />

        {/* Main footer row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end mb-16">

          {/* Left — Giant wordmark */}
          <div>
            <div className="eyebrow eyebrow--light mb-6">
              <span>Move Any File. Instantly.</span>
            </div>
            <div
              className="font-display text-paper uppercase leading-none"
              style={{
                fontSize: "clamp(4rem, 14vw, 10rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.85,
              }}
              aria-hidden="true"
            >
              Blyn<span style={{ color: "var(--accent)" }}>q</span>
            </div>
          </div>

          {/* Right — Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="mono-label hover:text-accent transition-colors duration-150"
                    style={{ color: "var(--paper-60)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom hairline + legal */}
        <div className="hairline hairline--light mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="mono-label"
            style={{ color: "var(--paper-60)", fontSize: "0.625rem" }}
          >
            © {new Date().getFullYear()} Blynq. All rights reserved.
          </p>

          <p
            className="mono-label"
            style={{ color: "var(--paper-60)", fontSize: "0.625rem" }}
          >
            Built by{" "}
            <span
              className="hover:text-paper transition-colors cursor-default"
              style={{ color: "var(--paper-80)" }}
            >
              Abhijeet Soren &amp; Lanka Sneha
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
