import { SectionHeading } from "./SectionHeading";
import { POINTS_PER_DOLLAR } from "./loyalty-data";

const steps = [
  {
    n: "1",
    title: "Order & earn",
    body: `Earn ${POINTS_PER_DOLLAR} points for every $1 spent — in app, online or in store.`,
  },
  {
    n: "2",
    title: "Unlock rewards",
    body: "Points add up to free drinks, sides and bowls. You choose.",
  },
  {
    n: "3",
    title: "Complete challenges",
    body: "Completing challenges gives you the opportunity to earn greater reward perks.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="overview"
      className="scroll-mt-[110px] bg-white px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="How it works" title="Points made simple" />

        {/* 3 steps */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-black/5 bg-bone p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-button font-display text-2xl text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-2xl uppercase text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
