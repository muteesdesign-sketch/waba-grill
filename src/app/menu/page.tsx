import Image from "next/image";
import type { Metadata } from "next";
import { Banner } from "@/components/sections/Banner";
import { Nav } from "@/components/sections/Nav";
import { PreFooter } from "@/components/sections/PreFooter";
import { Footer } from "@/components/sections/Footer";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { distressStyle } from "@/lib/distress";
import { MenuCategoryNav } from "./MenuCategoryNav";
import { menuCategories } from "./menu-data";

export const metadata: Metadata = {
  title: "Menu — WaBa Grill",
  description:
    "Explore the full WaBa Grill menu: bowls, bigger bowls, greens & grains, dumplings, tacos, family meals and more.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Nav />

      {/* Dark hero */}
      <section className="bg-ink px-5 py-10 text-center text-white lg:py-14">
        <p className="font-script text-[32px] leading-none text-brand lg:text-[40px]">
          Explore our
        </p>
        <h1 className="relative mt-1 inline-block font-display text-[72px] uppercase leading-[0.85] lg:text-[96px]">
          <span style={distressStyle}>Menu</span>
          <Image
            src="/images/brush.png"
            alt=""
            width={230}
            height={9}
            aria-hidden
            className="absolute -bottom-3 left-1/2 h-auto w-[120%] -translate-x-1/2"
          />
        </h1>
        <p className="mx-auto mt-6 max-w-[360px] text-[18px] font-medium leading-snug text-white/80">
          Fresh ingredients, bold flavors, grilled to perfection.
        </p>
      </section>

      {/* Sticky category nav */}
      <MenuCategoryNav categories={menuCategories} />

      <main className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10 lg:py-16">
        {menuCategories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-[160px] pb-14 lg:pb-20"
          >
            <div className="text-center">
              <h2 className="relative inline-block font-display text-[44px] uppercase leading-none text-ink lg:text-[60px]">
                <span style={distressStyle}>{cat.title}</span>
                <Image
                  src="/images/brush.png"
                  alt=""
                  width={230}
                  height={9}
                  aria-hidden
                  className="absolute -bottom-2 left-1/2 h-auto w-[70%] -translate-x-1/2"
                />
              </h2>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {cat.items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
