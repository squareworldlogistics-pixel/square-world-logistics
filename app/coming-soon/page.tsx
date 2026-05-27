"use client";

import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [targetLabel, setTargetLabel] = useState("June 1, 2026");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let targetTime = new Date(2026, 5, 1, 0, 0, 0).getTime(); // Default: June 1, 2026

    const loadSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.countdownTarget) {
            const parsedTime = new Date(data.countdownTarget).getTime();
            if (!isNaN(parsedTime)) {
              targetTime = parsedTime;
              const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
              setTargetLabel(new Date(data.countdownTarget).toLocaleDateString("en-US", options));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load coming soon target settings:", err);
      }
    };

    // Calculate countdown
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setIsLive(true);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    // Load settings then initialize countdown interval
    let timer: NodeJS.Timeout;
    loadSettings().then(() => {
      calculateTimeLeft();
      timer = setInterval(calculateTimeLeft, 1000);
    });

    // Start fallback local timer immediately
    calculateTimeLeft();
    const fallbackTimer = setInterval(calculateTimeLeft, 1000);

    return () => {
      if (timer) clearInterval(timer);
      clearInterval(fallbackTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        .cs-page {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif;
          z-index: 99999;
          padding: clamp(1rem, 5vw, 2rem);
        }

        .cs-wrapper {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .cs-logo {
          width: clamp(130px, 15vw, 150px);
          height: auto;
          margin-bottom: clamp(2rem, 5vh, 3rem);
          opacity: 0.95;
        }

        .cs-badge {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #888888;
          margin-bottom: 1rem;
        }

        .cs-timer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.375rem, 1.5vw, 1rem);
          margin-bottom: clamp(1.75rem, 4vh, 2.5rem);
          background-color: transparent;
          padding: 0;
          border: none;
        }

        .cs-timer-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: clamp(44px, 11vw, 60px);
        }

        .cs-timer-num {
          font-family: var(--font-body), monospace;
          font-size: clamp(1.625rem, 5.5vw, 2.5rem);
          font-weight: 300;
          color: #1a202c;
          line-height: 1;
        }

        .cs-timer-label {
          font-size: 0.5625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a0aec0;
          margin-top: 0.5rem;
        }

        .cs-timer-sep {
          font-size: clamp(1.125rem, 4vw, 1.75rem);
          font-weight: 200;
          color: #e2e8f0;
          margin-top: -0.75rem;
        }

        .cs-description {
          font-size: clamp(0.78125rem, 2vw, 0.875rem);
          color: #666666;
          line-height: 1.6;
          max-width: 380px;
          margin: 0 0 clamp(2rem, 5vh, 3rem) 0;
        }

        .cs-visuals-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          width: 100%;
          max-width: 420px;
        }

        .cs-visual-card {
          position: relative;
          height: clamp(80px, 12vh, 100px);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.01);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          border: 1px solid #edf2f7;
        }

        .cs-visual-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
        }

        .cs-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cs-visual-card:hover .cs-visual-img {
          transform: scale(1.05);
        }

        .cs-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4));
          display: flex;
          align-items: flex-end;
          padding: 0.875rem;
          color: #ffffff;
        }

        .cs-visual-title {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .cs-live-btn-wrap {
          margin-bottom: clamp(2rem, 5vh, 3rem);
        }

        .cs-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          background-color: #3B6EB5;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: background-color 0.2s ease;
          box-shadow: 0 4px 14px rgba(59, 110, 181, 0.2);
        }

        .cs-live-btn:hover {
          background-color: #2d548c;
        }
      `}</style>

      <div className="cs-page">
        <div className="cs-wrapper">
          {/* Centered Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Square World Logistics Logo" className="cs-logo" />

          {/* Badge */}
          <div className="cs-badge">Coming Soon</div>

          {/* Subtly Floating Minimalist Timer */}
          <div className="cs-timer-row">
            <div className="cs-timer-block">
              <span className="cs-timer-num">{timeLeft.days}</span>
              <span className="cs-timer-label">Days</span>
            </div>
            <span className="cs-timer-sep">:</span>
            <div className="cs-timer-block">
              <span className="cs-timer-num">{timeLeft.hours}</span>
              <span className="cs-timer-label">Hours</span>
            </div>
            <span className="cs-timer-sep">:</span>
            <div className="cs-timer-block">
              <span className="cs-timer-num">{timeLeft.minutes}</span>
              <span className="cs-timer-label">Mins</span>
            </div>
            <span className="cs-timer-sep">:</span>
            <div className="cs-timer-block">
              <span className="cs-timer-num">{timeLeft.seconds}</span>
              <span className="cs-timer-label">Secs</span>
            </div>
          </div>

          {/* Corporate Launch Description or Enter Live Link */}
          {isLive ? (
            <div className="cs-live-btn-wrap">
              <a
                href="/"
                className="cs-live-btn"
              >
                Enter Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          ) : (
            <p className="cs-description">
              Our next-generation global logistics and tracking platform launches on {targetLabel}.
            </p>
          )}

          {/* High-End, Symmetrical Visual Cards */}
          <div className="cs-visuals-grid">
            <div className="cs-visual-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sea-freight.png" alt="Sea Freight Operations" className="cs-visual-img" />
              <div className="cs-visual-overlay">
                <span className="cs-visual-title">Sea Cargo</span>
              </div>
            </div>
            <div className="cs-visual-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tailor-made.png" alt="Air Cargo Operations" className="cs-visual-img" />
              <div className="cs-visual-overlay">
                <span className="cs-visual-title">Air Cargo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
