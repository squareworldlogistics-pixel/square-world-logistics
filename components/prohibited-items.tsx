"use client";

import { PROHIBITED_ITEMS } from "@/lib/site-data";

export default function ProhibitedItems() {
  return (
    <section className="swl-section" style={{ backgroundColor: "var(--color-swl-white)" }}>
      <div className="swl-container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Header */}
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
              Security & Compliance
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
              Prohibited{" "}
              <span style={{ color: "var(--color-swl-blue)" }}>
                Items
              </span>
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
              For safety and regulatory compliance, we do not accept the following items for shipment.
            </p>
          </div>

          {/* Grid of Items */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {PROHIBITED_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem",
                  backgroundColor: "var(--color-swl-mist)",
                  borderRadius: "2px",
                  borderLeft: "2px solid var(--color-swl-blue)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-swl-blue)",
                    flexShrink: 0,
                    opacity: 0.4
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-swl-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div 
            style={{ 
              marginTop: "4rem", 
              textAlign: "center", 
              padding: "1.5rem", 
              border: "1px dashed var(--color-swl-rule)",
              borderRadius: "2px"
            }}
          >
            <p style={{ fontSize: "0.8125rem", color: "var(--color-swl-slate)", lineHeight: "1.6" }}>
              <strong>Note:</strong> This list is not exhaustive. If you are unsure about an item, please contact our support team for clarification before booking your shipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
