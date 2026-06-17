// Loyalty model for the WaBa Rewards page. Mirrors the WaBa Rewards mobile app
// (points per dollar, redeemable freebies, birthday reward) with a light tier
// system inspired by Chipotle Rewards and Core Life Eatery rewards.

export type Tier = {
  name: string;
  threshold: number; // annual points to reach this tier
  blurb: string;
  perks: string[];
};

export type Reward = {
  id: string;
  name: string;
  points: number; // 0 = earned offer (not point-redeemed)
  value: number; // dollar discount applied to the order when redeemed
  desc: string;
  image?: string;
  expires?: string; // absolute date string
  eligibility?: string;
};

export type Offer = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  eligibility: string;
  cta: string;
  image?: string;
  members?: boolean;
};

// Earn rate — 10 points for every $1 spent, matching the WaBa Rewards app.
export const POINTS_PER_DOLLAR = 10;

export const tiers: Tier[] = [
  {
    name: "Grill Starter",
    threshold: 0,
    blurb: "Welcome aboard — start earning from your very first bowl.",
    perks: [
      "10 points for every $1 spent",
      "Free drink welcome reward",
      "Members-only offers",
    ],
  },
  {
    name: "Grill Pro",
    threshold: 1000,
    blurb: "You're a regular now. Bigger perks, faster rewards.",
    perks: [
      "Everything in Grill Starter",
      "Free birthday bowl",
      "Early access to limited-time drops",
    ],
  },
  {
    name: "Grill Master",
    threshold: 2500,
    blurb: "Top tier. The grill bows to you.",
    perks: [
      "Everything in Grill Pro",
      "Bonus double-point weekends",
      "Surprise reward every quarter",
    ],
  },
];

// Catalog of point-redeemable rewards (what you can spend points on).
export const rewardCatalog: Reward[] = [
  {
    id: "free-drink",
    name: "Free Drink",
    points: 1250,
    value: 3.29,
    desc: "Any fountain drink or bottled beverage, on us.",
    image: "/images/bowl-grilled.png",
  },
  {
    id: "free-side",
    name: "Free Side",
    points: 1800,
    value: 3.99,
    desc: "Add a side of your choice at no charge.",
    image: "/images/offer-protein.png",
  },
  {
    id: "free-bowl",
    name: "Free Bowl",
    points: 2500,
    value: 10.19,
    desc: "Any signature bowl — chicken, steak, tofu or veggie.",
    image: "/images/bowl-chicken.png",
  },
  {
    id: "free-plate",
    name: "Free Plate",
    points: 3000,
    value: 12.19,
    desc: "Go big with a loaded plate, completely free.",
    image: "/images/bowl-chicken-steak.png",
  },
];

// Rewards the sample member has already unlocked, with clear expirations.
export const memberRewards: Reward[] = [
  {
    id: "welcome-drink",
    name: "Welcome Reward · Free Drink",
    points: 0,
    value: 3.29,
    desc: "Thanks for joining! Redeem on any order.",
    image: "/images/bowl-grilled.png",
    expires: "Jul 15, 2026",
  },
  {
    id: "birthday-bowl",
    name: "Birthday Bowl",
    points: 0,
    value: 10.19,
    desc: "A free signature bowl during your birthday month.",
    image: "/images/bowl-chicken.png",
    expires: "Jun 30, 2026",
    eligibility: "Birthday month only",
  },
  {
    id: "free-side-earned",
    name: "Free Side",
    points: 0,
    value: 3.99,
    desc: "Redeemed from your points — ready to use.",
    image: "/images/offer-protein.png",
    expires: "Aug 1, 2026",
  },
];

// Promotional offers to browse (eligibility varies).
export const offers: Offer[] = [
  {
    id: "double-points",
    tag: "Limited time",
    title: "Double Points Weekend",
    desc: "Earn 2x points on every order all weekend long.",
    eligibility: "App & web orders · Jun 20–22, 2026",
    cta: "Activate offer",
    image: "/images/bowl-steak.png",
  },
  {
    id: "chips-drink",
    tag: "Spend & save",
    title: "Free Chips & Drink",
    desc: "Add chips and a drink free on orders of $15 or more.",
    eligibility: "One per order · pickup or dine-in",
    cta: "Apply offer",
    image: "/images/offer-protein.png",
  },
  {
    id: "refer",
    tag: "Refer a friend",
    title: "Give $5, Get 500 points",
    desc: "Share your code — they save, you earn.",
    eligibility: "New customers only",
    cta: "Invite friends",
    image: "/images/bowl-grilled.png",
  },
  {
    id: "birthday",
    tag: "Members only",
    title: "Birthday Bowl",
    desc: "A free signature bowl during your birthday month.",
    eligibility: "Verified birthday on file required",
    cta: "Add birthday",
    image: "/images/bowl-chicken.png",
    members: true,
  },
];

// Sample member snapshot (stands in for a signed-in WaBa Rewards account).
export const SAMPLE_MEMBER = {
  name: "Juan",
  points: 1840,
  lifetimePoints: 4120,
};
