import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { distressStyle } from "@/lib/distress";

export function Rewards() {
  return (
    <section className="relative overflow-hidden bg-brand px-4 py-6 lg:px-10 lg:py-16" id="rewards">
      {/* Red palm-tree background, anchored at the bottom (shows around the card) */}
      <Image
        src="/images/rewards-bg.png"
        alt=""
        width={1440}
        height={725}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
      />

      {/* White halftone card holding all the content */}
      <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[28px] bg-white shadow-xl">
        {/* Subtle halftone dot texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#d8d8d8_1.4px,transparent_1.4px)] opacity-50 [background-size:14px_14px]" />

        <div className="relative lg:flex lg:items-center lg:gap-10 lg:p-12">
          {/* Two phones (already on a halftone panel) */}
          <Image
            src="/images/rewards-panel.png"
            alt="WaBa Grill rewards app on two phones"
            width={350}
            height={338}
            className="h-auto w-full lg:w-1/2"
          />

          <div className="px-6 pb-9 text-center lg:w-1/2 lg:px-0 lg:pb-0 lg:text-left">
            <p className="font-script text-[32px] leading-none text-brand">
              Earn free food
            </p>
            <h2 className="relative inline-block font-display text-[50px] uppercase leading-[0.9] text-ink">
              <span style={distressStyle}>It&apos;s that simple.</span>
              <Image
                src="/images/brush.png"
                alt=""
                width={230}
                height={9}
                aria-hidden
                className="absolute -bottom-2 left-1/2 h-auto w-[85%] -translate-x-1/2 lg:left-0 lg:translate-x-0"
              />
            </h2>
            <p className="mx-auto mt-6 max-w-[320px] text-[15px] leading-relaxed text-[#4b5563] lg:mx-0 lg:max-w-[440px] lg:text-base">
              Join WaBa Rewards to earn points on every order, get exclusive
              offers, and celebrate your birthday with a special treat on us.
            </p>

            <Button href="#" variant="primary" className="mt-7 w-full py-4 lg:w-auto lg:px-10">
              Log in to view rewards
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
