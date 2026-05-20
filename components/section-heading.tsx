type SectionHeadingProps = {
  title: string;
  subtitle?: string | React.ReactNode;
  accent?: "blue" | "crimson";
  align?: "left" | "center";
  organic?: boolean;
};

/**
 * Reusable section header with accent line.
 * Server component — no interactivity needed.
 */
export default function SectionHeading({
  title,
  subtitle,
  accent = "blue",
  align = "left",
  organic = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      style={{
        marginBottom: "2.5rem",
        textAlign: isCenter ? "center" : "left",
        display: "flex",
        flexDirection: "column",
        alignItems: isCenter ? "center" : "flex-start",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
          marginBottom: "0.75rem",
          color: "var(--color-swl-charcoal)",
          position: "relative",
          display: "inline-block",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          style={{
            fontSize: "1rem",
            maxWidth: "520px",
            color: "var(--color-swl-slate)",
            lineHeight: "1.6",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

