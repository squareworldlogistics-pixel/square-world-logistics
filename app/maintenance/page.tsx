"use client";

export default function MaintenancePage() {
  return (
    <>
      <style>{`
        .maint-wrapper {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #1a1a1a;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif;
          z-index: 99999;
        }

        .maint-logo {
          width: 180px;
          height: auto;
          margin-bottom: 4rem;
          opacity: 0.95;
        }

        .maint-badge {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #888888;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .maint-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #888888;
          animation: pulse 1.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .maint-info {
          font-size: 0.875rem;
          color: #666666;
          line-height: 1.6;
          text-align: center;
          max-width: 380px;
          margin-bottom: 2rem;
        }

        .maint-footer {
          margin-top: 5rem;
          font-size: 0.8125rem;
          color: #888888;
        }
      `}</style>

      <div className="maint-wrapper">
        {/* Simple centered logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Square World Logistics Logo" className="maint-logo" />

        {/* Maintenance Badge */}
        <div className="maint-badge">
          <span className="maint-dot" />
          <span>Under Maintenance</span>
        </div>

        {/* Quiet descriptions */}
        <p className="maint-info">
          We are currently conducting scheduled system upgrades to improve our services. 
          Square World Logistics will be back online shortly. Thank you for your patience.
        </p>

        {/* Minimal Footer */}
        <div className="maint-footer">
          &copy; 2026 Square World Logistics.
        </div>
      </div>
    </>
  );
}
