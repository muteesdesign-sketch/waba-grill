"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLoyalty } from "@/components/loyalty/LoyaltyProvider";
import { Hero } from "./Hero";
import { HeroLoggedIn } from "./HeroLoggedIn";
import { LoyaltyPromo } from "./LoyaltyPromo";
import { RecentOrders } from "./RecentOrders";
import { Offer } from "./Offer";
import { Menu } from "./Menu";
import { Rewards } from "./Rewards";
import { YourOffers } from "./YourOffers";
import { Community } from "./Community";
import { Catering } from "./Catering";
import { News } from "./News";

export function HomeBody() {
  const { enrolled } = useLoyalty();

  if (enrolled) {
    // Logged-in home: personalized hero, quick reorder, menu, personal offers.
    return (
      <main>
        <HeroLoggedIn />
        <Reveal>
          <RecentOrders />
        </Reveal>
        <Reveal>
          <Menu />
        </Reveal>
        <Reveal>
          <YourOffers />
        </Reveal>
        <Reveal variant="right">
          <Community />
        </Reveal>
        <Reveal variant="zoom">
          <Catering />
        </Reveal>
        <Reveal>
          <News />
        </Reveal>
      </main>
    );
  }

  // Guest home (default).
  return (
    <main>
      <Hero />
      <Reveal>
        <LoyaltyPromo />
      </Reveal>
      <Reveal>
        <Offer />
      </Reveal>
      <Reveal>
        <Menu />
      </Reveal>
      <Reveal variant="left">
        <Rewards />
      </Reveal>
      <Reveal variant="right">
        <Community />
      </Reveal>
      <Reveal variant="zoom">
        <Catering />
      </Reveal>
      <Reveal>
        <News />
      </Reveal>
    </main>
  );
}
