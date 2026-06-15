"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MenuItem } from "@/components/ui/MenuItemCard";

type Option = { name: string; note?: string; price?: number };
type Group = {
  title: string;
  required?: boolean;
  multi?: boolean;
  hint: string;
  options: Option[];
};

// Representative option groups (mirrors the WaBa Grill PDP design).
const GROUPS: Group[] = [
  {
    title: "Choose your meal",
    hint: "Select 1 option",
    options: [{ name: "Make it a combo", note: "Bowl + drink", price: 6.99 }],
  },
  {
    title: "Choice of rice",
    required: true,
    hint: "Select 1 option",
    options: [
      { name: "White rice" },
      { name: "Brown rice" },
      { name: "Half white rice, half brown rice" },
    ],
  },
  {
    title: "Choice of sauce",
    required: true,
    hint: "Select 1 option",
    options: [
      { name: "Waba sauce" },
      { name: "Garlic serrano sauce" },
      { name: "Sweet chili sauce" },
      { name: "Boom boom sauce" },
      { name: "No sauce" },
    ],
  },
  {
    title: "Want more?",
    multi: true,
    hint: "Optional",
    options: [{ name: "Extra Shrimp", note: "New", price: 3.99 }],
  },
  {
    title: "Add-ons and options",
    multi: true,
    hint: "Optional",
    options: [
      { name: "Avocado", price: 2.61 },
      { name: "Side of green onion" },
      { name: "Side of jalapeño & carrots mix" },
      { name: "Side of wonton strips", price: 0.79 },
      { name: "Easy Sauce" },
    ],
  },
  {
    title: "Utensils",
    required: true,
    hint: "Select 1 option",
    options: [{ name: "Utensils" }, { name: "No utensils" }],
  },
];

const TAGS = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"];

function parsePrice(p?: string) {
  if (!p) return 0;
  const n = parseFloat(p.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function ProductModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);
  // selected[groupIndex] = array of selected option names
  const [selected, setSelected] = useState<Record<number, string[]>>({});

  // Mount/enter animation + reset state per item
  useEffect(() => {
    if (item) {
      setQty(1);
      setSelected({});
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

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 250);
  };

  const toggle = (gi: number, group: Group, name: string) => {
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

  const optionsTotal = GROUPS.reduce((sum, g, gi) => {
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
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel: bottom drawer on mobile, centered modal on desktop */}
      <div className="absolute inset-0 flex items-end justify-center lg:items-center lg:p-6">
        <div
          className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all duration-300 lg:max-h-[88vh] lg:max-w-[960px] lg:rounded-2xl ${
            show
              ? "translate-y-0 lg:scale-100 lg:opacity-100"
              : "translate-y-full lg:translate-y-0 lg:scale-95 lg:opacity-0"
          }`}
        >
          {/* Close button */}
          <button
            aria-label="Close"
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-button text-white shadow-md"
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

          {/* Scroll area */}
          <div className="flex-1 overflow-y-auto lg:flex lg:overflow-hidden">
            {/* Left: image + info */}
            <div className="lg:w-[42%] lg:shrink-0 lg:overflow-y-auto">
              <div className="relative aspect-square w-full bg-bone">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="px-5 py-5">
                <h2 className="font-display text-3xl uppercase leading-none text-ink">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  {item.description}
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  {item.price && (
                    <span className="text-lg font-bold text-ink">
                      {item.price}
                    </span>
                  )}
                  {item.calories && (
                    <span className="text-sm text-ink/50">{item.calories}</span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#e5e7eb] px-3 py-1 text-xs font-medium text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: options */}
            <div className="border-t border-black/5 px-5 py-5 lg:flex-1 lg:overflow-y-auto lg:border-l lg:border-t-0">
              {GROUPS.map((group, gi) => (
                <div key={group.title} className="mb-7">
                  <h3 className="text-base font-bold text-ink">
                    {group.title}{" "}
                    {group.required && (
                      <span className="text-sm font-semibold text-brand">
                        (Required)
                      </span>
                    )}
                  </h3>
                  <p className="mb-3 text-xs text-ink/50">{group.hint}</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {group.options.map((o) => {
                      const isSel = (selected[gi] ?? []).includes(o.name);
                      return (
                        <button
                          key={o.name}
                          onClick={() => toggle(gi, group, o.name)}
                          className={`flex flex-col rounded-xl border-2 p-3 text-left transition-colors ${
                            isSel
                              ? "border-brand bg-brand/5"
                              : "border-[#e5e7eb] hover:border-ink/30"
                          }`}
                        >
                          <span className="text-sm font-semibold text-ink">
                            {o.name}
                          </span>
                          {o.note && (
                            <span className="text-[11px] uppercase tracking-wide text-brand">
                              {o.note}
                            </span>
                          )}
                          {o.price ? (
                            <span className="mt-1 text-xs text-ink/60">
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
                <h3 className="text-base font-bold text-ink">Notes</h3>
                <textarea
                  rows={3}
                  placeholder="What would you like to add to the order?"
                  className="mt-2 w-full rounded-xl border border-[#e5e7eb] p-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 border-t border-black/10 px-5 py-4">
            <div className="flex items-center gap-3 rounded-full border border-[#e5e7eb] px-3 py-2">
              <button
                aria-label="Decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-xl leading-none text-ink"
              >
                −
              </button>
              <span className="w-5 text-center font-semibold">{qty}</span>
              <button
                aria-label="Increase"
                onClick={() => setQty((q) => q + 1)}
                className="text-xl leading-none text-ink"
              >
                +
              </button>
            </div>
            <button
              onClick={handleClose}
              className="flex-1 rounded-full bg-brand-button px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
            >
              Add to Cart · ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
