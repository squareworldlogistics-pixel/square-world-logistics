"use client";

import { useEffect, useState, useRef } from "react";

const X = 28;
const TOP = 104;
const BOTTOM = 40;

export default function PageFlowPath() {
  const [progress, setProgress] = useState(0);
  const [vh, setVh] = useState(800);
  const [rotation, setRotation] = useState(90);
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
        setRotation(90); // Scrolling down -> face down
        lastScrollY.current = currentScroll;
      } else if (diff < -5) {
        setRotation(-90); // Scrolling up -> face up
        lastScrollY.current = currentScroll;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        {/* Plane — outer <g> handles vertical translation, inner <g> handles smooth rotation */}
        <g transform={`translate(${X}, ${planeY})`}>
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "0px 0px",
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            fill="rgba(3,105,161,0.85)"
          >
            <polygon points="11,0  4,1.3  -9,1.8  -9,-1.8  4,-1.3" />
            <polygon points="3,-1.2  -1,-11  -5,-9.5  -0.5,-1.2" />
            <polygon points="3,1.2  -1,11  -5,9.5  -0.5,1.2" />
            <polygon points="-7,-1.5  -9.5,-5  -11,-4.5  -8.5,-1.5" />
            <polygon points="-7,1.5  -9.5,5  -11,4.5  -8.5,1.5" />
          </g>
        </g>
      </svg>
    </>
  );
}
