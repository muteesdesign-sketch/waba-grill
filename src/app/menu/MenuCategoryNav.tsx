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
    <nav className="sticky top-[96px] z-40 -mt-9 px-4 lg:px-8">
      <div className="no-scrollbar mx-auto flex max-w-[1240px] gap-7 overflow-x-auto rounded-2xl bg-white px-6 py-4 shadow-[0_10px_20px_-4px_rgba(0,0,0,0.15)] lg:justify-between lg:gap-3 lg:overflow-x-visible lg:px-8">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`shrink-0 whitespace-nowrap text-base font-bold transition-colors lg:text-[15px] ${
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
