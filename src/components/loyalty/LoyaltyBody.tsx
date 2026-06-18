"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLoyalty } from "./LoyaltyProvider";
import { LoyaltyHub } from "./LoyaltyHub";
import { HowItWorks } from "./HowItWorks";
import { IncentiveTypes } from "./IncentiveTypes";

/**
 * Switches the Loyalty Hub body by auth state:
 * - Member  → the tabbed hub (Rewards / Offers / Challenges)
 * - Guest   → education (how it works + the three incentive types)
 */
export function LoyaltyBody() {
  const { enrolled } = useLoyalty();
  if (enrolled) {
    return (
      <Reveal>
        <LoyaltyHub />
      </Reveal>
    );
  }
  return (
    <>
      <HowItWorks />
      <Reveal>
        <IncentiveTypes />
      </Reveal>
    </>
  );
}
