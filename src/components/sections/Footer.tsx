import Image from "next/image";
import Link from "next/link";

const explore = [
  "Menu",
  "Locations",
  "Catering",
  "Rewards",
  "Gift Cards",
  "Do not sell",
  "Nutrition and allergies",
];

const about = [
  "Our Story",
  "WaBa Cares",
  "News",
  "Careers",
  "Franchising",
  "Contact Us",
];

const socials = ["Instagram", "Facebook", "Twitter", "TikTok", "YouTube"];

function FooterLogo() {
  return (
    <Image
      src="/images/logo-white.svg"
      alt="WaBa Grill"
      width={200}
      height={52}
      className="h-12 w-auto"
    />
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-lg uppercase tracking-wide text-white">
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item}>
            <Link href="#" className="text-sm text-white/80 hover:text-white">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-12 text-white lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="lg:flex lg:justify-between lg:gap-12">
          {/* Brand + newsletter */}
          <div className="lg:max-w-sm">
            <FooterLogo />
            <p className="mt-4 max-w-[320px] text-sm leading-relaxed text-white/70">
              Fresh, grilled-to-order meals designed to nourish your body and
              satisfy your cravings.
            </p>

            <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-white">
              Subscribe to our newsletter
            </p>
            <form className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-full bg-white px-5 py-3.5 text-sm text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-button px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="mt-10 flex flex-col gap-9 sm:flex-row sm:gap-16 lg:mt-0 lg:gap-24">
            <FooterColumn title="Explore" items={explore} />
            <FooterColumn title="About Us" items={about} />
          </div>
        </div>

        <hr className="my-9 border-white/15" />

        {/* Socials + legal */}
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <Link
                key={s}
                href="#"
                aria-label={s}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-ink hover:bg-bone"
              >
                {s[0]}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2.5 text-sm lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link href="#" className="font-semibold text-white/90 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="font-semibold text-white/90 hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="font-semibold text-white/90 hover:text-white">
              Accessibility
            </Link>
            <p className="text-xs text-white/50 lg:ml-4">
              © 2026 WaBa Grill. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
