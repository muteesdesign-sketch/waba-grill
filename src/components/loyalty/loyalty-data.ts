// WaBa Loyalty model — three incentive types (Rewards, Offers, Challenges)
// per the loyalty program recommendations. Rewards are earned by spend and
// don't expire; Offers are campaign-based and time-limited; Challenges gamify
// repeat ordering.
import { menuCategories } from "@/app/menu/menu-data";

// Real product photos, keyed by product name — so rewards/offers show the
// actual menu image instead of a generic placeholder.
const menuImageByName = new Map<string, string | undefined>(
  menuCategories.flatMap((c) => c.items.map((i) => [i.name, i.image] as const)),
);
export const imageForProduct = (name: string): string | undefined =>
  menuImageByName.get(name);

// ---- Rewards (point-redeemable, never expire) -----------------------------
// kind "item"  → redeeming opens the relevant product detail page
// kind "order" → redeeming opens the cart and applies an order-level discount
export type Reward = {
  id: string;
  name: string;
  points: number; // cost in points (0 = already-granted/earned reward)
  value: number; // dollar value applied to the order
  kind: "item" | "order";
  desc: string;
  image?: string;
  productName?: string; // for item rewards → which PDP to open
  eligibility?: string;
};

// ---- Offers (campaign-based, time-limited) --------------------------------
export type OfferKind = "item" | "cart" | "multiplier" | "bogo";
export type Offer = {
  id: string;
  badge: string; // short label shown on menu cards / PDP, e.g. "50% OFF", "2X"
  title: string;
  desc: string;
  kind: OfferKind;
  expires: string; // absolute date string — always shown
  auto: boolean; // auto-applied vs. needs to be selected
  eligibility: string;
  cta: string;
  ctaTarget: "menu" | "pdp" | "cart";
  value?: number; // dollar discount (cart offers)
  multiplier?: number; // points multiplier (multiplier offers)
  category?: string; // menu category id the offer applies to
  productName?: string; // specific product the offer applies to
  image?: string;
  members?: boolean;
};

// ---- Challenges (gamified, progress-based) --------------------------------
export type Challenge = {
  id: string;
  title: string;
  goal: string;
  rewardText: string;
  timeframe: string;
  progress: number;
  target: number;
  nextAction: string;
  kind: "count" | "streak";
};

export const POINTS_PER_DOLLAR = 10;

// Catalog of point-redeemable rewards.
export const rewardCatalog: Reward[] = [
  {
    id: "free-drink",
    name: "Free Drink",
    points: 150,
    value: 3.29,
    kind: "item",
    desc: "Any fountain drink or bottled beverage, on us.",
    image: imageForProduct("Fountain Beverage"),
    productName: "Fountain Beverage",
  },
  {
    id: "free-side",
    name: "Free Side",
    points: 200,
    value: 3.99,
    kind: "item",
    desc: "Add a side of your choice at no charge.",
    image: imageForProduct("Side Salad"),
    productName: "Side Salad",
  },
  {
    id: "five-off",
    name: "$5 Off Your Order",
    points: 250,
    value: 5,
    kind: "order",
    desc: "Take $5 off any order — applied in your cart.",
    image: imageForProduct("Dual Protein Bowl"),
  },
  {
    id: "free-bowl",
    name: "Free Bowl",
    points: 350,
    value: 10.19,
    kind: "item",
    desc: "Any signature bowl — the top reward. Chicken, steak, tofu or veggie.",
    image: imageForProduct("Chicken Bowl"),
    productName: "Chicken Bowl",
  },
];

// Rewards the sample member has already unlocked (ready to use now).
export const memberRewards: Reward[] = [
  {
    id: "welcome-drink",
    name: "Welcome Reward · Free Drink",
    points: 0,
    value: 3.29,
    kind: "item",
    desc: "Thanks for joining! Redeem on any order.",
    image: imageForProduct("Fountain Beverage"),
    productName: "Fountain Beverage",
  },
  {
    id: "birthday-bowl",
    name: "Birthday Bowl",
    points: 0,
    value: 10.19,
    kind: "item",
    desc: "A free signature bowl during your birthday month.",
    image: imageForProduct("Chicken Bowl"),
    productName: "Chicken Bowl",
    eligibility: "Birthday month only",
  },
  {
    id: "five-off-earned",
    name: "$5 Off Your Order",
    points: 0,
    value: 5,
    kind: "order",
    desc: "Redeemed from your points — applied at checkout.",
    image: imageForProduct("Steak Bowl"),
  },
];

// Rewards the member has already redeemed (tangible value received).
export const redeemedRewards: { name: string; date: string; value: number }[] = [
  { name: "Free Drink", date: "May 2, 2026", value: 3.29 },
  { name: "Free Side", date: "Apr 18, 2026", value: 3.99 },
  { name: "$5 Off Your Order", date: "Mar 30, 2026", value: 5 },
];

// Campaign offers (time-limited). Badges surface on menu cards / PDP.
export const offers: Offer[] = [
  {
    id: "dumplings-50",
    badge: "50% OFF",
    title: "50% Off Dumplings",
    desc: "Half off any order of dumplings — the perfect add-on.",
    kind: "item",
    expires: "Jun 30, 2026",
    auto: false,
    eligibility: "Dumplings only · one per order",
    cta: "Shop dumplings",
    ctaTarget: "menu",
    category: "dumplings",
    image: imageForProduct("Dumplings (5)"),
  },
  {
    id: "double-points",
    badge: "2X",
    title: "2X Points on Bowls",
    desc: "Earn double points on every bowl this weekend.",
    kind: "multiplier",
    expires: "Jun 22, 2026",
    auto: true,
    eligibility: "Bowls · app & web orders",
    cta: "Shop bowls",
    ctaTarget: "menu",
    multiplier: 2,
    category: "bowls",
    image: imageForProduct("Steak Bowl"),
  },
  {
    id: "bowl-drink",
    badge: "BOGO",
    title: "Buy a Bowl, Get a Free Drink",
    desc: "Add any bowl and a drink — the drink's on us.",
    kind: "cart",
    expires: "Jul 4, 2026",
    auto: false,
    eligibility: "Add 1 bowl + 1 drink · auto-discount in cart",
    cta: "Apply in cart",
    ctaTarget: "cart",
    value: 3.29,
    image: imageForProduct("Fountain Beverage"),
  },
  {
    id: "new-sweet-spicy",
    badge: "NEW",
    title: "Try the Sweet & Spicy Bowl",
    desc: "Our newest bowl — bold, glazed and a little fiery.",
    kind: "item",
    expires: "Jul 31, 2026",
    auto: false,
    eligibility: "New item · while supplies last",
    cta: "View item",
    ctaTarget: "pdp",
    productName: "Sweet & Spicy Bowl",
    image: imageForProduct("Sweet & Spicy Bowl"),
  },
];

export const challenges: Challenge[] = [
  {
    id: "order-streak",
    title: "Weekly Regular",
    goal: "Order 3 times in 7 days",
    rewardText: "+50 bonus points",
    timeframe: "Ends Jun 24, 2026",
    progress: 2,
    target: 3,
    nextAction: "Place 1 more order this week",
    kind: "count",
  },
  {
    id: "try-featured",
    title: "Taste the New Drop",
    goal: "Try the Sweet & Spicy Bowl",
    rewardText: "+25 bonus points",
    timeframe: "Ends Jul 31, 2026",
    progress: 0,
    target: 1,
    nextAction: "Add it to your next order",
    kind: "count",
  },
  {
    id: "three-day-streak",
    title: "On a Roll",
    goal: "Complete a 3-day ordering streak",
    rewardText: "Free side",
    timeframe: "Resets if you miss a day",
    progress: 1,
    target: 3,
    nextAction: "Order again tomorrow",
    kind: "streak",
  },
];

// The challenge surfaced in the nav / checkout (closest to completion).
export const activeChallenge = challenges[0];

export const SAMPLE_MEMBER = {
  name: "Juan",
  points: 280,
  lifetimePoints: 980,
};

// The member's recent orders (for the "Recent orders / quick reorder" row).
export const recentOrderNames = [
  "Steak Bowl",
  "Chicken Bowl",
  "Dual Protein Bowl",
  "Sweet & Spicy Bowl",
];

// Personalized offers shown in the logged-in home "YOUR OFFERS" section.
export type PersonalOffer = {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  timer?: string;
  timerLabel?: string;
  cta: string;
  icon: string;
  productName?: string;
};

export const personalizedOffers: PersonalOffer[] = [
  {
    id: "lunch-drink",
    eyebrow: "Lunch special",
    title: "Add a drink for only $1",
    desc: "With any bowl order. You usually skip drinks — today's a great day to hydrate.",
    timer: "02:17:34",
    timerLabel: "Remaining",
    cta: "Claim offer",
    icon: "🥤",
  },
  {
    id: "shrimp-3x",
    eyebrow: "Rewards boost",
    title: "3X Points on Shrimp Bowl",
    desc: "You haven't had it in 13 days. Today only: earn 3x points on any Shrimp Bowl.",
    cta: "Order now",
    icon: "★",
    productName: "Shrimp Bowl",
  },
  {
    id: "birthday-veggie",
    eyebrow: "Birthday month offer",
    title: "Free Veggie Bowl — on us",
    desc: "Happy birthday month, Juan! Redeem your free bowl before the 30th.",
    timer: "9 DAYS",
    timerLabel: "to Redeem",
    cta: "Redeem free bowl",
    icon: "🎂",
    productName: "Veggie Bowl",
  },
];

// Points milestones for the hero rewards-progress bar (Free Bowl = max 350).
export const REWARDS_GOAL = 350;
export const rewardMilestones = [
  { label: "Free Drink", at: 150 },
  { label: "Free Side", at: 200 },
  { label: "Free Bowl", at: 350 },
];

// ---- Cross-journey helpers ------------------------------------------------
const categoryOfProduct = (name: string) =>
  menuCategories.find((c) => c.items.some((i) => i.name === name))?.id;

/** Active offer that applies to a given product (by name or its category). */
export function offerForProduct(name: string): Offer | undefined {
  const cat = categoryOfProduct(name);
  return offers.find(
    (o) => o.productName === name || (o.category && o.category === cat),
  );
}

/** Short loyalty badge for a product card / PDP (e.g. "50% OFF", "2X", "NEW"). */
export function badgeForProduct(name: string): string | undefined {
  return offerForProduct(name)?.badge;
}

/** Points a customer earns for an order subtotal, honoring active multipliers. */
export function pointsForSubtotal(subtotal: number, multiplier = 1): number {
  return Math.round(subtotal * POINTS_PER_DOLLAR * multiplier);
}
