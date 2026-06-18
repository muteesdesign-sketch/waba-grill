"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { useLoyalty } from "./LoyaltyProvider";
import { useCart } from "@/components/cart/CartProvider";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import type { MenuItem } from "@/components/ui/MenuItemCard";
import {
  rewardCatalog,
  memberRewards,
  redeemedRewards,
  offers,
  type Challenge,
  type Offer,
  type Reward,
} from "./loyalty-data";

const money = (n: number) => `$${n.toFixed(2)}`;
const productByName = new Map<string, MenuItem>(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

type Tab = "rewards" | "offers" | "challenges";

export function LoyaltyHub() {
  const {
    memberName,
    points,
    tier,
    nextTier,
    tierProgress,
    pointsToNextTier,
    nextReward,
    pointsToNextReward,
    challenges,
    selectedReward,
    selectReward,
    selectOffer,
  } = useLoyalty();
  const cart = useCart();
  const openPDP = useProductModal();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("rewards");

  // Reward → most relevant action: item rewards open the PDP, order-level
  // rewards open the cart where the discount applies.
  const useReward = (r: Reward) => {
    selectReward(r);
    if (r.kind === "item") {
      const p = r.productName && productByName.get(r.productName);
      if (p) openPDP(p);
      else router.push("/menu");
    } else {
      cart.open();
    }
  };

  // Offer → surfaced based on how it's redeemed.
  const doOffer = (o: Offer) => {
    if (o.ctaTarget === "cart") {
      selectOffer(o);
      cart.open();
    } else if (o.ctaTarget === "pdp" && o.productName) {
      const p = productByName.get(o.productName);
      if (p) openPDP(p);
      else router.push("/menu");
    } else {
      router.push("/menu");
    }
  };

  const affordable = rewardCatalog.filter((r) => points >= r.points);
  const upcoming = rewardCatalog
    .filter((r) => r.points > points)
    .sort((a, b) => a.points - b.points)
    .slice(0, 2);

  return (
    <section
      id="loyalty-hub"
      className="scroll-mt-[110px] bg-bone px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow={`Welcome back, ${memberName}`} title="Your loyalty hub" />

        {/* Tabs */}
        <div className="mt-9 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
            {(["rewards", "offers", "challenges"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors lg:px-8 ${
                  tab === t
                    ? "bg-brand-button text-white"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ---- REWARDS ---- */}
        {tab === "rewards" && (
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

            {/* Balance + tier + next reward */}
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-3xl bg-ink p-7 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                  {memberName}&apos;s points
                </p>
                <p className="mt-1 font-display text-[60px] leading-none">
                  {points.toLocaleString()}
                  <span className="ml-2 text-2xl text-white/50">pts</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  ★ {tier.name}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-4 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
                {nextReward && (
                  <div>
                    <p className="text-sm text-ink/70">
                      You&apos;re{" "}
                      <span className="font-bold text-ink">
                        {pointsToNextReward.toLocaleString()} points
                      </span>{" "}
                      away from <span className="font-bold">{nextReward.name}</span>.
                    </p>
                    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-bone">
                      <div
                        className="h-full rounded-full bg-brand-button"
                        style={{ width: `${Math.round((points / nextReward.points) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                {nextTier && (
                  <p className="text-xs text-ink/60">
                    {pointsToNextTier.toLocaleString()} pts to{" "}
                    {nextTier.name} ({Math.round(tierProgress * 100)}% there)
                  </p>
                )}
              </div>
            </div>

            {/* Available rewards */}
            <div>
              <h3 className="font-display text-2xl uppercase text-ink">
                Available now
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {memberRewards.map((r) => {
                  const sel = selectedReward?.id === r.id;
                  return (
                    <RewardCard
                      key={r.id}
                      reward={r}
                      selected={sel}
                      onUse={() => (sel ? selectReward(null) : useReward(r))}
                    />
                  );
                })}
              </div>
            </div>

            {/* Redeem points (available + next 1–2 upcoming) */}
            <div>
              <h3 className="font-display text-2xl uppercase text-ink">
                Redeem your points
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {affordable.map((r) => (
                  <CatalogCard key={r.id} reward={r} locked={false} points={points} onRedeem={() => useReward(r)} />
                ))}
                {upcoming.map((r) => (
                  <CatalogCard key={r.id} reward={r} locked points={points} />
                ))}
              </div>
            </div>

            {/* Redeemed history */}
            <div>
              <h3 className="font-display text-2xl uppercase text-ink">
                Redeemed rewards
              </h3>
              <p className="mt-1 text-sm text-ink/60">
                The value you&apos;ve already enjoyed —{" "}
                <span className="font-bold text-ink">
                  {money(redeemedRewards.reduce((s, r) => s + r.value, 0))} saved
                </span>
                .
              </p>
              <div className="mt-4 divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/10 bg-white">
                {redeemedRewards.map((r) => (
                  <div key={r.name + r.date} className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm font-semibold text-ink">{r.name}</span>
                    <span className="text-xs text-ink/60">
                      {r.date} · {money(r.value)} value
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---- OFFERS ---- */}
        {tab === "offers" && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} onAct={() => doOffer(o)} />
            ))}
          </div>
        )}

        {/* ---- CHALLENGES ---- */}
        {tab === "challenges" && (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {challenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function RewardCard({
  reward,
  selected,
  onUse,
}: {
  reward: Reward;
  selected: boolean;
  onUse: () => void;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition-colors ${
        selected ? "border-brand-button" : "border-black/10"
      }`}
    >
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bone">
          {reward.image && (
            <Image src={reward.image} alt={reward.name} fill className="object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold leading-tight text-ink">{reward.name}</p>
          <p className="mt-1 line-clamp-2 text-xs text-ink/70">{reward.desc}</p>
        </div>
      </div>
      <span className="mt-3 w-fit rounded-full bg-bone px-2.5 py-1 text-[11px] font-bold text-ink/70">
        {reward.kind === "item" ? "Free item · opens item" : "Order discount · opens cart"}
      </span>
      <button
        type="button"
        onClick={onUse}
        className={`mt-4 h-10 w-full rounded-full text-sm font-bold uppercase tracking-wide transition-colors ${
          selected ? "bg-ink text-white" : "bg-brand-button text-white hover:bg-brand"
        }`}
      >
        {selected ? "Selected ✓" : "Use reward"}
      </button>
    </div>
  );
}

function CatalogCard({
  reward,
  locked,
  points,
  onRedeem,
}: {
  reward: Reward;
  locked: boolean;
  points: number;
  onRedeem?: () => void;
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${locked ? "border-black/10 opacity-90" : "border-black/10"}`}>
      <div className="relative aspect-[4/3] w-full bg-bone">
        {reward.image && (
          <Image src={reward.image} alt={reward.name} fill className={`object-cover ${locked ? "grayscale" : ""}`} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-semibold text-ink">{reward.name}</p>
        <p className="mt-1 line-clamp-2 flex-1 text-xs text-ink/70">{reward.desc}</p>
        <p className="mt-3 font-display text-xl text-ink">
          {reward.points.toLocaleString()} <span className="text-sm text-ink/50">pts</span>
        </p>
        {locked && (
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bone">
            <div className="h-full rounded-full bg-brand-button" style={{ width: `${Math.round((points / reward.points) * 100)}%` }} />
          </div>
        )}
        <button
          type="button"
          disabled={locked}
          onClick={onRedeem}
          className="mt-3 h-10 w-full rounded-full text-sm font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:bg-bone disabled:text-ink/40 enabled:bg-brand-button enabled:text-white enabled:hover:bg-brand"
        >
          {locked ? `${(reward.points - points).toLocaleString()} more pts` : "Redeem"}
        </button>
      </div>
    </div>
  );
}

function OfferCard({ offer, onAct }: { offer: Offer; onAct: () => void }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="relative aspect-[16/10] w-full bg-bone">
        {offer.image && <Image src={offer.image} alt={offer.title} fill className="object-cover" />}
        <span className="absolute left-3 top-3 rounded-full bg-brand-button px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {offer.badge}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {offer.auto ? "Auto-applied" : "Select to use"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-xl uppercase leading-tight text-ink">{offer.title}</h3>
        <p className="mt-1 text-sm text-ink/70">{offer.desc}</p>
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-bone px-3 py-2">
          <span aria-hidden className="text-xs text-brand-accent">ⓘ</span>
          <p className="text-[11px] font-medium leading-snug text-ink/70">{offer.eligibility}</p>
        </div>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-brand-accent">
          Expires {offer.expires}
        </p>
        <button
          type="button"
          onClick={onAct}
          className="mt-4 h-11 w-full rounded-full bg-brand-button text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
        >
          {offer.cta}
        </button>
      </div>
    </article>
  );
}

function ChallengeCard({ challenge: c }: { challenge: Challenge }) {
  const done = c.progress >= c.target;
  const pct = Math.round((c.progress / c.target) * 100);
  return (
    <article
      className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
        done ? "border-brand-button" : "border-black/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
            done ? "bg-brand-button text-white" : "bg-gold/20 text-ink"
          }`}
        >
          {done ? "Completed ✓" : c.kind === "streak" ? "Streak" : "Challenge"}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-accent">
          {c.rewardText}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl uppercase text-ink">{c.title}</h3>
      <p className="mt-1 text-sm text-ink/70">{c.goal}</p>

      {c.kind === "streak" ? (
        <div className="mt-5 flex items-center gap-2">
          {Array.from({ length: c.target }).map((_, i) => (
            <div
              key={i}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                i < c.progress ? "bg-brand-button text-white" : "bg-bone text-ink/40"
              }`}
            >
              {i < c.progress ? "✓" : i + 1}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex justify-between text-xs font-semibold text-ink/70">
            <span>{c.progress} of {c.target}</span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-bone">
            <div className="h-full rounded-full bg-brand-button" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div
        className={`mt-5 flex items-center gap-2 rounded-xl px-4 py-3 ${
          done ? "bg-brand/5" : "bg-bone"
        }`}
      >
        <span aria-hidden className="text-brand-accent">
          {done ? "★" : "→"}
        </span>
        <p className="text-sm font-semibold text-ink">
          {done ? `Reward unlocked — ${c.rewardText}!` : c.nextAction}
        </p>
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-ink/50">
        {c.timeframe}
      </p>
    </article>
  );
}
