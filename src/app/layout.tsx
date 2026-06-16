import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart/CartProvider";
import { ProductModalProvider } from "@/components/pdp/ProductModalProvider";
import "./globals.css";

// Display headlines — the real brand font "Citrus Gothic" (condensed caps).
// Used for every section headline: hero, Menu, Bowls, News, card titles, etc.
const display = localFont({
  variable: "--font-display",
  src: [{ path: "./fonts/CitrusGothic.ttf", weight: "400", style: "normal" }],
});

// Oversized decorative brand words — the real brand font "Janeiro" (heavy
// rounded caps). Used only for the giant accent words: "delicioso", "catering".
const fat = localFont({
  variable: "--font-fat",
  src: [{ path: "./fonts/Janeiro.otf", weight: "400", style: "normal" }],
});

// Body copy — stand-in for the brand font "Fieldwork" (geometric sans).
// TODO: swap for Fieldwork once provided.
const body = Poppins({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Script accents — the real brand font "Chantal" (bold brush italic).
const script = localFont({
  variable: "--font-script",
  src: [
    { path: "./fonts/Chantal-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "./fonts/Chantal-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "WaBa Grill — Fresh. Grilled. Delicious.",
  description:
    "Bold, healthy, Asian-inspired bowls crafted to fuel your body and satisfy your cravings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${fat.variable} ${body.variable} ${script.variable} antialiased`}
    >
      <body className="bg-white text-ink font-body">
        <CartProvider>
          <ProductModalProvider>{children}</ProductModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}
