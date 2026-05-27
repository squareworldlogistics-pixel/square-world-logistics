"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import ContactForm from "@/components/contact-form";
import { COMPANY } from "@/lib/site-data";

/**
 * Obfuscated email component — prevents scrapers from harvesting the email
 * address while keeping it functional for users.
 */
function ObfuscatedEmail({ email, className }: { email: string; className?: string }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Only reveal on client-side to prevent server-rendered plain text
    setRevealed(true);
  }, []);

  if (!revealed) {
    return (
      <span className={className}>
        [email protected]
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}

export default function ContactSection({ 
  title = "Get In Touch", 
  subtitle = "Have a logistics requirement? We'd love to hear from you.",
  organic = false 
}) {
  return (
    <section className="swl-section">
      <div className="swl-container">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          organic={organic}
        />

        <div className="swl-contact-grid md:!grid-cols-[3fr_2fr]">
          {/* Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <div className="swl-contact-info">
              <div>
                <div className="swl-contact-label">
                  Email
                </div>
                <ObfuscatedEmail email={COMPANY.email} className="swl-contact-value block w-fit" />
              </div>
              <div>
                <div className="swl-contact-label">
                  Phone
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="swl-contact-value block w-fit"
                  >
                    {COMPANY.phone}
                  </a>
                  {COMPANY.phone2 && (
                    <a
                      href={`tel:${COMPANY.phone2.replace(/\s/g, "")}`}
                      className="swl-contact-value block w-fit"
                    >
                      {COMPANY.phone2}
                    </a>
                  )}
                </div>
              </div>
              
              <ContactInfoBlock
                label="Office"
                value={COMPANY.address}
              />
              {COMPANY.officeHours && (
                <ContactInfoBlock
                  label="Business Hours"
                  value={COMPANY.officeHours}
                />
              )}

              {/* Response time note */}
              <div className="swl-contact-note">
                <p>
                  We typically respond within 24 hours during business
                  days. For urgent inquiries, please call us directly.
                </p>
              </div>

              {/* Map Section — Static link instead of iframe for better SEO and performance */}
              {COMPANY.mapStaticUrl && (
                <a
                  href={COMPANY.mapStaticUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Square World Logistics office location on Google Maps"
                  className="swl-map-link hover:opacity-90 transition-opacity"
                >
                  <div className="swl-map-link__inner">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-swl-blue)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="swl-map-link__label">
                      View on Google Maps →
                    </span>
                    <span className="swl-map-link__addr">
                      C-16, M-Cube Business Hub, Vapi, Gujarat
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact Info Block ──────────────────────── */

type ContactInfoBlockProps = {
  label: string;
  value: string;
  href?: string;
};

function ContactInfoBlock({ label, value, href }: ContactInfoBlockProps) {
  return (
    <div>
      <div className="swl-contact-label">
        {label}
      </div>
      {href ? (
        <a href={href} className="swl-contact-value block w-fit">
          {value}
        </a>
      ) : (
        <span className="swl-contact-value block">
          {value}
        </span>
      )}
    </div>
  );
}
