"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MenuItem, MenuOptionGroup } from "@/components/ui/MenuItemCard";
import { useCart } from "@/components/cart/CartProvider";

const TAGS = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"];

const groupHint = (g: MenuOptionGroup) =>
  g.multi
    ? g.required
      ? "Select at least 1"
      : "Optional · select any"
    : "Select 1 option";

function parsePrice(p?: string) {
  if (!p) return 0;
  const n = parseFloat(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

// "Make it a combo" upsell, prepended to configurable items.
const COMBO_GROUP: MenuOptionGroup = {
  title: "Choose your meal",
  required: false,
  multi: true,
  options: [{ name: "Make it a combo", note: "Bowl + drink", price: 4.99 }],
};

function buildGroups(item: MenuItem): MenuOptionGroup[] {
  const base = item.optionGroups ?? [];
  return base.length ? [COMBO_GROUP, ...base] : base;
}

function ComboIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M6 22h20l-2 12a4 4 0 01-4 3H12a4 4 0 01-4-3L6 22z"
        stroke="#222323"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M5 22h22" stroke="#222323" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M32 17h9l-1.4 18a3 3 0 01-3 2.8h-0.2a3 3 0 01-3-2.8L32 17z"
        stroke="#222323"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M31 17h11" stroke="#222323" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ProductModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const cart = useCart();
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<number, string[]>>({});

  useEffect(() => {
    if (item) {
      setQty(1);
      // Pre-select the combo + the first option of each single-select group
      const gs = buildGroups(item);
      const def: Record<number, string[]> = {};
      gs.forEach((g, gi) => {
        if ((gi === 0 || !g.multi) && g.options[0]) def[gi] = [g.options[0].name];
      });
      setSelected(def);
      const t = requestAnimationFrame(() => setShow(true));
      document.body.style.overflow = "hidden";
      return () => cancelAnimationFrame(t);
    }
    document.body.style.overflow = "";
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!item) return null;

  const groups = buildGroups(item);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 250);
  };

  const toggle = (gi: number, group: MenuOptionGroup, name: string) => {
    setSelected((prev) => {
      const cur = prev[gi] ?? [];
      if (group.multi) {
        return {
          ...prev,
          [gi]: cur.includes(name)
            ? cur.filter((n) => n !== name)
            : [...cur, name],
        };
      }
      return { ...prev, [gi]: [name] };
    });
  };

  const optionsTotal = groups.reduce((sum, g, gi) => {
    const chosen = selected[gi] ?? [];
    return (
      sum +
      g.options
        .filter((o) => chosen.includes(o.name))
        .reduce((s, o) => s + (o.price ?? 0), 0)
    );
  }, 0);
  const total = (parsePrice(item.price) + optionsTotal) * qty;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 flex items-end justify-center lg:items-center lg:p-6">
        <div
          className={`relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all duration-300 lg:max-h-[88vh] lg:max-w-[1000px] lg:flex-row lg:rounded-3xl ${
            show
              ? "translate-y-0 lg:scale-100 lg:opacity-100"
              : "translate-y-full lg:translate-y-0 lg:scale-95 lg:opacity-0"
          }`}
        >
          {/* Close */}
          <button
            aria-label="Close"
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-brand-button text-white shadow-md"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Scroll wrapper (mobile) / row (desktop) */}
          <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
            {/* LEFT — dark info panel */}
            <div className="bg-ink p-5 text-white lg:w-[42%] lg:shrink-0 lg:overflow-y-auto lg:p-7">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#e9eef0]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.badge && (
                  <span className="absolute left-4 top-4 rounded-lg bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <h2 className="mt-5 font-display text-4xl uppercase leading-none">
                {item.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                {item.price && (
                  <span className="text-lg font-bold">{item.price}</span>
                )}
                {item.calories && (
                  <span className="text-sm text-white/50">{item.calories}</span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — options */}
            <div className="bg-white px-5 py-6 lg:flex-1 lg:overflow-y-auto lg:px-8 lg:pb-28">
              {groups.map((group, gi) => (
                <div key={group.title} className="mb-7">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                    {group.title}{" "}
                    {group.required && (
                      <span className="text-brand">(Required)</span>
                    )}
                  </h3>
                  <p className="mb-3 mt-1 text-xs text-ink/50">
                    {groupHint(group)}
                  </p>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-3">
                    {group.options.map((o) => {
                      const isSel = (selected[gi] ?? []).includes(o.name);
                      return (
                        <button
                          key={o.name}
                          onClick={() => toggle(gi, group, o.name)}
                          className={`flex flex-col items-center rounded-xl border-2 p-2 text-center transition-colors ${
                            isSel
                              ? "border-brand"
                              : "border-[#e5e7eb] hover:border-ink/30"
                          }`}
                        >
                          <div className="relative mb-2 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-[#e9eef0]">
                            {o.image ? (
                              <Image
                                src={o.image}
                                alt={o.name}
                                fill
                                className="object-contain p-1"
                              />
                            ) : (
                              <ComboIcon />
                            )}
                          </div>
                          <span className="text-[13px] font-semibold leading-tight text-ink">
                            {o.name}
                          </span>
                          {o.note && (
                            <span className="text-[11px] text-ink/50">
                              {o.note}
                            </span>
                          )}
                          {o.price ? (
                            <span className="mt-0.5 text-xs font-bold text-ink">
                              +${o.price.toFixed(2)}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                  Notes
                </h3>
                <textarea
                  rows={3}
                  placeholder="What would you like to add to the order?"
                  className="mt-2 w-full rounded-xl border border-[#e5e7eb] p-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Floating footer */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 lg:left-[42%]">
            <div className="pointer-events-auto mx-auto flex items-center gap-3 rounded-full bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
              <div className="flex items-center gap-2 rounded-full border border-[#e5e7eb] px-2 py-1.5">
                <button
                  aria-label={qty === 1 ? "Remove" : "Decrease"}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-7 w-7 items-center justify-center text-ink"
                >
                  {qty === 1 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M5 7h14M9 7V5h6v2M7 7l1 12a2 2 0 002 2h4a2 2 0 002-2l1-12"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="text-xl leading-none">−</span>
                  )}
                </button>
                <span className="w-5 text-center font-semibold">{qty}</span>
                <button
                  aria-label="Increase"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-7 w-7 items-center justify-center text-xl leading-none text-ink"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  cart.add({
                    name: item.name,
                    price: total,
                    image: item.image,
                  });
                  handleClose();
                }}
                className="flex-1 whitespace-nowrap rounded-full bg-brand-button px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
              >
                Add to Cart - ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
