import { SectionHeading } from "./SectionHeading";
import { tiers, POINTS_PER_DOLLAR } from "./loyalty-data";

const steps = [
  {
    n: "1",
    title: "Order & earn",
    body: `Earn ${POINTS_PER_DOLLAR} points for every $1 spent — in app, online or in store.`,
  },
  {
    n: "2",
    title: "Unlock rewards",
    body: "Points add up to free drinks, sides, bowls and plates. You choose.",
  },
  {
    n: "3",
    title: "Climb the tiers",
    body: "The more you order each year, the bigger the perks you keep.",
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
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent font-display text-2xl text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-2xl uppercase text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Tier ladder */}
        <div className="mt-14">
          <h3 className="text-center font-display text-3xl uppercase text-ink lg:text-4xl">
            Three tiers, more to love
          </h3>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  i === 1
                    ? "border-brand-accent bg-white shadow-xl lg:-translate-y-2"
                    : "border-black/10 bg-white shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl uppercase text-ink">
                    {t.name}
                  </span>
                  <span className="rounded-full bg-bone px-3 py-1 text-xs font-bold text-ink/70">
                    {t.threshold === 0
                      ? "Start here"
                      : `${t.threshold.toLocaleString()}+ pts / yr`}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink/70">{t.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-sm text-ink"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white"
                      >
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
