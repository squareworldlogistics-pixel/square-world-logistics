import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/site-data";
import type { Service } from "@/lib/site-data";

export const SERVICE_IMAGES: Record<string, string> = {
  "air-express": "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=600&auto=format&fit=crop",
  "air-freight": "/air-freight.jpg",
  "sea-freight": "/sea-freight.png",
  "tailor-made": "/tailor-made-new.jpg",
  "customs": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
};

const SERVICE_ALT_TEXT: Record<string, string> = {
  "air-express": "International air express courier — fast door-to-door package delivery worldwide",
  "air-freight": "International air freight cargo — commercial cargo transportation by aircraft",
  "sea-freight": "International sea freight — container ship cargo transportation across global ports",
  "tailor-made": "Customised logistics solutions — tailor-made freight planning for businesses",
  "customs": "Customs clearance service — import and export documentation and compliance",
};

export default function ServiceBentoGrid({ limit }: { limit?: number }) {
  const displayedServices = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <div className="swl-bento-grid">
      {displayedServices.map((service) => (
        <BentoCard key={service.id} service={service} />
      ))}
    </div>
  );
}

function BentoCard({ service }: { service: Service }) {
  const imageUrl = SERVICE_IMAGES[service.id] || SERVICE_IMAGES["air-express"];
  const altText = SERVICE_ALT_TEXT[service.id] || service.title;
  const isRemote = imageUrl.startsWith("http");

  return (
    <div className="swl-bento-card">
      {/* Image Header */}
      <div className="swl-bento-card__img-wrap">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="swl-bento-card__img"
        />
      </div>

      {/* Content */}
      <div className="swl-bento-card__content">
        {/* Category */}
        <div className="swl-bento-card__eyebrow">
          {service.subtitle}
        </div>

        {/* Title */}
        <h3 className="swl-bento-card__title">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="swl-bento-card__desc">
          {service.description}
        </p>

        {/* Action Link */}
        <Link 
          href={`/services/${service.id}`}
          className="swl-bento-card__link"
        >
          View Service Details
          <svg
            className="swl-bento-card__arrow"
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
