"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "./SectionHeading";
import { useLoyalty } from "./LoyaltyProvider";
import { useCart } from "@/components/cart/CartProvider";
import { useProductModal } from "@/components/pdp/ProductModalProvider";
import { menuCategories } from "@/app/menu/menu-data";
import type { MenuItem } from "@/components/ui/MenuItemCard";
import { offers, rewardCatalog } from "./loyalty-data";

const productByName = new Map<string, MenuItem>(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i] as const)),
);

export function RewardsCarousel() {
  const { enrolled, activeChallenge, selectOffer } = useLoyalty();
  const cart = useCart();
  const openPDP = useProductModal();
  const router = useRouter();

  const freeBowl = rewardCatalog.find((r) => r.id === "free-bowl");
  const bogo = offers.find((o) => o.id === "bowl-drink");
  const chickenBowl = productByName.get("Chicken Bowl");

  const slides = [
    {
      type: "Challenges",
      title: "Play & earn bonuses",
      desc: "Hit goals like an order streak to earn bonus points. The more you come back, the more you unlock.",
      image: "/images/bowl-steak.png",
      badge: activeChallenge.rewardText.replace("bonus points", "pts"),
      offerLabel: activeChallenge.goal,
      memberCta: "View challenge",
      memberAction: () => {
        document
          .getElementById("loyalty-hub")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      type: "Rewards",
      title: "Free food, on your points",
      desc: "Earn 10 points for every $1 you spend and cash them in for free drinks, sides and bowls.",
      image: freeBowl?.image ?? "/images/bowl-chicken.png",
      badge: `${freeBowl?.points ?? 350} pts`,
      offerLabel: freeBowl?.name ?? "Free Bowl",
      memberCta: "Redeem a reward",
      memberAction: () => {
        if (chickenBowl) openPDP(chickenBowl);
        else router.push("/menu");
      },
    },
    {
      type: "Offers",
      title: "Limited-time deals",
      desc: "Members unlock rotating offers — 2X points, BOGO bowls and more, always with a clear expiry.",
      image: bogo?.image ?? "/images/bowl-grilled.png",
      badge: bogo?.badge ?? "BOGO",
      offerLabel: bogo?.title ?? "Buy a Bowl, Get a Free Drink",
      memberCta: "Apply offer",
      memberAction: () => {
        if (bogo) selectOffer(bogo);
        cart.open();
      },
    },
  ];

  return (
    <section className="bg-white px-5 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="Explore the program"
          title="Rewards, offers & challenges"
        />
        <div className="mt-8">
          <Carousel count={slides.length} padControls>
            {slides.map((s) => (
              <div
                key={s.type}
                data-card
                className="w-full shrink-0 basis-full snap-center px-1"
              >
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm lg:flex">
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full bg-bone lg:aspect-auto lg:w-1/2">
                    <Image
                      src={s.image}
                      alt={s.offerLabel}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      {s.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-3 p-7 lg:w-1/2 lg:p-10">
                    <p className="font-script text-[26px] leading-none text-brand">
                      {s.type}
                    </p>
                    <h3 className="font-display text-3xl uppercase leading-[0.95] text-ink lg:text-4xl">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/70 lg:text-base">
                      {s.desc}
                    </p>

                    {/* The offer */}
                    <div className="flex items-center gap-3 rounded-xl bg-bone px-4 py-3">
                      <span className="flex h-9 shrink-0 items-center rounded-lg bg-brand-button px-3 font-display text-sm uppercase text-white">
                        {s.badge}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {s.offerLabel}
                      </span>
                    </div>

                    {/* CTA — register (guests) or go to the offer (members) */}
                    {enrolled ? (
                      <button
                        type="button"
                        onClick={s.memberAction}
                        className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-brand-button px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
                      >
                        {s.memberCta}
                      </button>
                    ) : (
                      <a
                        href="#header"
                        className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-brand-button px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
                      >
                        Join to unlock
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
