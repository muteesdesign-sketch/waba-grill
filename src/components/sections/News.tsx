import Image from "next/image";
import Link from "next/link";
import { distressStyle } from "@/lib/distress";

type Article = {
  tag: string;
  date: string;
  title: string;
  blurb?: string;
  image: string;
};

const featured: Article = {
  tag: "Community",
  date: "January 10, 2024",
  title: "WaBa Cares donates 10,000 meals",
  blurb: "Perfectly portioned over rice & veggies.",
  image: "/images/news-donation.png",
};

const more: Article[] = [
  {
    tag: "Menu Updates",
    date: "February 28, 2024",
    title: "New plant-based options arrive",
    image: "/images/bowl-grilled.png",
  },
  {
    tag: "Community",
    date: "January 10, 2024",
    title: "2024 Entrepreneur's Franchise 500®",
    image: "/images/bowl-chicken.png",
  },
  {
    tag: "Community",
    date: "January 10, 2024",
    title: "WaBa Grill opens Nevada location",
    image: "/images/catering-bg.png",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
      {label}
    </span>
  );
}

function SmallCard({ item }: { item: Article }) {
  return (
    <article className="flex gap-4 border-b border-black/10 pb-4 last:border-0">
      <div className="relative h-[100px] w-[150px] shrink-0 overflow-hidden rounded-xl">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
          {item.tag}
        </span>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {item.date}
        </p>
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
  return (
    <section id="news" className="bg-white px-5 py-12 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-start justify-between">
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
          <Link
            href="#"
            className="mt-2 border-b-2 border-brand pb-0.5 text-sm font-semibold text-ink"
          >
            View All News →
          </Link>
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Featured card */}
          <article className="overflow-hidden rounded-3xl bg-bone shadow-[0_8px_16px_-2px_rgba(0,0,0,0.08)]">
            <div className="relative h-52 lg:h-80">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
              <Tag label={featured.tag} />
            </div>
            <div className="px-6 pb-7 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {featured.date}
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase leading-none text-ink lg:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm text-ink/60">{featured.blurb}</p>
              <Link
                href="#"
                className="mt-4 inline-block text-sm font-semibold text-ink"
              >
                View story →
              </Link>
            </div>
          </article>

          {/* Side list — shown from lg up */}
          <div className="mt-6 hidden flex-col gap-4 lg:mt-0 lg:flex">
            {more.map((item) => (
              <SmallCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
