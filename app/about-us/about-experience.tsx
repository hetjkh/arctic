"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CursorFollower, ScrollProgress, SplitHeading, useMagnetic, useTilt, Words } from "../motion-kit";

const MotionLink = motion.create(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;

const manifesto = "We started Arctic Base with a simple belief: the best work happens where timeless craft meets fearless curiosity. We sketch before we pixel, listen before we pitch, and care about the details nobody asked about. That is where the magic lives.";

const stats = [
  { value: 5, label: "Creative disciplines" },
  { value: 2, label: "Founders, one vision" },
  { value: 1, label: "Studio, zero silos" },
  { value: null, label: "Curiosity, always" },
];

const spec = [
  { label: "TYPE", value: "Independent creative studio" },
  { label: "FOUNDED", value: "By a designer and a builder" },
  { label: "FOCUS", value: "Brand, digital, content & film" },
  { label: "BASED", value: "Independent minds, connected worldwide" },
];

const mission = [
  "Turn half-formed ideas into clear direction",
  "Pair timeless craft with modern tools",
  "Build alongside you, never in a black box",
  "Make work people actually remember",
];

const milestones = [
  { label: "CHAPTER 01", title: "The sketchbook", text: "Two friends, one notebook, and far too many ideas for a day job." },
  { label: "CHAPTER 02", title: "The first yes", text: "A local café trusted us with its brand. We said yes before we even had a name." },
  { label: "CHAPTER 03", title: "Arctic Base is born", text: "We made it official: one studio, five disciplines, zero silos." },
  { label: "CHAPTER 04", title: "Going digital", text: "Websites, apps, and campaigns joined the brand work. The team grew with it." },
  { label: "NOW", title: "The next chapter", text: "Working with brands around the world. Still sketching first." },
];

const facts = [
  { label: "TEAM", value: "Small & senior", text: "You work directly with the people doing the work. No hand-offs, no layers." },
  { label: "TYPICAL PROJECT", value: "4–12 weeks", text: "From a focused brand refresh to a full product build, planned in clear milestones." },
  { label: "RESPONSE TIME", value: "< 24 hrs", text: "Questions get real answers fast, usually the same day." },
  { label: "WHERE WE WORK", value: "Everywhere", text: "Remote-first, with working hours that overlap yours." },
];

const engagements = ["Fixed-scope projects", "Monthly retainers", "Long-term creative partnerships"];

const values = [
  { number: "01", title: "Curiosity first.", text: "Every project starts with questions. Who is this for? What makes it different? Why now? Good answers come from better questions.", image: "/services/digital-atelier.webp", alt: "Young creatives with a laptop and tablet in a weathered Renaissance fresco.", position: "center" },
  { number: "02", title: "Craft over shortcuts.", text: "Templates are fast. Thoughtful work lasts. We take the time to get the details right, from the first sketch to the final pixel.", image: "/services/film-makers.webp", alt: "Young filmmakers with a cinema camera on a classical theater set, painted as an aged fresco.", position: "center" },
  { number: "03", title: "Honest by default.", text: "Clear scopes, real timelines, and straight answers. If something isn't working, you'll hear it from us first, along with a better idea.", image: "/conactr.png", alt: "A Renaissance-style fresco of two people reaching toward one another.", position: "center 45%" },
  { number: "04", title: "Made together.", text: "The best work is never made in a vacuum. We build alongside you, share the thinking, and celebrate the wins as one team.", image: "/services/social-muse.webp", alt: "Two modern creators with a smartphone and camera in a classical painted courtyard.", position: "center" },
];

const founders = [
  { name: "Maya Rinaldi", role: "Co-founder & Creative Director", quote: "A brand should feel like someone you’d want to meet.", bio: "Maya leads strategy, identity, and art direction. She has spent her career turning half-formed ideas into brands people remember.", focus: ["Brand strategy", "Art direction", "Design"], position: "28% 32%" },
  { name: "Theo Marchetti", role: "Co-founder & Technology Director", quote: "Beautiful is only half the job. It has to work, too.", bio: "Theo leads development, product, and production. He makes sure every site, app, and campaign is as solid as it looks.", focus: ["Web & apps", "Product", "Production"], position: "70% 26%" },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={rise}>{children}</motion.div>;
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function Counter({ value }: { value: number | null }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView || value === null) return;
    if (reduced) { setDisplay(value); return; }
    const controls = animate(0, value, { duration: 1.4, ease: easeOut, onUpdate: latest => setDisplay(Math.round(latest)) });
    return () => controls.stop();
  }, [inView, value, reduced]);
  return <span ref={ref}>{value === null ? "∞" : String(display).padStart(2, "0")}</span>;
}

function Story() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [percent, setPercent] = useState(0);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] });
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  useMotionValueEvent(sectionProgress, "change", latest => setPercent(Math.round(latest * 100)));
  const words = manifesto.split(" ");
  const pad = (value: number) => String(Math.max(0, Math.round(value))).padStart(4, "0");

  return <section ref={sectionRef} id="about-story" className="about-story" aria-labelledby="about-story-title" onPointerMove={event => { const bounds = event.currentTarget.getBoundingClientRect(); setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top }); }}>
    <div className="about-story-top">
      <span className="section-pill"><i /> OUR STORY</span>
      <span className="about-readout" aria-hidden="true"><span>X:{pad(pointer.x)}PX</span><span>Y:{pad(pointer.y)}PX</span></span>
      <span className="about-readout" aria-hidden="true">{String(percent).padStart(3, "0")}%</span>
    </div>
    <div className="about-story-grid">
      <div className="about-story-side"><div className="about-story-sticky">
        <SplitHeading id="about-story-title"><Words text="Why" /><span><Words text="Arctic Base?" /></span></SplitHeading>
        <dl className="about-spec">{spec.map(item => <div key={item.label}><dt>{item.label}</dt><span aria-hidden="true">:</span><dd>{item.value}</dd></div>)}</dl>
      </div></div>
      <div className="about-story-main">
        <p ref={textRef} className="about-manifesto">{reduced ? manifesto : words.map((word, index) => <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>{word}</Word>)}</p>
        <div className="about-mission">
          <span className="about-mission-label">Our mission:</span>
          <motion.ol initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            {mission.map((item, index) => <motion.li key={item} variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } } }}><span className="about-mission-number">{String(index + 1).padStart(3, "0")}</span><span className="about-mission-text">{item}</span><span className="about-mission-status" aria-hidden="true"><i /> ACTIVE</span></motion.li>)}
          </motion.ol>
        </div>
      </div>
    </div>
    <dl className="about-stats">
      {stats.map((stat, index) => <div key={stat.label} className="about-stat"><dt><span>[ {String(index + 1).padStart(2, "0")} ]</span>{stat.label}</dt><dd><Counter value={stat.value} /></dd></div>)}
    </dl>
  </section>;
}

function Milestone({ milestone, index, total, progress }: { milestone: (typeof milestones)[number]; index: number; total: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const point = index / (total - 1);
  const fill = useTransform(progress, [Math.max(0, point - 0.06), point], [0, 1]);
  return <motion.li className={`about-milestone${milestone.label === "NOW" ? " is-now" : ""}`} variants={rise}>
    <span className="about-milestone-dot" aria-hidden="true"><motion.i style={reduced ? undefined : { opacity: fill, scale: fill }} /></span>
    <span className="about-milestone-label">{milestone.label}</span>
    <h3>{milestone.title}</h3>
    <p>{milestone.text}</p>
  </motion.li>;
}

function Timeline() {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.85", "end 0.55"] });
  return <section className="about-timeline" aria-labelledby="about-timeline-title">
    <div className="about-timeline-head">
      <span className="section-pill"><i /> HOW WE GOT HERE</span>
      <SplitHeading id="about-timeline-title"><Words text="A SHORT HISTORY." /><span><Words text="So far, so curious." /></span></SplitHeading>
    </div>
    <div className="about-timeline-body">
      <motion.span className="about-timeline-line" aria-hidden="true" style={{ "--line-progress": reduced ? 1 : scrollYProgress } as MotionStyle}><i /></motion.span>
      <motion.ol ref={listRef} className="about-timeline-list" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
        {milestones.map((milestone, index) => <Milestone key={milestone.title} milestone={milestone} index={index} total={milestones.length} progress={scrollYProgress} />)}
      </motion.ol>
    </div>
  </section>;
}

function WorkTogether() {
  const reduced = useReducedMotion();
  const magnetic = useMagnetic(0.3);
  return <section className="about-facts" aria-labelledby="about-facts-title">
    <div className="about-facts-head">
      <span className="about-facts-tag">[ 002 — WORKING WITH US ]</span>
      <SplitHeading id="about-facts-title"><Words text="HOW WE WORK" /><span><Words text="together." /></span></SplitHeading>
      <Reveal><p>No mystery, no black boxes. Here’s what you can expect from day one.</p></Reveal>
    </div>
    <motion.dl className="about-facts-grid" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
      {facts.map((fact, index) => <motion.div key={fact.label} className="about-fact" variants={rise}>
        <dt><span>0{index + 1}</span>{fact.label}</dt>
        <dd><strong>{fact.value}</strong><span>{fact.text}</span></dd>
      </motion.div>)}
    </motion.dl>
    <div className="about-facts-foot">
      <span className="about-facts-tag">WAYS TO WORK:</span>
      <ul>{engagements.map(item => <li key={item}>{item}</li>)}</ul>
      <MotionLink href="/contact-us#contact-form" className="about-facts-link" style={magnetic.style} {...magnetic.handlers}><span>Start a project</span><span aria-hidden="true">↗</span></MotionLink>
    </div>
  </section>;
}

function Values() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, value => -value * distance);
  const pinned = desktop && !reduced && distance > 0;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    const measure = () => {
      setDesktop(media.matches);
      if (trackRef.current && viewportRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    media.addEventListener("change", measure);
    return () => { observer.disconnect(); media.removeEventListener("change", measure); };
  }, []);

  return <section ref={sectionRef} className={`about-values${pinned ? " is-pinned" : ""}`} style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined} aria-labelledby="about-values-title">
    <div className="about-values-sticky">
      <div className="about-values-head">
        <div><span className="section-pill"><i /> WHAT WE BELIEVE</span><SplitHeading id="about-values-title"><Words text="FOUR PROMISES." /><span><Words text="We never break them." /></span></SplitHeading></div>
        <div className="about-values-progress" aria-hidden="true"><span>01</span><div><motion.i style={{ scaleX: pinned ? scrollYProgress : 1 }} /></div><span>04</span></div>
      </div>
      <div ref={viewportRef} className="about-values-viewport" data-cursor={pinned ? "Scroll" : "Swipe"}>
        <motion.div ref={trackRef} className="about-values-track" style={{ x: pinned ? x : 0 }}>
          {values.map(value => <article key={value.number} className="about-value">
            <div className="about-value-art"><Image src={value.image} alt={value.alt} fill sizes="(max-width: 760px) 85vw, 34vw" style={{ objectPosition: value.position }} /></div>
            <div className="about-value-copy"><span className="about-value-number">{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></div>
          </article>)}
          <Link href="/services" className="about-value about-value-link"><span>SEE WHAT WE DO</span><strong>Our services</strong><span className="about-value-link-arrow" aria-hidden="true">↗</span></Link>
        </motion.div>
      </div>
    </div>
  </section>;
}

function Founders() {
  const reduced = useReducedMotion();
  return <section id="founders" className="about-founders" aria-labelledby="founders-title">
    <div className="about-founders-head">
      <span className="section-pill"><i /> THE FOUNDERS</span>
      <SplitHeading id="founders-title"><Words text="TWO PEOPLE." /><span><Words text="One shared obsession." /></span></SplitHeading>
      <Reveal><p>A designer and a builder who kept finishing each other’s sketches. So they started a studio.</p></Reveal>
    </div>
    <div className="about-founders-grid">
      {founders.map((founder, index) => <FounderCard key={founder.name} founder={founder} index={index} reduced={Boolean(reduced)} />)}
    </div>
  </section>;
}

function FounderCard({ founder, index, reduced }: { founder: (typeof founders)[number]; index: number; reduced: boolean }) {
  const tilt = useTilt(6);
  return <motion.article className="founder-card" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
    <motion.div className="founder-portrait" data-cursor="Say hi" style={tilt.style} {...tilt.handlers} variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: easeInOut, delay: index * 0.15 } } }}>
      <Image src="/services/design-muse.webp" alt={`Portrait of ${founder.name}, painted in the style of a Renaissance fresco.`} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: founder.position, transformOrigin: founder.position }} />
      <span className="founder-index">0{index + 1} / 02</span>
      <blockquote className="founder-quote">“{founder.quote}”</blockquote>
    </motion.div>
    <motion.div className="founder-copy" variants={rise}>
      <div className="founder-name"><h3>{founder.name}</h3><span>{founder.role}</span></div>
      <p>{founder.bio}</p>
      <ul>{founder.focus.map(item => <li key={item}>{item}</li>)}</ul>
    </motion.div>
  </motion.article>;
}

function ClosingCta() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const magnetic = useMagnetic(0.45);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const imageClip = useTransform(scrollYProgress, [0, 0.7], ["inset(18% 12% 18% 12%)", "inset(0% 0% 0% 0%)"]);
  return <section ref={sectionRef} className="services-cta" aria-labelledby="about-cta-title">
    <div className="services-cta-copy"><span className="service-eyebrow">[ THE NEXT CHAPTER COULD BE YOURS ]</span><SplitHeading id="about-cta-title"><Words text="LET’S WRITE" /><br /><Words text="IT" /><br /><em><Words text="TOGETHER." /></em></SplitHeading><Reveal><p>Got an idea, a challenge, or just a hunch?<br />We’d love to hear about it.</p></Reveal></div>
    <motion.div className="services-cta-art" style={reduced ? undefined : { clipPath: imageClip }}><motion.div className="about-cta-zoom" style={reduced ? undefined : { scale: imageScale }}><Image src="/services/digital-atelier.webp" alt="Young creatives at work, painted as an aged Renaissance fresco." fill sizes="(max-width: 760px) 100vw, 45vw" /></motion.div></motion.div>
    <Link href="/contact-us#contact-form" className="services-cta-button" {...magnetic.handlers}><span>SAY HELLO</span><motion.span aria-hidden="true" style={magnetic.style}>↗</motion.span></Link>
  </section>;
}

export default function AboutExperience() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroExit } = useScroll({ target: heroSectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(heroExit, [0, 1], [0, -90]);
  const copyOpacity = useTransform(heroExit, [0, 0.85], [1, 0.25]);
  const badge = useMagnetic(0.4);

  return <main id="about-top">
    <section ref={heroSectionRef} className="services-hero" aria-labelledby="about-title">
      <div className="services-hero-copy">
        <div className="services-kicker"><span><i /> ABOUT US</span><span>Old souls. New ideas.</span></div>
        <motion.div className="hero-headline" style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
          <SplitHeading level={1} id="about-title"><Words text="MADE BY" /><br /><Words text="HUMANS." /><span><Words text="Built on" /><br /><Words text="curiosity." /></span></SplitHeading>
        </motion.div>
        <div className="services-hero-intro">
          <span className="hero-intro-mark" aria-hidden="true">✳</span>
          <p>We’re a small, independent studio for brands with a little more to say. Part atelier, part laboratory, entirely human.</p>
        </div>
        <a className="hero-explore" href="#founders"><span className="hero-explore-label"><span data-text="MEET THE FOUNDERS">MEET THE FOUNDERS</span></span><span className="hero-explore-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span></a>
      </div>
      <div className="services-hero-art" ref={heroRef}>
        <div className="hero-art-frame">
          <motion.div className="hero-art-image" style={{ y: reduced ? 0 : heroY }}>
            <Image src="/services/brand-makers.webp" alt="Two young designers creating a visual identity in a Renaissance printmaker workshop, painted as an aged fresco." fill sizes="(max-width: 760px) 100vw, 50vw" preload />
          </motion.div>
        </div>
        <motion.div className="about-hero-badge" aria-hidden="true" style={badge.style} {...badge.handlers}>
          <svg viewBox="0 0 200 200"><defs><path id="about-badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs><text><textPath href="#about-badge-circle">ARCTIC BASE ✳ CREATIVE STUDIO ✳ SINCE DAY ONE ✳ </textPath></text></svg>
          <span>✳</span>
        </motion.div>
        <div className="hero-art-seal"><span>SINCE DAY ONE</span><strong>Craft is<br />our compass.</strong><span>ARCTIC BASE — CREATIVE STUDIO</span></div>
      </div>
      <div className="services-caption"><span>A STUDIO OF MAKERS, THINKERS, AND TINKERERS.</span><span>SMALL TEAM. BIG AMBITION.</span></div>
    </section>

    <Story />
    <Timeline />
    <Values />
    <Founders />
    <WorkTogether />

    <ClosingCta />
    <ScrollProgress />
    <CursorFollower />
  </main>;
}
