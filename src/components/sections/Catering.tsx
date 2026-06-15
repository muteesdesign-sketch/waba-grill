import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { distressStyle } from "@/lib/distress";

export function Catering() {
  return (
    <section
      id="catering"
      className="relative overflow-hidden bg-ink text-white"
    >
      <Image
        src="/images/catering-bg.png"
        alt="A catering spread of WaBa Grill dishes"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/90" />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-2 pt-12 lg:px-10 lg:pb-0 lg:pt-24">
        <div className="lg:max-w-[640px]">
          <p className="font-script text-[32px] leading-none text-brand lg:text-[40px]">
            WaBa catering
          </p>
          <h2
            className="mt-1 font-display text-[38px] uppercase leading-[1.05] lg:text-[64px]"
            style={distressStyle}
          >
            Bring the grill to your gatherings
          </h2>
          <p className="mt-4 max-w-[320px] text-sm leading-relaxed text-white/85 lg:max-w-[460px] lg:text-base">
            Perfect for office meetings, parties, or family get-togethers.
            Fresh, healthy, and customizable packages that everyone will love.
          </p>

          <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:gap-4">
            <Button
              href="#"
              variant="primary"
              className="w-full py-4 lg:w-auto lg:px-10"
            >
              Order Catering
            </Button>
            <Button
              href="#menu"
              variant="outline"
              className="w-full py-4 lg:w-auto lg:px-10"
            >
              View Menu
            </Button>
          </div>
        </div>

        {/* Oversized cut-off word — Janeiro */}
        <p className="-mb-4 mt-6 select-none overflow-hidden font-fat text-[64px] uppercase leading-none tracking-tight text-white/15 lg:-mb-8 lg:mt-10 lg:text-[200px]">
          Catering
        </p>
      </div>
    </section>
  );
}
