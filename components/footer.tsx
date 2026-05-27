"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, NAV_LINKS, SOCIAL_LINKS } from "@/lib/site-data";

/**
 * Premium blue footer matching primary brand color with 100% clean white high-contrast typography.
 * Completely optimized to remove inline styles for A+ PageSpeed Performance.
 */
export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(COMPANY.email);
  }, []);

  if (pathname?.startsWith("/coming-soon")) {
    return null;
  }

  return (
    <footer className="swl-bg-white swl-pos-relative overflow-hidden" style={{ backgroundColor: "var(--color-swl-blue)", color: "var(--color-swl-white)" }}>
      <div className="swl-container" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Column 1: Brand & Socials */}
          <div className="md:pr-8">
            <div className="inline-block mb-3 -mt-10 -ml-6">
              <img
                src="/logo-footer.png?v=3" // Custom transparent logo
                alt={`${COMPANY.name} Logo`}
                width="260"
                height="137"
                className="block w-[260px] h-auto"
              />
            </div>
            <p className="swl-footer-desc">
              Reliable global shipping and freight solutions across 220+ countries. End-to-end logistics support for businesses of all sizes, so you can focus on growth.
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              {[
                { id: "linkedin", href: SOCIAL_LINKS.linkedin },
                { id: "facebook", href: SOCIAL_LINKS.facebook },
                ...(SOCIAL_LINKS.instagram ? [{ id: "instagram", href: SOCIAL_LINKS.instagram }] : []),
                ...(SOCIAL_LINKS.x ? [{ id: "x", href: SOCIAL_LINKS.x }] : []),
              ].map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swl-footer-social"
                  aria-label={`Follow us on ${social.id}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.id === "linkedin" && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />}
                    {social.id === "facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                    {social.id === "instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>}
                    {social.id === "x" && <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267zm6.525 0l7.475 16m-14 -16l7.475 16" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="swl-footer-heading">
              Company
            </h4>
            <nav className="flex flex-col gap-4" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="swl-footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="swl-footer-heading">
              Services
            </h4>
            <nav className="flex flex-col gap-4" aria-label="Footer services">
              {["Air Express", "Air Freight", "Sea Freight", "Customs Clearance"].map((item) => (
                <Link
                  key={item}
                  href="/services"
                  className="swl-footer-link"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="md:-ml-12 lg:-ml-16">
            <h4 className="swl-footer-heading">
              Contact Us
            </h4>
            <div className="flex flex-col gap-5" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              {/* Address */}
              <div className="swl-footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="swl-footer-contact-text">{COMPANY.address}</span>
              </div>
              
              {/* Office Hours */}
              {COMPANY.officeHours && (
                <div className="swl-footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="swl-footer-contact-text">{COMPANY.officeHours}</span>
                </div>
              )}
              
              {/* Phones */}
              <div className="swl-footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="flex flex-col gap-1 text-sm">
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                    {COMPANY.phone}
                  </a>
                  {COMPANY.phone2 && (
                    <a href={`tel:${COMPANY.phone2.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                      {COMPANY.phone2}
                    </a>
                  )}
                </div>
              </div>

              {/* Email — Obfuscated */}
              <div className="swl-footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={email ? `mailto:${email}` : "#"} className="text-sm transition-colors break-all hover:text-white">
                  {email || "Contact Us"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="swl-footer-bottom">
          <div className="flex gap-4 items-center flex-wrap">
            <span>&copy; {year} {COMPANY.name}. All rights reserved.</span>
            <span className="opacity-30">|</span>
            <span className="text-sm">
              Built by <a href="https://www.davlabs.in" target="_blank" rel="noopener noreferrer" className="text-white hover:border-b hover:border-white font-display text-[0.9375rem] ml-1 transition-all">DAVLabs</a>
            </span>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
