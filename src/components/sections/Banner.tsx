export function Banner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-brand px-4 py-2 text-bone">
      <p className="text-center text-base leading-snug">
        <span className="font-bold">NEW: Teriyaki Chicken Bowl - </span>
        <span className="font-script">Try it today!</span>
      </p>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
