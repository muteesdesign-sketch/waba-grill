import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Offer } from "@/components/sections/Offer";
import { Menu } from "@/components/sections/Menu";
import { Rewards } from "@/components/sections/Rewards";
import { Community } from "@/components/sections/Community";
import { Catering } from "@/components/sections/Catering";
import { News } from "@/components/sections/News";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { ProductModalProvider } from "@/components/pdp/ProductModalProvider";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <ProductModalProvider>
      <div className="min-h-screen w-full bg-white">
        <Banner />
        <Nav />
        <main>
          {/* Hero animates on load; the rest reveal as they scroll into view. */}
          <Hero />
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
    </ProductModalProvider>
  );
}
