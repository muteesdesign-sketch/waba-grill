"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Horizontal scroll-snap rail with red round arrow controls and progress dots,
 * matching the "Controls" component used throughout the WaBa Grill design.
 */
export function Carousel({
  children,
  count,
  controlsTone = "onLight",
  padControls = false,
}: {
  children: ReactNode;
  count: number;
  controlsTone?: "onLight" | "onDark";
  padControls?: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const card = rail.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + 20 : rail.clientWidth;
      setActive(Math.round(rail.scrollLeft / step));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  const dotIdle =
    controlsTone === "onDark" ? "bg-white/30" : "bg-black/15";

  return (
    <div>
      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>

      <div
        className={`mt-6 flex items-center justify-between ${
          padControls ? "px-5" : ""
        }`}
      >
        <button
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-button text-white shadow-md transition-transform active:scale-95"
        >
          <Arrow dir="left" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-5 bg-brand" : `w-2 ${dotIdle}`
              }`}
            />
          ))}
        </div>

        <button
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-button text-white shadow-md transition-transform active:scale-95"
        >
          <Arrow dir="right" />
        </button>
      </div>
    </div>
  );
}
