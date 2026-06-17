"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { useLoyalty, type LinkProvider } from "./LoyaltyProvider";

const PROVIDERS: { id: LinkProvider; name: string; blurb: string }[] = [
  {
    id: "punchh",
    name: "Punchh",
    blurb: "Link an existing Punchh account to sync your points history.",
  },
  {
    id: "thanx",
    name: "Thanx",
    blurb: "Connect Thanx to bring your rewards and offers across.",
  },
];

function ProviderCard({ id, name, blurb }: (typeof PROVIDERS)[number]) {
  const { linkStatus, linkAccount, resetLink } = useLoyalty();
  const [email, setEmail] = useState("");
  const status = linkStatus[id];

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl uppercase text-ink">{name}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            status === "linked"
              ? "bg-brand/10 text-brand-accent"
              : "bg-bone text-ink/60"
          }`}
        >
          {status === "linked" ? "Linked ✓" : "Not linked"}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink/70">{blurb}</p>

      {status === "linked" ? (
        <div className="mt-5 rounded-2xl border border-brand-accent bg-brand/5 p-4">
          <p className="text-sm font-semibold text-ink">
            <span className="text-brand-accent">★</span> Your {name} account is
            connected.
          </p>
          <p className="mt-1 text-xs text-ink/70">
            Points and offers will sync automatically.
          </p>
          <button
            type="button"
            onClick={() => resetLink(id)}
            className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-accent hover:underline"
          >
            Unlink
          </button>
        </div>
      ) : (
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            linkAccount(id, email);
          }}
        >
          <label className="block text-xs font-bold uppercase tracking-wide text-ink/60">
            Account email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") resetLink(id);
            }}
            placeholder="you@email.com"
            aria-invalid={status === "error"}
            className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none ${
              status === "error"
                ? "border-brand-accent focus:border-brand-accent"
                : "border-[#e5e7eb] focus:border-brand"
            }`}
          />

          {status === "error" && (
            <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-brand-accent">
              <span aria-hidden>⚠</span>
              We couldn&apos;t match that {name} account. Check the email or
              create a new WaBa Rewards account instead.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "linking"}
            className="mt-4 h-11 w-full rounded-full bg-brand-accent text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-70"
          >
            {status === "linking" ? "Linking…" : `Link ${name} account`}
          </button>
          <p className="mt-2 text-center text-[11px] text-ink/50">
            Tip: try an email containing &ldquo;mismatch&rdquo; to see the error
            state.
          </p>
        </form>
      )}
    </div>
  );
}

/** The provider cards + create-account note, reusable inside the header. */
export function LinkPanel() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {PROVIDERS.map((p) => (
          <ProviderCard key={p.id} {...p} />
        ))}
      </div>
      <div className="mx-auto mt-6 max-w-[560px] rounded-2xl border border-dashed border-black/15 bg-bone p-5 text-center">
        <p className="text-sm text-ink/70">
          Don&apos;t have an account with either?{" "}
          <span className="font-bold text-ink">Create a free account</span> and
          start earning on your next order.
        </p>
      </div>
    </div>
  );
}

export function AccountLinking() {
  return (
    <section
      id="link-account"
      className="scroll-mt-[110px] bg-white px-6 py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="Sign in" title="Connect your account" />
        <p className="mx-auto mt-4 mb-10 max-w-[540px] text-center text-sm text-ink/70">
          New to WaBa Rewards? Linking takes a second. Already have points with a
          partner program? Bring them along.
        </p>
        <LinkPanel />
      </div>
    </section>
  );
}
