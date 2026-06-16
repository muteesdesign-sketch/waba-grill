"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { distressStyle } from "@/lib/distress";
import { menuCategories } from "@/app/menu/menu-data";

const DEFAULT_INDEX = Math.max(
  0,
  menuCategories.findIndex((c) => c.name === "Bowls"),
);

export function Menu() {
  const [active, setActive] = useState(DEFAULT_INDEX);
  const category = menuCategories[active];
  const items = category.items.slice(0, 4);

  return (
    <section id="menu" className="bg-white pt-12 lg:pt-20">
      {/* Heading */}
      <div className="mx-auto max-w-[1280px] px-5 text-center">
        <p className="font-script text-[32px] leading-none text-brand">
          Explore our
        </p>
        <h2 className="relative inline-block font-display text-[88px] uppercase leading-[0.85] text-ink">
          <span style={distressStyle}>Menu</span>
          <Image
            src="/images/brush.png"
            alt=""
            width={230}
            height={9}
            aria-hidden
            className="absolute -bottom-3 left-1/2 h-auto w-[125%] -translate-x-1/2"
          />
        </h2>
        <p className="mx-auto mt-6 max-w-[340px] text-center text-[21px] font-semibold leading-snug text-[#4a4a4a]">
          Fresh ingredients, bold flavors, grilled to perfection.
        </p>
      </div>

      {/* Category rail — white bar with shadow; active = red */}
      <div className="mt-8 shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.06)]">
        <div className="no-scrollbar mx-auto flex max-w-[1280px] gap-8 overflow-x-auto bg-white px-6 py-5 lg:justify-center lg:gap-9 lg:px-8">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap text-xl font-bold transition-colors lg:text-lg ${
                i === active ? "text-brand" : "text-ink hover:text-brand"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active category title */}
      <div className="mt-9 px-5 text-center">
        <p className="font-script text-[32px] leading-none text-brand">Fresh</p>
        <h3
          className="font-display text-[64px] uppercase leading-[0.9] text-ink"
          style={distressStyle}
        >
          {category.title}
        </h3>
      </div>

      {/* 4 products from the active category */}
      <div className="mx-auto mt-6 max-w-[1280px] px-5 lg:px-10">
        <Carousel key={category.id} count={items.length}>
          {items.map((item) => (
            <div
              key={item.name}
              data-card
              className="w-[165px] shrink-0 snap-start lg:w-[290px]"
            >
              <MenuItemCard item={item} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="mt-8 flex justify-center px-5">
        <Button href="/menu" className="px-10 py-4">
          View Full Menu
        </Button>
      </div>

      {/* Oversized brand word — Janeiro, full-width, flush to the red section below */}
      <p className="mt-10 block w-full overflow-x-clip overflow-y-visible whitespace-nowrap text-center font-fat text-[19vw] uppercase leading-[0.9] tracking-[-0.02em] text-brand [margin-bottom:-4vw]">
        Delicioso
      </p>
    </section>
  );
}
