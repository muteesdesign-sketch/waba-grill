"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";
import { useLoyalty } from "./LoyaltyProvider";
import { memberRewards, rewardCatalog } from "./loyalty-data";

function RewardImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bone">
      {src && <Image src={src} alt={alt} fill className="object-cover" />}
    </div>
  );
}

export function PointsDashboard() {
  const {
    enrolled,
    memberName,
    points,
    tier,
    nextTier,
    tierProgress,
    pointsToNextTier,
    selectedReward,
    selectReward,
  } = useLoyalty();

  return (
    <section
      id="rewards-display"
      className="scroll-mt-[110px] bg-bone px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="Your rewards" title="Points & rewards" />

        {!enrolled ? (
          // ---- Guest: locked teaser ----
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm lg:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#e7e7e7_1.4px,transparent_1.4px)] opacity-60 [background-size:14px_14px]" />
            <div className="relative">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-button text-2xl text-white">
                ★
              </span>
              <h3 className="mt-4 font-display text-3xl uppercase text-ink lg:text-4xl">
                Sign in to see your points
              </h3>
              <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed text-ink/70">
                Your balance, available rewards and expirations all live here.
                Join or log in to start tracking — your first reward is waiting.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="#link-account" className="py-4 sm:px-9">
                  Join now
                </Button>
                <Button
                  href="#link-account"
                  variant="outline"
                  className="border-ink py-4 text-ink hover:bg-ink hover:text-white sm:px-9"
                >
                  Log in
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // ---- Member: full dashboard ----
          <div className="mt-10 space-y-8">
            {selectedReward && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-button bg-brand/5 px-5 py-4">
                <p className="text-sm font-semibold text-ink">
                  <span className="text-brand-accent">★ Selected reward:</span>{" "}
                  {selectedReward.name} — applied at checkout
                </p>
                <button
                  type="button"
                  onClick={() => selectReward(null)}
                  className="text-xs font-bold uppercase tracking-wide text-brand-accent hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Balance + tier progress */}
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl bg-ink p-7 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                  {memberName}&apos;s balance
                </p>
                <p className="mt-1 font-display text-[64px] leading-none">
                  {points.toLocaleString()}
                  <span className="ml-2 text-2xl text-white/50">pts</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  ★ {tier.name}
                </span>
              </div>

              <div className="flex flex-col justify-center rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
                {nextTier ? (
                  <>
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-xl uppercase text-ink">
                        {tier.name}
                      </span>
                      <span className="font-display text-xl uppercase text-ink/40">
                        {nextTier.name}
                      </span>
                    </div>
                    <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-bone">
                      <div
                        className="h-full rounded-full bg-brand-button transition-all"
                        style={{ width: `${Math.round(tierProgress * 100)}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-ink/70">
                      Earn{" "}
                      <span className="font-bold text-ink">
                        {pointsToNextTier.toLocaleString()} more points
                      </span>{" "}
                      this year to reach {nextTier.name}.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-ink/70">
                    You&apos;ve reached the top tier — enjoy every perk.
                  </p>
                )}
              </div>
            </div>

            {/* Available (earned) rewards */}
            <div>
              <h3 className="font-display text-2xl uppercase text-ink">
                Available rewards
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {memberRewards.map((r) => {
                  const isSel = selectedReward?.id === r.id;
                  return (
                    <div
                      key={r.id}
                      className={`flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition-colors ${
                        isSel ? "border-brand-button" : "border-black/10"
                      }`}
                    >
                      <div className="flex gap-3">
                        <RewardImage src={r.image} alt={r.name} />
                        <div className="min-w-0">
                          <p className="font-semibold leading-tight text-ink">
                            {r.name}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs text-ink/70">
                            {r.desc}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        {r.expires && (
                          <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-bold text-ink">
                            Expires {r.expires}
                          </span>
                        )}
                        {r.eligibility && (
                          <span className="rounded-full bg-bone px-2.5 py-1 text-[11px] font-medium text-ink/70">
                            {r.eligibility}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => selectReward(isSel ? null : r)}
                        className={`mt-4 h-10 w-full rounded-full text-sm font-bold uppercase tracking-wide transition-colors ${
                          isSel
                            ? "bg-ink text-white"
                            : "bg-brand-button text-white hover:bg-brand"
                        }`}
                      >
                        {isSel ? "Selected ✓" : "Use reward"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Redeem points */}
            <div>
              <h3 className="font-display text-2xl uppercase text-ink">
                Redeem your points
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {rewardCatalog.map((r) => {
                  const affordable = points >= r.points;
                  return (
                    <div
                      key={r.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
                    >
                      <div className="relative aspect-[4/3] w-full bg-bone">
                        {r.image && (
                          <Image
                            src={r.image}
                            alt={r.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="font-semibold text-ink">{r.name}</p>
                        <p className="mt-1 line-clamp-2 flex-1 text-xs text-ink/70">
                          {r.desc}
                        </p>
                        <p className="mt-3 font-display text-xl text-ink">
                          {r.points.toLocaleString()}{" "}
                          <span className="text-sm text-ink/50">pts</span>
                        </p>
                        <button
                          type="button"
                          disabled={!affordable}
                          onClick={() => selectReward(r)}
                          className="mt-3 h-10 w-full rounded-full text-sm font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:bg-bone disabled:text-ink/40 enabled:bg-brand-button enabled:text-white enabled:hover:bg-brand"
                        >
                          {affordable
                            ? "Redeem"
                            : `${(r.points - points).toLocaleString()} more pts`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
