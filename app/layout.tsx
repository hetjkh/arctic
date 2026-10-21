import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "./smooth-scroll";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/cormorant-garamond-italic-variable.ttf",
  variable: "--font-cormorant",
  weight: "300 700",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arctic Base — Creative Studio",
  description: "Arctic Base is a creative studio for brands that want to be remembered. Websites, products, films, and everything in between.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
