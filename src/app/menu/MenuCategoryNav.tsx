"use client";

import { useEffect, useState } from "react";
import type { MenuCategory } from "./menu-data";

export function MenuCategoryNav({
  categories,
}: {
  categories: MenuCategory[];
}) {
  const [active, setActive] = useState(categories[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav className="sticky top-[88px] z-40 bg-white shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.06)]">
      <div className="no-scrollbar mx-auto flex max-w-[1280px] gap-7 overflow-x-auto px-5 py-4 lg:justify-between lg:gap-3 lg:overflow-x-visible lg:px-8">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`shrink-0 whitespace-nowrap text-base font-bold uppercase transition-colors lg:text-[15px] ${
              active === c.id ? "text-brand" : "text-ink"
            }`}
          >
            {c.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
