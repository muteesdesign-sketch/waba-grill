import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
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
      {/* Black overlay at 50% opacity */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex h-full flex-col justify-center px-6 text-white">
        <p className="mb-1 font-script text-[32px] leading-none text-brand">
          We serve
        </p>
        <h1 className="font-display text-[64px] uppercase leading-[0.92]">
          Fresh.
          <br />
          <span className="text-brand">Grilled.</span>
          <br />
          Delicious.
        </h1>
        <p className="mt-5 max-w-[300px] text-base font-medium leading-snug text-white/90">
          Bold, healthy, Asian-inspired bowls crafted to fuel your body and
          satisfy your cravings.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Button href="#menu" variant="primary" className="w-full py-4">
            Start an Order
          </Button>
          <Button href="#menu" variant="light" className="w-full py-4">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
