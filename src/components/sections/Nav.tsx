"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  { label: "Menu", href: "#menu" },
  { label: "Rewards", href: "#rewards" },
  { label: "Catering", href: "#catering" },
  { label: "News", href: "#news" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <nav className="flex h-[88px] items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-8 flex-col items-center justify-center gap-[6px]"
          >
            <span className="h-[3px] w-7 rounded-full bg-black" />
            <span className="h-[3px] w-7 rounded-full bg-black" />
            <span className="h-[3px] w-7 rounded-full bg-black" />
          </button>

          <Logo />
        </div>

        <Link
          href="#"
          aria-label="Your order"
          className="flex h-[38px] w-[58px] items-center justify-center gap-1 rounded-full border border-brand-button p-2 text-brand-button"
        >
          {/* Shopping bag — solid/filled */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 7V6a3.5 3.5 0 117 0v1h2.2a1 1 0 011 .9l.9 11A2 2 0 0118.6 21H5.4a2 2 0 01-2-2.1l.9-11a1 1 0 011-.9H8.5zm2 0h3V6a1.5 1.5 0 00-3 0v1z"
            />
          </svg>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-button font-display text-[13px] leading-none text-white">
            1
          </span>
        </Link>
      </nav>

      {open && (
        <div className="border-t border-black/5 px-5 py-3">
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
