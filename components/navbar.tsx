"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";

/**
 * Hook to reveal email only on client-side (prevents scraper harvesting from SSR HTML)
 */
function useObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    setEmail(COMPANY.email);
  }, []);
  return email;
}

/**
 * Slim navigation bar with scroll-triggered backdrop blur
 * and full-screen mobile overlay menu.
 * Completely optimized to remove inline styles for A+ PageSpeed Performance.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const obfuscatedEmail = useObfuscatedEmail();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  if (pathname?.startsWith("/coming-soon") || pathname?.startsWith("/maintenance")) {
    return null;
  }

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 swl-nav-header ${
          isScrolled ? "swl-nav-header--scrolled" : "swl-nav-header--unscrolled"
        }`}
      >
        <div className="swl-container flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-50">
            <img
              src="/logo.png?v=4"
              alt={`${COMPANY.name} Logo`}
              width="140"
              height="56"
              className="swl-nav-logo"
            />
          </Link>

          {/* Desktop Nav & Contact */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              ))}
            </nav>

            {/* Elegant Minimal Contact Block */}
            <div className="flex flex-col items-end pl-8 swl-nav-block">
              <a
                href={obfuscatedEmail ? `mailto:${obfuscatedEmail}` : "#"}
                className="swl-nav-email"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {obfuscatedEmail || "Contact Us"}
              </a>
              <div className="swl-nav-phones">
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="swl-nav-phone-item"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {COMPANY.phone}
                </a>
                {COMPANY.phone2 && (
                  <a
                    href={`tel:${COMPANY.phone2.replace(/\s/g, "")}`}
                    className="swl-nav-phone-item"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {COMPANY.phone2}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 swl-nav-hamburger"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <span
              className="block w-6 h-[1.5px] origin-center"
              style={{
                backgroundColor: isMobileOpen
                  ? "var(--color-swl-white)"
                  : "var(--color-swl-charcoal)",
                transform: isMobileOpen
                  ? "rotate(45deg) translateY(3px)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            />
            <span
              className="block w-6 h-[1.5px] origin-center"
              style={{
                backgroundColor: isMobileOpen
                  ? "var(--color-swl-white)"
                  : "var(--color-swl-charcoal)",
                opacity: isMobileOpen ? 0 : 1,
                transition: "all 0.3s ease",
              }}
            />
            <span
              className="block w-6 h-[1.5px] origin-center"
              style={{
                backgroundColor: isMobileOpen
                  ? "var(--color-swl-white)"
                  : "var(--color-swl-charcoal)",
                transform: isMobileOpen
                  ? "rotate(-45deg) translateY(-3px)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden swl-nav-overlay"
        style={{
          opacity: isMobileOpen ? 1 : 0,
          pointerEvents: isMobileOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-3xl swl-nav-mobile-link"
              style={{
                color:
                  pathname === link.href
                    ? "var(--color-swl-blue)"
                    : "var(--color-swl-white)",
                opacity: isMobileOpen ? 1 : 0,
                transform: isMobileOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: isMobileOpen ? `${i * 80 + 100}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ── NavLink with hover underline and transit plane ────────────── */

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative py-1 swl-nav-link"
      style={{
        color: isActive
          ? "var(--color-swl-blue)"
          : "var(--color-swl-charcoal)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Solid Route track line */}
      <span
        className="absolute left-0 -bottom-1 h-[2px] w-full swl-nav-route-track"
        style={{
          opacity: isActive || hovered ? 1 : 0,
        }}
      />
      {/* Transit Plane — centered on the 2px line at bottom:-4px */}
      <span
        className="absolute swl-nav-transit-plane"
        style={{
          opacity: isActive || hovered ? 1 : 0,
          left: hovered ? "calc(100% - 18px)" : isActive ? "calc(100% - 18px)" : "0px",
        }}
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="var(--color-swl-blue)"
        >
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L21 16z" />
        </svg>
      </span>
    </Link>
  );
}
