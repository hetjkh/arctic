"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { CursorFollower, easeOut, Reveal, rise, ScrollProgress, SplitHeading, stagger, useMagnetic, useTilt, Words } from "../motion-kit";
import { DigitalMock, InvoiceMock, OsMock, SwitchMock } from "./product-mocks";

const products = [
  {
    id: "arcticswitch", number: "01", name: "ArcticSwitch", status: "LIVE", kind: "Desktop workspace",
    tagline: "Every account. One calm workspace.",
    description: "Bring your chats, email, and work apps into one peaceful desktop. Separate spaces for every account, unread messages in one inbox, and up to four apps side by side.",
    features: ["Separate spaces for every account", "One inbox for every conversation", "Split view with up to four apps", "30+ apps and any custom URL"],
    cta: { label: "Visit ArcticSwitch", href: "https://arctic-switch.vercel.app/", external: true },
    Mock: SwitchMock,
  },
  {
    id: "arcticos", number: "02", name: "ArcticOS", status: "EARLY ACCESS", kind: "AI business OS",
    tagline: "Your studio, run with AI.",
    description: "Manage clients, write proposals, send invoices, and track projects from one place. Just ask, and ArcticOS drafts, schedules, and follows up for you.",
    features: ["AI proposal writer", "Client CRM and pipeline", "Smart invoicing and payments", "Projects, tasks, and time tracking", "Ask your business anything"],
    cta: { label: "Join the waitlist", href: "/contact-us#contact-form", external: false },
    Mock: OsMock,
  },
  {
    id: "arcticinvoice", number: "03", name: "ArcticInvoice", status: "BETA", kind: "Invoicing",
    tagline: "Invoices in seconds. Paid in days.",
    description: "Create beautiful, branded invoices in under a minute. Online payments, automatic reminders, and recurring billing mean less chasing and faster cash.",
    features: ["Branded invoice templates", "Card and bank payments online", "Recurring billing and auto-reminders", "Multi-currency and tax ready", "Expenses and simple reports"],
    cta: { label: "Get early access", href: "/contact-us#contact-form", external: false },
    Mock: InvoiceMock,
  },
  {
    id: "digital", number: "04", name: "Digital Products", status: "SHOP", kind: "Templates & kits",
    tagline: "Studio-made tools, ready to use.",
    description: "Website templates, UI kits, brand kits, presets, and playbooks. The same tools we use on client work, packaged so you can start faster.",
    features: ["Website and Notion templates", "Figma UI and brand kits", "Social and video presets", "Guides and playbooks"],
    cta: { label: "Browse digital products", href: "/products/digital", external: false },
    Mock: DigitalMock,
  },
];

const principles = [
  { label: "DESIGNED", value: "In-house", text: "Every product is designed and built by the same studio that does our client work." },
  { label: "PRIVACY", value: "First", text: "Your data stays yours. No selling, no surprises." },
  { label: "MADE FOR", value: "Small teams", text: "Built for freelancers, studios, and teams who wear many hats." },
  { label: "UPDATES", value: "Always", text: "We use these tools daily, so they keep getting better." },
];

const MotionLink = motion.create(Link);

function ProductCta({ cta }: { cta: (typeof products)[number]["cta"] }) {
  const magnetic = useMagnetic(0.3);
  const content = <><span>{cta.label}</span><span className="product-cta-arrow" aria-hidden="true">↗</span></>;
  if (cta.external) return <motion.a className="product-cta" href={cta.href} target="_blank" rel="noopener noreferrer" style={magnetic.style} {...magnetic.handlers}>{content}<span className="sr-only"> (opens in a new tab)</span></motion.a>;
  return <MotionLink className="product-cta" href={cta.href} style={magnetic.style} {...magnetic.handlers}>{content}</MotionLink>;
}

const showcaseTints = ["#f5f5f0", "#efe9f3", "#f3efe6", "#ebe9ee"];

function ProductRow({ product, index, onActive }: { product: (typeof products)[number]; index: number; onActive: (index: number) => void }) {
  const reduced = useReducedMotion();
  const rowRef = useRef<HTMLElement>(null);
  const tilt = useTilt(5);
  const side = index % 2 ? -1 : 1;
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const visualScale = useTransform(scrollYProgress, [0, 0.35, 0.68, 1], [0.78, 1, 1, 0.88]);
  const visualRotate = useTransform(scrollYProgress, [0, 0.35, 0.68, 1], [side * 7, 0, 0, side * -4]);
  const visualOpacity = useTransform(scrollYProgress, [0.05, 0.3, 0.75, 1], [0, 1, 1, 0.25]);
  const backdropScale = useTransform(scrollYProgress, [0.12, 0.42], [0, 1]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [`${side * 18}%`, `${side * -18}%`]);
  const copyOpacity = useTransform(scrollYProgress, [0.72, 0.98], [1, 0.2]);
  const numberY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const { Mock } = product;
  return <motion.article ref={rowRef} id={product.id} className={`product-row${index % 2 ? " is-reversed" : ""}`} aria-labelledby={`${product.id}-title`} onViewportEnter={() => onActive(index)} viewport={{ margin: "-50% 0px -50% 0px" }}>
    <motion.span className="product-ghost" aria-hidden="true" style={reduced ? undefined : { x: ghostX }}>{product.name}</motion.span>
    <motion.div className="product-copy" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} style={reduced ? undefined : { opacity: copyOpacity }}>
      <motion.div className="product-meta" variants={rise}><motion.span className="product-number" style={reduced ? undefined : { y: numberY }}>{product.number}</motion.span><span className={`product-status status-${product.status.split(" ")[0].toLowerCase()}`}><i />{product.status}</span></motion.div>
      <motion.span className="product-kind" variants={rise}>{product.kind}</motion.span>
      <motion.h3 id={`${product.id}-title`} variants={rise}>{product.name}</motion.h3>
      <motion.p className="product-tagline" variants={rise}>{product.tagline}</motion.p>
      <motion.p className="product-description" variants={rise}>{product.description}</motion.p>
      <motion.ul className="product-features" variants={stagger}>{product.features.map(feature => <motion.li key={feature} variants={rise}><i aria-hidden="true">✓</i>{feature}</motion.li>)}</motion.ul>
      <motion.div variants={rise}><ProductCta cta={product.cta} /></motion.div>
    </motion.div>
    <motion.div className="product-visual" style={reduced ? undefined : { y: visualY }} data-cursor={product.cta.external ? "Live" : "Peek"}>
      <motion.span className="product-visual-backdrop" aria-hidden="true" style={reduced ? undefined : { scaleX: backdropScale }} />
      <motion.div className="product-visual-motion" style={reduced ? undefined : { scale: visualScale, rotate: visualRotate, opacity: visualOpacity }}>
        <motion.div className="product-visual-inner" style={tilt.style} {...tilt.handlers}><Mock /></motion.div>
      </motion.div>
    </motion.div>
  </motion.article>;
}

function ProductRail({ active, sectionRef }: { active: number; sectionRef: RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>("[aria-current]");
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: link.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);
  return <nav ref={navRef} className="service-index products-rail" aria-label="Jump to a product">
    {products.map((product, index) => <a key={product.id} href={`#${product.id}`} className={active === index ? "is-active" : ""} aria-current={active === index ? "location" : undefined}>
      {active === index && <motion.span layoutId="products-rail-active" className="products-rail-active" transition={{ duration: reduced ? 0 : 0.5, ease: easeOut }} />}
      <span className="service-index-number">[{product.number}]</span>
      <span>{product.name}</span>
      <span className="service-index-arrow" aria-hidden="true">↗</span>
    </a>)}
    <motion.span className="products-rail-progress" aria-hidden="true" style={{ scaleX: reduced ? 1 : scrollYProgress }} />
  </nav>;
}

export default function ProductsExperience() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const ctaMagnetic = useMagnetic(0.45);
  const showcaseRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  return <main id="products-top">
    <section ref={heroRef} className="services-hero products-hero" aria-labelledby="products-title">
      <div className="services-hero-copy">
        <div className="services-kicker"><span><i /> OUR PRODUCTS</span><span>Made in-house.</span></div>
        <motion.div className="hero-headline" style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
          <SplitHeading level={1} id="products-title"><Words text="TOOLS WE" /><br /><Words text="BUILT." /><span><Words text="For people" /><br /><Words text="who build." /></span></SplitHeading>
        </motion.div>
        <div className="services-hero-intro">
          <span className="hero-intro-mark" aria-hidden="true">✳</span>
          <p>We don’t just make things for clients. We make the tools we wish we had, then share them with you.</p>
        </div>
        <a className="hero-explore" href="#products"><span className="hero-explore-label"><span data-text="EXPLORE THE PRODUCTS">EXPLORE THE PRODUCTS</span></span><span className="hero-explore-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span></a>
      </div>
      <div className="products-index">
        <div className="products-index-top"><span>[ THE LINEUP ]</span><span>04 PRODUCTS</span></div>
        <motion.ol initial={reduced ? false : "hidden"} animate="show" variants={stagger}>
          {products.map(product => <motion.li key={product.id} variants={rise}>
            <a href={`#${product.id}`}>
              <span className="products-index-number">{product.number}</span>
              <span className="products-index-name"><strong>{product.name}</strong><small>{product.kind}</small></span>
              <span className={`product-status status-${product.status.split(" ")[0].toLowerCase()}`}><i />{product.status}</span>
              <span className="products-index-arrow" aria-hidden="true">↘</span>
            </a>
          </motion.li>)}
        </motion.ol>
      </div>
      <div className="services-caption"><span>BUILT BY THE STUDIO. USED BY THE STUDIO.</span><span>FOUR PRODUCTS. ONE WAY OF WORKING.</span></div>
    </section>

    <div className="products-marquee" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>ARCTICSWITCH <i>✳</i> ARCTICOS <i>✳</i> ARCTICINVOICE <i>✳</i> DIGITAL PRODUCTS <i>✳</i> ARCTICSWITCH <i>✳</i> ARCTICOS <i>✳</i> ARCTICINVOICE <i>✳</i> DIGITAL PRODUCTS <i>✳</i></span>)}</div></div>

    <motion.section ref={showcaseRef} id="products" className="products-showcase" aria-labelledby="products-showcase-title" animate={{ backgroundColor: showcaseTints[active] }} transition={{ duration: reduced ? 0 : 0.8, ease: easeOut }}>
      <header className="products-showcase-head">
        <span className="section-pill"><i /> THE PRODUCTS</span>
        <SplitHeading id="products-showcase-title"><Words text="FOUR PRODUCTS." /><span><Words text="One calm way to work." /></span></SplitHeading>
      </header>
      <ProductRail active={active} sectionRef={showcaseRef} />
      {products.map((product, index) => <ProductRow key={product.id} product={product} index={index} onActive={setActive} />)}
    </motion.section>

    <section className="products-principles" aria-labelledby="products-principles-title">
      <div className="products-principles-head"><span className="products-tag">[ BUILT THE ARCTIC WAY ]</span><SplitHeading id="products-principles-title"><Words text="SAME STUDIO." /><span><Words text="Same standards." /></span></SplitHeading></div>
      <motion.dl initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        {principles.map((item, index) => <motion.div key={item.label} variants={rise}><dt><span>0{index + 1}</span>{item.label}</dt><dd><strong>{item.value}</strong><span>{item.text}</span></dd></motion.div>)}
      </motion.dl>
    </section>

    <section className="services-cta" aria-labelledby="products-cta-title">
      <div className="services-cta-copy"><span className="service-eyebrow">[ GOT A PRODUCT IDEA? ]</span><SplitHeading id="products-cta-title"><Words text="LET’S BUILD" /><br /><Words text="YOURS" /><br /><em><Words text="NEXT." /></em></SplitHeading><Reveal><p>We design and build digital products for clients too.<br />Tell us what you’re dreaming up.</p></Reveal></div>
      <div className="services-cta-art"><Image src="/services/design-muse.webp" alt="A designer sketching on a tablet, painted as an aged Renaissance fresco." fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
      <Link href="/contact-us#contact-form" className="services-cta-button" {...ctaMagnetic.handlers}><span>START A PRODUCT</span><motion.span aria-hidden="true" style={ctaMagnetic.style}>↗</motion.span></Link>
    </section>
    <ScrollProgress />
    <CursorFollower />
  </main>;
}
