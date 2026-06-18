import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { LoyaltyPromo } from "@/components/sections/LoyaltyPromo";
import { Offer } from "@/components/sections/Offer";
import { Menu } from "@/components/sections/Menu";
import { Rewards } from "@/components/sections/Rewards";
import { Community } from "@/components/sections/Community";
import { Catering } from "@/components/sections/Catering";
import { News } from "@/components/sections/News";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Nav />
      <main>
        {/* Hero animates on load; the rest reveal as they scroll into view. */}
        <Hero />
        {/* Loyalty promo space directly below the hero (offers + rewards) */}
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
      <PreFooter />
      <Footer />
    </div>
  );
}
