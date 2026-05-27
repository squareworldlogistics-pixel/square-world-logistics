import StatBlock from "@/components/stat-block";
import SectionHeading from "@/components/section-heading";
import MagneticButton from "@/components/magnetic-button";
import ServiceBentoGrid from "@/components/service-bento-grid";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import FlagMarquee from "@/components/flag-marquee";
import HeroSlider from "@/components/hero-slider";
import TrackingHub from "@/components/tracking-hub";
import StatsSection from "@/components/stats-section";
import TestimonialsSection from "@/components/testimonials-section";

import {
  STATS,
  SERVICES,
  TRUST_STATEMENT,
  CTA_BANNER,
  COMPANY,
  ABOUT,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      {/* ── SEO: Semantic text content for search engines ── */}
      <article className="sr-only" aria-hidden="true">
        <h2>Square World Logistics — International Freight Forwarding Company in Vapi, Gujarat, India</h2>
        <p>
          Square World Logistics is a leading international logistics and freight forwarding company based in Vapi, Gujarat, India.
          Established in 2023, we provide comprehensive global shipping solutions including international air express courier services,
          air freight cargo transportation, sea freight (FCL and LCL), customs clearance and brokerage, and tailor-made freight solutions.
          Our services cover over 220 countries worldwide through trusted global courier network partners including FedEx, UPS, DHL, and Aramex.
          We specialize in export and import logistics for businesses of all sizes, offering door-to-door delivery, real-time shipment tracking,
          customs documentation support, and 24/7 dedicated logistics assistance. Whether you need to ship packages, documents, or commercial cargo
          internationally, Square World Logistics delivers reliable, transparent, and cost-effective freight forwarding solutions.
        </p>
      </article>

      {/* ── Hero Slider ───────────────────────── */}
      <HeroSlider />

      {/* ── About Snippet & Tracking ─────────── */}
      <section className="swl-section" style={{ position: "relative" }}>
        <div className="swl-container">
          <div
            style={{
              display: "grid",
              gap: "4rem",
              gridTemplateColumns: "1fr",
              alignItems: "flex-start",
            }}
            className="lg:!grid-cols-[1.1fr_0.9fr]"
          >
            {/* Left: Heading + Button + Intro Text */}
            <div>
              <SectionHeading
                title="Who We Are"
                subtitle={`Driving global business with ${COMPANY.name}`}
                align="left"
              />

              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div style={{ position: "relative", width: "fit-content" }}>
                  <MagneticButton href="/about" className="swl-btn--outline">
                    View More
                  </MagneticButton>
                </div>

                {/* Intro Text moved below button */}
                <div
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: "1.8",
                    color: "var(--color-swl-charcoal)",
                    maxWidth: "600px"
                  }}
                >
                  Established in 2023,{" "}
                  <span style={{ fontWeight: 500 }}>
                    Square World Logistics
                  </span>{" "}
                  is a young, dynamic, and proactive logistics company dedicated to delivering reliable global shipping and freight solutions. We provide complete end-to-end logistics support, enabling businesses to focus on expanding their global presence while we efficiently manage the operational complexities.
                </div>
              </div>
            </div>

            {/* Right: Tracking Hub (Wider and Higher) */}
            <div
              style={{
                position: "relative",
                zIndex: 10
              }}
              className="hidden lg:block"
            >
              <TrackingHub />
            </div>

            {/* Mobile Tracking Hub */}
            <div className="lg:hidden" style={{ marginTop: "2rem" }}>
              <TrackingHub />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────── */}
      <StatsSection />

      {/* ── Why Trust Us ──────────────────────── */}
      <section
        className="swl-section"
        style={{ backgroundColor: "var(--color-swl-white)" }}
      >
        <div className="swl-container">
          <SectionHeading
            title="Why Trust Us"
            subtitle="Built for reliability, trusted worldwide."
            accent="crimson"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "2.5rem 2rem",
              marginTop: "2.5rem",
            }}
          >
            {/* 220+ Countries — Compass Rose icon */}
            <div style={{ borderBottom: "1px solid var(--color-swl-rule)", paddingBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <img src="/icon-global.png" alt="Global reach icon — shipping to over 220 countries worldwide" width="52" height="52" style={{ display: "block" }} />
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                marginBottom: "0.5rem",
              }}>
                Global Reach
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--color-swl-charcoal)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}>
                220+ Countries Served
              </h3>
              <p style={{
                fontSize: "0.875rem",
                lineHeight: "1.6",
                color: "var(--color-swl-slate)",
              }}>
                A global network that reaches every corner of the world — seamlessly.
              </p>
            </div>

            {/* Safe & Secure — Diamond Vault icon */}
            <div style={{ borderBottom: "1px solid var(--color-swl-rule)", paddingBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <img src="/icon-secure.png" alt="Secure shipping — end-to-end cargo security and accountability" width="52" height="52" style={{ display: "block" }} />
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                marginBottom: "0.5rem",
              }}>
                Security
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--color-swl-charcoal)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}>
                100% Safe &amp; Secure
              </h3>
              <p style={{
                fontSize: "0.875rem",
                lineHeight: "1.6",
                color: "var(--color-swl-slate)",
              }}>
                Every shipment handled with end-to-end security and full accountability.
              </p>
            </div>

            {/* On-Time Delivery — Paper Plane + Checkmark Trail icon */}
            <div style={{ borderBottom: "1px solid var(--color-swl-rule)", paddingBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <img src="/icon-ontime.png" alt="On-time delivery with real-time shipment tracking" width="52" height="52" style={{ display: "block" }} />
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                marginBottom: "0.5rem",
              }}>
                Reliability
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--color-swl-charcoal)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}>
                On-Time Delivery
              </h3>
              <p style={{
                fontSize: "0.875rem",
                lineHeight: "1.6",
                color: "var(--color-swl-slate)",
              }}>
                Timely deliveries with real-time tracking and proactive updates.
              </p>
            </div>

            {/* 24/7 Support — Signal Beacon icon */}
            <div style={{ borderBottom: "1px solid var(--color-swl-rule)", paddingBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <img src="/icon-support.png" alt="24/7 premium logistics support and account management" width="52" height="52" style={{ display: "block" }} />
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                marginBottom: "0.5rem",
              }}>
                Support
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--color-swl-charcoal)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}>
                Premium Support
              </h3>
              <p style={{
                fontSize: "0.875rem",
                lineHeight: "1.6",
                color: "var(--color-swl-slate)",
              }}>
                Expert assistance and dedicated account management for all your logistics needs.
              </p>
            </div>
          </div>
        </div>
      </section>




      {/* ── Services Preview ─────────────────── */}
      <section
        className="swl-section"
        style={{ backgroundColor: "var(--color-swl-white)" }}
      >
        <div className="swl-container">

          <SectionHeading
            title="Core Services"
            subtitle="Comprehensive logistics solutions tailored to your business."
            accent="crimson"
          />


          <div style={{ marginTop: "2.5rem" }}>
            <ServiceBentoGrid limit={3} />
          </div>


          <div style={{ marginTop: "3.5rem", textAlign: "center" }}>
            <MagneticButton href="/services" className="swl-btn--outline">
              View All Services
            </MagneticButton>
          </div>

        </div>
      </section>

      {/* ── Global Courier Network Marquee ────── */}
      <FlagMarquee />

      {/* ── Google Testimonials ─────────────── */}
      <TestimonialsSection />
      {/* ── Trust Statement ──────────────────── */}
      <section className="swl-section">
        <div className="swl-container">

          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              className="swl-accent-line"
              style={{ margin: "0 auto 1.5rem" }}
            />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                lineHeight: "1.4",
                color: "var(--color-swl-charcoal)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              "{TRUST_STATEMENT}"
            </p>
          </div>

        </div>
      </section>

      {/* ── FAQ Section ──────────────────────── */}
      <FAQSection />

      {/* ── Contact Section ──────────────────── */}
      <div id="contact" style={{ borderTop: "1px solid var(--color-swl-rule)" }}>
        <ContactSection
          title="Ready to Ship?"
          subtitle="Get in touch with our team today for a custom logistics solution."
        />
      </div>
    </>
  );
}



/* ── Value Icons (inline SVGs) ───────────────── */

function ValueIcon({ type }: { type: string }) {
  const style = { color: "var(--color-swl-blue)" };

  switch (type) {
    case "shield":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-swl-blue)" stroke="var(--color-swl-blue)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={style}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" />
        </svg>
      );
    case "clock":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "globe":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "headset":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      );
    default:
      return null;
  }
}
