import type { Metadata } from "next";
import { ABOUT, COMPANY } from "@/lib/site-data";
import MagneticButton from "@/components/magnetic-button";
import SectionHeading from "@/components/section-heading";
import LeadershipSection from "@/components/leadership-section";
import SustainabilitySection from "@/components/sustainability-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Square World Logistics — a young, dynamic logistics company delivering reliable global shipping and freight solutions since 2023.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero Statement ─────────────────────── */}
      <section
        className="swl-section"
        style={{
          borderBottom: "1px solid var(--color-swl-rule)",
          backgroundColor: "var(--color-swl-white)",
        }}
      >
        <div className="swl-container">
          <div style={{ maxWidth: "900px" }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "1px",
                  backgroundColor: "var(--color-swl-crimson)",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-swl-crimson)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Our Story
              </span>
            </div>

            {/* Large editorial heading — Barlow heavy */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
                fontWeight: 800,
                lineHeight: "1.06",
                letterSpacing: "-0.025em",
                color: "var(--color-swl-charcoal)",
                marginBottom: "2rem",
              }}
            >
              Young. Dynamic.{" "}
              <span
                style={{
                  color: "var(--color-swl-blue)",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                Proactive.
              </span>
            </h1>

            {/* Body text in Inter — softer, readable */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.25rem",
                maxWidth: "720px",
              }}
            >
              {ABOUT.intro.map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: i === 0 ? "1.125rem" : "0.9375rem",
                    lineHeight: "1.8",
                    color: i === 0 ? "var(--color-swl-charcoal)" : "var(--color-swl-slate)",
                    fontWeight: i === 0 ? 400 : 400,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────── */}
      <section
        className="swl-section"
        style={{
          backgroundColor: "var(--color-swl-mist)",
          borderBottom: "1px solid var(--color-swl-rule)",
        }}
      >
        <div className="swl-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0",
            }}
            className="md:!grid-cols-2"
          >
            {/* Vision */}
            <div
              style={{
                paddingBottom: "2.5rem",
              }}
              className="md:!border-r md:!border-[var(--color-swl-rule)] md:!pb-0 md:!pr-14"
            >
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
                Vision
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                  fontWeight: 600,
                  lineHeight: "1.4",
                  color: "var(--color-swl-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {ABOUT.vision}
              </p>
            </div>

            {/* Mission */}
            <div
              style={{
                paddingLeft: "0",
                paddingTop: "2.5rem",
                borderTop: "1px solid var(--color-swl-rule)",
              }}
              className="md:!pl-14 md:!pt-0 md:!border-t-0"
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-swl-crimson)",
                  display: "inline-block",
                  marginBottom: "1.25rem",
                }}
              >
                Mission
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                  fontWeight: 600,
                  lineHeight: "1.4",
                  color: "var(--color-swl-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {ABOUT.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────── */}
      <section
        className="swl-section"
        style={{
          backgroundColor: "var(--color-swl-white)",
          borderBottom: "1px solid var(--color-swl-rule)",
        }}
      >
        <div className="swl-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem",
              alignItems: "start",
            }}
            className="lg:!grid-cols-[1fr_1.4fr]"
          >
            {/* Left: sticky label */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-swl-slate)",
                  display: "block",
                  marginBottom: "1.25rem",
                }}
              >
                Why Us
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
                Why Square World{" "}
                <span style={{ color: "var(--color-swl-blue)" }}>
                  Logistics?
                </span>
              </h2>
            </div>

            {/* Right: the list */}
            <div>
              {ABOUT.whyUs.map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1.25rem",
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                    borderBottom: i < ABOUT.whyUs.length - 1 ? "1px solid var(--color-swl-rule)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--color-swl-blue)",
                      opacity: 0.6,
                      minWidth: "2rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      lineHeight: "1.65",
                      color: "var(--color-swl-slate)",
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Section ────────────────── */}
      <LeadershipSection />

      {/* ── Sustainability Section ───────────── */}
      <SustainabilitySection />

      {/* ── Commitment Pull Quote ─────────────── */}
      <section
        className="swl-section"
        style={{
          backgroundColor: "var(--color-swl-white)",
        }}
      >
        <div className="swl-container">
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-swl-slate)",
                display: "block",
                marginBottom: "1.75rem",
              }}
            >
              Our Commitment
            </span>

            {/* Large decorative quotation mark */}
            <div
              aria-hidden
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "5rem",
                lineHeight: "0.6",
                color: "var(--color-swl-rule)",
                marginBottom: "1.5rem",
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.125rem, 2.25vw, 1.5rem)",
                fontWeight: 500,
                lineHeight: "1.55",
                letterSpacing: "-0.01em",
                color: "var(--color-swl-charcoal)",
                marginBottom: "2.5rem",
              }}
            >
              {ABOUT.commitment}
            </p>

            <div
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: "var(--color-swl-blue)",
                margin: "0 auto 2.5rem",
              }}
            />

            <MagneticButton href="/contact" className="swl-btn--primary">
              Work With Us
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "0.5rem" }}
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
