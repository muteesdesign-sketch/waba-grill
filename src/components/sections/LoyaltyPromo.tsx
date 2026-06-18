"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoyalty } from "@/components/loyalty/LoyaltyProvider";
import { useCart } from "@/components/cart/CartProvider";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import type { MenuItem } from "@/components/ui/MenuItemCard";
import { offers, type Offer } from "@/components/loyalty/loyalty-data";

const productByName = new Map<string, MenuItem>(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

export function LoyaltyPromo() {
  const { enrolled, points } = useLoyalty();
  const cart = useCart();
  const openPDP = useProductModal();
  const router = useRouter();

  const doOffer = (o: Offer) => {
    if (o.ctaTarget === "cart") cart.open();
    else if (o.ctaTarget === "pdp" && o.productName) {
      const p = productByName.get(o.productName);
      if (p) openPDP(p);
      else router.push("/menu");
    } else router.push("/menu");
  };

  const featured = offers.slice(0, 3);

  return (
    <section className="bg-bone px-5 py-10 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-script text-[26px] leading-none text-brand lg:text-[30px]">
              {enrolled ? "Your rewards & offers" : "WaBa Rewards"}
            </p>
            <h2 className="font-display text-3xl uppercase text-ink lg:text-4xl">
              {enrolled ? "Deals waiting for you" : "Members get more"}
            </h2>
          </div>
          <a
            href="/rewards"
            className="rounded-full border border-brand-button px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-accent transition-colors hover:bg-brand-button hover:text-white"
          >
            {enrolled
              ? `★ ${points.toLocaleString()} pts · View hub`
              : "Join to unlock"}
          </a>
        </div>

        <div className="no-scrollbar mt-7 flex gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {featured.map((o) => (
            <article
              key={o.id}
              className="flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm lg:w-auto"
            >
              <div className="relative aspect-[16/9] w-full bg-bone">
                {o.image && (
                  <Image src={o.image} alt={o.title} fill className="object-cover" />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-brand-button px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {o.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-lg uppercase leading-tight text-ink">
                  {o.title}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-ink/70">
                  {o.desc}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-brand-accent">
                  Expires {o.expires}
                </p>
                <button
                  type="button"
                  onClick={() => doOffer(o)}
                  className="mt-3 h-10 w-full rounded-full bg-brand-button text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
                >
                  {o.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
