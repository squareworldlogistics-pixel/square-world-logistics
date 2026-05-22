"use client";

import SectionHeading from "@/components/section-heading";
import ContactForm from "@/components/contact-form";
import { COMPANY } from "@/lib/site-data";

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
                <ContactInfoBlock
                  label="Email"
                  value={COMPANY.email}
                  href={`mailto:${COMPANY.email}`}
                />
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

                {/* Map Section */}
                {COMPANY.mapUrl && (
                  <div
                    style={{
                      marginTop: "1.5rem",
                      width: "100%",
                      height: "240px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid var(--color-swl-rule)",
                      position: "relative",
                    }}
                  >
                    <iframe
                      src={COMPANY.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location Map"
                    />
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
