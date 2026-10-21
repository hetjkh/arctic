import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PortfolioExperience from "./portfolio-experience";
import "../services/services.css";
import "../products/products.css";
import "../products/digital/digital.css";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio — Arctic Base",
  description: "Websites, product films, social content, graphic design, AI videos, and catalogues made by Arctic Base.",
};

export default function PortfolioPage() {
  return (
    <div className="site-frame services-page portfolio-page">
      <a className="skip-link" href="#work">Skip to our work</a>
      <SiteHeader />
      <PortfolioExperience />
      <footer className="services-footer">
        <div className="services-footer-top"><span>INDEPENDENT MINDS. CONNECTED WORLDWIDE.</span><a href="#portfolio-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
        <p className="services-wordmark" aria-label="Arctic Base">ARCTIC BASE<span aria-hidden="true">✳</span></p>
        <div className="site-footer"><span>© {new Date().getFullYear()} ARCTIC BASE</span><span>A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</span></div>
      </footer>
    </div>
  );
}
