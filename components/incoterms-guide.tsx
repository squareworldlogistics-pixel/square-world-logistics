"use client";

import { INCOTERMS } from "@/lib/site-data";

export default function IncotermsGuide() {
  return (
    <section className="swl-section" style={{ backgroundColor: "var(--color-swl-mist)" }}>
      <div className="swl-container">
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            >
              Educational Resources
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                color: "var(--color-swl-charcoal)",
              }}
            >
              The Incoterms Guide
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--color-swl-slate)",
                marginTop: "1.25rem",
                lineHeight: "1.6",
              }}
            >
              A professional reference to international trade terms defining buyer and seller responsibilities.
            </p>
          </div>

          <div 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              border: "1px solid var(--color-swl-rule)",
              backgroundColor: "var(--color-swl-white)",
              borderRadius: "2px",
              overflow: "hidden"
            }}
          >
            {/* Table Header */}
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "100px 200px 1fr", 
                backgroundColor: "var(--color-swl-charcoal)",
                color: "var(--color-swl-white)",
                padding: "1rem 2rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase"
              }}
              className="hidden md:!grid"
            >
              <div>Term</div>
              <div>Definition</div>
              <div>Description & Responsibilities</div>
            </div>

            {/* Table Rows */}
            {INCOTERMS.map((item, i) => (
              <div 
                key={i} 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr",
                  padding: "2rem",
                  borderBottom: i < INCOTERMS.length - 1 ? "1px solid var(--color-swl-rule)" : "none",
                  transition: "background 0.3s ease",
                  gap: "1rem"
                }}
                className="md:!grid-cols-[100px_200px_1fr] md:!gap-0 md:hover:!bg-[rgba(0,0,0,0.01)]"
              >
                <div 
                  style={{ 
                    fontFamily: "var(--font-body)", 
                    fontSize: "1.25rem", 
                    fontWeight: 800, 
                    color: "var(--color-swl-blue)",
                    letterSpacing: "-0.02em"
                  }}
                >
                  {item.term}
                </div>
                <div 
                  style={{ 
                    fontFamily: "var(--font-body)", 
                    fontSize: "0.875rem", 
                    fontWeight: 700, 
                    color: "var(--color-swl-charcoal)",
                    paddingRight: "2rem"
                  }}
                >
                  {item.name}
                </div>
                <div 
                  style={{ 
                    fontFamily: "var(--font-body)", 
                    fontSize: "0.9375rem", 
                    color: "var(--color-swl-slate)", 
                    lineHeight: "1.6"
                  }}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
