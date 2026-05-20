"use client";

import { useState } from "react";
import { CARRIERS } from "@/lib/site-data";

export default function TrackingHub() {
  const [carrier, setCarrier] = useState<string>(CARRIERS[0].trackingUrl);
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = () => {
    if (trackingId.trim()) {
      window.open(`${carrier}${trackingId.trim()}`, "_blank");
    }
  };

  return (
    <div 
      style={{ 
        backgroundColor: "var(--color-swl-white)", 
        padding: "3rem 2.5rem", 
        border: "1px solid var(--color-swl-rule)",
        borderRadius: "2px",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)"
      }}
    >
      <h3 
        style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "1.5rem", 
          marginBottom: "2rem",
          color: "var(--color-swl-charcoal)" 
        }}
      >
        Track Your Shipment
      </h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Carrier Select */}
        <div style={{ position: "relative" }}>
          <label 
            className="swl-label" 
            style={{ fontSize: "0.6875rem", marginBottom: "0.5rem" }}
          >
            Select Carrier
          </label>
          <select 
            className="swl-input swl-select"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            style={{ padding: "1rem 0", cursor: "pointer", fontSize: "1rem" }}
          >
            {CARRIERS.map((c, i) => (
              <option key={i} value={c.trackingUrl}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Tracking ID Input */}
        <div>
          <label 
            className="swl-label" 
            style={{ fontSize: "0.6875rem", marginBottom: "0.5rem" }}
          >
            Tracking ID / AWB Number
          </label>
          <input 
            type="text" 
            className="swl-input"
            placeholder="Enter tracking number..."
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            style={{ padding: "1rem 0", fontSize: "1.125rem" }}
          />
        </div>

        {/* Track Button */}
        <button 
          onClick={handleTrack}
          disabled={!trackingId.trim()}
          className="swl-btn swl-btn--primary"
          style={{ 
            width: "100%", 
            justifyContent: "center",
            marginTop: "1rem",
            padding: "1.25rem 2.25rem",
            fontSize: "0.875rem",
            opacity: trackingId.trim() ? 1 : 0.5,
            cursor: trackingId.trim() ? "pointer" : "not-allowed"
          }}
        >
          Track Now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      </div>
      
      <p style={{ fontSize: "0.75rem", color: "var(--color-swl-slate)", marginTop: "1rem", fontStyle: "italic" }}>
        * You will be redirected to the carrier&apos;s official tracking page.
      </p>
    </div>
  );
}
