"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorldMap } from "@/components/ui/world-map";

const SLIDES = [
  {
    headline: "Global Logistics.",
    accent: "Simplified.",
    body: "Comprehensive shipping and express freight solutions serving over 220+ countries with complete operational precision.",
    cta: { label: "Explore Services", href: "/services" },
    img: "/slide-1.jpg",
    imgAlt: "Global logistics operations — cargo containers at an international shipping port",
  },
  {
    headline: "Air. Sea.",
    accent: "On Time.",
    body: "From fast express couriers to full oceanic cargo freight — we handle your supply chain end-to-end, on schedule.",
    cta: { label: "View Services", href: "/services" },
    img: "/slide-2.jpg",
    imgAlt: "Air freight and sea freight services — cargo aircraft on runway",
  },
  {
    headline: "Your Trusted",
    accent: "Logistics Partner.",
    body: "Round-the-clock dedicated operational support, customs clearance, and tailor-made logistics frameworks for businesses worldwide.",
    cta: { label: "Get in Touch", href: "/contact" },
    img: "/slide-3.jpg",
    imgAlt: "Trusted logistics partner — professional freight forwarding team",
  },
];

const INTERVAL = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => {
    if (fading || idx === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 320);
  };

  const next = () => go((current + 1) % SLIDES.length);

  useEffect(() => {
    timer.current = setInterval(next, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [current, fading]);

  const s = SLIDES[current];

  return (
    <>
      <style>{`
        /* ── Hero Wrapper ── */
        .hs-wrap {
          position: relative;
          height: 68vh;
          min-height: 480px;
          max-height: 640px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-color: #1B2D45; /* Dark navy blue base */
        }
        @media (max-width: 1024px) {
          .hs-wrap {
            height: auto;
            min-height: auto;
            max-height: none;
            padding: 4rem 0 3rem;
          }
        }

        /* ── Background Image: positioned on the RIGHT half ── */
        .hs-img-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40%;
          transition: opacity 0.45s ease-in-out;
          z-index: 1;
        }
        .hs-img-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .hs-img-right.out { opacity: 0; }
        @media (max-width: 1024px) {
          .hs-img-right {
            width: 100%;
            height: 50%;
            top: auto;
            bottom: 0;
          }
        }

        /* ── Fade overlay: Solid left → transparent right ── */
        .hs-fade {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40%;
          z-index: 2;
          background: linear-gradient(
            to right,
            #1B2D45 0%,
            rgba(27, 45, 69, 0.85) 20%,
            rgba(27, 45, 69, 0.4) 50%,
            rgba(27, 45, 69, 0) 80%
          );
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          .hs-fade {
            width: 100%;
            height: 50%;
            top: auto;
            bottom: 0;
            background: linear-gradient(
              to bottom,
              #1B2D45 0%,
              rgba(27, 45, 69, 0.4) 60%,
              rgba(27, 45, 69, 0) 100%
            );
          }
        }

        /* ── Content styling ── */
        .hs-content {
          position: relative;
          z-index: 10;
          transition: opacity 0.32s ease, transform 0.32s ease;
          opacity: 1;
          transform: translateY(0);
          max-width: 580px;
          padding: 2rem 0;
        }
        .hs-content.out {
          opacity: 0;
          transform: translateY(8px);
        }

        .hs-wrap .hs-h1 {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #FFFFFF !important;
          margin: 0 0 0.15em;
        }
        .hs-wrap .hs-h1 span {
          font-weight: 700;
          display: block;
        }

        .hs-wrap .hs-body {
          margin-top: 1.5rem;
          margin-bottom: 2.5rem;
          font-size: 1.0625rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.82) !important;
          max-width: 420px;
        }

        /* ── White outline button ── */
        .hs-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: #FFFFFF;
          border: 1.5px solid #FFFFFF;
          padding: 0.75rem 1.75rem;
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .hs-btn-outline:hover {
          background: #FFFFFF;
          color: #1B2D45;
        }
        /* ── World Map Container ── */
        .hs-world-map {
          position: absolute;
          top: 3%;
          bottom: 3%;
          left: 0;
          width: 70%;
          opacity: 0.9;
          z-index: 3;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
      `}</style>

      <div className="hs-wrap">
        {/* ── Photo on the RIGHT side ── */}
        <div className={`hs-img-right${fading ? " out" : ""}`}>
          <Image
            src={s.img}
            alt={s.imgAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={current === 0}
            draggable={false}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* ── Fade overlay between dark-blue left and photo right ── */}
        <div className="hs-fade" />

        {/* ── Dotted World Map (behind text on left ~70% of screen) ── */}
        <div className="hidden lg:flex hs-world-map">
          <WorldMap
            dots={[
              {
                start: { lat: 22.5, lng: 82.5, label: "India" },
                end: { lat: 50.1109, lng: 8.6821, label: "Frankfurt" },
              },
              {
                start: { lat: 22.5, lng: 82.5, label: "India" },
                end: { lat: 40.7128, lng: -74.006, label: "New York" },
              },
              {
                start: { lat: 22.5, lng: 82.5, label: "India" },
                end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
              },
              {
                start: { lat: 22.5, lng: 82.5, label: "India" },
                end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
              },
            ]}
          />
        </div>

        {/* ── Text Content (left side) ── */}
        <div className="swl-container relative z-10 w-full">
          <div className={`hs-content${fading ? " out" : ""}`}>
            <h1 className="hs-h1">
              {s.headline}
              <span>{s.accent}</span>
            </h1>

            <p className="hs-body">{s.body}</p>

            <Link href={s.cta.href} className="hs-btn-outline">
              {s.cta.label}
              <svg
                width="16"
                height="16"
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
      </div>
    </>
  );
}
