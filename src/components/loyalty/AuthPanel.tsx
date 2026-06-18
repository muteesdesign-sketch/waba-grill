"use client";

import { useState } from "react";
import { useLoyalty } from "./LoyaltyProvider";
import { LinkPanel } from "./AccountLinking";

type Mode = "login" | "signup";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#000" aria-hidden>
      <path d="M16.37 12.78c.02 2.5 2.19 3.33 2.22 3.34-.02.06-.35 1.2-1.15 2.37-.69 1.02-1.41 2.03-2.55 2.05-1.11.02-1.47-.66-2.75-.66-1.27 0-1.67.64-2.72.68-1.09.04-1.93-1.1-2.63-2.11-1.42-2.06-2.51-5.83-1.05-8.37.72-1.27 2.02-2.07 3.42-2.09 1.07-.02 2.09.72 2.75.72.66 0 1.9-.89 3.2-.76.55.02 2.08.22 3.07 1.67-.08.05-1.83 1.07-1.81 3.16M14.28 5.39c.58-.71.98-1.69.87-2.67-.84.03-1.86.56-2.47 1.26-.54.62-1.02 1.62-.89 2.58.94.07 1.9-.47 2.49-1.17" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08V12h3.05V9.41c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 17.99 24 12z" />
    </svg>
  );
}

const inputCls =
  "w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none";

function SocialButton({
  icon,
  label,
  onClick,
  busy,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  busy: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-black/15 bg-white text-sm font-bold text-ink transition-colors hover:bg-bone disabled:opacity-60"
    >
      <span aria-hidden>{icon}</span>
      {label}
    </button>
  );
}

export function AuthPanel({ initialMode = "signup" }: { initialMode?: Mode }) {
  const { setEnrolled } = useLoyalty();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const finish = () => window.setTimeout(() => setEnrolled(true), 900);
  const social = (provider: string) => {
    setError("");
    setBusy(provider);
    finish();
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "signup" && !form.first.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setBusy("email");
    finish();
  };
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (showLink) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setShowLink(false)}
          className="mb-5 text-sm font-bold uppercase tracking-wide text-brand-accent hover:underline"
        >
          ← Back to sign in
        </button>
        <h2 className="font-display text-2xl uppercase text-ink">
          Link a partner account
        </h2>
        <p className="mb-6 mt-1 text-sm text-ink/70">
          Already earning with Punchh or Thanx? Bring your points across.
        </p>
        <LinkPanel />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[460px]">
      {/* Mode toggle */}
      <div className="mb-6 inline-flex w-full rounded-full bg-bone p-1">
        {(["login", "signup"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError("");
            }}
            className={`flex-1 rounded-full py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
              mode === m ? "bg-brand-button text-white" : "text-ink/70 hover:text-ink"
            }`}
          >
            {m === "login" ? "Log in" : "Sign up"}
          </button>
        ))}
      </div>

      <h2 className="font-display text-3xl uppercase text-ink">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h2>
      <p className="mt-1 text-sm text-ink/70">
        {mode === "login"
          ? "Sign in to track points, redeem rewards and order ahead."
          : "Join WaBa Rewards and earn points on your very first order."}
      </p>

      {/* Social sign-in */}
      <div className="mt-6 space-y-3">
        <SocialButton icon={<GoogleIcon />} label="Continue with Google" onClick={() => social("google")} busy={!!busy} />
        <SocialButton icon={<AppleIcon />} label="Continue with Apple" onClick={() => social("apple")} busy={!!busy} />
        <SocialButton icon={<FacebookIcon />} label="Continue with Facebook" onClick={() => social("facebook")} busy={!!busy} />
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-black/10" />
        <span className="text-xs font-bold uppercase tracking-wide text-ink/40">
          or with email
        </span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      {/* Email / password */}
      <form className="space-y-3" onSubmit={submit}>
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-3">
            <input className={inputCls} placeholder="First name" value={form.first} onChange={set("first")} />
            <input className={inputCls} placeholder="Last name" value={form.last} onChange={set("last")} />
          </div>
        )}
        <input className={inputCls} type="email" placeholder="Email address" value={form.email} onChange={set("email")} />
        <input className={inputCls} type="password" placeholder="Password" value={form.password} onChange={set("password")} />

        {mode === "login" && (
          <div className="text-right">
            <button type="button" className="text-xs font-semibold text-brand-accent hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        {error && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-brand-accent">
            <span aria-hidden>⚠</span>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!!busy}
          className="h-12 w-full rounded-full bg-brand-button text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-70"
        >
          {busy
            ? "Please wait…"
            : mode === "login"
              ? "Log in"
              : "Create account"}
        </button>
      </form>

      {mode === "signup" && (
        <p className="mt-3 text-center text-[11px] leading-snug text-ink/50">
          By creating an account you agree to WaBa Grill&apos;s Terms of Use and
          Privacy Policy.
        </p>
      )}

      <p className="mt-5 text-center text-sm text-ink/70">
        {mode === "login" ? "New to WaBa Rewards?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-bold text-brand-accent hover:underline"
        >
          {mode === "login" ? "Create one" : "Log in"}
        </button>
      </p>

      <div className="mt-4 border-t border-black/5 pt-4 text-center">
        <button
          type="button"
          onClick={() => setShowLink(true)}
          className="text-xs font-semibold text-ink/60 hover:text-ink"
        >
          Have a Punchh or Thanx account? Link it instead →
        </button>
      </div>
    </div>
  );
}
