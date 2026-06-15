import Image from "next/image";

export function PreFooter() {
  return (
    <section className="bg-white">
      <Image
        src="/images/skyline.png"
        alt=""
        width={4096}
        height={860}
        aria-hidden
        className="block h-auto w-full select-none"
      />
    </section>
  );
}
