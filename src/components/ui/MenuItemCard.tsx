import Image from "next/image";
import { Button } from "./Button";

export type MenuItem = {
  name: string;
  image: string;
  description: string;
  price?: string;
  calories: string;
  badge?: string;
};

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
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
        <h3 className="text-base font-semibold uppercase text-black">
          {item.name}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-tight text-[#4b5563]">
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
        <Button href="#" className="mt-3 h-11 w-full py-0">
          Add
        </Button>
      </div>
    </article>
  );
}
