import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/site-data";
import { SERVICE_IMAGES } from "@/components/service-bento-grid";
import SectionHeading from "@/components/section-heading";
import MagneticButton from "@/components/magnetic-button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Ensure static generation for all services at build time
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.id === resolvedParams.id);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Square World Logistics`,
    description: service.description,
  };
}

// Asynchronous component for Next.js 15/16 dynamic route page
export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.id === resolvedParams.id);

  if (!service) {
    notFound();
  }

  const imageUrl = SERVICE_IMAGES[service.id] || SERVICE_IMAGES["air-express"];

  return (
    <>
      {/* ── Header Title Block (Pure white background, high contrast) ── */}
      <section className="swl-section--tight" style={{ backgroundColor: "var(--color-swl-white)" }}>
        <div className="swl-container">
          <style>{`
            .back-btn {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              font-size: 0.875rem;
              font-weight: 500;
              color: var(--color-swl-slate) !important;
              text-decoration: none;
              margin-bottom: 1.5rem;
              transition: color 0.2s ease;
            }
            .back-btn:hover {
              color: var(--color-swl-blue) !important;
            }
            .back-btn:hover .back-arrow {
              transform: translateX(-4px);
            }
          `}</style>
          
          <Link href="/services" className="back-btn">
            <svg
              className="back-arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "transform 0.2s ease" }}
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Services
          </Link>
          
          <br />
          <span
            style={{
              display: "inline-block",
              color: "var(--color-swl-blue)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {service.subtitle}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--color-swl-charcoal)",
              lineHeight: 1.1,
              maxWidth: "900px",
              margin: 0,
            }}
          >
            {service.title}
          </h1>
        </div>
      </section>

      {/* ── Flat Aspect-Ratio Banner Image (No overlay, sharp edges) ── */}
      <section style={{ backgroundColor: "var(--color-swl-white)", paddingBottom: "3rem" }}>
        <div className="swl-container">
          <div
            style={{
              width: "100%",
              height: "clamp(240px, 40vw, 380px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl}
              alt={service.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Content Grid (Asymmetric, completely flat, borderless) ── */}
      <section className="swl-section" style={{ backgroundColor: "var(--color-swl-white)" }}>
        <div className="swl-container">
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr", 
              gap: "2.5rem",
              borderTop: "1px solid var(--color-swl-rule)",
              paddingTop: "2.5rem",
            }}
            className="lg:!grid-cols-[1.3fr_0.7fr]"
          >
            {/* Left Column: Description */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--color-swl-charcoal)",
                  marginBottom: "1.5rem",
                }}
              >
                Service Overview
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  color: "var(--color-swl-slate)",
                  maxWidth: "750px",
                }}
              >
                {service.description}
              </p>
            </div>

            {/* Right Column: Key Features (Flat list to match minimal rules) */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--color-swl-charcoal)",
                  marginBottom: "1.5rem",
                }}
              >
                Key Features
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.9375rem",
                      color: "var(--color-swl-charcoal)",
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "var(--color-swl-blue)",
                        flexShrink: 0,
                        marginTop: "0.5rem",
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────── */}
      <section
        className="swl-section"
        style={{
          backgroundColor: "var(--color-swl-white)",
          borderTop: "1px solid var(--color-swl-rule)",
        }}
      >
        <div className="swl-container" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "var(--color-swl-charcoal)",
                lineHeight: 1.1,
              }}
            >
              Ready to get started?
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-swl-slate)",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              Contact our team today to discuss how our {service.title.toLowerCase()} can streamline your supply chain.
            </p>
            <MagneticButton href={`/contact?service=${service.id}`} className="swl-btn--primary">
              Contact Us Now
              <svg
                width="16"
                height="16"
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
