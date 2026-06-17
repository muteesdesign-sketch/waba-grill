import Image from "next/image";
import { distressStyle } from "@/lib/distress";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/waba-rewards/id1417925959";
const PLAY_STORE_URL =
  "https://play.google.com/store/search?q=WaBa%20Rewards&c=apps";

function StoreBadge({
  href,
  kicker,
  store,
  icon,
}: {
  href: string;
  kicker: string;
  store: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-ink px-5 py-3 text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 active:scale-[0.98]"
    >
      <span aria-hidden className="shrink-0">
        {icon}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/70">
          {kicker}
        </span>
        <span className="block font-display text-lg uppercase">{store}</span>
      </span>
    </a>
  );
}

export function DownloadApp() {
  return (
    <section
      id="download-app"
      className="relative overflow-hidden bg-brand px-6 py-14 lg:px-10 lg:py-20"
    >
      {/* Red palm-tree backdrop, anchored at the bottom */}
      <Image
        src="/images/rewards-bg.png"
        alt=""
        width={1440}
        height={725}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
      />

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-10 lg:flex-row lg:gap-14">
        <Image
          src="/images/rewards-panel.png"
          alt="WaBa Rewards app shown on two phones"
          width={350}
          height={338}
          className="h-auto w-full max-w-[420px] lg:w-1/2"
        />

        <div className="text-center text-white lg:w-1/2 lg:text-left">
          <p className="font-script text-[30px] leading-none text-white lg:text-[36px]">
            WaBa Rewards app
          </p>
          <h2
            className="mt-1 font-display text-[40px] uppercase leading-[0.9] lg:text-[56px]"
            style={distressStyle}
          >
            Take your rewards to go
          </h2>
          <p className="mx-auto mt-4 max-w-[440px] text-base leading-relaxed text-white/90 lg:mx-0">
            Track your points, redeem rewards and order ahead from anywhere.
            Download the WaBa Rewards app and never miss a free bowl.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <StoreBadge
              href={APP_STORE_URL}
              kicker="Download on the"
              store="App Store"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.37 12.78c.02 2.5 2.19 3.33 2.22 3.34-.02.06-.35 1.2-1.15 2.37-.69 1.02-1.41 2.03-2.55 2.05-1.11.02-1.47-.66-2.75-.66-1.27 0-1.67.64-2.72.68-1.09.04-1.93-1.1-2.63-2.11-1.42-2.06-2.51-5.83-1.05-8.37.72-1.27 2.02-2.07 3.42-2.09 1.07-.02 2.09.72 2.75.72.66 0 1.9-.89 3.2-.76.55.02 2.08.22 3.07 1.67-.08.05-1.83 1.07-1.81 3.16M14.28 5.39c.58-.71.98-1.69.87-2.67-.84.03-1.86.56-2.47 1.26-.54.62-1.02 1.62-.89 2.58.94.07 1.9-.47 2.49-1.17" />
                </svg>
              }
            />
            <StoreBadge
              href={PLAY_STORE_URL}
              kicker="Get it on"
              store="Google Play"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.6 2.3c-.2.2-.3.5-.3.9v17.6c0 .4.1.7.3.9l.1.1L13.5 12v-.1L3.7 2.2l-.1.1M17 15.3l-3.3-3.3v-.1L17 8.6l4 2.3c1.1.6 1.1 1.7 0 2.4L17 15.3M3.6 21.8c.4.4.9.4 1.6.1l11.3-6.4-3.3-3.3-9.6 9.6" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
