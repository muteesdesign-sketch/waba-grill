import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "light" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-brand-button text-white hover:bg-brand hover:shadow-xl",
  light: "bg-white text-ink hover:bg-bone hover:shadow-xl",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-ink active:bg-white/90",
};

export function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wide shadow-lg transition active:scale-[0.97] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
