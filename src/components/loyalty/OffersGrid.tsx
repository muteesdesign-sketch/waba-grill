"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { useLoyalty } from "./LoyaltyProvider";
import { offers } from "./loyalty-data";

export function OffersGrid() {
  const { enrolled } = useLoyalty();
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  return (
    <section
      id="offers"
      className="scroll-mt-[110px] bg-bone px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="For you" title="Offers & rewards" />
        <p className="mx-auto mt-4 max-w-[520px] text-center text-sm text-ink/70">
          Browse what&apos;s available now. Eligibility varies by offer — the
          details are always on the card.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => {
            const locked = o.members && !enrolled;
            const isApplied = applied[o.id];
            return (
              <article
                key={o.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full bg-bone">
                  {o.image && (
                    <Image
                      src={o.image}
                      alt={o.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {o.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-xl uppercase leading-tight text-ink">
                    {o.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">{o.desc}</p>

                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-bone px-3 py-2">
                    <span aria-hidden className="text-xs text-brand-accent">
                      ⓘ
                    </span>
                    <p className="text-[11px] font-medium leading-snug text-ink/70">
                      {o.eligibility}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={locked || isApplied}
                    onClick={() =>
                      setApplied((s) => ({ ...s, [o.id]: true }))
                    }
                    className="mt-4 h-11 w-full rounded-full text-sm font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed enabled:bg-brand-accent enabled:text-white enabled:hover:bg-brand disabled:bg-bone disabled:text-ink/45"
                  >
                    {locked
                      ? "Members only"
                      : isApplied
                        ? "Applied ✓"
                        : o.cta}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
