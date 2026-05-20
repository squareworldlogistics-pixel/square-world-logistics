"use client";

import Marquee from "react-fast-marquee";

const COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "ae", name: "UAE" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "sg", name: "Singapore" },
  { code: "in", name: "India" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "jp", name: "Japan" },
  { code: "cn", name: "China" },
  { code: "it", name: "Italy" },
  { code: "ch", name: "Switzerland" },
  { code: "nl", name: "Netherlands" },
  { code: "za", name: "South Africa" },
  { code: "br", name: "Brazil" },
  { code: "mx", name: "Mexico" },
  { code: "kr", name: "South Korea" },
];

const ROW_1 = COUNTRIES.slice(0, 10);
const ROW_2 = COUNTRIES.slice(10);

const CountryPill = ({ code, name }: { code: string; name: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      backgroundColor: "var(--color-swl-white)",
      border: "1px solid rgba(0,0,0,0.05)",
      padding: "0.375rem 1.25rem 0.375rem 0.375rem",
      borderRadius: "999px",
      marginRight: "1.5rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        flexShrink: 0,
      }}
    >
      <img
        src={`https://flagcdn.com/w80/${code}.png`}
        alt={`${name} flag`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        loading="lazy"
      />
    </div>
    <span
      style={{
        fontSize: "0.9375rem",
        fontWeight: 600,
        color: "var(--color-swl-charcoal)",
        letterSpacing: "0.01em",
      }}
    >
      {name}
    </span>
  </div>
);

export default function FlagMarquee() {
  return (
    <div
      style={{
        width: "100%",
        padding: "5rem 0",
        backgroundColor: "var(--color-swl-white)",
        position: "relative",
      }}
    >
      <div className="swl-container" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "var(--color-swl-charcoal)",
          }}
        >
          Deliveries to <span style={{ color: "var(--color-swl-blue)" }}>220+</span> Countries
        </h2>
        <p style={{ color: "var(--color-swl-slate)", marginTop: "0.75rem", fontSize: "1.0625rem" }}>
          A truly global courier network connecting your business to the world.
        </p>
      </div>

      <div style={{ position: "relative" }}>
        <Marquee speed={40} pauseOnHover={true} gradient={true} gradientColor="white" gradientWidth={150} autoFill={true} style={{ paddingBottom: "1.5rem" }}>
          {ROW_1.map((c) => (
            <CountryPill key={`r1-${c.code}`} code={c.code} name={c.name} />
          ))}
        </Marquee>

        <Marquee speed={35} pauseOnHover={true} gradient={true} gradientColor="white" gradientWidth={150} autoFill={true} direction="right">
          {ROW_2.map((c) => (
            <CountryPill key={`r2-${c.code}`} code={c.code} name={c.name} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
