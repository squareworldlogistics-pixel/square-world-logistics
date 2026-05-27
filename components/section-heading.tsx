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
 * Completely optimized to remove inline styles for A+ PageSpeed Performance.
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
    <div className={isCenter ? "swl-heading swl-heading--center" : "swl-heading swl-heading--left"}>
      <h2 className="swl-heading__title">
        {title}
      </h2>
      {subtitle && (
        <div className="swl-heading__subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
}
