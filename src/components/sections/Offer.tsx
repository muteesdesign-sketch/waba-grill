"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { distressStyle } from "@/lib/distress";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import type { MenuItem } from "@/components/ui/MenuItemCard";

type Offer = {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Name of the real menu product whose PDP opens when the offer is clicked. */
  product: string;
};

const offers: Offer[] = [
  {
    image: "/images/offer-protein.png",
    eyebrow: "Try our offers",
    title: "Fresh of the grill",
    body: "Double up on protein with our Chicken & Shrimp Bowl for just $5 more. Fire-grilled, marinated in-house, and ready to fuel your day.",
    product: "Dual Protein Bowl",
  },
  {
    image: "/images/bowl-steak.png",
    eyebrow: "This week only",
    title: "Steak it up",
    body: "Juicy, in-house marinated steak over fluffy rice and crisp veggies. Bold flavor, grilled to perfection — only for a limited time.",
    product: "Steak Bowl",
  },
  {
    image: "/images/bowl-chicken.png",
    eyebrow: "Fan favorite",
    title: "Classic chicken bowl",
    body: "The bowl that started it all. Grilled chicken, steamed veggies, and our signature WaBa sauce. Always fresh, always delicious.",
    product: "Chicken Bowl",
  },
  {
    image: "/images/bowl-grilled.png",
    eyebrow: "New drop",
    title: "Grilled & glazed",
    body: "Flame-kissed protein with a sweet-savory glaze, piled over a bed of veggies and rice. A new way to crave the grill.",
    product: "Sweet & Spicy Bowl",
  },
  {
    image: "/images/bowl-chicken-steak.png",
    eyebrow: "Best of both",
    title: "Surf, turf & rice",
    body: "Can't choose? Don't. Combine your favorites in one loaded bowl, grilled fresh and packed with bold, Asian-inspired flavor.",
    product: "Shrimp Bowl",
  },
];

// Flat lookup of every product by name so an offer can resolve to its PDP item.
const productByName = new Map<string, MenuItem>(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

export function Offer() {
  const open = useProductModal();

  // Resolve each offer to its real menu item; show the offer's promo image
  // and copy in the card, but open the full product PDP on click.
  const resolved = offers.map((offer) => {
    const product = productByName.get(offer.product);
    const item: MenuItem | null = product
      ? { ...product, image: offer.image }
      : null;
    return { offer, item };
  });

  return (
    <section className="relative overflow-hidden bg-ink pb-10">
      {/* Faint food texture behind the dark fill (50% opacity, per design) */}
      <Image
        src="/images/offer-bg.png"
        alt=""
        fill
        aria-hidden
        className="pointer-events-none object-cover opacity-50"
      />

      <div className="relative mx-auto max-w-[1200px] lg:px-10 lg:py-10">
        <Carousel count={offers.length} controlsTone="onDark" padControls>
          {resolved.map(({ offer, item }) => (
            <article
              key={offer.title}
              data-card
              onClick={() => item && open(item)}
              className="group w-full shrink-0 basis-full cursor-pointer snap-center lg:flex lg:items-center lg:gap-12"
            >
              {/* Full-bleed promo image — zooms slightly on hover */}
              <div className="relative aspect-[1450/1304] w-full overflow-hidden bg-bone lg:w-1/2 lg:rounded-3xl">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text directly on the dark section */}
              <div className="px-5 pt-5 text-white lg:w-1/2 lg:px-0 lg:pt-0">
                <p className="font-script text-[32px] leading-none text-brand">
                  {offer.eyebrow}
                </p>
                <h2
                  className="mt-1 font-display text-[38px] uppercase leading-none"
                  style={distressStyle}
                >
                  {offer.title}
                </h2>
                <p className="mt-4 text-base leading-snug text-bone/85">
                  {offer.body}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item) open(item);
                  }}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-button px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-xl active:translate-y-0 active:scale-[0.97]"
                >
                  View Offer
                </button>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
