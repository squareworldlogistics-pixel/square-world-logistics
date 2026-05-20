"use client";

import { SUSTAINABILITY } from "@/lib/site-data";

export default function SustainabilitySection() {
  return (
    <section 
      className="swl-section" 
      style={{ 
        backgroundColor: "var(--color-swl-white)",
        borderTop: "1px solid var(--color-swl-rule)"
      }}
    >
      <div className="swl-container">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                display: "inline-block",
                marginBottom: "1.25rem",
              }}
            >
              Our Responsibility
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                color: "var(--color-swl-charcoal)",
              }}
            >
              {SUSTAINABILITY.headline.split(" ")[0]}{" "}
              <span style={{ color: "var(--color-swl-blue)" }}>
                {SUSTAINABILITY.headline.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-swl-slate)",
                marginTop: "1.5rem",
                lineHeight: "1.7",
                maxWidth: "700px",
                margin: "1.5rem auto 0"
              }}
            >
              {SUSTAINABILITY.subtext}
            </p>
          </div>

          {/* Pillars Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "3rem",
            }}
          >
            {SUSTAINABILITY.pillars.map((pillar, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div 
                  style={{ 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: "rgba(0, 56, 147, 0.05)", 
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    color: "var(--color-swl-blue)"
                  }}
                >
                  <PillarIcon type={pillar.icon} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--color-swl-charcoal)",
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.01em"
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--color-swl-slate)",
                    lineHeight: "1.65",
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarIcon({ type }: { type: string }) {
  switch (type) {
    case "leaf":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-7 7c-1.1 0-2.13-.37-3-1" />
          <path d="M11 20c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
        </svg>
      );
    case "file-text":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case "users":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}
