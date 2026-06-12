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

              {/* Map Section — Interactive Google Map */}
              {COMPANY.mapUrl && (
                <div className="swl-map-container">
                  <iframe
                    src={COMPANY.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Square World Logistics office location on Google Maps"
                    className="swl-map-iframe"
                  />
                  {COMPANY.mapStaticUrl && (
                    <a
                      href={COMPANY.mapStaticUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="swl-map-btn"
                      aria-label="Open location in Google Maps"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                      Open in Maps
                    </a>
                  )}
                </div>
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
