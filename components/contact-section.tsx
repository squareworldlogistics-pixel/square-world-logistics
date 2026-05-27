"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import ContactForm from "@/components/contact-form";
import { COMPANY } from "@/lib/site-data";

/**
 * Obfuscated email component — prevents scrapers from harvesting the email
 * address while keeping it functional for users.
 */
function ObfuscatedEmail({ email, style }: { email: string; style?: React.CSSProperties }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Only reveal on client-side to prevent server-rendered plain text
    setRevealed(true);
  }, []);

  if (!revealed) {
    return (
      <span style={style}>
        [email protected]
      </span>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      style={{
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-swl-charcoal)",
        transition: "opacity 0.2s ease",
        ...style,
      }}
    >
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
        

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="md:!grid-cols-[3fr_2fr]"
        >
          {/* Form */}
          <div>
            
              <ContactForm />
            
          </div>

          {/* Contact Info */}
          <div>
            
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "0.375rem",
                      color: "var(--color-swl-slate)",
                    }}
                  >
                    Email
                  </div>
                  <ObfuscatedEmail email={COMPANY.email} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "0.375rem",
                      color: "var(--color-swl-slate)",
                    }}
                  >
                    Phone
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "var(--color-swl-charcoal)",
                        transition: "opacity 0.2s ease",
                        width: "fit-content",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      {COMPANY.phone}
                    </a>
                    {COMPANY.phone2 && (
                      <a
                        href={`tel:${COMPANY.phone2.replace(/\s/g, "")}`}
                        style={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "var(--color-swl-charcoal)",
                          transition: "opacity 0.2s ease",
                          width: "fit-content",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
                <div
                  style={{
                    paddingTop: "1.5rem",
                    marginTop: "0.5rem",
                    borderTop: "1px solid var(--color-swl-rule)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      lineHeight: "1.65",
                      color: "var(--color-swl-slate)",
                    }}
                  >
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
                    style={{
                      marginTop: "1.5rem",
                      width: "100%",
                      height: "240px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid var(--color-swl-rule)",
                      position: "relative",
                      display: "block",
                      backgroundColor: "var(--color-swl-mist)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        color: "var(--color-swl-slate)",
                        transition: "background-color 0.2s ease",
                      }}
                    >
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
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--color-swl-blue)",
                        }}
                      >
                        View on Google Maps →
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-swl-slate)",
                          textAlign: "center",
                          maxWidth: "280px",
                          lineHeight: 1.4,
                        }}
                      >
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
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "0.375rem",
          color: "var(--color-swl-slate)",
        }}
      >
        {label}
      </div>
      {href ? (
        <a
          href={href}
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--color-swl-charcoal)",
            transition: "opacity 0.2s ease",
          }}
        >
          {value}
        </a>
      ) : (
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--color-swl-charcoal)",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}
