"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useLoyalty } from "@/components/loyalty/LoyaltyProvider";
import { pointsForSubtotal } from "@/components/loyalty/loyalty-data";

const money = (n: number) => `$${n.toFixed(2)}`;
const TIPS = [
  { label: "10%", pct: 0.1 },
  { label: "15%", pct: 0.15 },
  { label: "20%", pct: 0.2 },
];

/* ---- DS primitives ------------------------------------------------------- */

function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="flex items-center justify-center border-b border-black/10 py-3">
        <Link href="/" aria-label="WaBa Grill home">
          <Image
            src="/images/logo.svg"
            alt="WaBa Grill"
            width={120}
            height={30}
            className="h-7 w-auto"
            priority
          />
        </Link>
      </div>
      <div className="relative flex items-center justify-center border-b border-black/10 py-4">
        <Link
          href="/menu"
          className="absolute left-4 flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-brand-accent lg:left-8"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </Link>
        <h1 className="text-xl font-bold text-ink">Checkout</h1>
      </div>
    </header>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block rounded-xl border border-[#e1e3e6] px-4 py-2.5 transition-colors focus-within:border-ink">
      <span className="block text-[11px] font-medium text-ink/50">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-0.5 w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/40"
      />
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[22px] font-bold text-ink">{children}</h2>;
}

/* ---- Page ---------------------------------------------------------------- */

export default function CheckoutPage() {
  const cart = useCart();
  const { items, totals, utensils, setUtensils, tipPct, setTipPct, time } = cart;
  const { enrolled, memberName, pointsToNextReward, nextReward } = useLoyalty();
  const earnedPoints = pointsForSubtotal(totals.subtotal);
  const [placed, setPlaced] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [pay, setPay] = useState<"apple" | "card">("apple");

  if (placed) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white">
        <CheckoutHeader />
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
            (Shaw Ave). You earned {earnedPoints.toLocaleString()} points on this
            order.
          </p>
          <Link
            href="/menu"
            className="mt-8 rounded-full bg-brand-button px-10 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
          >
            Back to menu
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <CheckoutHeader />

      <main className="mx-auto max-w-[1180px] px-5 py-8 lg:px-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* LEFT — form sections separated by thin dividers */}
          <div className="divide-y divide-black/10">
            {/* Pickup Details */}
            <section className="pb-7">
              <SectionTitle>Pickup Details</SectionTitle>
              <div className="mt-4 flex items-start gap-3">
                <PinIcon />
                <div className="flex-1">
                  <p className="font-bold text-ink">Clovis (Shaw Ave)</p>
                  <p className="text-sm leading-snug text-ink/70 underline">
                    3770 Shaw Ave suite 106
                    <br />
                    Clovis, CA 93619
                  </p>
                </div>
                <button className="shrink-0 rounded-full bg-brand-button px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand">
                  Change
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <ClockIcon />
                <p className="text-sm text-ink/80">ASAP (20–30 Min) · {time}</p>
              </div>
            </section>

            {/* Contact Info */}
            <section className="py-7">
              <SectionTitle>Contact Info</SectionTitle>
              <p className="mt-3 text-sm text-ink/80">
                <Link href="/rewards" className="font-bold text-ink underline">
                  Sign In
                </Link>{" "}
                to use your saved payment and contact information.
              </p>

              <div className="my-5 flex items-center gap-4">
                <span className="h-px flex-1 bg-black/10" />
                <span className="text-sm font-bold text-ink">
                  Or continue as guest
                </span>
                <span className="h-px flex-1 bg-black/10" />
              </div>

              {/* Loyalty value reminder */}
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#fff4ee] p-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-button text-white">
                  ★
                </span>
                <p className="text-xs text-ink/80">
                  {enrolled ? (
                    <>
                      <span className="font-bold text-ink">{memberName}</span>,
                      you&apos;ll earn{" "}
                      <span className="font-bold text-brand-accent">
                        {earnedPoints.toLocaleString()}
                      </span>{" "}
                      points
                      {nextReward
                        ? ` — ${pointsToNextReward.toLocaleString()} from ${nextReward.name}.`
                        : "."}
                    </>
                  ) : (
                    <>
                      Join WaBa Rewards and earn{" "}
                      <span className="font-bold text-brand-accent">
                        {earnedPoints.toLocaleString()}
                      </span>{" "}
                      points on this order.
                    </>
                  )}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="First Name" defaultValue="John" />
                <Field label="Last Name" defaultValue="Smith" />
              </div>
              <div className="mt-3 space-y-3">
                <Field
                  label="Email Address"
                  type="email"
                  defaultValue="johnsmith@gmail.com"
                />
                <Field label="Mobile Phone Number" defaultValue="(235) 456-7890" />
              </div>
            </section>

            {/* Tip */}
            <section className="py-7">
              <SectionTitle>Add a Tip</SectionTitle>
              <p className="mt-1 text-sm text-ink/60">
                100% of your tip goes to the team.
              </p>
              <div className="mt-4 flex gap-2">
                {TIPS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setTipPct(t.pct)}
                    className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-colors ${
                      tipPct === t.pct
                        ? "border-brand-accent bg-brand-accent text-white"
                        : "border-[#e1e3e6] text-ink hover:border-ink/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
                <button className="flex-1 rounded-xl border border-[#e1e3e6] py-3 text-sm font-bold text-ink hover:border-ink/40">
                  Other
                </button>
              </div>
            </section>

            {/* Promo code */}
            <section className="py-7">
              <SectionTitle>Promo Code</SectionTitle>
              <div className="mt-4 flex gap-3">
                <label className="flex-1 rounded-xl border border-[#e1e3e6] px-4 py-2.5 transition-colors focus-within:border-ink">
                  <span className="block text-[11px] font-medium text-ink/50">
                    Promo code
                  </span>
                  <input
                    placeholder="Enter code"
                    className="mt-0.5 w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/40"
                  />
                </label>
                <button className="shrink-0 rounded-xl border border-brand-accent px-6 text-sm font-bold uppercase text-brand-accent transition-colors hover:bg-brand-accent hover:text-white">
                  Apply
                </button>
              </div>
            </section>

            {/* Payment */}
            <section className="pt-7">
              <SectionTitle>Payment Method</SectionTitle>
              <div className="mt-4 space-y-3">
                <PaymentRow
                  label="Apple Pay"
                  icon=""
                  selected={pay === "apple"}
                  onClick={() => setPay("apple")}
                />
                <PaymentRow
                  label="Credit Card"
                  icon="💳"
                  selected={pay === "card"}
                  onClick={() => setPay("card")}
                />
              </div>
            </section>
          </div>

          {/* RIGHT — order summary card (sticky) */}
          <div className="lg:sticky lg:top-[140px] lg:self-start">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-[22px] font-bold text-ink">Order Summary</h2>

              <button
                onClick={() => setShowItems((v) => !v)}
                className="mt-4 flex w-full items-center justify-between text-left"
              >
                <span className="font-semibold text-ink">
                  {items.length} Item{items.length !== 1 ? "s" : ""}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className={showItems ? "rotate-180" : ""}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showItems && (
                <div className="mt-2 space-y-1">
                  {items.map((it, i) => (
                    <div
                      key={`${it.name}-${i}`}
                      className="flex justify-between text-sm text-ink/80"
                    >
                      <span>{it.name}</span>
                      <span>{money(it.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-2 border-t border-black/10 pt-4 text-sm">
                <Row label="Subtotal" value={money(totals.subtotal)} />
                {totals.reward < 0 && (
                  <Row
                    label={totals.rewardLabel}
                    value={`-${money(Math.abs(totals.reward))}`}
                    muted
                  />
                )}
                {totals.offer < 0 && (
                  <Row
                    label={totals.offerLabel}
                    value={`-${money(Math.abs(totals.offer))}`}
                    muted
                  />
                )}
                <Row label="Taxes & Fees" value={money(totals.taxes)} muted />
                <Row label="Tip" value={money(totals.tip)} muted />
              </div>

              {/* Utensils */}
              <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                <span className="text-sm font-medium text-ink">
                  Include utensils
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

              <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
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
                className="mt-5 w-full rounded-full bg-brand-button py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-brand active:translate-y-0 active:scale-[0.98]"
              >
                Place order · {money(totals.total)}
              </button>
              <p className="mt-3 text-center text-xs text-ink/60">
                ⚙ {enrolled ? "You're earning" : "Join to earn"}{" "}
                <span className="font-bold text-brand-accent">
                  {earnedPoints.toLocaleString()}
                </span>{" "}
                points on this order
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-ink/60" : "font-semibold text-ink"}>
        {label}
      </span>
      <span className={muted ? "text-ink/60" : "font-semibold text-ink"}>
        {value}
      </span>
    </div>
  );
}

function PaymentRow({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
        selected ? "border-ink bg-bone" : "border-[#e1e3e6] hover:border-ink/40"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected ? "border-brand-accent" : "border-black/25"
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />}
      </span>
      <span aria-hidden>{icon}</span>
      <span className="text-sm font-semibold text-ink">{label}</span>
    </button>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
        stroke="#222323"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.4" stroke="#222323" strokeWidth="1.8" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="9" stroke="#222323" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="#222323" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
