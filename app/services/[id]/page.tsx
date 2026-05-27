import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, COMPANY } from "@/lib/site-data";
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
    title: service.title,
    description: service.description.slice(0, 155),
    alternates: {
      canonical: `/services/${resolvedParams.id}`,
    },
    openGraph: {
      title: `${service.title} | ${COMPANY.name}`,
      description: service.description,
      url: `https://www.squareworldlogistics.com/services/${resolvedParams.id}`,
      type: "website",
    },
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

  const imagePositions: Record<string, string> = {
    "air-express": "center 30%",
    "air-freight": "center 40%",
    "sea-freight": "center 60%",
    "tailor-made": "center 60%",
    "customs": "center 30%",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://www.squareworldlogistics.com",
    },
    areaServed: "Worldwide",
    serviceType: service.title,
    url: `https://www.squareworldlogistics.com/services/${service.id}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Capabilities`,
      itemListElement: service.features.map((feature, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
      })),
    },
  };

  return (
    <>
      {/* Service Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <style>{`
        .svc-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7) !important;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.2s ease;
        }
        .svc-back:hover {
          color: #fff !important;
        }
        .svc-back:hover .svc-back-arrow {
          transform: translateX(-3px);
        }
        .svc-feature-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1.25rem;
          background: var(--color-swl-bg);
          border: 1px solid var(--color-swl-rule);
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-swl-charcoal);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .svc-feature-item:hover {
          border-color: var(--color-swl-blue);
          transform: translateY(-1px);
        }
        @media (max-width: 767px) {
          .svc-hero { min-height: 220px !important; }
          .svc-content-grid { grid-template-columns: 1fr !important; }
          .svc-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Cinematic Hero Banner ── */}
      <section
        className="svc-hero"
        style={{
          position: "relative",
          minHeight: "300px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={`${service.title} — ${service.subtitle} by Square World Logistics`}
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
            objectPosition: imagePositions[service.id] || "center 30%",
          }}
        />
        {/* Dark Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10, 20, 40, 0.85) 0%, rgba(10, 20, 40, 0.5) 50%, rgba(10, 20, 40, 0.3) 100%)",
          }}
        />
        {/* Content */}
        <div
          className="swl-container"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "3rem",
            paddingBottom: "2.5rem",
            width: "100%",
          }}
        >
          <Link href="/services" className="svc-back" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            <svg
              className="svc-back-arrow"
              width="14"
              height="14"
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
            All Services
          </Link>
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "0.75rem",
              }}
            >
              {service.subtitle}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                maxWidth: "700px",
              }}
            >
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section style={{ backgroundColor: "var(--color-swl-white)", padding: "3rem 0 2rem" }}>
        <div className="swl-container">
          <div
            className="svc-content-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.6fr",
              gap: "4rem",
              maxWidth: "1100px",
              margin: "0 auto",
              alignItems: "start",
            }}
          >
            {/* Left: Description */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "var(--color-swl-charcoal)",
                  marginBottom: "0.75rem",
                }}
              >
                Overview
              </h2>
              <div
                style={{
                  width: "32px",
                  height: "2px",
                  backgroundColor: "var(--color-swl-blue)",
                  marginBottom: "1.25rem",
                }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--color-swl-slate)",
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>

            {/* Right: Quick Contact Card */}
            <div
              style={{
                backgroundColor: "var(--color-swl-bg)",
                color: "var(--color-swl-charcoal)",
                padding: "2rem",
                borderRadius: "8px",
                border: "1px solid var(--color-swl-rule)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                  color: "var(--color-swl-charcoal)",
                }}
              >
                Need a Quote?
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "var(--color-swl-slate)",
                  marginBottom: "1.5rem",
                }}
              >
                Get tailored pricing for your {service.title.toLowerCase()} needs.
              </p>
              <MagneticButton
                href={`/contact?service=${service.id}`}
                className="swl-btn--primary"
              >
                Request Quote
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
        </div>
      </section>

      {/* ── Key Capabilities Grid ── */}
      <section
        style={{
          backgroundColor: "var(--color-swl-white)",
          borderTop: "1px solid var(--color-swl-rule)",
          padding: "2.5rem 0 3rem",
        }}
      >
        <div className="swl-container">
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "var(--color-swl-charcoal)",
                marginBottom: "1.5rem",
              }}
            >
              Key Capabilities
            </h2>
            <div
              className="svc-features-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {service.features.map((feature, i) => (
                <div key={i} className="svc-feature-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-swl-blue)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
