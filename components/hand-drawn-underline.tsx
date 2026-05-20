"use client";

/**
 * A rough, organic pencil-style underline SVG.
 */
export default function HandDrawnUnderline({ 
  color = "var(--color-swl-blue)", 
  width = "100%", 
  className = "" 
}: { 
  color?: string; 
  width?: string | number;
  className?: string;
}) {
  return (
    <svg 
      width={width} 
      height="12" 
      viewBox="0 0 200 12" 
      fill="none" 
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block" }}
    >
      <path 
        d="M2 8.5C35 6.5 68 4.5 101 4C134 3.5 167 4.5 198 8.5" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        style={{ 
          opacity: 0.8,
          filter: "blur(0.2px)" // Subtle pencil softness
        }}
      />
      <path 
        d="M5 10.5C40 8.5 75 7 110 7.5C145 8 180 9.5 195 10.5" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
        style={{ 
          opacity: 0.5,
          filter: "blur(0.4px)"
        }}
      />
    </svg>
  );
}
