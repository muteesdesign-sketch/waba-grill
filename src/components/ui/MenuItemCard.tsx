"use client";

import Image from "next/image";
import { useProductModal } from "@/components/pdp/ProductModalProvider";

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

  return (
    <article
      onClick={() => open(item)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white transition-shadow hover:shadow-lg"
    >
      {/* Full-bleed image */}
      <div className="relative aspect-[4/3] w-full">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
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
          className="mt-3 h-11 w-full rounded-full bg-brand-button text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
        >
          Add
        </button>
      </div>
    </article>
  );
}
