"use client";

import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { WorldMap } from "@/components/ui/world-map";

const SLIDES = [
  {
    headline: "Global Logistics.",
    accent: "Simplified.",
    body: "Comprehensive shipping and express freight solutions serving over 220+ countries with complete operational precision.",
    cta: { label: "Explore Services", href: "/services" },
    img: "/slide-1.jpg",
  },
  {
    headline: "Air. Sea.",
    accent: "On Time.",
    body: "From fast express couriers to full oceanic cargo freight — we handle your supply chain end-to-end, on schedule.",
    cta: { label: "View Services", href: "/services" },
    img: "/slide-2.jpg",
  },
  {
    headline: "Your Trusted",
    accent: "Logistics Partner.",
    body: "Round-the-clock dedicated operational support, customs clearance, and tailor-made logistics frameworks for businesses worldwide.",
    cta: { label: "Get in Touch", href: "/contact" },
    img: "/slide-3.jpg",
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
        .hs-wrap {
          position: relative;
          min-height: 580px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background-color: var(--color-swl-white);
          border-bottom: 1px solid var(--color-swl-rule);
        }
        @media (max-width: 1024px) {
          .hs-wrap {
            min-height: auto;
            padding: 3.5rem 0;
          }
        }

        /* Continuous slow Ken Burns zoom animation for cinematic visual movement */
        @keyframes ken-burns {
          0% { transform: scale(1.01); }
          100% { transform: scale(1.08); }
        }

        .hs-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.45s ease-in-out;
          animation: ken-burns 12s ease-in-out infinite alternate;
          will-change: opacity, transform;
        }
        .hs-bg.out { opacity: 0; }

        /* Content container styling (Right Aligned on Desktop) */
        .hs-content {
          position: relative;
          z-index: 10;
          transition: opacity 0.32s ease, transform 0.32s ease;
          opacity: 1;
          transform: translateY(0);
          max-width: 580px;
          margin-left: auto; /* Push text to the right half on desktop */
        }
        @media (max-width: 1024px) {
          .hs-content {
            margin-left: 0;
            max-width: 100%;
          }
        }
        
        .hs-content.out {
          opacity: 0;
          transform: translateY(8px);
        }

        .hs-wrap .hs-h1 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(2.3rem, 4.5vw, 3.65rem);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.015em;
          color: var(--color-swl-charcoal) !important;
          margin: 0 0 0.1em;
        }
        .hs-wrap .hs-h1 span {
          color: var(--color-swl-blue) !important;
        }

        .hs-wrap .hs-body {
          margin-top: 1.25rem;
          margin-bottom: 2rem;
          font-size: 1.0625rem;
          line-height: 1.65;
          color: var(--color-swl-slate) !important;
          max-width: 480px;
        }

        /* Footer navigation controls */
        .hs-foot {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 2.5rem;
        }
        .hs-dots { display: flex; gap: 0.4rem; }
        .hs-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(3, 105, 161, 0.2);
          padding: 0;
          cursor: pointer;
          transition: background 0.25s, transform 0.25s;
        }
        .hs-dot.on {
          background: var(--color-swl-blue);
          transform: scale(1.35);
        }
        .hs-bar-wrap {
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: rgba(3, 105, 161, 0.12);
          overflow: hidden;
        }
        .hs-bar {
          height: 100%;
          background: var(--color-swl-blue);
          animation: hs-fill ${INTERVAL}ms linear infinite;
        }
        @keyframes hs-fill { from { width: 0% } to { width: 100% } }
        .hs-wrap .hs-count {
          font-size: 0.75rem;
          color: var(--color-swl-slate) !important;
          font-weight: 600;
          letter-spacing: 0.04em;
          margin-left: auto;
        }

        /* Diagonal cut full-height panel for desktop slider window (LEFT Side) */
        .hs-diagonal-pane {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 46%;
          z-index: 5;
          clip-path: polygon(0% 0%, 82% 0%, 100% 100%, 0% 100%);
          overflow: hidden;
          background-color: var(--color-swl-mist);
        }

        @media (max-width: 1024px) {
          .hs-diagonal-pane {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
            clip-path: none;
            border-radius: 12px;
            margin-top: 2rem;
            margin-bottom: 0.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
        }
      `}</style>

      <div className="hs-wrap">
        {/* ── Full Height Diagonal Clipped Image Pane (Desktop Only - LEFT Side) ── */}
        <div className="hidden lg:block hs-diagonal-pane">
          <div
            className={`hs-bg${fading ? " out" : ""}`}
            style={{ backgroundImage: `url(${s.img})` }}
          />
        </div>

        {/* ── Animated World Map Background (Desktop Only - RIGHT Side behind text) ── */}
        <div 
          style={{ 
            position: "absolute",
            top: "8%",
            bottom: "8%",
            right: 0,
            width: "54%",
            opacity: 0.85,
            zIndex: 1,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center"
          }}
          className="hidden lg:flex"
        >
          <WorldMap dots={[
            {
              start: { lat: 22.5, lng: 82.5, label: "India" },
              end: { lat: 50.1109, lng: 8.6821, label: "Frankfurt" },
            },
            {
              start: { lat: 22.5, lng: 82.5, label: "India" },
              end: { lat: 40.7128, lng: -74.0060, label: "New York" },
            },
            {
              start: { lat: 22.5, lng: 82.5, label: "India" },
              end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
            },
            {
              start: { lat: 22.5, lng: 82.5, label: "India" },
              end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
            },
          ]} />
        </div>

        <div className="swl-container relative z-10 w-full">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center"
            }}
            className="lg:!grid-cols-[0.85fr_1fr]"
          >
            {/* Empty spacer column on desktop to offset text from absolute left clipped panel */}
            <div className="hidden lg:block" style={{ height: "420px", pointerEvents: "none" }} />

            {/* Right side: Animated slide text contents */}
            <div className={`hs-content${fading ? " out" : ""}`}>
              <h1 className="hs-h1">
                {s.headline}<br />
                <span>{s.accent}</span>
              </h1>

              <p className="hs-body">{s.body}</p>

              <div style={{ position: "relative", width: "fit-content" }}>
                <MagneticButton href={s.cta.href} className="swl-btn--primary">
                  {s.cta.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.4rem" }}>
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </MagneticButton>
              </div>

              {/* Mobile rendering of the slide image directly within flow */}
              <div className="lg:hidden">
                <div className="hs-diagonal-pane">
                  <div
                    className={`hs-bg${fading ? " out" : ""}`}
                    style={{ backgroundImage: `url(${s.img})` }}
                  />
                </div>
              </div>

              <div className="hs-foot">
                <div className="hs-dots">
                  {SLIDES.map((_, i) => (
                    <button key={i} className={`hs-dot${i === current ? " on" : ""}`} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
                <div className="hs-bar-wrap">
                  <div key={current} className="hs-bar" />
                </div>
                <span className="hs-count">0{current + 1} / 0{SLIDES.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
