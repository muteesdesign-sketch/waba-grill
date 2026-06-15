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
    <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21s-7-4.35-9.5-8.5C.8 9.6 2.2 6 5.5 6 7.4 6 8.8 7 12 9.5 15.2 7 16.6 6 18.5 6c3.3 0 4.7 3.6 3 6.5C19 16.65 12 21 12 21z" />
        </svg>
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[11px] font-bold uppercase tracking-wide text-ink">
          WaBa Cares
        </span>
        <span className="block text-[11px] text-ink/55">
          Community health commitment
        </span>
      </span>
    </span>
  );
}

export function Community() {
  return (
    <section className="bg-white">
      {/* Full-bleed photo with the floating badge */}
      <div className="relative h-[320px] w-full">
        <Image
          src="/images/community.png"
          alt="WaBa Grill team volunteering in the community"
          fill
          className="object-cover"
        />
        <div className="absolute left-5 top-5">
          <WabaCaresBadge />
        </div>
      </div>

      {/* White content area with subtle halftone */}
      <div className="relative px-5 pb-12 pt-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#ededed_1.3px,transparent_1.3px)] opacity-60 [background-size:14px_14px]" />

        <div className="relative">
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
      </div>
    </section>
  );
}
