"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLoyalty } from "./LoyaltyProvider";
import { LoyaltyHub } from "./LoyaltyHub";
import { HowItWorks } from "./HowItWorks";
import { IncentiveTypes } from "./IncentiveTypes";
import { RewardsCarousel } from "./RewardsCarousel";

/**
 * Switches the Loyalty Hub body by auth state:
 * - Member  → featured carousel + the tabbed hub (Rewards / Offers / Challenges)
 * - Guest   → featured carousel + education (how it works + incentive types)
 */
export function LoyaltyBody() {
  const { enrolled } = useLoyalty();
  return (
    <>
      <Reveal>
        <RewardsCarousel />
      </Reveal>
      {enrolled ? (
        <Reveal>
          <LoyaltyHub />
        </Reveal>
      ) : (
        <>
          <HowItWorks />
          <Reveal>
            <IncentiveTypes />
          </Reveal>
        </>
      )}
    </>
  );
}
