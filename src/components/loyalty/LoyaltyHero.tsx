"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { distressStyle } from "@/lib/distress";
import { useLoyalty } from "./LoyaltyProvider";
import { POINTS_PER_DOLLAR } from "./loyalty-data";
import { AuthPanel } from "./AuthPanel";

/** Demo-only control to preview the page as a guest or a signed-in member. */
function PreviewToggle() {
  const { enrolled, setEnrolled } = useLoyalty();
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-black/20 p-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
      <button
        type="button"
        onClick={() => setEnrolled(false)}
        aria-pressed={!enrolled}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          !enrolled ? "bg-white text-ink" : "text-white/80 hover:text-white"
        }`}
      >
        Guest
      </button>
      <button
        type="button"
        onClick={() => setEnrolled(true)}
        aria-pressed={enrolled}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          enrolled ? "bg-white text-ink" : "text-white/80 hover:text-white"
        }`}
      >
        Member
      </button>
    </div>
  );
}

export function LoyaltyHero() {
  const { enrolled, memberName, points, activeChallenge } = useLoyalty();
  const [showRegister, setShowRegister] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  return (
    <section id="header" className="relative overflow-hidden bg-ink text-white">
      <Image
        src="/images/offer-bg.png"
        alt=""
        fill
        aria-hidden
        className="pointer-events-none object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand/85 via-black/70 to-black/85" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            <span aria-hidden>★</span> WaBa Rewards
          </span>
          <PreviewToggle />
        </div>

        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <p className="font-script text-[34px] leading-none text-white lg:text-[44px]">
              {enrolled ? `Welcome back, ${memberName}` : "Eat well, earn more"}
            </p>
            <h1
              className="mt-1 font-display text-[52px] uppercase leading-[0.9] lg:text-[80px]"
              style={distressStyle}
            >
              Free food, just
              <br />
              for eating good.
            </h1>
            <p className="mt-5 max-w-[460px] text-base leading-relaxed text-white/85 lg:text-lg">
              Earn {POINTS_PER_DOLLAR} points for every $1 you spend, unlock free
              bowls, drinks and sides, and climb tiers for bigger perks. No card
              to carry — it&apos;s all in your account.
            </p>

            {enrolled ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="#rewards-display" className="py-4 sm:px-9">
                  View my rewards
                </Button>
                <Button href="#offers" variant="outline" className="py-4 sm:px-9">
                  Browse offers
                </Button>
              </div>
            ) : (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setShowRegister(true);
                  }}
                  aria-expanded={showRegister}
                  className="inline-flex items-center justify-center rounded-full bg-brand-button px-9 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-brand active:translate-y-0 active:scale-[0.97]"
                >
                  Register Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setShowRegister(true);
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-bone active:translate-y-0 active:scale-[0.97]"
                >
                  Log in
                </button>
              </div>
            )}

            {/* Guests: active challenge teaser + join CTA */}
            {!enrolled && (
              <div className="mt-6 max-w-[460px] rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80">
                    <span aria-hidden>🔥</span> Active challenge
                  </span>
                  <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                    {activeChallenge.rewardText}
                  </span>
                </div>
                <p className="mt-2 font-display text-xl uppercase text-white">
                  {activeChallenge.title}
                </p>
                <p className="mt-0.5 text-sm text-white/75">
                  {activeChallenge.goal} · {activeChallenge.timeframe}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setShowRegister(true);
                  }}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-button px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
                >
                  Join the challenge
                </button>
              </div>
            )}
          </div>

          {/* Snapshot card */}
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <div className="mx-auto max-w-[420px] rounded-3xl bg-white p-6 text-ink shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-ink/60">
                  {enrolled ? "Your balance" : "Sample balance"}
                </span>
                <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand-accent">
                  ★ Rewards
                </span>
              </div>
              <p className="mt-2 font-display text-[56px] leading-none text-ink">
                {enrolled ? points.toLocaleString() : "280"}
                <span className="ml-2 text-[20px] text-ink/50">pts</span>
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "Free drink", v: "150" },
                  { k: "Free side", v: "200" },
                  { k: "Free bowl", v: "350" },
                ].map((r) => (
                  <div key={r.k} className="rounded-xl bg-bone px-2 py-3">
                    <p className="font-display text-[20px] leading-none text-ink">
                      {r.v}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-ink/60">
                      {r.k}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-ink/60">
                {enrolled
                  ? "Keep ordering to unlock your next reward."
                  : "Register to start earning on your very first order."}
              </p>
            </div>
          </div>
        </div>

        {/* Inline auth panel — social + email login / signup */}
        {!enrolled && showRegister && (
          <div className="relative mt-10 rounded-3xl bg-white p-6 text-ink shadow-2xl lg:p-8">
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bone text-ink hover:bg-black/10"
            >
              ✕
            </button>
            <AuthPanel key={authMode} initialMode={authMode} />
          </div>
        )}
      </div>
    </section>
  );
}
