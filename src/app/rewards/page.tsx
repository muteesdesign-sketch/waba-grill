import type { Metadata } from "next";
import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { LoyaltyHero } from "@/components/loyalty/LoyaltyHero";
import { HowItWorks } from "@/components/loyalty/HowItWorks";
import { PointsDashboard } from "@/components/loyalty/PointsDashboard";
import { EarnRedeem } from "@/components/loyalty/EarnRedeem";
import { OffersGrid } from "@/components/loyalty/OffersGrid";
import { AccountLinking } from "@/components/loyalty/AccountLinking";

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
        {/* 1. Loyalty overview */}
        <LoyaltyHero />
        <HowItWorks />
        {/* 2. Rewards display (points, tiers, expirations) */}
        <Reveal>
          <PointsDashboard />
        </Reveal>
        {/* 3. Earn / redeem at checkout */}
        <Reveal>
          <EarnRedeem />
        </Reveal>
        {/* 5. Offers / rewards cards */}
        <Reveal>
          <OffersGrid />
        </Reveal>
        {/* 4. Punchh / Thanx login + linking */}
        <Reveal>
          <AccountLinking />
        </Reveal>
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
