import type { Metadata } from "next";
import SiteHeader from "../../site-header";
import DigitalExperience from "./digital-experience";
import "../../services/services.css";
import "../products.css";
import "./digital.css";

export const metadata: Metadata = {
  title: "Digital Products — Arctic Base",
  description: "Studio-made templates, UI kits, brand kits, presets, and guides from Arctic Base.",
};

export default function DigitalProductsPage() {
  return (
    <div className="site-frame services-page products-page digital-page">
      <a className="skip-link" href="#shop">Skip to the shop</a>
      <SiteHeader />
      <DigitalExperience />
      <footer className="services-footer">
        <div className="services-footer-top"><span>INDEPENDENT MINDS. CONNECTED WORLDWIDE.</span><a href="#digital-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
        <p className="services-wordmark" aria-label="Arctic Base">ARCTIC BASE<span aria-hidden="true">✳</span></p>
        <div className="site-footer"><span>© {new Date().getFullYear()} ARCTIC BASE</span><span>A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</span></div>
      </footer>
    </div>
  );
}
