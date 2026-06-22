import type { Metadata } from "next";
import Image from "next/image";
import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/loyalty/SectionHeading";
import { distressStyle } from "@/lib/distress";
import {
  POINTS_PER_DOLLAR,
  REWARDS_GOAL,
  rewardCatalog,
  tiers,
  offers,
  challenges,
} from "@/components/loyalty/loyalty-data";

export const metadata: Metadata = {
  title: "How WaBa Rewards Works — WaBa Grill",
  description:
    "A complete guide to WaBa Rewards: earn points on every order, redeem free food, unlock offers, climb tiers and complete challenges.",
};

const earnWays = [
  {
    icon: "🍚",
    title: "Order anywhere",
    body: `Earn ${POINTS_PER_DOLLAR} points for every $1 you spend — in the app, online or in store. Points post as soon as your order is placed.`,
  },
  {
    icon: "🎂",
    title: "Birthday & welcome",
    body: "Get a welcome reward when you join and a free bowl during your birthday month — no points required.",
  },
  {
    icon: "🔥",
    title: "Challenges & bonuses",
    body: "Complete challenges and catch double-point offers to rack up bonus points faster.",
  },
];

const whereItShows = [
  ["Navigation bar", "Your current points balance and a badge when something new is waiting."],
  ["Homepage", "A promo strip of active offers, plus a personalized hero once you're signed in."],
  ["Menu & item pages", "Offer badges (50% OFF, 2X, BOGO, NEW) right on the cards and product pages."],
  ["Cart", "Rewards and offers in one place — apply any of them and see the discount instantly."],
  ["Checkout", "How many points you'll earn and how close you are to your next reward."],
];

export default function HowRewardsWorkPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Nav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-ink text-white">
          <Image
            src="/images/offer-bg.png"
            alt=""
            fill
            aria-hidden
            className="pointer-events-none object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand/85 via-black/70 to-black/85" />
          <div className="relative mx-auto max-w-[900px] px-6 py-16 text-center lg:py-24">
            <p className="font-script text-[30px] leading-none text-white lg:text-[40px]">
              The complete guide
            </p>
            <h1
              className="mt-1 font-display text-[52px] uppercase leading-[0.9] lg:text-[76px]"
              style={distressStyle}
            >
              How WaBa Rewards works
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-white/85 lg:text-lg">
              Eat the food you love and get rewarded for it. Here&apos;s
              everything — how you earn, what you can unlock, and how to use it,
              all in one place.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/rewards" className="py-4 sm:px-9">
                Join WaBa Rewards
              </Button>
              <Button href="/menu" variant="outline" className="py-4 sm:px-9">
                Start an order
              </Button>
            </div>
          </div>
        </section>

        {/* 1. Earning points */}
        <section className="bg-white px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading eyebrow="Step one" title="Earning points" />
            <p className="mx-auto mt-4 max-w-[620px] text-center text-sm leading-relaxed text-ink/70">
              Every order moves you closer to free food. You earn{" "}
              <span className="font-bold text-ink">
                {POINTS_PER_DOLLAR} points for every $1
              </span>{" "}
              spent, and points <span className="font-bold text-ink">never expire</span>.
            </p>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {earnWays.map((e) => (
                <div
                  key={e.title}
                  className="rounded-2xl border border-black/10 bg-bone p-6 shadow-sm"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-button text-2xl text-white">
                    {e.icon}
                  </span>
                  <h3 className="mt-4 font-display text-2xl uppercase text-ink">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {e.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Rewards */}
        <section className="bg-bone px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading eyebrow="Spend your points" title="Rewards" />
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm leading-relaxed text-ink/70">
              Rewards are earned with points and redeemed for real food or
              savings. Each has a fixed point cost and can be used in store or
              online. The top reward — a{" "}
              <span className="font-bold text-ink">free bowl</span> — caps the
              ladder at <span className="font-bold text-ink">{REWARDS_GOAL} points</span>.
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              {rewardCatalog.map((r, i) => (
                <div
                  key={r.id}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i > 0 ? "border-t border-black/5" : ""
                  }`}
                >
                  <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-button font-display text-base text-white">
                    {r.points}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{r.name}</p>
                    <p className="text-sm text-ink/70">{r.desc}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-bone px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/60 sm:block">
                    {r.kind === "item" ? "Opens the item" : "Applied in cart"}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-ink/60">
              Pick a reward in the rewards hub or your cart — item rewards open
              the product page, order rewards apply straight to your cart total.
            </p>
          </div>
        </section>

        {/* 3. Tiers */}
        <section className="bg-white px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading eyebrow="Level up" title="Tiers" />
            <p className="mx-auto mt-4 max-w-[620px] text-center text-sm leading-relaxed text-ink/70">
              The more you order through the year, the higher your tier — and the
              bigger the perks you keep.
            </p>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {tiers.map((t, i) => (
                <div
                  key={t.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    i === 1
                      ? "border-brand-button shadow-xl lg:-translate-y-2"
                      : "border-black/10 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl uppercase text-ink">
                      {t.name}
                    </span>
                    <span className="rounded-full bg-bone px-3 py-1 text-xs font-bold text-ink/70">
                      {t.threshold === 0
                        ? "Start here"
                        : `${t.threshold}+ pts / yr`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink/70">{t.blurb}</p>
                  <ul className="mt-4 space-y-2">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-ink">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-button text-[10px] font-bold text-white"
                        >
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Offers */}
        <section className="bg-bone px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading eyebrow="Limited time" title="Offers" />
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm leading-relaxed text-ink/70">
              Offers are campaign deals — like 2X points, BOGO bowls or % off.
              Unlike rewards, you don&apos;t buy them with points; they&apos;re
              available for a limited time and always show a clear{" "}
              <span className="font-bold text-ink">expiry date</span>. Some apply
              automatically, others you choose.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {offers.map((o) => (
                <div
                  key={o.id}
                  className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-11 shrink-0 items-center rounded-lg bg-brand-button px-3 font-display text-sm uppercase text-white">
                    {o.badge}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg uppercase leading-tight text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink/70">{o.desc}</p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-brand-accent">
                      Expires {o.expires} · {o.auto ? "auto-applied" : "select to use"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Challenges */}
        <section className="bg-white px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading eyebrow="Play & earn" title="Challenges" />
            <p className="mx-auto mt-4 max-w-[640px] text-center text-sm leading-relaxed text-ink/70">
              Challenges turn ordering into a game. Hit a goal — like an order
              streak — and earn bonus points or a reward. Each order you place
              moves your active challenge forward; finish it and the bonus is
              yours automatically.
            </p>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col rounded-2xl border border-black/10 bg-bone p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                      {c.kind === "streak" ? "Streak" : "Challenge"}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-brand-accent">
                      {c.rewardText}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl uppercase text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">{c.goal}</p>
                  <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-ink/50">
                    {c.timeframe}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Redeeming */}
        <section className="bg-bone px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <SectionHeading eyebrow="At checkout" title="How to redeem" />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl uppercase text-ink">
                  Apply in your cart
                </h3>
                <ol className="mt-4 space-y-3">
                  {[
                    "Add your favorites to the cart.",
                    "Open the cart — Rewards and Offers sit together in one place.",
                    "Tap any reward or offer to apply it; the discount shows as its own line in your total.",
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-button font-display text-sm text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
                <h3 className="font-display text-2xl uppercase text-ink">
                  Good to know
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-ink">
                  {[
                    "Points never expire — bank them for the free bowl.",
                    "One points reward applies per order.",
                    "Rewards combine with your birthday perk, but not with other promo codes.",
                    "Rewards & offers don't apply to taxes, tips or fees.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-button text-[11px] font-bold text-white"
                      >
                        ✓
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Where you'll see it */}
        <section className="bg-white px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[820px]">
            <SectionHeading eyebrow="Always within reach" title="Where you'll see it" />
            <div className="mt-10 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10">
              {whereItShows.map(([place, desc]) => (
                <div key={place} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                  <span className="w-44 shrink-0 font-bold text-ink">{place}</span>
                  <span className="text-sm text-ink/70">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand px-6 py-16 text-center lg:py-20">
          <div className="mx-auto max-w-[680px]">
            <h2
              className="font-display text-[44px] uppercase leading-[0.95] text-white lg:text-[60px]"
              style={distressStyle}
            >
              Ready to eat free?
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] text-base text-white/90">
              Join WaBa Rewards in seconds and start earning on your very next
              order — your first reward is closer than you think.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/rewards" variant="light" className="py-4 sm:px-10">
                Join now
              </Button>
              <Button href="/menu" variant="outline" className="py-4 sm:px-10">
                Browse the menu
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
