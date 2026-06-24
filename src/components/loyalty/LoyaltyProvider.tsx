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
  rewardCatalog,
  challenges as baseChallenges,
  type Challenge,
  type Offer,
  type Reward,
} from "./loyalty-data";

/** Pull a points value out of a challenge reward string ("+300 bonus points"). */
function bonusPoints(rewardText: string): number {
  const m = rewardText.replace(/,/g, "").match(/(\d+)\s*(?:bonus\s*)?points/i);
  return m ? Number(m[1]) : 0;
}

export type LinkProvider = "punchh" | "thanx";
export type LinkStatus = "idle" | "linking" | "linked" | "error";

type LoyaltyContextValue = {
  enrolled: boolean;
  setEnrolled: (v: boolean) => void;
  /** Create a brand-new account (0 points, challenges reset). */
  signUp: (name?: string) => void;
  /** Restore the established demo member (returning customer). */
  previewMember: () => void;
  memberName: string;
  points: number;
  /** Cheapest reward the member can't quite afford yet, and the gap. */
  nextReward: Reward | null;
  pointsToNextReward: number;
  /** Challenges with live progress (advanced as orders are placed). */
  challenges: Challenge[];
  /** The challenge surfaced in the nav / checkout. */
  activeChallenge: Challenge;
  /** Advance the active challenge by one order; awards bonus points on finish.
   *  Returns the result so the UI can celebrate completion. */
  recordOrder: (earned?: number) => {
    challenge: Challenge;
    completed: boolean;
    awarded: number;
  };
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

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [enrolled, setEnrolled] = useState(false);
  const [points, setPoints] = useState(SAMPLE_MEMBER.points);
  const [memberName, setMemberName] = useState(SAMPLE_MEMBER.name);
  // Per-challenge progress overlay on top of the base data (id → progress).
  const [progressById, setProgressById] = useState<Record<string, number>>({});
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
      const p = localStorage.getItem("waba_points_v2");
      if (p) setPoints(Number(p));
      const cp = localStorage.getItem("waba_challengeProgress_v2");
      if (cp) setProgressById(JSON.parse(cp) as Record<string, number>);
      const nm = localStorage.getItem("waba_memberName");
      if (nm) setMemberName(nm);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("waba_points_v2", String(points));
      localStorage.setItem(
        "waba_challengeProgress_v2",
        JSON.stringify(progressById),
      );
    } catch {
      /* ignore */
    }
  }, [points, progressById]);
  useEffect(() => {
    try {
      localStorage.setItem("waba_enrolled", enrolled ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [enrolled]);
  useEffect(() => {
    try {
      localStorage.setItem("waba_memberName", memberName);
    } catch {
      /* ignore */
    }
  }, [memberName]);
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

  // Challenges with live progress merged in.
  const challenges = useMemo<Challenge[]>(
    () =>
      baseChallenges.map((c) => ({
        ...c,
        progress: Math.min(c.target, progressById[c.id] ?? c.progress),
      })),
    [progressById],
  );
  const activeChallenge = challenges[0];

  // Placing an order credits the points earned on the order, advances the
  // active challenge, and awards bonus points when the challenge completes.
  const recordOrder = useCallback(
    (earned = 0) => {
      const base = baseChallenges[0];
      const prev = Math.min(base.target, progressById[base.id] ?? base.progress);
      const next = Math.min(base.target, prev + 1);
      const justCompleted = prev < base.target && next >= base.target;
      const awarded = justCompleted ? bonusPoints(base.rewardText) : 0;
      setProgressById((m) => ({ ...m, [base.id]: next }));
      const credited = earned + awarded;
      if (credited) setPoints((p) => p + credited);
      return {
        challenge: { ...base, progress: next },
        completed: next >= base.target,
        awarded,
      };
    },
    [progressById],
  );

  // A fresh sign-up starts a brand-new account: no points yet and every
  // challenge at zero, so the first order genuinely kicks things off.
  const signUp = useCallback((name?: string) => {
    if (name && name.trim()) setMemberName(name.trim());
    setPoints(0);
    setProgressById(
      Object.fromEntries(baseChallenges.map((c) => [c.id, 0] as const)),
    );
    setEnrolled(true);
  }, []);

  // Preview the established demo member (returning customer with history).
  const previewMember = useCallback(() => {
    setMemberName(SAMPLE_MEMBER.name);
    setPoints(SAMPLE_MEMBER.points);
    setProgressById({});
    setEnrolled(true);
  }, []);

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
    signUp,
    previewMember,
    memberName,
    points,
    nextReward,
    pointsToNextReward,
    challenges,
    activeChallenge,
    recordOrder,
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
