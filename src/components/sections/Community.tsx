import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { distressStyle } from "@/lib/distress";

const commitments = [
  "Supporting local food banks and shelters",
  "Fundraising for neighborhood schools",
  "Commitment to sustainable packaging",
];

function GreenCheck() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="mt-0.5 shrink-0"
      aria-hidden
    >
      <circle cx="12" cy="12" r="11" fill="#16a34a" />
      <path
        d="M7 12.3l3.2 3.2L17 8.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WabaCaresBadge() {
  return (
    <span className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 20.5s-6.5-4-8.8-7.9C1.5 9.5 2.9 6.2 6 6.2c1.8 0 3.1 1 4.5 3 1.4-2 2.7-3 4.5-3 3.1 0 4.5 3.3 2.8 6.4C18.5 16.5 12 20.5 12 20.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold uppercase tracking-wide text-ink">
          WaBa Cares
        </span>
        <span className="block whitespace-nowrap text-xs text-ink/55">
          Community health commitment
        </span>
      </span>
    </span>
  );
}

export function Community() {
  return (
    <section className="relative overflow-hidden bg-bone">
      {/* Halftone dot texture across the whole section */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#e2e2e2_1.3px,transparent_1.3px)] opacity-70 [background-size:16px_16px]" />

      <div className="relative px-7 pb-12 pt-6">
        {/* Rounded photo card with the badge sticking out top-right */}
        <div className="relative mb-9">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]">
            <Image
              src="/images/community.png"
              alt="WaBa Grill team volunteering in the community"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 top-8">
            <WabaCaresBadge />
          </div>
        </div>

        <p className="font-script text-[32px] leading-none text-brand">
          Giving back to
        </p>
        <h2 className="relative inline-block font-display text-[50px] uppercase leading-[0.9] text-ink">
          <span style={distressStyle}>Our Community</span>
          <Image
            src="/images/brush.png"
            alt=""
            width={230}
            height={9}
            aria-hidden
            className="absolute -bottom-2 left-0 h-auto w-full"
          />
        </h2>

        <p className="mt-5 text-[15px] leading-relaxed text-[#4b5563]">
          At WaBa Grill, we believe that eating better goes hand-in-hand with
          living better. Through our WaBa Cares initiative, we partner with
          local charities, schools, and organizations to nourish the
          communities we serve.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {commitments.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px]">
              <GreenCheck />
              <span className="text-ink">{item}</span>
            </li>
          ))}
        </ul>

        <Button href="#" variant="primary" className="mt-8 w-full py-4">
          Learn more about WaBa Cares
        </Button>
      </div>
    </section>
  );
}
