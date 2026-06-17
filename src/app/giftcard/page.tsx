import type { Metadata } from "next";
import Image from "next/image";
import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { distressStyle } from "@/lib/distress";
import {
  GiftcardBuilder,
  BalanceChecker,
} from "@/components/giftcard/GiftcardContent";

export const metadata: Metadata = {
  title: "Gift Cards — WaBa Grill",
  description:
    "Send a WaBa Grill gift card. Pick an amount and design, add a message, and deliver it by email — no fees, never expires.",
};

export default function GiftcardPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Nav />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-ink text-white">
          <Image
            src="/images/offer-bg.png"
            alt=""
            fill
            aria-hidden
            className="pointer-events-none object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand/85 via-black/70 to-black/85" />
          <div className="relative mx-auto max-w-[1280px] px-6 py-14 text-center lg:px-10 lg:py-20">
            <p className="font-script text-[34px] leading-none text-white lg:text-[44px]">
              Give the grill
            </p>
            <h1
              className="mt-1 font-display text-[52px] uppercase leading-[0.9] lg:text-[80px]"
              style={distressStyle}
            >
              WaBa gift cards
            </h1>
            <p className="mx-auto mt-5 max-w-[520px] text-base leading-relaxed text-white/85 lg:text-lg">
              The perfect gift for any bowl lover. Pick an amount, add a message,
              and we&apos;ll deliver it by email — no fees, never expires.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="#buy" className="py-4 sm:px-9">
                Buy a gift card
              </Button>
              <Button href="#balance" variant="outline" className="py-4 sm:px-9">
                Check balance
              </Button>
            </div>
          </div>
        </section>

        <GiftcardBuilder />
        <Reveal>
          <BalanceChecker />
        </Reveal>
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
