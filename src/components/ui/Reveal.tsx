"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "zoom";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Direction the content travels in from. Defaults to a subtle fade-up. */
  variant?: RevealVariant;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or SSR) → just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // `up` is the default styling (bare [data-reveal]); only emit a value for the others.
  const dataVariant = variant === "up" ? "" : variant;

  return (
    <div
      ref={ref}
      data-reveal={dataVariant}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`${visible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
