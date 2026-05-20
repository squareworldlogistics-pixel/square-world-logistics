import AnimatedCounter from "@/components/animated-counter";

type StatBlockProps = {
  value: number;
  suffix: string;
  label: string;
};

/**
 * Displays a single animated stat: large number + label.
 */
export default function StatBlock({ value, suffix, label }: StatBlockProps) {
  return (
    <div style={{ textAlign: "center", padding: "0.5rem" }}>
      <div
        style={{
          fontFamily: "var(--font-display), system-ui, sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "var(--color-swl-blue)",
          lineHeight: 1.1,
          marginBottom: "0.5rem",
        }}
      >
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "var(--color-swl-slate)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
