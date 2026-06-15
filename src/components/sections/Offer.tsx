import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { distressStyle } from "@/lib/distress";

type Offer = {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
};

const offers: Offer[] = [
  {
    image: "/images/offer-protein.png",
    eyebrow: "Try our offers",
    title: "Fresh of the grill",
    body: "Double up on protein with our Chicken & Shrimp Bowl for just $5 more. Fire-grilled, marinated in-house, and ready to fuel your day.",
  },
  {
    image: "/images/bowl-steak.png",
    eyebrow: "This week only",
    title: "Steak it up",
    body: "Juicy, in-house marinated steak over fluffy rice and crisp veggies. Bold flavor, grilled to perfection — only for a limited time.",
  },
  {
    image: "/images/bowl-chicken.png",
    eyebrow: "Fan favorite",
    title: "Classic chicken bowl",
    body: "The bowl that started it all. Grilled chicken, steamed veggies, and our signature WaBa sauce. Always fresh, always delicious.",
  },
  {
    image: "/images/bowl-grilled.png",
    eyebrow: "New drop",
    title: "Grilled & glazed",
    body: "Flame-kissed protein with a sweet-savory glaze, piled over a bed of veggies and rice. A new way to crave the grill.",
  },
  {
    image: "/images/bowl-chicken-steak.png",
    eyebrow: "Best of both",
    title: "Surf, turf & rice",
    body: "Can't choose? Don't. Combine your favorites in one loaded bowl, grilled fresh and packed with bold, Asian-inspired flavor.",
  },
];

export function Offer() {
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
          {offers.map((offer) => (
            <article
              key={offer.title}
              data-card
              className="w-full shrink-0 basis-full snap-center lg:flex lg:items-center lg:gap-12"
            >
              {/* Full-bleed promo image */}
              <div className="relative aspect-[1450/1304] w-full bg-bone lg:w-1/2 lg:rounded-3xl lg:overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
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
                <Button href="#menu" className="mt-5 w-full py-4">
                  View Offers
                </Button>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
