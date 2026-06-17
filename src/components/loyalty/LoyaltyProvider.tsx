"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SAMPLE_MEMBER,
  tiers,
  type Reward,
  type Tier,
} from "./loyalty-data";

export type LinkProvider = "punchh" | "thanx";
export type LinkStatus = "idle" | "linking" | "linked" | "error";

type LoyaltyContextValue = {
  /** Guest vs. signed-in member (no real auth — toggled in the UI for preview). */
  enrolled: boolean;
  setEnrolled: (v: boolean) => void;
  memberName: string;
  points: number;
  tier: Tier;
  nextTier: Tier | null;
  /** 0–1 progress toward the next tier. */
  tierProgress: number;
  pointsToNextTier: number;
  /** The reward the member has chosen to use on their next order. */
  selectedReward: Reward | null;
  selectReward: (r: Reward | null) => void;
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
  const [linkStatus, setLinkStatus] = useState<
    Record<LinkProvider, LinkStatus>
  >({ punchh: "idle", thanx: "idle" });

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

  const linkAccount = useCallback((p: LinkProvider, email: string) => {
    setLinkStatus((s) => ({ ...s, [p]: "linking" }));
    // Simulate an async link with a deterministic mismatch case so the error
    // path is demonstrable: any address containing "mismatch" fails.
    window.setTimeout(() => {
      const ok = email.includes("@") && !email.toLowerCase().includes("mismatch");
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
    selectedReward,
    selectReward: setSelectedReward,
    linkStatus,
    linkAccount,
    resetLink,
  };

  return (
    <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
  );
}
