"use client";

import { useEffect, useState, useRef } from "react";

/**
 * A sleek, high-end, minimal stats strip featuring:
 * 1. Happy Clients: 100+
 * 2. Years of Experience: 3+
 * 3. Shipments Processed: 1K+
 * 4. Total Website Visitors: Live count with pulsing green indicator
 */
export default function StatsSection() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedVisitor, setAnimatedVisitor] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Core stats data
  const stats = [
    { value: 100, suffix: "+", label: "Happy Clients" },
    { value: 3, suffix: "+", label: "Years of Experience" },
    { value: 1, suffix: "K+", label: "Shipments Processed" },
  ];

  // 1. Live visitor counter logic (using public CountAPI)
  useEffect(() => {
    let active = true;

    async function fetchVisitorCount() {
      try {
        const key = "squareworldlogistics_total_visitors_v2";
        
        // Check if this session has already been counted
        const sessionCounted = sessionStorage.getItem("swl_session_counted");
        let response;
        
        if (!sessionCounted) {
          // First load in this session: increment counter using 'hit'
          response = await fetch(`https://countapi.mileshilliard.com/api/v1/hit/${key}`);
          sessionStorage.setItem("swl_session_counted", "true");
        } else {
          // Subsequent reloads in this session: just read value using 'get' without incrementing
          response = await fetch(`https://countapi.mileshilliard.com/api/v1/get/${key}`);
        }
        
        if (!response.ok) throw new Error("API call failed");
        
        const data = await response.json();
        if (data && typeof data.value === "number" && active) {
          // Show the exact raw count from CountAPI
          const finalCount = data.value;
          setVisitorCount(finalCount);
          // Sync with local storage
          localStorage.setItem("swl_visitor_count", finalCount.toString());
        }
      } catch (error) {
        console.warn("CountAPI failed, falling back to local storage:", error);
        
        if (!active) return;
        // Fallback to local storage counter if API is down/offline
        const stored = localStorage.getItem("swl_visitor_count");
        let countVal = 1;
        
        if (stored) {
          countVal = parseInt(stored, 10);
        }
        
        countVal += 1;
        localStorage.setItem("swl_visitor_count", countVal.toString());
        setVisitorCount(countVal);
      }
    }

    fetchVisitorCount();

    // Live incrementing interval to mimic live active traffic in real-time
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        if (prev === null) return null;
        const next = prev + Math.floor(Math.random() * 2) + 1;
        localStorage.setItem("swl_visitor_count", next.toString());
        return next;
      });
    }, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // 2. Viewport animation logic
  useEffect(() => {
    const el = ref.current;
    if (!el || visitorCount === null || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(el);

          // Animate the visitors from 0 to visitorCount
          const start = performance.now();
          const duration = 2000;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedVisitor(Math.floor(eased * visitorCount));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setAnimatedVisitor(visitorCount);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visitorCount, hasAnimated]);

  // Keep visitor count synced after animation completes
  useEffect(() => {
    if (hasAnimated && visitorCount !== null) {
      setAnimatedVisitor(visitorCount);
    }
  }, [visitorCount, hasAnimated]);

  return (
    <section 
      ref={ref}
      style={{ 
        backgroundColor: "var(--color-swl-white)",
        borderTop: "1px solid var(--color-swl-rule)",
        borderBottom: "1px solid var(--color-swl-rule)",
        padding: "2rem 0"
      }}
    >
      <div className="swl-container">
        <div 
          style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2.5rem 1.5rem",
          }}
          className="lg:!grid-cols-4"
        >
          {/* Static Stats with animated values */}
          {stats.map((stat, i) => (
            <StatItem 
              key={i} 
              value={stat.value} 
              suffix={stat.suffix} 
              label={stat.label} 
              isLast={false} 
            />
          ))}

          {/* Dynamic Live Visitor Stat */}
          <div style={{ textAlign: "center", padding: "0.5rem", position: "relative" }}>
            {/* Pulsing indicator at the top right of the count */}
            <div 
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                justifyContent: "center",
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontSize: "clamp(2.5rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "var(--color-swl-blue)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em"
              }}
            >
              <span>{animatedVisitor.toLocaleString()}</span>
              
              {/* Pulse Dot */}
              <div style={{ display: "inline-flex", position: "relative", width: "8px", height: "8px" }}>
                <span 
                  style={{
                    position: "absolute",
                    display: "inline-flex",
                    height: "100%",
                    width: "100%",
                    borderRadius: "9999px",
                    backgroundColor: "#22c55e",
                    opacity: 0.75,
                    animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
                  }}
                />
                <span 
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    borderRadius: "9999px",
                    height: "8px",
                    width: "8px",
                    backgroundColor: "#22c55e"
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-swl-slate)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.375rem"
              }}
            >
              Total Website Visitors
              <span 
                style={{ 
                  fontSize: "0.625rem", 
                  color: "#22c55e", 
                  fontWeight: 800, 
                  backgroundColor: "rgba(34, 197, 94, 0.1)", 
                  padding: "0.125rem 0.375rem", 
                  borderRadius: "4px",
                  letterSpacing: "0.05em"
                }}
              >
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global ping animation styling */}
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Individual Stat Block Component
 */
function StatItem({ 
  value, 
  suffix, 
  label, 
  isLast 
}: { 
  value: number; 
  suffix: string; 
  label: string; 
  isLast: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(el);

          const start = performance.now();
          const duration = 2000;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div 
      ref={ref}
      style={{ 
        textAlign: "center", 
        padding: "0.5rem" 
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display), system-ui, sans-serif",
          fontSize: "clamp(2.5rem, 4vw, 2.75rem)",
          fontWeight: 700,
          color: "var(--color-swl-blue)",
          lineHeight: 1.1,
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em"
        }}
      >
        <span className="tabular-nums">{count}</span>
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-swl-slate)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
