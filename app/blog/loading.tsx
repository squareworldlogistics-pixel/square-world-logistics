import Image from "next/image";

/**
 * Premium loading transition specifically for the Blog section.
 * Renders a full-viewport premium animation of the Square World Logistics logo
 * along with a looping shipment transit track and plane.
 */
export default function BlogLoading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
      }}
    >
      <style>{`
        @keyframes loadingPulse {
          0%, 100% { opacity: 0.65; transform: scale(0.985); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes transitPlane {
          0% { left: -15px; }
          100% { left: 245px; }
        }
        .swl-loading-logo {
          animation: loadingPulse 2s ease-in-out infinite;
        }
        .swl-loading-track {
          position: relative;
          width: 240px;
          height: 12px;
          margin-top: 0.5rem;
        }
        .swl-loading-plane {
          position: absolute;
          top: 0px;
          width: 12px;
          height: 12px;
          animation: transitPlane 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .swl-loading-text {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(3, 105, 161, 0.65);
          margin-top: 0.25rem;
          text-align: center;
        }
      `}</style>

      {/* Sleek Pulse Animated Logo */}
      <div className="swl-loading-logo" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image
          src="/logo.png"
          alt="Square World Logistics"
          width={260}
          height={72}
          priority
          style={{ height: "64px", width: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Transit Loading Indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
        <div className="swl-loading-track">
          {/* Muted dotted route track */}
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: 0,
              width: "100%",
              height: "1px",
              borderTop: "1.5px dashed rgba(3, 105, 161, 0.15)",
            }}
          />
          {/* Animated plane flying along the track */}
          <div className="swl-loading-plane">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0369a1" style={{ transform: "rotate(90deg)" }}>
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L21 16z" />
            </svg>
          </div>
        </div>

        {/* Elegant typography */}
        <div className="swl-loading-text">
          Loading Insights
        </div>
      </div>
    </div>
  );
}
