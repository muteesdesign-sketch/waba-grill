"use client";

import { useLoyalty } from "./LoyaltyProvider";

/** Demo-only control to preview the page as a guest or a signed-in member.
 *  `tone` adapts the styling to a dark hero or a light section background. */
export function PreviewToggle({
  tone = "onDark",
}: {
  tone?: "onDark" | "onLight";
}) {
  const { enrolled, setEnrolled, previewMember } = useLoyalty();
  const wrap =
    tone === "onDark"
      ? "bg-black/20 text-white backdrop-blur"
      : "bg-ink/5 text-ink";
  const idle =
    tone === "onDark"
      ? "text-white/80 hover:text-white"
      : "text-ink/50 hover:text-ink";
  const active = tone === "onDark" ? "bg-white text-ink" : "bg-ink text-white";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full p-1 text-xs font-bold uppercase tracking-wide ${wrap}`}
    >
      <button
        type="button"
        onClick={() => setEnrolled(false)}
        aria-pressed={!enrolled}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          !enrolled ? active : idle
        }`}
      >
        Guest
      </button>
      <button
        type="button"
        onClick={() => previewMember()}
        aria-pressed={enrolled}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          enrolled ? active : idle
        }`}
      >
        Member
      </button>
    </div>
  );
}
