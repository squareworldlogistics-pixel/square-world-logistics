"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Premium Scroll to Top button.
 * Appears after scrolling down 400px.
 * Smoothly scrolls back to top when clicked.
 */
export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPos > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    
    // Trigger immediately on mount to capture any mid-scroll page states
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility, { passive: true } as any);
  }, []);

  if (pathname?.startsWith("/coming-soon") || pathname?.startsWith("/maintenance")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        .scroll-to-top {
          position: fixed;
          bottom: 6.5rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--color-swl-white);
          color: var(--color-swl-blue);
          border: 1px solid var(--color-swl-rule);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9998;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 5.5rem;
            right: 1.5rem;
            width: 48px;
            height: 48px;
          }
        }
        .scroll-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .scroll-to-top:hover {
          background-color: var(--color-swl-blue);
          color: var(--color-swl-white);
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(59, 110, 181, 0.2);
          border-color: var(--color-swl-blue);
        }
        .scroll-to-top-arrow {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>
      
      <button
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg className="scroll-to-top-arrow" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
