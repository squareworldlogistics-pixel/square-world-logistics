"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";

/**
 * Premium blue footer matching primary brand color with 100% clean white high-contrast typography.
 */
export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith("/coming-soon")) {
    return null;
  }

  return (
    <footer
      style={{
        backgroundColor: "var(--color-swl-blue)", // Matches #3B6EB5 brand color perfectly
        color: "var(--color-swl-white)", // 100% White text
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="swl-container" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
        >
          {/* Column 1: Brand & Socials */}
          <div style={{ paddingRight: "2rem" }}>
            <div
              style={{
                display: "inline-block",
                marginBottom: "0.75rem",
                marginTop: "-2.5rem",
              }}
            >
              <img
                src="/logo-footer.png?v=3" // Custom transparent logo
                alt={`${COMPANY.name} Logo`}
                width="260"
                height="137"
                style={{
                  width: "260px",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: "1.75",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "2rem",
              }}
            >
              Reliable global shipping and freight solutions across 220+ countries. End-to-end logistics support for businesses of all sizes, so you can focus on growth.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {/* Social Icons */}
              {[
                { id: "linkedin", href: "https://www.linkedin.com/company/square_world_logistics/" },
                { id: "facebook", href: "https://www.facebook.com/profile.php?id=61583040150446" }
              ].map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "var(--color-swl-white)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-swl-white)";
                    e.currentTarget.style.color = "var(--color-swl-blue)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                    e.currentTarget.style.color = "var(--color-swl-white)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  aria-label={social.id}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.id === "linkedin" && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />}
                    {social.id === "facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-white)", // 100% White heading
                marginBottom: "1.5rem",
              }}
            >
              Company
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }} aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.75)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-white)", // 100% White heading
                marginBottom: "1.5rem",
              }}
            >
              Services
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }} aria-label="Footer services">
              {["Air Express", "Air Freight", "Sea Freight", "Customs Clearance"].map((item) => (
                <Link
                  key={item}
                  href="/services"
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.75)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)")}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="md:-ml-12 lg:-ml-16">
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-swl-white)", // 100% White heading
                marginBottom: "1.5rem",
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "rgba(255, 255, 255, 0.8)" }}>
              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: "0.875rem", lineHeight: "1.5", color: "var(--color-swl-white)" }}>{COMPANY.address}</span>
              </div>
              
              {/* Office Hours */}
              {COMPANY.officeHours && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ fontSize: "0.875rem", lineHeight: "1.5", color: "var(--color-swl-white)" }}>{COMPANY.officeHours}</span>
                </div>
              )}
              
              {/* Phones */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.875rem" }}>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} style={{ transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}>
                    {COMPANY.phone}
                  </a>
                  {COMPANY.phone2 && (
                    <a href={`tel:${COMPANY.phone2.replace(/\s/g, "")}`} style={{ transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}>
                      {COMPANY.phone2}
                    </a>
                  )}
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${COMPANY.email}`} style={{ fontSize: "0.875rem", transition: "color 0.2s ease", wordBreak: "break-all" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}>
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.8125rem",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <span>&copy; {year} {COMPANY.name}. All rights reserved.</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255, 255, 255, 0.7)" }}>
              Built by <a href="https://www.davlabs.in" target="_blank" rel="noopener noreferrer" style={{ 
                color: "var(--color-swl-white)", 
                textDecoration: "none", 
                fontFamily: "var(--font-display)",
                fontSize: "0.9375rem",
                marginLeft: "0.25rem",
                transition: "all 0.2s ease",
                borderBottom: "1px solid transparent"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-swl-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
              >DAVLabs</a>
            </span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link href="/privacy" style={{ transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}>Privacy Policy</Link>
            <Link href="/terms" style={{ transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}>Terms of Service</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-swl-white)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
