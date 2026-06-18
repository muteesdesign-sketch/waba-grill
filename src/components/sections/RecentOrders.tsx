"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { distressStyle } from "@/lib/distress";
import { menuCategories } from "@/app/menu/menu-data";
import { recentOrderNames } from "@/components/loyalty/loyalty-data";

const productByName = new Map(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

export function RecentOrders() {
  const items = recentOrderNames
    .map((n) => productByName.get(n))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section className="bg-white pt-12 lg:pt-16">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-script text-[26px] leading-none text-brand lg:text-[30px]">
              Quick reorder
            </p>
            <h2 className="relative inline-block font-display text-[40px] uppercase leading-none text-ink lg:text-[52px]">
              <span style={distressStyle}>Recent orders</span>
              <Image
                src="/images/brush.png"
                alt=""
                width={230}
                height={9}
                aria-hidden
                className="absolute -bottom-2 left-0 h-auto w-[70%]"
              />
            </h2>
          </div>
          <a
            href="/menu"
            className="shrink-0 text-sm font-bold uppercase tracking-wide text-brand-accent hover:underline"
          >
            See all orders →
          </a>
        </div>

        <div className="mt-9">
          <Carousel count={items.length}>
            {items.map((item) => (
              <div
                key={item.name}
                data-card
                className="w-[165px] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:max-w-[320px] lg:flex-1"
              >
                <MenuItemCard item={item} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
