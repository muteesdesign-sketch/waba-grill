"use client";

import Link from "next/link";
import { useState } from "react";
import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { useCart, REWARD_AMOUNT } from "@/components/cart/CartProvider";

const money = (n: number) => `$${n.toFixed(2)}`;
const TIPS = [
  { label: "10%", pct: 0.1 },
  { label: "15%", pct: 0.15 },
  { label: "20%", pct: 0.2 },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none";

export default function CheckoutPage() {
  const cart = useCart();
  const { items, totals, utensils, setUtensils, tipPct, setTipPct, freeDrink, time } = cart;
  const [placed, setPlaced] = useState(false);
  const [showItems, setShowItems] = useState(false);

  if (placed) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white">
        <Banner />
        <Nav />
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-white">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-5xl uppercase text-ink">
            Order placed!
          </h1>
          <p className="mt-3 max-w-md text-ink/70">
            Thanks! Your WaBa Grill order is being prepared for pickup at Clovis
            (Shaw Ave). You earned 17 points on this order.
          </p>
          <Link
            href="/menu"
            className="mt-8 rounded-full bg-brand-button px-10 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
          >
            Back to menu
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-bone">
      <Banner />
      <Nav />

      {/* Dark header */}
      <section className="bg-ink px-5 py-7 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/menu"
            className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            <span>‹</span> Back to menu
          </Link>
          <h1 className="mt-2 font-display text-5xl uppercase text-white lg:text-6xl">
            Checkout
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-5 py-8 lg:px-10 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT — order details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
            <h2 className="font-display text-2xl uppercase text-ink">
              Order details
            </h2>

            <p className="mt-5 text-sm font-bold uppercase tracking-wide text-ink">
              Pickup location
            </p>
            <p className="mt-2 text-sm text-ink/80">Clovis (Shaw Ave)</p>
            <p className="text-sm text-ink/80">Hill Country Village</p>
            <p className="text-sm text-ink/80">
              3770 Shaw Ave suite 106, Clovis, CA 93619
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Field label="Date">
                <input className={inputCls} defaultValue="June 1, 2026" />
              </Field>
              <Field label="Time">
                <input className={inputCls} defaultValue={time} />
              </Field>
            </div>

            <hr className="my-6 border-black/5" />

            <h3 className="font-display text-xl uppercase text-ink">
              Your information
            </h3>
            <p className="mt-1 text-sm text-ink/60">
              We&apos;ll use this to find your account (or set one up) and send
              you order updates.
            </p>

            {/* Rewards banner */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#fff4ee] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-button text-white">
                ★
              </span>
              <div>
                <p className="font-display text-base uppercase text-brand">
                  Sign up to receive rewards
                </p>
                <p className="text-xs text-ink/70">
                  You could earn <span className="font-bold text-brand">17</span>{" "}
                  points on this order — plus points from a free drink and
                  cookie!
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <Field label="Phone number">
                <input className={inputCls} placeholder="(123) 456-7890" />
              </Field>
              <Field label="Email address">
                <input className={inputCls} placeholder="shawn@google.com" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name">
                  <input className={inputCls} placeholder="Shawn" />
                </Field>
                <Field label="Last name">
                  <input className={inputCls} placeholder="Jones" />
                </Field>
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" defaultChecked className="accent-brand" />
              Join WaBa Grill rewards and earn{" "}
              <span className="font-bold text-brand">17</span> points on your
              first order.
            </label>

            <hr className="my-6 border-black/5" />

            <h3 className="font-display text-xl uppercase text-ink">
              Promo code
            </h3>
            <div className="mt-3 flex gap-3">
              <input className={inputCls} placeholder="Add promo code" />
              <button className="rounded-lg border border-brand px-6 text-sm font-bold uppercase text-brand">
                Apply
              </button>
            </div>

            <h3 className="mt-6 font-display text-xl uppercase text-ink">
              Gift card
            </h3>
            <button className="mt-3 flex items-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-bold uppercase text-brand">
              🎁 Add a gift card
            </button>

            <h3 className="mt-6 font-display text-xl uppercase text-ink">
              Payment method
            </h3>
            <div className="mt-3 space-y-3">
              <button className="flex w-full items-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-bold uppercase text-brand">
                 Pay · Apple Pay
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-bold uppercase text-brand">
                💳 Credit Card
              </button>
            </div>
          </div>

          {/* RIGHT — order summary */}
          <div className="lg:sticky lg:top-[24px] lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl uppercase text-ink">
                Order summary
              </h2>

              <button
                onClick={() => setShowItems((v) => !v)}
                className="mt-5 flex w-full items-center justify-between border-b border-black/10 pb-3 text-left"
              >
                <span className="flex items-center gap-2 font-bold text-ink">
                  🛍 Order ({items.length} item{items.length !== 1 ? "s" : ""})
                </span>
                <span className={showItems ? "rotate-180" : ""}>⌄</span>
              </button>
              {showItems && (
                <div className="border-b border-black/10 py-2">
                  {items.map((it, i) => (
                    <div
                      key={`${it.name}-${i}`}
                      className="flex justify-between py-1 text-sm text-ink/80"
                    >
                      <span>{it.name}</span>
                      <span>{money(it.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-b border-black/10 py-3">
                <span className="flex items-center gap-2 font-bold text-ink">
                  🍴 Include utensils
                </span>
                <button
                  role="switch"
                  aria-checked={utensils}
                  onClick={() => setUtensils(!utensils)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    utensils ? "bg-green-600" : "bg-black/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                      utensils ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2 py-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink/70">Order subtotal</span>
                  <span className="font-semibold text-ink">
                    {money(totals.subtotal)}
                  </span>
                </div>
                {freeDrink && (
                  <div className="flex justify-between">
                    <span className="text-ink/70">Reward (Free drink)</span>
                    <span className="text-ink/70">-{money(REWARD_AMOUNT)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-ink/70">Taxes &amp; Fees</span>
                  <span className="text-ink/70">{money(totals.taxes)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-ink">Tip</span>
                <span className="font-bold text-ink">{money(totals.tip)}</span>
              </div>
              <div className="mt-3 flex gap-2">
                {TIPS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setTipPct(t.pct)}
                    className={`flex-1 rounded-lg border py-2 text-sm font-bold transition-colors ${
                      tipPct === t.pct
                        ? "border-brand bg-brand text-white"
                        : "border-[#e5e7eb] text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
                <button className="flex-1 rounded-lg border border-[#e5e7eb] py-2 text-sm font-bold text-ink">
                  Other
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                <span className="font-bold text-ink">Total</span>
                <span className="text-lg font-bold text-ink">
                  {money(totals.total)}
                </span>
              </div>

              <button
                onClick={() => {
                  cart.setItems(() => []);
                  setPlaced(true);
                  window.scrollTo({ top: 0 });
                }}
                className="mt-4 w-full rounded-full bg-brand-button py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
              >
                Place your order
              </button>
              <p className="mt-3 text-center text-xs text-ink/60">
                ⚙ You&apos;re earning{" "}
                <span className="font-bold text-brand">17</span> points on this
                order
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
