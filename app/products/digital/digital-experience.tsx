"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { CursorFollower, easeOut, Reveal, rise, ScrollProgress, SplitHeading, stagger, useMagnetic, Words } from "../../motion-kit";

const categories = ["All", "Templates", "UI Kits", "Brand Kits", "Presets", "Guides"] as const;
type Category = (typeof categories)[number];

const items: { name: string; category: Exclude<Category, "All">; format: string; price: string; image: string; position: string; description: string; badge?: string }[] = [
  { name: "Fresco Website Template", category: "Templates", format: "Framer + Next.js", price: "$79", image: "/services/digital-atelier.webp", position: "50% 40%", description: "A complete studio website with 8 pages, CMS, and smooth motion.", badge: "BESTSELLER" },
  { name: "Renaissance UI Kit", category: "UI Kits", format: "Figma", price: "$59", image: "/services/design-muse.webp", position: "40% 30%", description: "300+ components, light and dark themes, and auto-layout throughout." },
  { name: "Brand Starter Kit", category: "Brand Kits", format: "Figma + PDF", price: "$49", image: "/services/brand-makers.webp", position: "50% 35%", description: "Logo grids, type pairings, palettes, and a fill-in brand guide.", badge: "NEW" },
  { name: "Social Content Pack", category: "Templates", format: "Figma + Canva", price: "$29", image: "/services/social-muse.webp", position: "60% 40%", description: "120 post, story, and carousel templates that stay on brand." },
  { name: "Cinematic LUT Presets", category: "Presets", format: ".cube + Lightroom", price: "$24", image: "/services/film-makers.webp", position: "50% 45%", description: "18 film-inspired color grades for video and photo." },
  { name: "Proposal & Invoice Templates", category: "Templates", format: "Notion + Docs", price: "$19", image: "/conactr.png", position: "50% 40%", description: "Win work and get paid with polished, ready-to-send documents." },
  { name: "Brand Strategy Workbook", category: "Guides", format: "PDF + Notion", price: "$15", image: "/services/brand-makers.webp", position: "20% 60%", description: "The exact questions we ask clients before any design work starts." },
  { name: "Creative Studio Playbook", category: "Guides", format: "PDF", price: "$35", image: "/services/digital-atelier.webp", position: "80% 55%", description: "How we price, plan, and run projects as a small studio." },
];

const perks = [
  { label: "INSTANT", title: "Download right away", text: "Files land in your inbox the moment you check out." },
  { label: "FOREVER", title: "Lifetime updates", text: "Buy once and get every future version for free." },
  { label: "LICENSE", title: "Use it commercially", text: "Use our products in personal and client projects." },
  { label: "SUPPORT", title: "Made by real people", text: "Questions? The team that made it answers within a day." },
];

const MotionLink = motion.create(Link);

function ProductCard({ item }: { item: (typeof items)[number] }) {
  const reduced = useReducedMotion();
  return <motion.article layout={!reduced} className="digital-card" initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: 0.94 }} transition={{ duration: 0.5, ease: easeOut }} data-cursor="Get it">
    <div className="digital-card-art">
      <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectPosition: item.position }} />
      {item.badge && <span className="digital-card-badge">{item.badge}</span>}
    </div>
    <div className="digital-card-body">
      <div className="digital-card-meta"><span>{item.category}</span><span>{item.format}</span></div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="digital-card-foot">
        <strong>{item.price}</strong>
        <Link href="/contact-us#contact-form" aria-label={`Get ${item.name} for ${item.price}`}>Get it <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  </motion.article>;
}

export default function DigitalExperience() {
  const reduced = useReducedMotion();
  const [category, setCategory] = useState<Category>("All");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const ctaMagnetic = useMagnetic(0.45);
  const visible = category === "All" ? items : items.filter(item => item.category === category);

  return <main id="digital-top">
    <section ref={heroRef} className="services-hero digital-hero" aria-labelledby="digital-title">
      <div className="services-hero-copy">
        <div className="services-kicker"><span><i /> <Link href="/products">OUR PRODUCTS</Link> / DIGITAL</span><span>Made by the studio.</span></div>
        <motion.div className="hero-headline" style={reduced ? undefined : { y: copyY }}>
          <SplitHeading level={1} id="digital-title"><Words text="DIGITAL" /><br /><Words text="PRODUCTS." /><span><Words text="Shortcuts to" /><br /><Words text="great work." /></span></SplitHeading>
        </motion.div>
        <div className="services-hero-intro">
          <span className="hero-intro-mark" aria-hidden="true">✳</span>
          <p>Templates, kits, presets, and guides from our own client work. Download once and start faster.</p>
        </div>
        <a className="hero-explore" href="#shop"><span className="hero-explore-label"><span data-text="BROWSE THE SHOP">BROWSE THE SHOP</span></span><span className="hero-explore-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span></a>
      </div>
      <div className="services-hero-art digital-hero-art">
        <motion.div className="digital-hero-zoom" style={reduced ? undefined : { scale: artScale }}><Image src="/services/digital-atelier.webp" alt="Young creatives at work, painted as an aged Renaissance fresco." fill priority sizes="(max-width: 760px) 100vw, 50vw" /></motion.div>
        <div className="digital-hero-tag"><span>{items.length} PRODUCTS</span><strong>From $15</strong></div>
      </div>
      <div className="services-caption"><span>THE TOOLS BEHIND OUR CLIENT WORK.</span><span>INSTANT DOWNLOAD. LIFETIME UPDATES.</span></div>
    </section>

    <section id="shop" className="digital-shop" aria-labelledby="shop-title">
      <header className="digital-shop-head">
        <div><span className="section-pill"><i /> THE SHOP</span><SplitHeading id="shop-title"><Words text="PICK A SHORTCUT." /><span><Words text="Make it yours." /></span></SplitHeading></div>
        <div className="digital-filters" role="group" aria-label="Filter by category">
          {categories.map(name => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>
            {category === name && <motion.span layoutId="digital-filter" className="digital-filter-active" transition={{ duration: reduced ? 0 : 0.45, ease: easeOut }} />}
            <span>{name}</span>
          </button>)}
        </div>
      </header>
      <p className="sr-only" aria-live="polite">{visible.length} products shown</p>
      <motion.div layout={!reduced} className="digital-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(item => <ProductCard key={item.name} item={item} />)}
        </AnimatePresence>
      </motion.div>
    </section>

    <section className="products-principles digital-perks" aria-labelledby="perks-title">
      <div className="products-principles-head"><span className="products-tag">[ WHAT YOU GET ]</span><SplitHeading id="perks-title"><Words text="EVERY PRODUCT." /><span><Words text="Every time." /></span></SplitHeading></div>
      <motion.dl initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        {perks.map((perk, index) => <motion.div key={perk.label} variants={rise}><dt><span>0{index + 1}</span>{perk.label}</dt><dd><strong>{perk.title}</strong><span>{perk.text}</span></dd></motion.div>)}
      </motion.dl>
    </section>

    <section className="services-cta" aria-labelledby="digital-cta-title">
      <div className="services-cta-copy"><span className="service-eyebrow">[ NEED SOMETHING CUSTOM? ]</span><SplitHeading id="digital-cta-title"><Words text="WE’LL MAKE" /><br /><Words text="IT JUST" /><br /><em><Words text="FOR YOU." /></em></SplitHeading><Reveal><p>Templates are a great start. When you need more,<br />our studio can design it from scratch.</p></Reveal></div>
      <div className="services-cta-art"><Image src="/services/brand-makers.webp" alt="Brand makers at work, painted as an aged Renaissance fresco." fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
      <MotionLink href="/services" className="services-cta-button" {...ctaMagnetic.handlers}><span>SEE OUR SERVICES</span><motion.span aria-hidden="true" style={ctaMagnetic.style}>↗</motion.span></MotionLink>
    </section>
    <ScrollProgress />
    <CursorFollower />
  </main>;
}
