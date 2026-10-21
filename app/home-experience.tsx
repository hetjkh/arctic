"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, rise, SplitHeading, stagger, useMagnetic, Words } from "./motion-kit";

const disciplines = ["WEBSITES", "BRANDING", "PRODUCTS", "FILMS", "SOCIAL", "AI VIDEO", "CATALOGUES"];

const explore = [
  { href: "/services", number: "01", title: "Services", text: "Web, brand, film, social and design under one roof.", image: "/services/design-muse.webp", alt: "A Renaissance-style fresco of artists at work with modern design tools." },
  { href: "/products", number: "02", title: "Products", text: "ArcticSwitch, ArcticOS, ArcticInvoice and digital goods.", image: "/services/brand-makers.webp", alt: "A fresco of brand makers gathered around a table of sketches." },
  { href: "/portfolio", number: "03", title: "Portfolio", text: "Sites we shipped, films we cut and catalogues we printed.", image: "/services/film-makers.webp", alt: "A fresco of a film crew with cameras painted in a classical style." },
  { href: "/about-us", number: "04", title: "About us", text: "Two founders, old-school craft and new-world ideas.", image: "/services/social-muse.webp", alt: "Modern storytellers meet old-world artistry in a Renaissance-style fresco." },
];

const work = [
  { name: "Satocci", tag: "Retail tech · Website", image: "/portfolio/sites/satocci.jpg" },
  { name: "The Unicorn", tag: "Venture studio · Website", image: "/portfolio/sites/unicorn.jpg" },
  { name: "WW Travels", tag: "Travel · Website & social", image: "/portfolio/sites/wwtravels.jpg" },
];

const stats = [
  { value: "7+", label: "Websites shipped" },
  { value: "4", label: "Products built" },
  { value: "5", label: "Disciplines" },
];

export default function HomeExperience() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const primary = useMagnetic(0.25);
  const cta = useMagnetic(0.3);

  return <main id="home-top">
    <section className="landing-hero" ref={heroRef} aria-labelledby="home-title">
      <div className="landing-hero-copy">
        <div className="landing-kicker"><span className="section-pill"><i /> CREATIVE STUDIO</span><span>Est. for the future</span></div>
        <SplitHeading level={1} id="home-title"><Words text="WE MAKE" /> <Words text="BRANDS" /><span><Words text="worth remembering." /></span></SplitHeading>
        <motion.div className="landing-hero-bottom" initial={reduced ? false : "hidden"} animate="show" variants={stagger}>
          <motion.p variants={rise}>Websites, products, films and everything in between. For brands with a little more to say.</motion.p>
          <motion.div className="landing-actions" variants={rise}>
            <motion.span style={primary.style} {...primary.handlers}><Link href="/portfolio" className="landing-button is-primary"><span>SEE OUR WORK</span><span aria-hidden="true">↗</span></Link></motion.span>
            <Link href="/contact-us" className="landing-button"><span>START A PROJECT</span><span aria-hidden="true">↗</span></Link>
          </motion.div>
          <motion.dl className="landing-stats" variants={rise}>
            {stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
          </motion.dl>
        </motion.div>
      </div>
      <div className="landing-hero-art">
        <motion.div className="landing-hero-image" style={reduced ? undefined : { y: artY, scale: artScale }}>
          <Image src="/services/digital-atelier.webp" alt="A new generation of creatives with laptops, headphones, and cameras, painted into an aged Renaissance fresco." fill sizes="(max-width: 760px) 100vw, 50vw" preload />
        </motion.div>
        <div className="landing-badge" aria-hidden="true">
          <svg viewBox="0 0 120 120"><defs><path id="landing-badge-path" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text><textPath href="#landing-badge-path" textLength="286" lengthAdjust="spacing">ARCTIC BASE ✳ CREATIVE STUDIO ✳</textPath></text></svg>
          <span>↘</span>
        </div>
        <div className="landing-art-caption"><span>FIG. 01 — THE CREATIVE ATELIER</span><span>THE NEXT RENAISSANCE IS YOURS</span></div>
      </div>
    </section>

    <div className="landing-marquee" aria-hidden="true">
      <div>{[0, 1].map(copy => <span key={copy}>{disciplines.map(item => <span key={item}>{item}<i>✳</i></span>)}</span>)}</div>
    </div>

    <section className="landing-section" aria-labelledby="explore-title">
      <header className="landing-head">
        <span className="section-pill"><i /> START HERE</span>
        <SplitHeading id="explore-title"><Words text="EVERYTHING WE DO." /><span><Words text="One place to start." /></span></SplitHeading>
      </header>
      <motion.div className="landing-explore" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        {explore.map(item => <motion.div key={item.href} variants={rise}>
          <Link href={item.href} className="landing-card">
            <span className="landing-card-media"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" /></span>
            <span className="landing-card-body">
              <span className="landing-card-number">[{item.number}]</span>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
              <span className="landing-card-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        </motion.div>)}
      </motion.div>
    </section>

    <section className="landing-section landing-work" aria-labelledby="work-title">
      <header className="landing-head">
        <span className="section-pill"><i /> RECENT WORK</span>
        <SplitHeading id="work-title"><Words text="FRESH OFF" /> <Words text="THE PRESS." /><span><Words text="Live, fast, and loved." /></span></SplitHeading>
        <Link href="/portfolio" className="landing-view-all">VIEW ALL WORK <span aria-hidden="true">↗</span></Link>
      </header>
      <motion.div className="landing-work-grid" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        {work.map(site => <motion.div key={site.name} variants={rise}>
          <Link href="/portfolio" className="landing-work-card">
            <span className="landing-work-media"><Image src={site.image} alt={`${site.name} website homepage`} fill sizes="(max-width: 760px) 100vw, 33vw" /></span>
            <span className="landing-work-info"><strong>{site.name}</strong><span>{site.tag}</span></span>
          </Link>
        </motion.div>)}
      </motion.div>
    </section>

    <section className="landing-cta" aria-labelledby="cta-title">
      <Reveal className="landing-cta-copy">
        <span className="landing-cta-eyebrow">[ YOUR NEXT CHAPTER STARTS HERE ]</span>
        <h2 id="cta-title">GOT AN IDEA?<span>Let’s talk.</span></h2>
        <p>A wild idea. A new beginning. A “what if”. We’d love to hear it.</p>
      </Reveal>
      <motion.div className="landing-cta-action" style={cta.style} {...cta.handlers}>
        <Link href="/contact-us" className="landing-cta-button"><span>CONTACT US</span><span aria-hidden="true">↗</span></Link>
      </motion.div>
    </section>
  </main>;
}
