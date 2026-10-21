"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CursorFollower, easeOut, Reveal, rise, ScrollProgress, SplitHeading, stagger, useMagnetic, Words } from "../motion-kit";

const sites = [
  { name: "Wings & Wheels", url: "https://wwtravels.net/", domain: "wwtravels.net", industry: "Travel & tourism", place: "Dubai, UAE", image: "/portfolio/sites/wwtravels.jpg", work: ["Website", "Social media"] },
  { name: "Satocci", url: "https://www.satocci.com/", domain: "satocci.com", industry: "Retail tech", place: "Global", image: "/portfolio/sites/satocci.jpg", work: ["Website", "Product film"] },
  { name: "ePAiD", url: "https://epaid.sa/", domain: "epaid.sa", industry: "Fintech & payments", place: "Saudi Arabia", image: "/portfolio/sites/epaid.jpg", work: ["Website", "Bilingual UI"] },
  { name: "Unicorn", url: "https://www.theunicorn.global/", domain: "theunicorn.global", industry: "AI & enterprise tech", place: "Dubai, UAE", image: "/portfolio/sites/unicorn.jpg", work: ["Website", "Motion"] },
  { name: "Echo", url: "https://www.theecho.global/", domain: "theecho.global", industry: "AI SaaS platform", place: "Dubai, UAE", image: "/portfolio/sites/echo.jpg", work: ["Website", "Product UI"] },
  { name: "Little Diamond Nursery", url: "https://www.littlediamondnursery.ae/", domain: "littlediamondnursery.ae", industry: "Education", place: "Dubai, UAE", image: "/portfolio/sites/little-diamond.jpg", work: ["Website", "Illustration"] },
  { name: "The Unboxing", url: "https://www.theunboxing.ae/", domain: "theunboxing.ae", industry: "Corporate gifting", place: "UAE", image: "/portfolio/sites/unboxing.jpg", work: ["Website", "Catalogue"] },
];

const designFilters = ["All", "Social posts", "Posters", "Event flyers", "Ads"] as const;
type DesignFilter = (typeof designFilters)[number];
const designs: { title: string; client: string; type: Exclude<DesignFilter, "All">; image: string; ratio: string }[] = [
  { title: "Explore the World", client: "Wings & Wheels", type: "Social posts", image: "/portfolio/Image-41403.jpg", ratio: "1 / 1" },
  { title: "Fly Beyond Expectations", client: "Wings & Wheels", type: "Social posts", image: "/portfolio/Image-37286.jpg", ratio: "1 / 1" },
  { title: "Character Day", client: "Campus event", type: "Event flyers", image: "/portfolio/graphic/character-day.png", ratio: "2625 / 3787" },
  { title: "COD Tournament", client: "CSGC Esports", type: "Posters", image: "/portfolio/graphic/cod-poster.png", ratio: "1 / 1" },
  { title: "Metamorphosis — Forest", client: "Metamorphosis", type: "Ads", image: "/portfolio/graphic/metamorphosis-forest.png", ratio: "1 / 1" },
  { title: "Power BI Workshop", client: "Tech community", type: "Event flyers", image: "/portfolio/graphic/powerbi-workshop.png", ratio: "2480 / 3508" },
  { title: "Valorant Cup", client: "CSGC Esports", type: "Posters", image: "/portfolio/graphic/valorant-poster.png", ratio: "1 / 1" },
  { title: "IBT Blockchain Event", client: "IBT", type: "Event flyers", image: "/portfolio/graphic/ibt-event.png", ratio: "1 / 1" },
  { title: "Mini Militia Showdown", client: "Gaming event", type: "Posters", image: "/portfolio/graphic/mini-militia.png", ratio: "2480 / 3508" },
  { title: "Metamorphosis — Setup", client: "Metamorphosis", type: "Ads", image: "/portfolio/graphic/metamorphosis-pc.png", ratio: "1 / 1" },
  { title: "Power BI Event", client: "Tech community", type: "Event flyers", image: "/portfolio/graphic/powerbi-event.png", ratio: "1753 / 2480" },
  { title: "Valorant CSGC", client: "CSGC Esports", type: "Posters", image: "/portfolio/graphic/valorant-csgc.png", ratio: "1 / 1" },
  { title: "Personal Brand Portrait", client: "Ronit Kaushal", type: "Social posts", image: "/portfolio/graphic/ronit-kaushal.png", ratio: "1080 / 1440" },
];

const fanImages = ["/portfolio/graphic/metamorphosis-pc.png", "/portfolio/graphic/metamorphosis-forest.png", "/portfolio/graphic/ibt-event.png", "/portfolio/graphic/cod-poster.png", "/portfolio/graphic/valorant-csgc.png"];

const films = [
  { title: "AI-generated brand video", kind: "AI VIDEO", text: "Concept to final cut with generative AI, made for social feeds.", src: "/portfolio/video.webm" },
  { title: "Influencer marketing", kind: "CAMPAIGN", text: "Creator-led content built to feel native on every platform.", src: "/portfolio/influencer-marketing.mp4" },
  { title: "Brand reel", kind: "SOCIAL FILM", text: "Short-form storytelling, shot and edited for scroll-stopping reach.", src: "/portfolio/Video-81823.mp4" },
];

const catalogues = [
  { title: "The Unboxing — Luxury Experience", client: "The Unboxing", text: "A premium gifting catalogue: art direction, layout, and product storytelling.", src: "/portfolio/The-Unboxing-Luxury-Experience-202.pdf", size: "5.4 MB" },
  { title: "Card Catalogue", client: "Print & product", text: "A product card catalogue designed for print and digital sharing.", src: "/portfolio/card-catalogueee.pdf", size: "3.2 MB" },
  { title: "YesEco Catalogue", client: "YesEco", text: "A product catalogue for YesEco, designed to present the full range clearly and beautifully.", src: "/portfolio/YesEco.pdf", size: "33.4 MB" },
];

const sections = [
  { id: "websites", label: "Websites", count: sites.length },
  { id: "film", label: "Product film", count: 1 },
  { id: "design", label: "Social & design", count: designs.length },
  { id: "motion", label: "AI & video", count: films.length },
  { id: "catalogues", label: "Catalogues", count: catalogues.length },
];

const satocciDemo = "/portfolio/satocci-demo.mp4";

type LightboxItem = { kind: "image" | "video" | "pdf"; src: string; title: string };

function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!item) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; previous?.focus(); };
  }, [item, onClose]);
  return <AnimatePresence>
    {item && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose}>
      <motion.div className={`lightbox-body is-${item.kind}`} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }} transition={{ duration: 0.45, ease: easeOut }} onClick={event => event.stopPropagation()}>
        <div className="lightbox-top">
          <strong>{item.title}</strong>
          <div>
            {item.kind === "pdf" && <a href={item.src} target="_blank" rel="noopener noreferrer">Open full screen ↗</a>}
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>
        <div className="lightbox-media">
          {item.kind === "image" && <Image src={item.src} alt={item.title} fill sizes="90vw" />}
          {item.kind === "video" && <video src={item.src} controls autoPlay playsInline />}
          {item.kind === "pdf" && <iframe src={`${item.src}#view=FitH`} title={item.title} />}
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>;
}

function SiteCard({ site, index }: { site: (typeof sites)[number]; index: number }) {
  const reduced = useReducedMotion();
  return <motion.a href={site.url} target="_blank" rel="noopener noreferrer" className="site-card" initial={reduced ? false : { opacity: 0, y: 60, clipPath: "inset(12% 0% 0% 0%)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: easeOut, delay: (index % 3) * 0.08 }} data-cursor="Visit">
    <div className="site-card-browser">
      <div className="site-card-bar"><span /><span /><span /><em>{site.domain}</em></div>
      <div className="site-card-shot"><Image src={site.image} alt={`${site.name} website homepage`} fill sizes={index < 4 ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"} /></div>
    </div>
    <div className="site-card-info">
      <span className="site-card-number">{String(index + 1).padStart(2, "0")}</span>
      <div className="site-card-title"><h3>{site.name}</h3><p>{site.industry} · {site.place}</p></div>
      <ul>{site.work.map(item => <li key={item}>{item}</li>)}</ul>
      <span className="site-card-arrow" aria-hidden="true">↗</span>
    </div>
    <span className="sr-only"> (opens in a new tab)</span>
  </motion.a>;
}

function AutoVideo({ src, className, poster, onError }: { src: string; className?: string; poster?: string; onError?: () => void }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  useEffect(() => {
    if (ref.current?.error) onError?.();
  }, [onError]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduced) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduced]);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" onError={onError} />;
}

function PdfPreview({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px 0px" });
  return <div ref={ref} className="catalogue-preview">{inView && <iframe src={`${src}#toolbar=0&navpanes=0&view=FitH`} title={`${title} preview`} tabIndex={-1} loading="lazy" />}</div>;
}

export default function PortfolioExperience() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const ctaMagnetic = useMagnetic(0.45);
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<DesignFilter>("All");
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const [filmMissing, setFilmMissing] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const visibleDesigns = filter === "All" ? designs : designs.filter(design => design.type === filter);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>("[aria-current]");
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: link.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const sectionProps = (index: number) => ({ id: sections[index].id, onViewportEnter: () => setActive(index), viewport: { margin: "-45% 0px -45% 0px" } });

  return <main id="portfolio-top">
    <section ref={heroRef} className="services-hero portfolio-hero" aria-labelledby="portfolio-title">
      <div className="services-hero-copy">
        <div className="services-kicker"><span><i /> PORTFOLIO</span><span>Selected work.</span></div>
        <motion.div className="hero-headline" style={reduced ? undefined : { y: copyY }}>
          <SplitHeading level={1} id="portfolio-title"><Words text="WORK THAT" /><br /><Words text="WORKS." /><span><Words text="Proof, not" /><br /><Words text="promises." /></span></SplitHeading>
        </motion.div>
        <div className="services-hero-intro">
          <span className="hero-intro-mark" aria-hidden="true">✳</span>
          <p>Websites, product films, social content, AI videos, and catalogues for brands across the UAE, Saudi Arabia, and beyond.</p>
        </div>
        <a className="hero-explore" href="#work"><span className="hero-explore-label"><span data-text="SEE THE WORK">SEE THE WORK</span></span><span className="hero-explore-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span></a>
      </div>
      <div className="services-hero-art portfolio-hero-art">
        <motion.div className="portfolio-hero-video" style={reduced ? undefined : { scale: artScale }}><AutoVideo src="/portfolio/ai-vidies.webm" /></motion.div>
        <motion.ul className="portfolio-hero-stats" initial={reduced ? false : "hidden"} animate="show" variants={stagger}>
          {sections.filter(section => section.id !== "film").map(section => <motion.li key={section.id} variants={rise}><strong>{String(section.count).padStart(2, "0")}</strong><span>{section.label}</span></motion.li>)}
        </motion.ul>
        <span className="portfolio-hero-tag"><i /> NOW PLAYING · AI VIDEO</span>
      </div>
      <div className="services-caption"><span>EVERY PROJECT HERE IS LIVE, SHIPPED, OR PRINTED.</span><span>UAE · KSA · WORLDWIDE</span></div>
    </section>

    <div className="products-marquee portfolio-marquee" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>{sites.map(site => <span key={site.name}>{site.name.toUpperCase()} <i>✳</i> </span>)}</span>)}</div></div>

    <div id="work">
      <nav ref={navRef} className="service-index portfolio-index" aria-label="Portfolio sections">
        {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} className={active === index ? "is-active" : ""} aria-current={active === index ? "location" : undefined}>
          {active === index && <motion.span layoutId="portfolio-index-active" className="products-rail-active" transition={{ duration: reduced ? 0 : 0.5, ease: easeOut }} />}
          <span className="service-index-number">[0{index + 1}]</span>
          <span>{section.label}</span>
          <span className="service-index-arrow" aria-hidden="true">↗</span>
        </a>)}
      </nav>

      <motion.section {...sectionProps(0)} className="portfolio-section" aria-labelledby="websites-title">
        <header className="portfolio-head">
          <div><span className="section-pill"><i /> WEBSITES</span><SplitHeading id="websites-title"><Words text="SITES WE SHIPPED." /><span><Words text="Live, fast, and loved." /></span></SplitHeading></div>
          <Reveal className="portfolio-head-aside"><p>Seven live websites across travel, retail, fintech, AI, education, and luxury gifting. Click any project to visit it.</p></Reveal>
        </header>
        <div className="site-grid">{sites.map((site, index) => <SiteCard key={site.name} site={site} index={index} />)}</div>
      </motion.section>

      <motion.section {...sectionProps(1)} className="portfolio-section portfolio-film" aria-labelledby="film-title">
        <div className="portfolio-film-copy">
          <span className="products-tag">[ FEATURED · PRODUCT FILM ]</span>
          <SplitHeading id="film-title"><Words text="SATOCCI." /><span><Words text="Skip the line." /></span></SplitHeading>
          <Reveal><p>A product demo film for Satocci’s scan-and-pay shopping app, walking through the whole journey from scanning in the aisle to paying and walking out.</p></Reveal>
          <ul className="portfolio-film-meta"><li><span>CLIENT</span>Satocci</li><li><span>WORK</span>Product film · Website</li><li><span>FORMAT</span>Demo video</li></ul>
        </div>
        {filmMissing
          ? <a className="portfolio-film-player is-missing" href="https://www.satocci.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/portfolio/sites/satocci.jpg" alt="Satocci website homepage" fill sizes="(max-width: 1100px) 100vw, 60vw" />
            <span className="portfolio-film-note">Demo video coming soon · Visit satocci.com ↗</span>
          </a>
          : <button type="button" className="portfolio-film-player" onClick={() => setLightbox({ kind: "video", src: satocciDemo, title: "Satocci — product demo" })} data-cursor="Play">
            <AutoVideo src={satocciDemo} poster="/portfolio/sites/satocci.jpg" onError={() => setFilmMissing(true)} />
            <span className="portfolio-play" aria-hidden="true"><i>▶</i></span>
            <span className="sr-only">Play the Satocci product demo</span>
          </button>}
      </motion.section>

      <motion.section {...sectionProps(2)} className="portfolio-section" aria-labelledby="design-title">
        <header className="portfolio-head portfolio-design-head">
          <div><span className="section-pill"><i /> SOCIAL & GRAPHIC DESIGN</span><SplitHeading id="design-title"><Words text="MADE TO STOP" /><br /><Words text="THE SCROLL." /><span><Words text="Posts, posters, and flyers." /></span></SplitHeading></div>
          <div className="design-fan" aria-hidden="true">{fanImages.map((src, index) => <span key={src} className={`design-fan-card fan-${index}`}><Image src={src} alt="" fill sizes="180px" /></span>)}</div>
        </header>
        <div className="digital-filters design-filters" role="group" aria-label="Filter designs">
          {designFilters.map(name => <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>
            {filter === name && <motion.span layoutId="design-filter" className="digital-filter-active" transition={{ duration: reduced ? 0 : 0.45, ease: easeOut }} />}
            <span>{name}</span>
          </button>)}
        </div>
        <p className="sr-only" aria-live="polite">{visibleDesigns.length} designs shown</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={filter} className="design-grid" initial={reduced ? false : "hidden"} animate="show" exit={reduced ? undefined : { opacity: 0, y: 16, transition: { duration: 0.25 } }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
            {visibleDesigns.map(design => <motion.button key={design.image} type="button" className="design-card" style={{ aspectRatio: design.ratio }} variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } } }} onClick={() => setLightbox({ kind: "image", src: design.image, title: `${design.title} — ${design.client}` })} data-cursor="View">
              <Image src={design.image} alt={`${design.title} for ${design.client}`} fill sizes="(max-width: 760px) 50vw, 25vw" />
              <span className="design-card-info"><em>{design.type}</em><strong>{design.title}</strong><small>{design.client}</small></span>
            </motion.button>)}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      <motion.section {...sectionProps(3)} className="portfolio-section portfolio-motion" aria-labelledby="motion-title">
        <header className="portfolio-head">
          <div><span className="section-pill"><i /> AI & VIDEO</span><SplitHeading id="motion-title"><Words text="STORIES IN MOTION." /><span><Words text="Shot, generated, cut." /></span></SplitHeading></div>
          <Reveal className="portfolio-head-aside"><p>AI-generated films, creator campaigns, and short-form reels. Videos play as you scroll. Tap one to watch with sound.</p></Reveal>
        </header>
        <motion.div className="film-grid" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          {films.map((film, index) => <motion.button key={film.src} type="button" className="film-card" variants={rise} onClick={() => setLightbox({ kind: "video", src: film.src, title: film.title })} data-cursor="Play">
            <span className="film-card-media"><AutoVideo src={film.src} /><span className="portfolio-play" aria-hidden="true"><i>▶</i></span></span>
            <span className="film-card-info"><em>0{index + 1} · {film.kind}</em><strong>{film.title}</strong><small>{film.text}</small></span>
          </motion.button>)}
        </motion.div>
      </motion.section>

      <motion.section {...sectionProps(4)} className="portfolio-section" aria-labelledby="catalogues-title">
        <header className="portfolio-head">
          <div><span className="section-pill"><i /> CATALOGUES</span><SplitHeading id="catalogues-title"><Words text="PRINT THAT" /><br /><Words text="FEELS PREMIUM." /><span><Words text="Page after page." /></span></SplitHeading></div>
          <Reveal className="portfolio-head-aside"><p>Catalogues and brochures designed to be held, flipped through, and remembered. Open one to read it.</p></Reveal>
        </header>
        <div className="catalogue-grid">
          {catalogues.map((catalogue, index) => <motion.article key={catalogue.src} className="catalogue-card" initial={reduced ? false : { opacity: 0, y: 50, rotate: index ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease: easeOut, delay: index * 0.1 }}>
            <button type="button" className="catalogue-cover" onClick={() => setLightbox({ kind: "pdf", src: catalogue.src, title: catalogue.title })}>
              <PdfPreview src={catalogue.src} title={catalogue.title} />
              <span className="catalogue-spine" aria-hidden="true" />
              <span className="catalogue-hover" aria-hidden="true"><span>Read catalogue <i>↗</i></span></span>
              <span className="sr-only">Open {catalogue.title}</span>
            </button>
            <div className="catalogue-info">
              <span className="product-kind">{catalogue.client} · PDF · {catalogue.size}</span>
              <h3>{catalogue.title}</h3>
              <p>{catalogue.text}</p>
              <div className="catalogue-actions">
                <button type="button" className="product-cta" onClick={() => setLightbox({ kind: "pdf", src: catalogue.src, title: catalogue.title })}><span>Read catalogue</span><span className="product-cta-arrow" aria-hidden="true">↗</span></button>
                <a href={catalogue.src} download className="catalogue-download">Download PDF ↓</a>
              </div>
            </div>
          </motion.article>)}
        </div>
      </motion.section>
    </div>

    <section className="services-cta" aria-labelledby="portfolio-cta-title">
      <div className="services-cta-copy"><span className="service-eyebrow">[ YOUR PROJECT, NEXT ]</span><SplitHeading id="portfolio-cta-title"><Words text="LIKE WHAT" /><br /><Words text="YOU SEE?" /><br /><em><Words text="LET’S TALK." /></em></SplitHeading><Reveal><p>Every project here started with a simple conversation.<br />Yours can be next.</p></Reveal></div>
      <div className="services-cta-art"><Image src="/services/digital-atelier.webp" alt="Young creatives at work, painted as an aged Renaissance fresco." fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
      <Link href="/contact-us#contact-form" className="services-cta-button" {...ctaMagnetic.handlers}><span>START A PROJECT</span><motion.span aria-hidden="true" style={ctaMagnetic.style}>↗</motion.span></Link>
    </section>
    <Lightbox item={lightbox} onClose={closeLightbox} />
    <ScrollProgress />
    <CursorFollower />
  </main>;
}
