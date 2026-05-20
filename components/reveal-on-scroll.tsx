"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** If true, reveal instantly on mount (no scroll required). Use for above-the-fold hero content. */
  instant?: boolean;
};

/**
 * Wraps children in a fade-up reveal animation
 * triggered by Intersection Observer on viewport entry,
 * or instantly on mount when `instant` is true.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  instant = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (instant) {
      // Reveal on the very first animation frame — no scroll needed
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.classList.add("swl-reveal--visible");
        }, delay);
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("swl-reveal--visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, instant]);

  return (
    <div
      ref={ref}
      className={`swl-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
