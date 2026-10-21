import type { Metadata } from "next";
import SiteHeader from "../site-header";
import ServicesExperience from "./services-experience";
import "./services.css";

export const metadata: Metadata = {
  title: "Our Services — Arctic Base",
  description: "Website and app development, social media marketing, graphic design, video production, and brand design. Old-school craft. A new generation of ideas.",
};

export default function ServicesPage() {
  return (
    <div className="site-frame services-page">
      <a className="skip-link" href="#our-services">Skip to our services</a>
      <SiteHeader />
      <ServicesExperience />
      <footer className="services-footer">
        <div className="services-footer-top"><span>INDEPENDENT MINDS. CONNECTED WORLDWIDE.</span><a href="#services-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
        <p className="services-wordmark" aria-label="Arctic Base">ARCTIC BASE<span aria-hidden="true">✳</span></p>
        <div className="site-footer"><span>© {new Date().getFullYear()} ARCTIC BASE</span><span>A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</span></div>
      </footer>
    </div>
  );
}
