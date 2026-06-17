"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/loyalty/SectionHeading";
import { useCart } from "@/components/cart/CartProvider";

const AMOUNTS = [10, 25, 50, 100];
const DESIGNS = [
  { id: "classic", label: "Classic", image: "/images/bowl-chicken.png" },
  { id: "steak", label: "Steak lover", image: "/images/bowl-steak.png" },
  { id: "celebrate", label: "Celebrate", image: "/images/bowl-grilled.png" },
];

export function GiftcardBuilder() {
  const cart = useCart();
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");
  const [design, setDesign] = useState(DESIGNS[0].id);
  const [added, setAdded] = useState(false);

  const effective = custom ? Math.max(0, Number(custom) || 0) : amount;
  const activeDesign = DESIGNS.find((d) => d.id === design) ?? DESIGNS[0];

  return (
    <section
      id="buy"
      className="scroll-mt-[110px] bg-white px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading eyebrow="Send a gift" title="Build your gift card" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Live preview */}
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-ink shadow-xl">
              <Image
                src={activeDesign.image}
                alt=""
                fill
                className="object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand/80 via-black/40 to-black/70" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <span className="font-display text-2xl uppercase">
                  WaBa Grill
                </span>
                <div>
                  <p className="font-script text-2xl leading-none text-white">
                    Gift card
                  </p>
                  <p className="font-display text-[44px] leading-none">
                    ${effective || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesign(d.id)}
                  className={`relative h-14 flex-1 overflow-hidden rounded-xl border-2 transition-colors ${
                    design === d.id ? "border-brand-accent" : "border-black/10"
                  }`}
                  aria-pressed={design === d.id}
                  aria-label={d.label}
                >
                  <Image src={d.image} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-black/10 bg-bone p-6 shadow-sm lg:p-8">
            <label className="block text-xs font-bold uppercase tracking-wide text-ink/60">
              Choose an amount
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setAmount(a);
                    setCustom("");
                  }}
                  className={`h-11 min-w-[68px] rounded-full border px-4 text-sm font-bold transition-colors ${
                    !custom && amount === a
                      ? "border-brand-accent bg-brand-accent text-white"
                      : "border-black/15 bg-white text-ink hover:border-ink/40"
                  }`}
                >
                  ${a}
                </button>
              ))}
              <input
                type="number"
                min={1}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="Custom"
                className="h-11 w-28 rounded-full border border-black/15 bg-white px-4 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Recipient name" placeholder="Alex" />
              <Field label="Recipient email" placeholder="alex@email.com" />
              <Field label="Your name" placeholder="Juan" />
              <Field label="Delivery date" placeholder="Today" />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wide text-ink/60">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Enjoy a bowl on me!"
                className="mt-1 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                cart.add({
                  name: `WaBa Gift Card — $${effective}`,
                  price: effective,
                  image: activeDesign.image,
                });
                setAdded(true);
              }}
              disabled={!effective}
              className="mt-6 h-12 w-full rounded-full bg-brand-accent text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:bg-bone disabled:text-ink/40"
            >
              {added ? "Added to cart ✓" : `Add $${effective || 0} gift card to cart`}
            </button>
            <p className="mt-2 text-center text-[11px] text-ink/60">
              Digital gift cards are delivered by email. No fees, never expires.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60">
        {label}
      </span>
      <input
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
      />
    </label>
  );
}

export function BalanceChecker() {
  const [num, setNum] = useState("");
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  return (
    <section
      id="balance"
      className="scroll-mt-[110px] bg-bone px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[640px]">
        <SectionHeading eyebrow="Already have one?" title="Check your balance" />
        <form
          className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            // Deterministic mock balance from the card number.
            const digits = num.replace(/\D/g, "");
            setBalance(digits ? ((Number(digits.slice(-4)) % 75) + 5) : 0);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60">
                Card number
              </span>
              <input
                required
                value={num}
                onChange={(e) => {
                  setNum(e.target.value);
                  setBalance(null);
                }}
                placeholder="0000 0000 0000 0000"
                className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/60">
                PIN
              </span>
              <input
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="0000"
                className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 h-12 w-full rounded-full bg-brand-accent text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
          >
            Check balance
          </button>
          {balance !== null && (
            <div className="mt-5 rounded-2xl border border-brand-accent bg-brand/5 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-ink/60">
                Available balance
              </p>
              <p className="font-display text-[44px] leading-none text-ink">
                ${balance.toFixed(2)}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
