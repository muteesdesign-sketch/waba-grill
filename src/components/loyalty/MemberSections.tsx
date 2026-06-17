"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLoyalty } from "./LoyaltyProvider";
import { PointsDashboard } from "./PointsDashboard";
import { EarnRedeem } from "./EarnRedeem";
import { OffersGrid } from "./OffersGrid";

/**
 * Member-only experience layered onto the marketing structure. Guests see just
 * the Header / How it works / Download App scaffold; signed-in members get
 * their points dashboard, redemption flow and offers.
 */
export function MemberSections() {
  const { enrolled } = useLoyalty();
  if (!enrolled) return null;
  return (
    <>
      <Reveal>
        <PointsDashboard />
      </Reveal>
      <Reveal>
        <EarnRedeem />
      </Reveal>
      <Reveal>
        <OffersGrid />
      </Reveal>
    </>
  );
}
