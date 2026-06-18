"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SAMPLE_MEMBER,
  tiers,
  rewardCatalog,
  activeChallenge,
  type Challenge,
  type Offer,
  type Reward,
  type Tier,
} from "./loyalty-data";

export type LinkProvider = "punchh" | "thanx";
export type LinkStatus = "idle" | "linking" | "linked" | "error";

type LoyaltyContextValue = {
  enrolled: boolean;
  setEnrolled: (v: boolean) => void;
  memberName: string;
  points: number;
  tier: Tier;
  nextTier: Tier | null;
  tierProgress: number;
  pointsToNextTier: number;
  /** Cheapest reward the member can't quite afford yet, and the gap. */
  nextReward: Reward | null;
  pointsToNextReward: number;
  /** The challenge surfaced in the nav / checkout. */
  activeChallenge: Challenge;
  /** Count of new rewards/offers/challenge updates → nav notification badge. */
  notifications: number;
  /** A reward the member is using on their next order (item or order-level). */
  selectedReward: Reward | null;
  selectReward: (r: Reward | null) => void;
  /** A cart-level offer applied to the order. */
  selectedOffer: Offer | null;
  selectOffer: (o: Offer | null) => void;
  /** Account-linking simulation (Punchh / Thanx). */
  linkStatus: Record<LinkProvider, LinkStatus>;
  linkAccount: (p: LinkProvider, email: string) => void;
  resetLink: (p: LinkProvider) => void;
};

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

export const useLoyalty = () => {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error("useLoyalty must be used within LoyaltyProvider");
  return ctx;
};

function tierFor(points: number) {
  let current = tiers[0];
  for (const t of tiers) if (points >= t.threshold) current = t;
  const idx = tiers.indexOf(current);
  const next = idx < tiers.length - 1 ? tiers[idx + 1] : null;
  return { current, next };
}

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [enrolled, setEnrolled] = useState(false);
  const [points] = useState(SAMPLE_MEMBER.points);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [linkStatus, setLinkStatus] = useState<
    Record<LinkProvider, LinkStatus>
  >({ punchh: "idle", thanx: "idle" });

  // Persist enrollment + selections across page loads (static export).
  useEffect(() => {
    try {
      if (localStorage.getItem("waba_enrolled") === "1") setEnrolled(true);
      const r = localStorage.getItem("waba_selectedReward");
      if (r) setSelectedReward(JSON.parse(r) as Reward);
      const o = localStorage.getItem("waba_selectedOffer");
      if (o) setSelectedOffer(JSON.parse(o) as Offer);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("waba_enrolled", enrolled ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [enrolled]);
  useEffect(() => {
    try {
      if (selectedReward)
        localStorage.setItem(
          "waba_selectedReward",
          JSON.stringify(selectedReward),
        );
      else localStorage.removeItem("waba_selectedReward");
    } catch {
      /* ignore */
    }
  }, [selectedReward]);
  useEffect(() => {
    try {
      if (selectedOffer)
        localStorage.setItem("waba_selectedOffer", JSON.stringify(selectedOffer));
      else localStorage.removeItem("waba_selectedOffer");
    } catch {
      /* ignore */
    }
  }, [selectedOffer]);

  const { current: tier, next: nextTier } = useMemo(
    () => tierFor(points),
    [points],
  );

  const { tierProgress, pointsToNextTier } = useMemo(() => {
    if (!nextTier) return { tierProgress: 1, pointsToNextTier: 0 };
    const span = nextTier.threshold - tier.threshold;
    const into = points - tier.threshold;
    return {
      tierProgress: Math.min(1, Math.max(0, into / span)),
      pointsToNextTier: Math.max(0, nextTier.threshold - points),
    };
  }, [points, tier, nextTier]);

  const { nextReward, pointsToNextReward } = useMemo(() => {
    const upcoming = [...rewardCatalog]
      .filter((r) => r.points > points)
      .sort((a, b) => a.points - b.points);
    const nr = upcoming[0] ?? null;
    return {
      nextReward: nr,
      pointsToNextReward: nr ? nr.points - points : 0,
    };
  }, [points]);

  const linkAccount = useCallback((p: LinkProvider, email: string) => {
    setLinkStatus((s) => ({ ...s, [p]: "linking" }));
    window.setTimeout(() => {
      const ok =
        email.includes("@") && !email.toLowerCase().includes("mismatch");
      setLinkStatus((s) => ({ ...s, [p]: ok ? "linked" : "error" }));
      if (ok) setEnrolled(true);
    }, 1100);
  }, []);

  const resetLink = useCallback((p: LinkProvider) => {
    setLinkStatus((s) => ({ ...s, [p]: "idle" }));
  }, []);

  const value: LoyaltyContextValue = {
    enrolled,
    setEnrolled,
    memberName: SAMPLE_MEMBER.name,
    points,
    tier,
    nextTier,
    tierProgress,
    pointsToNextTier,
    nextReward,
    pointsToNextReward,
    activeChallenge,
    notifications: 2,
    selectedReward,
    selectReward: setSelectedReward,
    selectedOffer,
    selectOffer: setSelectedOffer,
    linkStatus,
    linkAccount,
    resetLink,
  };

  return (
    <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
  );
}
