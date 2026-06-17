"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { distressStyle } from "@/lib/distress";

type Article = {
  tag: string;
  date: string;
  title: string;
  blurb: string;
  image: string;
};

const articles: Article[] = [
  {
    tag: "Community",
    date: "January 10, 2024",
    title: "WaBa Cares Donates 10,000 Meals",
    blurb: "Perfectly portioned over rice & veggies.",
    image: "/images/news-donation.png",
  },
  {
    tag: "Menu Updates",
    date: "February 28, 2024",
    title: "New Plant-Based Options Arrive",
    blurb: "Plant-forward bowls, big on flavor.",
    image: "/images/bowl-grilled.png",
  },
  {
    tag: "Community",
    date: "January 10, 2024",
    title: "2024 Entrepreneur's Franchise 500®",
    blurb: "WaBa Grill, Sunny California became home to WaBa Grill.",
    image: "/images/bowl-chicken.png",
  },
  {
    tag: "Community",
    date: "January 10, 2024",
    title: "WaBa Grill Opens Nevada Location",
    blurb: "The opening marks first of 10 restaurants.",
    image: "/images/catering-bg.png",
  },
  {
    tag: "Menu Updates",
    date: "December 15, 2023",
    title: "Fresh Flavors, Bold New Bowls",
    blurb: "Our chefs cooked up something special.",
    image: "/images/bowl-steak.png",
  },
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkButton({ label }: { label: string }) {
  return (
    <Link
      href="#"
      className="inline-flex items-center gap-2 border-b-2 border-brand pb-2 text-base font-bold text-ink"
    >
      {label}
      <Arrow />
    </Link>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-sm text-ink shadow-md">
      {label}
    </span>
  );
}

/** Full news card (used in the mobile carousel). */
function NewsCard({ item }: { item: Article }) {
  return (
    <article
      data-card
      className="flex w-full shrink-0 basis-full snap-center flex-col gap-4"
    >
      <div className="relative h-[330px] overflow-hidden rounded-2xl">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
        <div className="absolute left-4 top-4">
          <Tag label={item.tag} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-brand-accent">{item.date}</p>
        <h3 className="mt-1 font-display text-[38px] uppercase leading-none text-ink">
          {item.title}
        </h3>
        <p className="mt-2 text-lg text-ink/80">{item.blurb}</p>
        <div className="mt-5">
          <LinkButton label="View story" />
        </div>
      </div>
    </article>
  );
}

/** Compact horizontal card (used in the desktop side list). */
function SmallCard({ item }: { item: Article }) {
  return (
    <article className="flex gap-4 border-b border-black/10 pb-4 last:border-0">
      <div className="relative h-[100px] w-[150px] shrink-0 overflow-hidden rounded-xl">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] text-ink shadow">
          {item.tag}
        </span>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-brand-accent">{item.date}</p>
        <h3 className="mt-1 font-display text-xl uppercase leading-none text-ink">
          {item.title}
        </h3>
        <Link href="#" className="mt-auto pt-2 text-sm font-semibold text-ink">
          View story →
        </Link>
      </div>
    </article>
  );
}

export function News() {
  const featured = articles[0];

  return (
    <section id="news" className="bg-white px-5 py-12 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Heading row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-script text-[32px] leading-none text-brand">
              Latest
            </p>
            <h2 className="relative inline-block font-display text-[64px] uppercase leading-[0.9] text-ink">
              <span style={distressStyle}>News</span>
              <Image
                src="/images/brush.png"
                alt=""
                width={230}
                height={9}
                aria-hidden
                className="absolute -bottom-2 left-0 h-auto w-full"
              />
            </h2>
          </div>
          <LinkButton label="View All News" />
        </div>

        {/* Mobile: carousel of full cards */}
        <div className="mt-8 lg:hidden">
          <Carousel count={articles.length}>
            {articles.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </Carousel>
        </div>

        {/* Desktop: featured + side list */}
        <div className="mt-8 hidden lg:grid lg:grid-cols-2 lg:gap-8">
          <article className="overflow-hidden rounded-3xl bg-bone shadow-[0_8px_16px_-2px_rgba(0,0,0,0.08)]">
            <div className="relative h-80">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
              <div className="absolute left-4 top-4">
                <Tag label={featured.tag} />
              </div>
            </div>
            <div className="px-6 pb-7 pt-5">
              <p className="text-sm font-medium text-brand-accent">{featured.date}</p>
              <h3 className="mt-2 font-display text-4xl uppercase leading-none text-ink">
                {featured.title}
              </h3>
              <p className="mt-2 text-ink/70">{featured.blurb}</p>
              <div className="mt-4">
                <LinkButton label="View story" />
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-4">
            {articles.slice(1, 4).map((item) => (
              <SmallCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
