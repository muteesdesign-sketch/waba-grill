import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { distressStyle } from "@/lib/distress";

export function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden lg:h-[720px]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={asset("/images/hero-bg.jpg")}
      >
        <source src={asset("/hero.mp4")} type="video/mp4" />
      </video>
      {/* Dark overlay (stronger on the left for desktop legibility) */}
      <div className="absolute inset-0 bg-black/50 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/45 lg:to-black/20" />

      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-6 text-white lg:px-10">
        <p className="mb-1 font-script text-[32px] leading-none text-brand lg:text-[44px]">
          We serve
        </p>
        <h1
          className="font-display text-[64px] uppercase leading-[0.92] lg:text-[104px]"
          style={distressStyle}
        >
          Fresh.
          <br />
          <span className="text-brand">Grilled.</span>
          <br />
          Delicious.
        </h1>
        <p className="mt-5 max-w-[300px] text-base font-medium leading-snug text-white/90 lg:mt-6 lg:max-w-[420px] lg:text-lg">
          Bold, healthy, Asian-inspired bowls crafted to fuel your body and
          satisfy your cravings.
        </p>

        <div className="mt-7 flex flex-col gap-3 lg:mt-9 lg:flex-row lg:gap-4">
          <Button
            href="/menu"
            variant="primary"
            className="w-full py-4 lg:w-auto lg:px-10"
          >
            Start an Order
          </Button>
          <Button
            href="/menu"
            variant="light"
            className="w-full py-4 lg:w-auto lg:px-10"
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
