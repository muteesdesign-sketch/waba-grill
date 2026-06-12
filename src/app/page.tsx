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

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[440px] bg-white shadow-xl">
      <Banner />
      <Nav />
      <main>
        <Hero />
        <Offer />
        <Menu />
        <Rewards />
        <Community />
        <Catering />
        <News />
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
