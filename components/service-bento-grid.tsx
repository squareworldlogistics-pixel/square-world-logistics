import Link from "next/link";
import { SERVICES } from "@/lib/site-data";
import type { Service } from "@/lib/site-data";

export const SERVICE_IMAGES: Record<string, string> = {
  "air-express": "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=600&auto=format&fit=crop",
  "air-freight": "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=600&auto=format&fit=crop",
  "sea-freight": "/sea-freight.png",
  "tailor-made": "/tailor-made.png",
  "customs": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
};

export default function ServiceBentoGrid({ limit }: { limit?: number }) {
  const displayedServices = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "2.5rem 2rem",
      }}
    >
      {displayedServices.map((service, idx) => (
        <BentoCard key={service.id} service={service} />
      ))}
    </div>
  );
}

function BentoCard({ service }: { service: Service }) {
  const imageUrl = SERVICE_IMAGES[service.id] || SERVICE_IMAGES["air-express"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        border: "none",
        height: "100%",
      }}
      className="bento-card"
    >
      <style>{`
        .bento-card:hover .bento-image {
          transform: scale(1.03);
        }
        .bento-card:hover .bento-title {
          color: var(--color-swl-blue) !important;
        }
        .bento-card-link-arrow {
          transform: translateX(0);
          transition: transform 0.2s ease;
        }
        .bento-card:hover .bento-card-link-arrow {
          transform: translateX(4px);
        }
      `}</style>

      {/* Image Header */}
      <div
        style={{
          width: "100%",
          height: "220px",
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
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="bento-image"
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.5rem 0 0 0",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Category */}
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-swl-blue)",
            marginBottom: "0.5rem",
          }}
        >
          {service.subtitle}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 400,
            color: "var(--color-swl-charcoal)",
            marginBottom: "0.75rem",
            lineHeight: 1.2,
            transition: "color 0.2s ease",
          }}
          className="bento-title"
        >
          {service.title}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.6",
            color: "var(--color-swl-slate)",
            marginBottom: "1.5rem",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.description}
        </p>

        {/* Action Link */}
        <Link 
          href={`/services/${service.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-swl-blue)",
            textDecoration: "none",
            marginTop: "auto",
            paddingTop: "0.5rem",
          }}
        >
          View Service Details
          <svg
            className="bento-card-link-arrow"
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
        </Link>
      </div>
    </div>
  );
}
