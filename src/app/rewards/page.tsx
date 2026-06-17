import type { Metadata } from "next";
import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { LoyaltyHero } from "@/components/loyalty/LoyaltyHero";
import { HowItWorks } from "@/components/loyalty/HowItWorks";
import { MemberSections } from "@/components/loyalty/MemberSections";
import { DownloadApp } from "@/components/loyalty/DownloadApp";

export const metadata: Metadata = {
  title: "Rewards — WaBa Grill",
  description:
    "Join WaBa Rewards: earn points on every order, unlock free bowls, drinks and sides, climb tiers and redeem rewards at checkout.",
};

export default function RewardsPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Nav />
      <main>
        {/* Header — overview + Register Now (Punchh) */}
        <LoyaltyHero />
        {/* How it works */}
        <HowItWorks />
        {/* Member-only: points, redeem & offers (hidden for guests) */}
        <MemberSections />
        {/* Download App */}
        <Reveal>
          <DownloadApp />
        </Reveal>
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
