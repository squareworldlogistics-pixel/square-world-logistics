"use client";
import { useState, useEffect, useRef } from "react";
import { CARRIERS } from "@/lib/site-data";

export default function TrackingHub() {
  const [selectedCarrier, setSelectedCarrier] = useState<typeof CARRIERS[number]>(CARRIERS[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTrack = () => {
    if (trackingId.trim()) {
      window.open(`${selectedCarrier.trackingUrl}${trackingId.trim()}`, "_blank");
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
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <label 
            className="swl-label" 
            style={{ fontSize: "0.6875rem", marginBottom: "0.5rem" }}
          >
            Select Carrier
          </label>
          
          {/* Custom Trigger Button */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              width: "100%",
              padding: "0.875rem 1rem", 
              cursor: "pointer", 
              fontSize: "0.9375rem",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              color: "var(--color-swl-charcoal)",
              backgroundColor: isOpen ? "var(--color-swl-white)" : "var(--color-swl-mist)",
              border: isOpen ? "1px solid var(--color-swl-blue)" : "1px solid var(--color-swl-rule)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.25s ease",
              fontWeight: 500,
              boxShadow: isOpen ? "0 0 0 3px rgba(59, 110, 181, 0.12)" : "0 1px 2px rgba(0,0,0,0.02)",
              userSelect: "none",
            }}
          >
            <span>{selectedCarrier.name}</span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--color-swl-slate)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Custom Options Panel */}
          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "var(--color-swl-white)",
                border: "1px solid var(--color-swl-rule)",
                borderRadius: "6px",
                marginTop: "6px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                zIndex: 50,
                overflow: "hidden",
                animation: "swl-scale-in 0.15s ease-out",
              }}
            >
              {CARRIERS.map((c, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedCarrier(c);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: "0.875rem 1rem",
                    cursor: "pointer",
                    fontSize: "0.9375rem",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    color: selectedCarrier.name === c.name ? "var(--color-swl-blue)" : "var(--color-swl-charcoal)",
                    backgroundColor: selectedCarrier.name === c.name ? "rgba(59, 110, 181, 0.05)" : "transparent",
                    fontWeight: selectedCarrier.name === c.name ? 600 : 500,
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCarrier.name !== c.name) {
                      e.currentTarget.style.backgroundColor = "var(--color-swl-mist)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCarrier.name !== c.name) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span>{c.name}</span>
                  {selectedCarrier.name === c.name && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-swl-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
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
