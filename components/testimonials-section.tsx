"use client";

import { REVIEWS, COMPANY } from "@/lib/site-data";

/** Renders n filled/empty Google-coloured stars */
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FBBC04" : "#E0E0E0"}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

/** Single Google-style review card */
function ReviewCard({
  author,
  text,
  rating,
}: {
  author: string;
  text: string;
  rating: number;
}) {
  // Generate a consistent avatar colour from the author name
  const hue = (author.charCodeAt(0) * 37 + author.charCodeAt(1) * 17) % 360;
  const initials = author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e8eaed",
        borderRadius: "12px",
        padding: "1.25rem 1.375rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        boxShadow: "0 1px 4px rgba(60,64,67,0.08)",
        transition: "box-shadow 0.2s ease",
        cursor: "default",
        minWidth: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(60,64,67,0.14)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(60,64,67,0.08)")}
    >
      {/* Header row: avatar + name + Google icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Avatar circle */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: `hsl(${hue}, 55%, 52%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.02em",
          }}
        >
          {initials}
        </div>

        {/* Name + "Local Guide" row */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#202124",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {author}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#5F6368", marginTop: "1px" }}>
            Google Review
          </div>
        </div>

        {/* Google "G" logo */}
        <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>

      {/* Stars + date */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Stars rating={rating} />
        <span style={{ fontSize: "0.7rem", color: "#5F6368" }}>a week ago</span>
      </div>

      {/* Review text */}
      <p
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "#3C4043",
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      style={{
        backgroundColor: "#F8F9FA",
        borderTop: "1px solid #E8EAED",
        borderBottom: "1px solid #E8EAED",
        padding: "4rem 0",
      }}
    >
      <div className="swl-container">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Left: Title + aggregate rating */}
          <div>
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-swl-blue)",
                marginBottom: "0.5rem",
              }}
            >
              Customer Reviews
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 400,
                color: "var(--color-swl-charcoal)",
                letterSpacing: "-0.015em",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              What Our Clients Say
            </h2>
          </div>

          {/* Right: CTA link to Google Business Profile */}
          <a
            href={COMPANY.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "#1A73E8",
              textDecoration: "none",
              border: "1px solid #DADCE0",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              backgroundColor: "#fff",
              transition: "background 0.18s, border-color 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F8F9FA";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A73E8";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#DADCE0";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            View all reviews on Google
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Review cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.125rem",
          }}
        >
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} author={r.author} text={r.text} rating={r.rating} />
          ))}
        </div>

        {/* Bottom attribution note */}
        <div
          style={{
            marginTop: "1.75rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#9AA0A6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Reviews sourced from Google Business Profile · {COMPANY.name}
        </div>
      </div>
    </section>
  );
}
