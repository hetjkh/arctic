import type { Metadata } from "next";
import SiteHeader from "../site-header";
import ProductsExperience from "./products-experience";
import "../services/services.css";
import "./products.css";

export const metadata: Metadata = {
  title: "Our Products — Arctic Base",
  description: "Products built by Arctic Base: ArcticSwitch, ArcticOS, ArcticInvoice, and a shop of studio-made digital products.",
};

export default function ProductsPage() {
  return (
    <div className="site-frame services-page products-page">
      <a className="skip-link" href="#products">Skip to our products</a>
      <SiteHeader />
      <ProductsExperience />
      <footer className="services-footer">
        <div className="services-footer-top"><span>INDEPENDENT MINDS. CONNECTED WORLDWIDE.</span><a href="#products-top">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
        <p className="services-wordmark" aria-label="Arctic Base">ARCTIC BASE<span aria-hidden="true">✳</span></p>
        <div className="site-footer"><span>© {new Date().getFullYear()} ARCTIC BASE</span><span>A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</span></div>
      </footer>
    </div>
  );
}
