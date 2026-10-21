import type { Metadata } from "next";
import HomeExperience from "./home-experience";
import HomeFooter from "./home-footer";
import SiteHeader from "./site-header";
import "./home.css";
import "./landing.css";

export const metadata: Metadata = {
  title: "Arctic Base — Creative Studio",
  description: "Arctic Base is a creative studio for brands that want to be remembered. Websites, products, films, and everything in between.",
};

export default function Home() {
  return (
    <div className="site-frame home-page landing-page">
      <a className="skip-link" href="#home-title">Skip to content</a>
      <SiteHeader />
      <HomeExperience />
      <HomeFooter topId="home-top" />
    </div>
  );
}
