"use client";

import { LEADERSHIP } from "@/lib/site-data";
import SectionHeading from "./section-heading";

export default function LeadershipSection() {
  return (
    <section className="swl-section">
      <div className="swl-container">
        <SectionHeading
          title="Meet Our Founders"
          subtitle="The visionary leadership driving Square World Logistics forward with integrity and innovation."
          align="center"
        />

        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "5rem", 
            marginTop: "5rem" 
          }}
        >
          {LEADERSHIP.map((leader, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "420px", margin: "0 auto" }}>
              {/* Leader Photo */}
              <div 
                style={{ 
                  width: "100%", 
                  aspectRatio: "3/4",
                  overflow: "hidden", 
                  backgroundColor: "var(--color-swl-mist)",
                  position: "relative"
                }}
              >
                <img 
                  src={(leader as any).image} 
                  alt={leader.name} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block"
                  }} 
                />
              </div>

              {/* Leader Info */}
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: "0.25rem" }}>
                  <h3 
                    style={{ 
                      fontFamily: "var(--font-display)", 
                      fontSize: "1.75rem", 
                      color: "var(--color-swl-charcoal)",
                      margin: 0
                    }}
                  >
                    {leader.name}
                  </h3>
                </div>
                <p 
                  style={{ 
                    fontFamily: "var(--font-body)", 
                    fontSize: "0.8125rem", 
                    fontWeight: 600, 
                    color: i === 0 ? "var(--color-swl-blue)" : "var(--color-swl-crimson)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem"
                  }}
                >
                  {leader.role}
                </p>

                {/* Vision Statement */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: "1.7",
                    color: "var(--color-swl-slate)",
                    marginBottom: "1.5rem",
                    fontStyle: "italic"
                  }}
                >
                  &ldquo;{leader.vision}&rdquo;
                </p>

                {/* Ethics / Values - Natural List */}
                <div style={{ marginTop: "1.25rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {leader.ethics.map((ethic, j) => (
                      <li 
                        key={j} 
                        style={{ 
                          fontSize: "0.875rem", 
                          fontFamily: "var(--font-body)",
                          color: "var(--color-swl-slate)", 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "0.75rem", 
                          justifyContent: "center" 
                        }}
                      >
                        <span 
                          style={{ 
                            width: "8px", 
                            height: "1px", 
                            backgroundColor: i === 0 ? "var(--color-swl-blue)" : "var(--color-swl-crimson)",
                            opacity: 0.5
                          }}
                        />
                        {ethic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
