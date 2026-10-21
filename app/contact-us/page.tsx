import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../contact-form";
import HomeFooter from "../home-footer";
import { Reveal, SplitHeading, Words } from "../motion-kit";
import SiteHeader from "../site-header";
import "../home.css";

export const metadata: Metadata = {
  title: "Contact Us — Arctic Base",
  description: "Good things start with a conversation. Get in touch with Arctic Base and let's make something happen.",
};

export default function ContactPage() {
  return (
    <div className="site-frame home-page">
      <a className="skip-link" href="#contact-form">Skip to contact form</a>
      <SiteHeader />
      <main id="contact-top">
        <section className="intro-grid" id="studio" aria-labelledby="page-title">
          <div className="intro-copy">
            <SplitHeading level={1} id="page-title"><Words text="GET IN TOUCH" /></SplitHeading>
            <Reveal><p>Good things start with a conversation.<br />Have a thought, a project, a possibility? Let’s make it happen.</p></Reveal>
          </div>
          <div className="contact-details">
            <Reveal className="detail-cell">
              <h2>NEW BUSINESS</h2>
              <a href="#contact-form">business@<wbr />arcticbase.example<span aria-hidden="true">↗</span></a>
            </Reveal>
            <Reveal className="detail-cell">
              <h2>GENERAL INQUIRIES</h2>
              <a href="#contact-form">hello@<wbr />arcticbase.example<span aria-hidden="true">↗</span></a>
            </Reveal>
            <Reveal className="detail-cell">
              <h2>BASED HERE, THERE</h2>
              <p>Independent minds.<br />Connected worldwide.</p>
            </Reveal>
          </div>
        </section>
        <section className="contact-grid" aria-label="Contact Arctic Base">
          <div className="form-panel">
            <div className="form-heading">
              <SplitHeading><Words text="PLEASE FILL OUT THIS FORM" /></SplitHeading>
              <span className="heading-mark" aria-hidden="true">↙</span>
            </div>
            <ContactForm />
          </div>
          <figure className="art-panel" id="connection">
            <Image src="/conactr.png" alt="An aged Renaissance-style fresco of two people reaching toward one another, connecting the classical world with the modern day." fill sizes="(max-width: 760px) 100vw, 50vw" className="contact-art" preload />
            <div className="art-index" aria-hidden="true"><span className="status-dot" />THE ART OF CONNECTION — 001</div>
            <figcaption><span>DIFFERENT WORLDS.<br />ONE CONVERSATION.</span><span aria-hidden="true">↗</span></figcaption>
          </figure>
        </section>
      </main>
      <HomeFooter topId="contact-top" />
    </div>
  );
}
