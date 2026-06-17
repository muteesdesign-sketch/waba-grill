import Image from "next/image";
import { distressStyle } from "@/lib/distress";

/**
 * Shared section heading for the loyalty page — script eyebrow, distressed
 * display headline and the brand brush underline, matching the homepage.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  tone = "ink",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  tone?: "ink" | "white";
}) {
  const headColor = tone === "white" ? "text-white" : "text-ink";
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="font-script text-[28px] leading-none text-brand lg:text-[32px]">
        {eyebrow}
      </p>
      <h2
        className={`relative inline-block font-display text-[36px] uppercase leading-[0.9] lg:text-[52px] ${headColor}`}
      >
        <span style={distressStyle}>{title}</span>
        <Image
          src="/images/brush.png"
          alt=""
          width={230}
          height={9}
          aria-hidden
          className={`absolute -bottom-2 h-auto w-[80%] ${
            align === "center"
              ? "left-1/2 -translate-x-1/2"
              : "left-0"
          }`}
        />
      </h2>
    </div>
  );
}
