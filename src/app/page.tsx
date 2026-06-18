import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { HomeBody } from "@/components/sections/HomeBody";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Nav />
      {/* Guest vs. logged-in (personalized) home, gated by loyalty state */}
      <HomeBody />
      <PreFooter />
      <Footer />
    </div>
  );
}
