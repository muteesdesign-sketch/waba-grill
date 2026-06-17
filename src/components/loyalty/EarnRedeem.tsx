"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";
import { useLoyalty } from "./LoyaltyProvider";

const applySteps = [
  "Add your favorites to the cart as usual.",
  "Pick a reward here or on the rewards tab — it follows you to checkout.",
  "We apply the discount automatically before you pay.",
];

const stackingRules = [
  { ok: true, text: "One points reward per order." },
  { ok: true, text: "Rewards combine with your tier birthday perk." },
  { ok: false, text: "Rewards can't be combined with other promo codes." },
  { ok: false, text: "Rewards don't apply to taxes, tips or delivery fees." },
];

export function EarnRedeem() {
  const { selectedReward } = useLoyalty();

  return (
    <section
      id="earn-redeem"
      className="scroll-mt-[110px] bg-white px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="Earn & redeem" title="Use it at checkout" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* How to apply */}
          <div className="rounded-3xl border border-black/10 bg-bone p-7 shadow-sm">
            <h3 className="font-display text-2xl uppercase text-ink">
              Apply in 3 taps
            </h3>
            <ol className="mt-5 space-y-4">
              {applySteps.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-button font-display text-sm text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink/60">
                Selected for your next order
              </p>
              <p className="mt-1 font-semibold text-ink">
                {selectedReward ? (
                  <>
                    <span className="text-brand-accent">★</span>{" "}
                    {selectedReward.name}
                  </>
                ) : (
                  <span className="text-ink/50">
                    No reward selected yet — pick one above.
                  </span>
                )}
              </p>
            </div>

            <Button href="/checkout" className="mt-6 w-full py-4">
              {selectedReward ? "Continue to checkout" : "Start an order"}
            </Button>
          </div>

          {/* Stacking rules */}
          <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
            <h3 className="font-display text-2xl uppercase text-ink">
              Stacking rules
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              The fine print, made readable — so there are no surprises at pay.
            </p>
            <ul className="mt-5 space-y-3">
              {stackingRules.map((r) => (
                <li key={r.text} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                      r.ok ? "bg-brand-button" : "bg-ink/30"
                    }`}
                  >
                    {r.ok ? "✓" : "✕"}
                  </span>
                  <span className="text-sm leading-relaxed text-ink">
                    {r.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
