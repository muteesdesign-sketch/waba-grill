"use client";

import Image from "next/image";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { badgeForProduct } from "@/components/loyalty/loyalty-data";

export type MenuOption = {
  name: string;
  price?: number;
  image?: string;
  note?: string;
};
export type MenuOptionGroup = {
  title: string;
  required: boolean;
  multi: boolean;
  options: MenuOption[];
};

export type MenuItem = {
  name: string;
  image: string;
  description: string;
  price?: string;
  calories: string;
  badge?: string;
  optionGroups?: MenuOptionGroup[];
};

export function MenuItemCard({ item }: { item: MenuItem }) {
  const open = useProductModal();
  const loyaltyBadge = badgeForProduct(item.name);

  return (
    <article
      onClick={() => open(item)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
    >
      {/* Full-bleed image — gently zooms on hover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {loyaltyBadge && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-button px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            {loyaltyBadge === "2X" ? "2X Rewards" : loyaltyBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        {item.badge && (
          <span className="mb-2 w-fit rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {item.badge}
          </span>
        )}
        <h3 className="line-clamp-2 text-base font-semibold uppercase text-black">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-3 flex-1 text-xs leading-tight text-[#4b5563]">
          {item.description}
        </p>
        <div className="mt-3 flex flex-col leading-tight">
          {item.price && (
            <span className="text-base font-semibold text-black">
              {item.price}
            </span>
          )}
          <span className="text-xs text-[#4b5563]">{item.calories}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            open(item);
          }}
          className="group/add mt-3 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-brand-button text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
        >
          Add
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="-ml-1 w-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover/add:ml-0 group-hover/add:w-4 group-hover/add:translate-x-0 group-hover/add:opacity-100"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
