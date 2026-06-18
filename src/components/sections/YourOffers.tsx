"use client";

import { useRouter } from "next/navigation";
import { distressStyle } from "@/lib/distress";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import {
  personalizedOffers,
  type PersonalOffer,
} from "@/components/loyalty/loyalty-data";

const productByName = new Map(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

export function YourOffers() {
  const openPDP = useProductModal();
  const router = useRouter();

  const act = (o: PersonalOffer) => {
    const p = o.productName && productByName.get(o.productName);
    if (p) openPDP(p);
    else router.push("/menu");
  };

  return (
    <section className="bg-brand px-5 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <p className="font-script text-[28px] leading-none text-white lg:text-[34px]">
          Just for you
        </p>
        <h2
          className="font-display text-[44px] uppercase leading-none text-white lg:text-[64px]"
          style={distressStyle}
        >
          Your offers
        </h2>

        <div className="mt-8 space-y-4">
          {personalizedOffers.map((o) => (
            <div
              key={o.id}
              className="flex flex-col gap-4 overflow-hidden rounded-2xl border-l-4 border-gold bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between lg:px-7"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bone text-xl">
                  {o.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-script text-base leading-none text-brand">
                    {o.eyebrow}
                  </p>
                  <h3 className="font-display text-xl uppercase leading-tight text-ink lg:text-2xl">
                    {o.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-ink/70">
                    {o.desc}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end lg:flex-row lg:items-center">
                {o.timer && (
                  <div className="text-right leading-tight">
                    <p className="font-display text-lg text-brand-accent">
                      {o.timer}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-ink/60">
                      {o.timerLabel}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => act(o)}
                  className="shrink-0 whitespace-nowrap rounded-full bg-brand-button px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-accent"
                >
                  {o.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
