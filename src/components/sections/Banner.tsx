"use client";

import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import type { MenuItem } from "@/components/ui/MenuItemCard";

// The "Teriyaki Chicken Bowl" promoted in the banner is WaBa's Chicken Bowl
// (grilled chicken caramelized in the signature teriyaki sauce). Clone it under
// the promo name so the PDP header matches the banner copy.
const chickenBowl = menuCategories
  .flatMap((c) => c.items)
  .find((i) => i.name === "Chicken Bowl");
const teriyakiBowl: MenuItem | null = chickenBowl
  ? { ...chickenBowl, name: "Teriyaki Chicken Bowl" }
  : null;

export function Banner() {
  const open = useProductModal();

  return (
    <button
      type="button"
      onClick={() => teriyakiBowl && open(teriyakiBowl)}
      aria-label="New: Teriyaki Chicken Bowl — view item"
      className="group flex w-full items-center justify-center gap-2 bg-brand px-4 py-2 text-bone transition-colors hover:bg-brand-button active:[transform:none]"
    >
      <span className="text-center text-base leading-snug">
        <span className="font-bold">NEW: Teriyaki Chicken Bowl - </span>
        <span className="font-script">Try it today!</span>
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
