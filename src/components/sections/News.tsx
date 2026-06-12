import Image from "next/image";
import Link from "next/link";

export function News() {
  return (
    <section id="news" className="bg-white px-5 py-12">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-script text-[32px] leading-none text-brand">
            Latest
          </p>
          <h2 className="relative inline-block font-display text-[64px] uppercase leading-[0.9] text-ink">
            News
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

      <article className="mt-8 overflow-hidden rounded-3xl bg-bone shadow-[0_8px_16px_-2px_rgba(0,0,0,0.08)]">
        <div className="relative h-52">
          <Image
            src="/images/news-donation.png"
            alt="WaBa Cares meal donation boxes"
            fill
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
            Community
          </span>
        </div>
        <div className="px-6 pb-7 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            January 10, 2024
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase leading-none text-ink">
            WaBa Cares donates 10,000 meals
          </h3>
          <p className="mt-2 text-sm text-ink/60">
            Perfectly portioned over rice &amp; veggies.
          </p>
          <Link
            href="#"
            className="mt-4 inline-block text-sm font-semibold text-ink"
          >
            View story →
          </Link>
        </div>
      </article>
    </section>
  );
}
