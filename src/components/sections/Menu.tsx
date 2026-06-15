"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { bowls, categories, type Bowl } from "./menu-data";

function BowlCard({ bowl }: { bowl: Bowl }) {
  return (
    <article
      data-card
      className="flex w-[165px] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white"
    >
      {/* Full-bleed image: no padding, expands to the card edges */}
      <div className="relative aspect-[4/3] w-full">
        <Image src={bowl.image} alt={bowl.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col p-3">
        {bowl.popular && (
          <span className="mb-2 w-fit rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Popular Item
          </span>
        )}
        <h3 className="text-base font-semibold uppercase text-black">
          {bowl.name}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-tight text-[#4b5563]">
          {bowl.description}
        </p>
        <div className="mt-3 flex flex-col leading-tight">
          <span className="text-base font-semibold text-black">
            {bowl.price}
          </span>
          <span className="text-xs text-[#4b5563]">{bowl.calories}</span>
        </div>
        <Button href="#" className="mt-3 h-11 w-full py-0">
          Add
        </Button>
      </div>
    </article>
  );
}

export function Menu() {
  const [active, setActive] = useState(0);

  return (
    <section id="menu" className="bg-white pt-12">
      {/* Heading */}
      <div className="px-5 text-center">
        <p className="font-script text-[32px] leading-none text-brand">
          Explore our
        </p>
        <h2 className="relative inline-block font-display text-[88px] uppercase leading-[0.85] text-ink">
          Menu
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

      {/* Category rail — white bar with shadow; active = red, no underline */}
      <div className="mt-8 shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.06)]">
        <div className="no-scrollbar flex gap-8 overflow-x-auto bg-white px-6 py-5">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap text-xl font-bold transition-colors ${
                i === active ? "text-brand" : "text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fresh Bowls */}
      <div className="mt-9 px-5 text-center">
        <p className="font-script text-[32px] leading-none text-brand">Fresh</p>
        <h3 className="font-display text-[64px] uppercase leading-[0.9] text-ink">
          Bowls
        </h3>
      </div>

      <div className="mt-6 px-5">
        <Carousel count={bowls.length}>
          {bowls.map((bowl) => (
            <BowlCard key={bowl.name} bowl={bowl} />
          ))}
        </Carousel>
      </div>

      <div className="mt-8 flex justify-center px-5">
        <Button href="#" className="px-10 py-4">
          View Full Menu
        </Button>
      </div>

      {/* Oversized brand word — Janeiro, full-width, flush to the red section below */}
      <p className="-mb-4 mt-10 block w-full overflow-x-clip overflow-y-visible whitespace-nowrap text-center font-fat text-[73px] uppercase leading-[0.9] tracking-[-0.02em] text-brand">
        Delicioso
      </p>
    </section>
  );
}
