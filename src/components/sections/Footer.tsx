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

const socials: { name: string; path: string }[] = [
  {
    name: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.05A6.75 6.75 0 1018.75 12 6.75 6.75 0 0012 5.25zm0 11.13A4.38 4.38 0 1116.38 12 4.38 4.38 0 0112 16.38zm6.99-11.4a1.58 1.58 0 11-1.58-1.58 1.58 1.58 0 011.58 1.58z",
  },
  {
    name: "Facebook",
    path: "M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z",
  },
  {
    name: "Twitter",
    path: "M18.9 2.5h3.3l-7.2 8.24L23.7 21.5h-6.63l-5.2-6.8-5.94 6.8H2.63l7.7-8.8L2 2.5h6.8l4.7 6.21zm-1.16 17h1.83L8.34 4.4H6.38z",
  },
  {
    name: "TikTok",
    path: "M16.6 5.82a4.28 4.28 0 01-1.01-2.82h-3.1v12.4a2.59 2.59 0 11-1.84-2.48V9.74a5.7 5.7 0 105.34 5.69V9.01a7.3 7.3 0 004.27 1.36V7.27a4.28 4.28 0 01-3.66-1.45z",
  },
  {
    name: "YouTube",
    path: "M23.5 6.5a3 3 0 00-2.12-2.12C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.52A3 3 0 00.5 6.5 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.5 3 3 0 002.12 2.12C4.5 20.14 12 20.14 12 20.14s7.5 0 9.38-.52a3 3 0 002.12-2.12A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.5zM9.6 15.6V8.4l6.2 3.6z",
  },
];

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
                key={s.name}
                href="#"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-bone"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d={s.path} />
                </svg>
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
