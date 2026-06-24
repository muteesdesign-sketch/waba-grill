"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { distressStyle } from "@/lib/distress";
import { useLoyalty } from "./LoyaltyProvider";
import { POINTS_PER_DOLLAR } from "./loyalty-data";
import { AuthPanel } from "./AuthPanel";
import { PreviewToggle } from "./PreviewToggle";

export function LoyaltyHero() {
  const { enrolled, activeChallenge } = useLoyalty();
  const [showRegister, setShowRegister] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  // Members go straight to the Loyalty Hub — no hero for them.
  if (enrolled) return null;

  return (
    <section id="header" className="relative overflow-hidden bg-ink text-white">
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
      <div className="absolute inset-0 bg-black/55 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/60 lg:to-black/25" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            <span aria-hidden>★</span> WaBa Rewards
          </span>
          <PreviewToggle />
        </div>

        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2">
            <p className="font-script text-[34px] leading-none text-brand lg:text-[44px]">
              Eat well, earn more
            </p>
            <h1
              className="mt-1 font-display text-[52px] uppercase leading-[0.9] lg:text-[80px]"
              style={distressStyle}
            >
              Free food, <span className="text-brand">just</span>
              <br />
              <span className="text-brand">for eating</span> good.
            </h1>
            <p className="mt-5 max-w-[460px] text-base leading-relaxed text-white/85 lg:text-lg">
              Earn {POINTS_PER_DOLLAR} points for every $1 you spend, unlock free
              bowls, drinks and sides and stack offers and challenges. No card
              to carry — it&apos;s all in your account.
            </p>
          </div>

          {/* Guests get the active challenge as the hook with a join CTA. */}
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <div className="mx-auto max-w-[420px] rounded-3xl bg-white p-6 text-ink shadow-2xl">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-ink/60">
                  Active challenge
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-brand-accent">
                  {activeChallenge.rewardText}
                </span>
              </div>
              <p className="mt-3 font-display text-[28px] uppercase leading-none text-ink">
                {activeChallenge.title}
              </p>
              <p className="mt-1 text-sm text-ink/70">{activeChallenge.goal}</p>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setShowRegister(true);
                }}
                aria-expanded={showRegister}
                className="mt-5 w-full rounded-full bg-brand-button px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand active:scale-[0.98]"
              >
                Join the challenge
              </button>
              <p className="mt-3 text-center text-xs text-ink/60">
                Join free and start making progress on your next order.
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
