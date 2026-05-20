"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * A button that subtly follows the cursor within a magnetic
 * radius on hover. Falls back to static on touch devices.
 */
export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const commonProps = {
    ref: ref as React.RefObject<HTMLElement>,
    className: `swl-btn ${className}`,
    style: { transition: "all 0.3s ease", opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" },
  };

  if (href) {
    return (
      <Link
        {...commonProps}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...commonProps}
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
