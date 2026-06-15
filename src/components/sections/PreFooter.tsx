import Image from "next/image";

export function PreFooter() {
  return (
    <section className="relative h-[200px] overflow-hidden bg-brand lg:h-[290px]">
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <p className="font-script text-3xl leading-tight text-white lg:text-5xl">
          From our grill to your neighborhood.
        </p>
      </div>
      <Image
        src="/images/skyline.png"
        alt=""
        width={1440}
        height={300}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 w-full max-w-none -translate-x-1/2 opacity-30 mix-blend-multiply lg:max-w-[1440px]"
      />
    </section>
  );
}
