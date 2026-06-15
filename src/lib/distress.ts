import type { CSSProperties } from "react";
import { asset } from "./asset";

// Worn / "desgastada" texture applied as a mask over Citrus Gothic headlines,
// matching the distressed look in the Figma design. The dark specks in the
// mask punch small transparent holes into the letters.
const url = `url(${asset("/images/text-grunge-mask.png")})`;

export const distressStyle: CSSProperties = {
  WebkitMaskImage: url,
  maskImage: url,
  WebkitMaskRepeat: "repeat",
  maskRepeat: "repeat",
  WebkitMaskSize: "260px auto",
  maskSize: "260px auto",
};
