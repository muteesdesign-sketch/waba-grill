"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useLoyalty } from "@/components/loyalty/LoyaltyProvider";

function Logo() {
  return (
    <Link href="/" aria-label="WaBa Grill home" className="flex items-center">
      <Image
        src="/images/logo.svg"
        alt="WaBa Grill"
        width={146}
        height={38}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}

const links = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "#" },
  { label: "Catering", href: "#catering" },
  { label: "Franchising", href: "#" },
  { label: "Rewards", href: "/rewards" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cart = useCart();
  const loyalty = useLoyalty();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href.startsWith("/") && pathname.startsWith(href);

  // Shrink the nav ~20% once the page is scrolled to free up screen space.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <nav
        className={`mx-auto flex max-w-[1280px] items-center justify-between px-5 transition-[height] duration-300 lg:px-10 ${
          scrolled ? "h-[70px]" : "h-[88px]"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3 lg:gap-8">
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-8 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className="h-[3px] w-7 rounded-full bg-black" />
            <span className="h-[3px] w-7 rounded-full bg-black" />
            <span className="h-[3px] w-7 rounded-full bg-black" />
          </button>

          <Logo />

          {/* Desktop inline links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative whitespace-nowrap font-display text-lg uppercase leading-none transition-colors ${
                      active ? "text-ink" : "text-ink hover:text-brand-accent"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 right-0 h-[3px] origin-center rounded-full bg-brand transition-transform duration-300 ease-out ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {/* Pickup conveyance (desktop) */}
          <span className="hidden h-[38px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-brand-button px-4 text-sm font-semibold text-ink lg:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                stroke="#ea0028"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.4" stroke="#ea0028" strokeWidth="1.8" />
            </svg>
            Pickup · Today · 12:00pm
          </span>

          {/* Rewards / points (desktop) — always shows the balance when a
              member is signed in, otherwise a sign-in entry point. */}
          <Link
            href="/rewards"
            aria-label={
              loyalty.enrolled
                ? `WaBa Rewards — ${loyalty.points} points`
                : "Sign in to WaBa Rewards"
            }
            className={`relative hidden h-[38px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors lg:flex ${
              loyalty.enrolled
                ? "border-brand-button bg-brand-button text-white hover:bg-brand"
                : "border-brand-button text-ink hover:bg-bone"
            }`}
          >
            {loyalty.enrolled ? (
              <>
                <span aria-hidden>★</span>
                <span className="font-display text-[15px] leading-none">
                  {loyalty.points.toLocaleString()}
                </span>
                pts
                {loyalty.notifications > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-display text-[11px] leading-none text-ink">
                    {loyalty.notifications}
                  </span>
                )}
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.4"
                    stroke="#ea0028"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
                    stroke="#ea0028"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Sign-in
              </>
            )}
          </Link>

          <button
            onClick={() => cart.open()}
            aria-label="Your order"
            className="group flex h-[38px] w-[58px] shrink-0 items-center justify-center gap-1 rounded-full border border-brand-button p-2 text-brand-button transition-colors hover:bg-brand-button hover:text-white"
          >
          {/* Shopping bag — solid/filled */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 7V6a3.5 3.5 0 117 0v1h2.2a1 1 0 011 .9l.9 11A2 2 0 0118.6 21H5.4a2 2 0 01-2-2.1l.9-11a1 1 0 011-.9H8.5zm2 0h3V6a1.5 1.5 0 00-3 0v1z"
            />
          </svg>
          {/* Keyed remount replays the pop animation on every count change */}
          <span
            key={cart.count}
            className="badge-pop flex h-5 w-5 items-center justify-center rounded-full bg-brand-button font-display text-[13px] leading-none text-white group-hover:bg-white group-hover:text-brand-button"
          >
            {cart.count}
          </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 px-5 py-3">
          {/* Points / rewards entry (mobile) */}
          <Link
            href="/rewards"
            onClick={() => setOpen(false)}
            className="mb-2 flex items-center justify-between rounded-xl bg-bone px-4 py-3"
          >
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink">
              <span className="text-brand-accent" aria-hidden>
                ★
              </span>
              {loyalty.enrolled ? "WaBa Rewards" : "Join WaBa Rewards"}
            </span>
            {loyalty.enrolled ? (
              <span className="font-display text-lg leading-none text-ink">
                {loyalty.points.toLocaleString()}{" "}
                <span className="text-sm text-ink/50">pts</span>
              </span>
            ) : (
              <span className="text-sm font-semibold text-brand-accent">
                Sign in
              </span>
            )}
          </Link>
          {loyalty.enrolled && (
            <Link
              href="/rewards"
              onClick={() => setOpen(false)}
              className="mb-2 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-white"
            >
              <span className="text-sm font-semibold">
                {loyalty.activeChallenge.title}
              </span>
              <span className="font-display text-sm">
                {loyalty.activeChallenge.progress}/
                {loyalty.activeChallenge.target}
              </span>
            </Link>
          )}
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-display text-xl uppercase text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
