"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const X = 28;
const TOP = 104;
const BOTTOM = 40;

export default function PageFlowPath() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [vh, setVh] = useState(800);
  const [rotation, setRotation] = useState(180);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh, { passive: true });
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(currentScroll / docH, 1) : 0);

      const diff = currentScroll - lastScrollY.current;
      if (diff > 5) {
        setRotation(180); // Scrolling down -> face down
        lastScrollY.current = currentScroll;
      } else if (diff < -5) {
        setRotation(0); // Scrolling up -> face up
        lastScrollY.current = currentScroll;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/coming-soon") || pathname?.startsWith("/maintenance")) {
    return null;
  }

  const trackH = vh - TOP - BOTTOM;
  const planeY = TOP + progress * trackH;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .swl-flow-rail { display: none !important; }
        }
      `}</style>

      <svg
        aria-hidden="true"
        className="swl-flow-rail"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${X * 3}px`,
          height: "100vh",
          pointerEvents: "none",
          zIndex: 50,
          overflow: "visible",
        }}
      >
        {/* Full dotted track */}
        <line
          x1={X} y1={TOP} x2={X} y2={vh - BOTTOM}
          stroke="rgba(3,105,161,0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 9"
          strokeLinecap="round"
        />

        {/* Filled progress line */}
        <line
          x1={X} y1={TOP} x2={X} y2={planeY}
          stroke="rgba(3,105,161,0.32)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Plane — outer <g> handles vertical translation, inner <g> handles smooth rotation and scale */}
        <g transform={`translate(${X}, ${planeY})`}>
          <g
            style={{
              transform: `rotate(${rotation}deg) scale(1.5)`,
              transformOrigin: "0px 6px",
              transition: "transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            fill="rgba(3,105,161,0.85)"
          >
            <path d="M 0,-16 C 1.5,-16 2.5,-12 2.5,-6 L 2.5,9 C 2.5,12 1.5,15 0,16 C -1.5,15 -2.5,12 -2.5,9 L -2.5,-6 C -2.5,-12 -1.5,-16 0,-16 Z M 2.5,-3 L 14.5,6 C 15.2,6.3 15.2,7.0 14.5,7.3 C 14.1,7.5 13.7,7.5 13.3,7.3 L 2.5,2 Z M -2.5,-3 L -14.5,6 C -15.2,6.3 -15.2,7.0 -14.5,7.3 C -14.1,7.5 -13.7,7.5 -13.3,7.3 L -2.5,2 Z M 2.5,11 L 8,14 C 8.5,14.2 8.5,14.8 8,15 C 7.8,15.1 7.6,15.1 7.4,15 L 2.5,14.5 Z M -2.5,11 L -8,14 C -8.5,14.2 -8.5,14.8 -8,15 C -7.8,15.1 -7.6,15.1 -7.4,15 L -2.5,14.5 Z" />
          </g>
        </g>
      </svg>
    </>
  );
}
