import type { Metadata } from "next";
import SectionHeading from "@/components/section-heading";
import ServiceBentoGrid from "@/components/service-bento-grid";
import MagneticButton from "@/components/magnetic-button";
import ProhibitedItems from "@/components/prohibited-items";
import IncotermsGuide from "@/components/incoterms-guide";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive logistics services — international air express, air freight, sea freight, tailor-made solutions, and customs clearance across 220+ countries.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Header ────────────────────────────── */}
      <section className="swl-section--tight" style={{ backgroundColor: "var(--color-swl-white)" }}>
        <div className="swl-container">
          
            <SectionHeading
              title="Our Services"
              subtitle="Comprehensive logistics solutions designed to meet the evolving needs of global businesses."
            />
          
        </div>
      </section>

      {/* ── Service Bento Grid ─────────────────── */}
      <section
        className="swl-section--tight"
        style={{
          backgroundColor: "var(--color-swl-white)",
          borderTop: "1px solid rgba(0,0,0,0.03)",
        }}
      >
        <div className="swl-container">
          <ServiceBentoGrid />
        </div>
      </section>

      {/* ── Prohibited Items ───────────────────── */}
      <ProhibitedItems />

      {/* ── Incoterms Guide ───────────────────── */}
      <IncotermsGuide />

      {/* ── Bottom CTA ────────────────────────── */}
      <section
        className="swl-section"
        style={{
          borderTop: "1px solid var(--color-swl-rule)",
        }}
      >
        <div className="swl-container" style={{ textAlign: "center" }}>
          
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  marginBottom: "0.75rem",
                  color: "var(--color-swl-charcoal)",
                }}
              >
                Need a custom solution?
              </h2>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-swl-slate)",
                  marginBottom: "1.75rem",
                  lineHeight: "1.65",
                }}
              >
                Every business has unique logistics requirements. Let&apos;s
                discuss how we can tailor our services to your needs.
              </p>
              <MagneticButton href="/contact" className="swl-btn--primary">
                Contact Us
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </MagneticButton>
            </div>
          
        </div>
      </section>
    </>
  );
}
