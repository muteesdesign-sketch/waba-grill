"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CartItem } from "./CartProvider";

const TIMES = ["ASAP (25-30 min)", "12:00pm", "12:30pm", "1:00pm", "1:30pm"];
const TIPS = [
  { label: "10%", pct: 0.1 },
  { label: "15%", pct: 0.15 },
  { label: "20%", pct: 0.2 },
];
const REWARD = 3.29;

const money = (n: number) => `$${n.toFixed(2)}`;

export function CartDrawer({
  open,
  onClose,
  items,
  setItems,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: (fn: (prev: CartItem[]) => CartItem[]) => void;
}) {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("12:00pm");
  const [tip, setTip] = useState(0.1);
  const [utensils, setUtensils] = useState(true);
  const [freeDrink, setFreeDrink] = useState(true);

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => setShow(true));
      document.body.style.overflow = "hidden";
      return () => cancelAnimationFrame(t);
    }
    setShow(false);
    document.body.style.overflow = "";
  }, [open]);

  if (!open) return null;

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const reward = freeDrink ? -REWARD : 0;
  const taxes = subtotal * 0.137;
  const tipAmount = subtotal * tip;
  const total = subtotal + reward + taxes + tipAmount;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 sm:w-[440px] ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-brand px-6 py-4 text-white">
          <h2 className="font-display text-2xl uppercase">Order</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Pickup details */}
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
              Pickup details
            </h3>
            <button className="text-sm font-bold uppercase tracking-wide text-ink underline">
              Edit
            </button>
          </div>
          <p className="mt-3 font-bold text-ink">WaBa Grill</p>
          <p className="text-sm text-ink/70">Clovis (Shaw Ave)</p>
          <p className="text-sm text-ink/70">
            3770 Shaw Ave suite 106, Clovis, CA 93619
          </p>

          <p className="mt-5 text-sm font-bold uppercase tracking-wide text-ink">
            Time
          </p>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {TIMES.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  time === t
                    ? "border-brand bg-brand text-white"
                    : "border-[#e5e7eb] text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="mt-6 flex flex-col">
            {items.map((it, idx) => (
              <div
                key={`${it.name}-${idx}`}
                className="flex items-center gap-3 border-b border-black/5 py-4"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bone">
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <span className="flex-1 font-bold text-ink">{it.name}</span>
                <span className="font-bold text-ink">{money(it.price)}</span>
                <button
                  aria-label="Remove"
                  onClick={() =>
                    setItems((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="text-ink/40 hover:text-brand"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 7h14M9 7V5h6v2M7 7l1 12a2 2 0 002 2h4a2 2 0 002-2l1-12"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={onClose}
              className="mt-4 self-start rounded-full border border-ink px-8 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Add
            </button>
          </div>

          {/* Rewards */}
          <div className="mt-7 flex items-center gap-2">
            <span className="text-brand">⚙</span>
            <h3 className="font-bold text-ink">Your rewards and offers</h3>
          </div>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
            <RewardCard label="5% off" sub="Used by 10/26" />
            <RewardCard
              label="Free drink"
              added={freeDrink}
              onToggle={() => setFreeDrink((v) => !v)}
              highlight
            />
            <RewardCard label="Free cookie" />
          </div>

          {/* Utensils */}
          <div className="mt-6 flex items-center justify-between border-y border-black/5 py-4">
            <span className="font-bold text-ink">Include utensils</span>
            <button
              role="switch"
              aria-checked={utensils}
              onClick={() => setUtensils((v) => !v)}
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

          {/* Totals */}
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Order subtotal" value={money(subtotal)} bold />
            {freeDrink && (
              <Row label="Reward (Free drink)" value={`-${money(REWARD)}`} />
            )}
            <Row label="Taxes & Fees" value={money(taxes)} />
          </div>

          {/* Tip */}
          <div className="mt-5 flex items-center justify-between">
            <span className="font-bold text-ink">Tip</span>
            <span className="font-bold text-ink">{money(tipAmount)}</span>
          </div>
          <div className="mt-3 flex gap-2">
            {TIPS.map((t) => (
              <button
                key={t.label}
                onClick={() => setTip(t.pct)}
                className={`flex-1 rounded-lg border py-2 text-sm font-bold transition-colors ${
                  tip === t.pct
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
        </div>

        {/* Footer */}
        <div className="border-t border-black/10 px-6 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold text-ink">Total</span>
            <span className="text-lg font-bold text-ink">{money(total)}</span>
          </div>
          <button className="w-full rounded-full bg-brand-button py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand">
            Checkout - {money(total)}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-bold text-ink" : "text-ink/70"}>
        {label}
      </span>
      <span className={bold ? "font-bold text-ink" : "text-ink/70"}>
        {value}
      </span>
    </div>
  );
}

function RewardCard({
  label,
  sub,
  added,
  highlight,
  onToggle,
}: {
  label: string;
  sub?: string;
  added?: boolean;
  highlight?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className={`flex w-[120px] shrink-0 flex-col items-center rounded-xl border-2 p-3 text-center ${
        highlight ? "border-brand" : "border-[#e5e7eb]"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand font-display text-2xl text-white">
        W
      </div>
      <span className="mt-2 text-xs font-bold text-ink">{label}</span>
      {sub && <span className="text-[10px] text-ink/50">{sub}</span>}
      <button
        onClick={onToggle}
        className={`mt-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase ${
          added
            ? "bg-brand-button text-white"
            : "border border-[#e5e7eb] text-ink"
        }`}
      >
        {added ? "Added" : "Redeem"}
      </button>
    </div>
  );
}
