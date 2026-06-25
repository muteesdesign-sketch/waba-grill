import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";

const types = [
  {
    tag: "Rewards",
    title: "Earn points, eat free",
    body: "Every $1 earns 10 points. Cash them in for free drinks, sides, bowls and plates. Points never expire.",
    icon: "/images/icons/bowls.svg",
  },
  {
    tag: "Offers",
    title: "Limited-time deals",
    body: "Members unlock rotating offers — 2X point weekends, BOGO bowls, % off and more. Always with a clear expiry.",
    icon: "/images/icons/drinks.svg",
  },
  {
    tag: "Challenges",
    title: "Play & earn bonuses",
    body: "Order streaks and goals that pay out bonus points. The more you come back, the more you unlock.",
    icon: "/images/icons/intuitive.svg",
  },
];

export function IncentiveTypes() {
  return (
    <section className="bg-bone px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="How it pays off" title="Three ways to win" />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {types.map((t) => (
            <div
              key={t.tag}
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-7 shadow-sm"
            >
              <Image
                src={t.icon}
                alt=""
                aria-hidden
                width={52}
                height={83}
                className="h-[72px] w-auto"
              />
              <span className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-accent">
                {t.tag}
              </span>
              <h3 className="mt-1 font-display text-2xl uppercase text-ink">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-ink px-7 py-8 text-white lg:flex-row lg:px-10">
          <div className="text-center lg:text-left">
            <h3 className="font-display text-2xl uppercase lg:text-3xl">
              Join free — start earning today
            </h3>
            <p className="mt-1 text-sm text-white/75">
              It takes a second. Your first reward is waiting on your very first
              order.
            </p>
          </div>
          <Button href="#header" className="shrink-0 py-4 lg:px-10">
            Register now
          </Button>
        </div>
      </div>
    </section>
  );
}
