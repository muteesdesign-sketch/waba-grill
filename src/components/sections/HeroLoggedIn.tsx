"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { distressStyle } from "@/lib/distress";
import { useLoyalty } from "@/components/loyalty/LoyaltyProvider";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import {
  REWARDS_GOAL,
  rewardMilestones,
} from "@/components/loyalty/loyalty-data";

const productByName = new Map(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

export function HeroLoggedIn() {
  const { memberName, points, activeChallenge } = useLoyalty();
  const openPDP = useProductModal();
  const fav = productByName.get("Chicken Bowl");
  const pct = Math.min(100, Math.round((points / REWARDS_GOAL) * 100));

  return (
    <section className="lg:grid lg:grid-cols-2">
      {/* LEFT — personalized greeting + rewards progress */}
      <div className="relative overflow-hidden bg-ink px-6 py-12 text-white lg:px-14 lg:py-16">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={asset("/images/hero-bg.jpg")}
        >
          <source src={asset("/hero.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-brand/40" />

        <div className="relative flex h-full flex-col justify-center">
          <p className="font-script text-[30px] leading-none text-brand lg:text-[38px]">
            Afternoon craving,
          </p>
          <h1
            className="mt-1 font-display text-[56px] uppercase leading-[0.9] lg:text-[80px]"
            style={distressStyle}
          >
            Hungry, {memberName}?
          </h1>

          {/* Rewards progress */}
          <div className="mt-6 max-w-[460px] rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide">
              <span className="text-white/70">Rewards progress</span>
              <span>
                {points.toLocaleString()} /{" "}
                {REWARDS_GOAL.toLocaleString()} pts
              </span>
            </div>
            <div className="relative mt-3 h-2.5 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-brand"
                style={{ width: `${pct}%` }}
              />
              {rewardMilestones.map((m) => (
                <span
                  key={m.label}
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                  style={{
                    left: `${(m.at / REWARDS_GOAL) * 100}%`,
                    background: points >= m.at ? "#ffc200" : "#4b4b4b",
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-medium text-white/70">
              {rewardMilestones.map((m) => (
                <span key={m.label} className={points >= m.at ? "text-gold" : ""}>
                  {points >= m.at ? "★ " : ""}
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/rewards" className="py-4 sm:px-9">
              View rewards
            </Button>
            <Button href="/menu" variant="light" className="py-4 sm:px-9">
              View menu
            </Button>
          </div>

          {/* Streak / challenge chip */}
          <div className="mt-6 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/15">
            <span aria-hidden>🔥🔥🔥</span>
            {activeChallenge.title} ·{" "}
            <span className="text-white/70">{activeChallenge.nextAction}</span>
          </div>
        </div>
      </div>

      {/* RIGHT — your favorite bowl (quick reorder) */}
      <div className="relative flex flex-col items-center justify-center bg-[#eceef1] px-6 py-12 text-center lg:px-12 lg:py-14">
        {/* Stage: bowl with hand-drawn callouts */}
        <div className="relative w-full max-w-[460px]">
          <div className="relative aspect-square w-full">
            {fav && (
              <Image
                src={fav.image}
                alt={fav.name}
                fill
                className="object-contain"
              />
            )}
          </div>

          {/* Callout pills + arrows (desktop / tablet only) */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <Callout className="left-0 top-1" icon="🔥" label="680 cal" />
            <Callout className="right-0 top-1" icon="🌶️" label="Sweet Chili Sauce" />
            <Callout className="bottom-[14%] left-0" icon="🍗" label="Grilled chicken" />

            {/* down-right (from 680 cal) */}
            <Arrow
              className="absolute left-[14%] top-[16%] h-20 w-20"
              main="M22 6 C 6 26 38 30 24 48 C 16 60 40 58 70 92"
              head="M70 92 L 52 90 M70 92 L 64 74"
            />
            {/* down-left (from Sweet Chili Sauce) */}
            <Arrow
              className="absolute right-[12%] top-[18%] h-20 w-20"
              main="M78 6 C 94 26 62 30 76 48 C 84 60 60 58 30 92"
              head="M30 92 L 48 90 M30 92 L 36 74"
            />
            {/* up-right (from Grilled chicken) */}
            <Arrow
              className="absolute bottom-[22%] left-[16%] h-20 w-20"
              main="M16 92 C 4 70 34 70 22 50 C 14 36 40 40 72 14"
              head="M72 14 L 54 16 M72 14 L 66 30"
            />
          </div>
        </div>

        <p className="-rotate-2 font-script text-[30px] leading-none text-ink lg:text-[40px]">
          Your favorite bowl!
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-md bg-brand-button px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Most ordered
          </span>
          <span className="rounded-md bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
            +50 pts today
          </span>
        </div>
        <h2 className="mt-3 font-display text-[40px] uppercase leading-none text-ink lg:text-[52px]">
          Chicken Bowl
        </h2>
        <p className="mt-2 text-2xl font-bold text-brand">$12.49</p>
        <p className="mt-2 max-w-[420px] text-base text-ink/80">
          Grilled chicken, your choice of rice, WaBa sauce, fresh veggies
        </p>
        <button
          type="button"
          onClick={() => fav && openPDP(fav)}
          className="mt-5 w-full max-w-[520px] rounded-full bg-brand-button py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-brand active:translate-y-0 active:scale-[0.98]"
        >
          Reorder
        </button>
      </div>
    </section>
  );
}

function Callout({
  className,
  icon,
  label,
}: {
  className: string;
  icon: string;
  label: string;
}) {
  return (
    <span
      className={`absolute inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink shadow-md ${className}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

function Arrow({
  className,
  main,
  head,
}: {
  className: string;
  main: string;
  head: string;
}) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <path
        d={main}
        stroke="#ED1C23"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={head}
        stroke="#ED1C23"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
