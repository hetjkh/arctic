import type { Metadata } from "next";
import SiteHeader from "../site-header";
import AboutExperience from "./about-experience";
import "../services/services.css";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us — Arctic Base",
  description: "Meet Arctic Base: a creative studio founded on old-school craft and new-world ideas. Our story, what we believe, and the two founders behind the work.",
};

export default function AboutPage() {
  return (
    <div className="site-frame services-page about-page">
      <a className="skip-link" href="#about-story">Skip to our story</a>
      <SiteHeader />
      <AboutExperience />
      <footer className="services-footer">
        <div className="services-footer-top"><span>INDEPENDENT MINDS. CONNECTED WORLDWIDE.</span><a href="#about-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
        <p className="services-wordmark" aria-label="Arctic Base">ARCTIC BASE<span aria-hidden="true">✳</span></p>
        <div className="site-footer"><span>© {new Date().getFullYear()} ARCTIC BASE</span><span>A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</span></div>
      </footer>
    </div>
  );
}
