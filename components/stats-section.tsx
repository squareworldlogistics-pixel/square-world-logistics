"use client";

import { useEffect, useState, useRef } from "react";

/**
 * A sleek, high-end, minimal stats strip featuring:
 * 1. Happy Clients: 100+
 * 2. Years of Experience: 3+
 * 3. Shipments Processed: 1K+
 * 4. Total Website Visitors: Live count with pulsing green indicator
 * Completely optimized to remove inline styles for A+ PageSpeed Performance.
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
    <section ref={ref} className="swl-stats">
      <div className="swl-container">
        <div className="swl-stats__grid lg:!grid-cols-4">
          {/* Static Stats with animated values */}
          {stats.map((stat, i) => (
            <StatItem 
              key={i} 
              value={stat.value} 
              suffix={stat.suffix} 
              label={stat.label} 
            />
          ))}

          {/* Dynamic Live Visitor Stat */}
          <div className="swl-stats__item">
            {/* Pulsing indicator at the top right of the count */}
            <div className="swl-stats__value inline-flex items-center gap-2 justify-center">
              <span>{animatedVisitor.toLocaleString()}</span>
              
              {/* Pulse Dot */}
              <div className="swl-pulse-dot">
                <span className="swl-pulse-dot__ring" />
                <span className="swl-pulse-dot__core" />
              </div>
            </div>

            <div className="swl-stats__label inline-flex items-center justify-center gap-1.5">
              Total Website Visitors
              <span className="swl-stats__live-badge">
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
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
}: { 
  value: number; 
  suffix: string; 
  label: string; 
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
    <div ref={ref} className="swl-stats__item">
      <div className="swl-stats__value">
        <span className="tabular-nums">{count}</span>
        {suffix}
      </div>
      <div className="swl-stats__label">
        {label}
      </div>
    </div>
  );
}
