"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const services = [
  { id: "development", name: "Website / App Development", short: "WEB & APP", title: "Built to work.\nMade to stand out.", description: "Your next big idea deserves more than a template. We turn it into a thoughtful digital experience that looks good, feels effortless, and works beautifully.", offerings: ["Website design & development", "Web & mobile applications", "E-commerce experiences", "Ongoing care & improvements"], image: "digital-atelier", alt: "Young creatives with a laptop and tablet in a weathered Renaissance fresco.", caption: "THE ART OF BUILDING", position: "center" },
  { id: "social", name: "Social Media Marketing", short: "SOCIAL MEDIA", title: "Less scrolling past.\nMore stopping by.", description: "Show up with something worth paying attention to. We bring strategy, personality, and a little cultural curiosity to content that starts real conversations.", offerings: ["Social strategy & planning", "Content creation & campaigns", "Community management", "Paid social & reporting"], image: "social-muse", alt: "Two modern content creators with a smartphone and camera in a classical painted courtyard.", caption: "THE ART OF CONVERSATION", position: "center" },
  { id: "graphic", name: "Graphic Design", short: "GRAPHIC DESIGN", title: "A fresh perspective.\nIn every pixel.", description: "From the first impression to the smallest detail, we make your ideas visible. Distinctive design, with the clarity and consistency to hold everything together.", offerings: ["Digital & print design", "Campaign visuals", "Packaging & publications", "Presentations & editorial"], image: "design-muse", alt: "A young designer with headphones sketching on a tablet in an antique fresco studio.", caption: "THE ART OF EXPRESSION", position: "center" },
  { id: "video", name: "Video Production", short: "VIDEO", title: "A story worth\npressing play on.", description: "A feeling. A moment. A message that stays with you. We take your story from the first scribble to the final frame, made for the screens your audience lives on.", offerings: ["Creative concepts & scripts", "Filming & direction", "Editing & motion graphics", "Brand films & short-form video"], image: "film-makers", alt: "Young filmmakers with a cinema camera and clapperboard on a classical theater set, rendered as an aged fresco.", caption: "THE ART OF STORYTELLING", position: "center" },
  { id: "brand", name: "Brand Design", short: "BRAND DESIGN", title: "Be yourself.\nBe unmistakable.", description: "More than a logo. A point of view. We help you find what makes your brand yours, then build an identity that carries it into everything you put into the world.", offerings: ["Brand strategy & positioning", "Logo & visual identity", "Art direction & brand voice", "Guidelines & brand systems"], image: "brand-makers", alt: "Two young brand designers creating a visual identity and packaging in a Renaissance printmaker workshop.", caption: "THE ART OF IDENTITY", position: "center" },
];

const steps = [
  { name: "Find the spark.", label: "DISCOVER", text: "We listen first. Your ambitions, your audience, and the things that make you different. Together, we turn the right questions into a clear direction." },
  { name: "Make it take shape.", label: "CREATE", text: "Ideas become sketches, stories, and working prototypes. We share the thinking, explore the possibilities, and refine the details with you." },
  { name: "Put it into the world.", label: "LAUNCH", text: "We bring the pieces together, check the details, and get you ready to go. Then we help your next chapter keep moving forward." },
];

const questions = [
  { question: "Can we work together on just one service?", answer: "Absolutely. Come to us for a single project or bring us in across several services. We’ll shape the scope around what you actually need." },
  { question: "What if I only have the beginning of an idea?", answer: "That’s a good place to start. Tell us what you’re thinking and what you want to achieve. We can help you figure out the direction, priorities, and next steps." },
  { question: "How do you price a project?", answer: "Every project has a different scope. Once we understand the deliverables, complexity, and timeline, we’ll put together a proposal so you know what’s included before work begins." },
  { question: "How long does a project usually take?", answer: "Timing depends on the work. A focused design project and a full app build need very different schedules. We’ll agree on milestones and a realistic timeline together." },
  { question: "Can you work with our existing brand or team?", answer: "Yes. We can build on your existing identity, collaborate with your in-house team, or help you explore a new direction. We’ll work out the best fit together." },
];

const easeInOut = [0.76, 0, 0.24, 1] as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

const chapterVariants: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const chapterItem: Variants = {
  hidden: { opacity: 0.12, y: 36, filter: "blur(6px)", transition: { duration: 0.5, ease: easeOut } },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
};

const galleryVariants: Variants = {
  enter: (direction: number) => ({ clipPath: direction > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", zIndex: 2, opacity: 1 }),
  center: { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2, opacity: 1, transition: { clipPath: { duration: 1.05, ease: easeInOut }, zIndex: { duration: 0 } } },
  exit: { zIndex: 1, opacity: 0, transition: { zIndex: { duration: 0 }, opacity: { duration: 0.2, delay: 1 } } },
};
const galleryReduced: Variants = {
  enter: { opacity: 0, zIndex: 2 },
  center: { opacity: 1, zIndex: 2, transition: { duration: 0 } },
  exit: { opacity: 0, zIndex: 1, transition: { duration: 0 } },
};

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <div className={className}><motion.div initial={false} whileInView={reduced ? {} : { y: [22, 0] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div></div>;
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const reduced = useReducedMotion();
  return <div className={`service-faq-item${open ? " is-open" : ""}`}>
    <h3><button aria-expanded={open} aria-controls={`answer-${index}`} id={`question-${index}`} onClick={() => setOpen(!open)}><span className="faq-number">Q.0{index + 1}</span><span className="faq-question">{question}</span><span className="faq-toggle" aria-hidden="true"><i /><i /></span></button></h3>
    <motion.div id={`answer-${index}`} role="region" aria-labelledby={`question-${index}`} aria-hidden={!open} initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="faq-answer"><p>{answer}</p></motion.div>
  </div>;
}

export default function ServicesExperience() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const goTo = (index: number) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceIndexRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    const navigation = serviceIndexRef.current;
    const currentLink = navigation?.children[active] as HTMLElement | undefined;
    if (!navigation || !currentLink || navigation.scrollWidth <= navigation.clientWidth) return;
    navigation.scrollTo({
      left: currentLink.offsetLeft - navigation.clientWidth / 2 + currentLink.offsetWidth / 2,
      behavior: reduced ? "instant" : "smooth",
    });
  }, [active, reduced]);

  useEffect(() => {
    const story = storyRef.current;
    const navigation = serviceIndexRef.current;
    if (!story || !navigation) return;
    const desktop = window.matchMedia("(min-width: 761px)");
    let timer = 0;
    const snap = () => {
      if (!desktop.matches || document.documentElement.dataset.smoothScrolling) return;
      const offset = Math.max(0, navigation.getBoundingClientRect().bottom);
      const bounds = story.getBoundingClientRect();
      if (bounds.top > offset + 1 || bounds.bottom < window.innerHeight - 1) return;
      let distance = Infinity;
      for (const chapter of Array.from(story.children)) {
        const gap = chapter.getBoundingClientRect().top - offset;
        if (Math.abs(gap) < Math.abs(distance)) distance = gap;
      }
      if (Math.abs(distance) < 4 || Math.abs(distance) > window.innerHeight) return;
      window.scrollTo({ top: window.scrollY + distance, behavior: reduced ? "instant" : "smooth" });
    };
    const supportsScrollEnd = "onscrollend" in window;
    const onScroll = () => { window.clearTimeout(timer); timer = window.setTimeout(snap, 160); };
    if (supportsScrollEnd) window.addEventListener("scrollend", snap);
    else window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", snap);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return <main id="services-top">
    <section className="services-hero" aria-labelledby="services-title">
      <div className="services-hero-copy">
        <div className="services-kicker"><span><i /> OUR SERVICES</span><span>Creative by nature.</span></div>
        <Reveal className="hero-headline">
          <h1 id="services-title">OLD-SCHOOL<br />CRAFT.<span>New-world<br />ideas.</span></h1>
        </Reveal>
        <div className="services-hero-intro">
          <span className="hero-intro-mark" aria-hidden="true">✳</span>
          <p>For brands with a little more to say. We build, design, and create things that make people feel something.</p>
        </div>
        <a className="hero-explore" href="#our-services"><span className="hero-explore-label"><span data-text="EXPLORE OUR SERVICES">EXPLORE OUR SERVICES</span></span><span className="hero-explore-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span></a>
      </div>
      <div className="services-hero-art" ref={heroRef}>
        <div className="hero-art-topline"><span>A DIFFERENT KIND OF STUDIO</span><span>[ EST. FOR THE FUTURE ]</span></div>
        <div className="hero-art-frame">
          <motion.div className="hero-art-image" style={{ y: reduced ? 0 : heroY }}>
            <Image src="/services/digital-atelier.webp" alt="A new generation of creatives with laptops, headphones, and cameras, painted into an aged Renaissance fresco." fill sizes="(max-width: 760px) 100vw, 65vw" preload />
          </motion.div>
        </div>
        <div className="hero-art-seal"><span>THE NEXT</span><strong>Renaissance<br />is yours.</strong><span>ARCTIC BASE — CREATIVE STUDIO</span></div>
        <div className="hero-art-bottomline"><span>FIG. 01 — THE CREATIVE ATELIER</span><span aria-hidden="true">↙</span></div>
      </div>
      <div className="services-caption"><span>TIMELESS THINKING. CONTEMPORARY TOOLS.</span><span>FIVE DISCIPLINES. ONE CREATIVE PARTNER.</span></div>
    </section>

    <section id="our-services" className="services-collection" aria-labelledby="services-heading">
      <header className="service-section-heading">
        <div className="service-heading-top"><span className="section-pill"><i /> WHAT WE DO</span><span>FIVE DISCIPLINES — ONE STUDIO</span></div>
        <div className="service-heading-main">
          <Reveal><h2 id="services-heading">YOUR NEXT CHAPTER.<span>Our kind of work.</span></h2></Reveal>
          <div className="service-heading-aside"><p>From the first idea to the final detail.</p><p>Pick a starting point. We’ll take it from there.</p><span className="service-heading-scroll" aria-hidden="true">↓</span></div>
        </div>
      </header>
      <nav ref={serviceIndexRef} className="service-index" aria-label="Explore services">{services.map((service, index) => <a key={service.id} href={`#${service.id}`} className={active === index ? "is-active" : ""} aria-current={active === index ? "location" : undefined}><span className="service-index-number">[0{index + 1}]</span><span>{service.short}</span><span className="service-index-arrow" aria-hidden="true">↗</span></a>)}</nav>
      <div className="service-story">
        <div ref={storyRef} className="service-story-copy">{services.map((service, index) => <motion.article key={service.id} id={service.id} className="service-chapter" initial={reduced ? false : "hidden"} animate={reduced || active === index ? "show" : "hidden"} variants={chapterVariants} onViewportEnter={() => goTo(index)} viewport={{ margin: "-50% 0px -50% 0px" }} aria-labelledby={`${service.id}-title`}>
          <motion.div variants={chapterItem} className="service-chapter-meta">
            <span className="service-chapter-name"><i aria-hidden="true" />{service.name}</span>
            <span className="service-chapter-number"><strong>0{index + 1}</strong><span>/ 05</span></span>
          </motion.div>
          <motion.h3 variants={chapterItem} id={`${service.id}-title`}><span>{service.title.split("\n")[0]}</span><em>{service.title.split("\n")[1]}</em></motion.h3>
          <motion.p variants={chapterItem} className="service-description">{service.description}</motion.p>
          <motion.div variants={chapterItem} className="service-offerings-label">WHAT WE CAN MAKE TOGETHER <span aria-hidden="true">↙</span></motion.div>
          <motion.ul variants={chapterVariants} className="service-deliverables">{service.offerings.map((item, offeringIndex) => <motion.li variants={chapterItem} key={item}><span className="service-deliverable-number" aria-hidden="true">0{offeringIndex + 1}</span><span>{item}</span></motion.li>)}</motion.ul>
          <motion.div variants={chapterItem} className="service-chapter-action"><Link href="/contact-us#contact-form" className="service-chapter-cta"><span>LET’S TALK {service.short === "WEB & APP" ? "DIGITAL" : service.short}</span><span className="service-chapter-cta-arrow" aria-hidden="true"><span>↗</span><span>↗</span></span></Link></motion.div>
          <div className="service-mobile-art"><Image src={`/services/${service.image}.webp`} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 1px" style={{ objectPosition: service.position }} /></div>
        </motion.article>)}</div>
        <div className="service-gallery" aria-hidden="true"><div className="service-gallery-sticky">
          {services.map(service => <div key={service.id} className="service-gallery-preload"><Image src={`/services/${service.image}.webp`} alt="" fill sizes="(max-width: 760px) 1px, 50vw" /></div>)}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={services[active].id} className="service-gallery-layer" custom={direction} variants={reduced ? galleryReduced : galleryVariants} initial="enter" animate="center" exit="exit">
              <motion.div className="service-gallery-zoom" initial={{ scale: reduced ? 1 : 1.18 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}><Image src={`/services/${services[active].image}.webp`} alt="" fill sizes="(max-width: 760px) 1px, 50vw" style={{ objectPosition: services[active].position }} /></motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="service-gallery-caption"><AnimatePresence mode="wait" initial={false}><motion.span key={active} className="service-gallery-caption-text" initial={{ y: reduced ? 0 : 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reduced ? 0 : -14, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}><span>{services[active].caption}</span><span>0{active + 1} — 05</span></motion.span></AnimatePresence></div><div className="service-gallery-lines">{services.map((service, index) => <span key={service.id} className={active === index ? "is-active" : ""} />)}</div></div></div>
      </div>
    </section>

    <section className="services-process" aria-labelledby="process-title">
      <div className="process-intro"><div className="process-sticky"><span className="service-eyebrow">[ HOW WE WORK ]</span><Reveal><h2 id="process-title">BIG IDEAS.<br />CLEAR STEPS.</h2></Reveal><p>A collaborative process.<br />A shared ambition. Something to be proud of.</p><span className="process-scroll">SCROLL TO SEE IT COME TOGETHER <span aria-hidden="true">↓</span></span><div className="process-art"><Image src="/services/design-muse.webp" alt="A modern creative workshop imagined as an antique wall painting." fill sizes="(max-width: 760px) 100vw, 40vw" /></div></div></div>
      <div className="process-steps">{steps.map((step, index) => <Reveal className="process-step" key={step.label}><div className="process-step-top"><span>STEP / {step.label}</span><span className="process-number">0{index + 1}</span></div><h3>{step.name}</h3><p>{step.text}</p><span className="process-step-mark" aria-hidden="true">{index === 0 ? "✳" : index === 1 ? "✺" : "↗"}</span></Reveal>)}</div>
    </section>

    <section className="services-faq" aria-labelledby="faq-title">
      <div className="faq-heading"><div className="faq-sticky">
        <span className="faq-badge"><i /> FAQ — FREQUENTLY ASKED QUESTIONS</span>
        <span className="faq-display" aria-hidden="true">F<em>a</em>Q</span>
        <Reveal><h2 id="faq-title">Good questions.<br /><em>Honest answers.</em></h2></Reveal>
        <div className="faq-contact"><p>Something else on your mind?</p><Link href="/contact-us#contact-form"><span>We’re all ears</span><span aria-hidden="true">↗</span></Link></div>
      </div></div>
      <div className="faq-items">
        <div className="faq-items-top"><span>0{questions.length} QUESTIONS</span><span>TAP A QUESTION TO OPEN</span></div>
        {questions.map((item, index) => <FaqItem key={item.question} {...item} index={index} />)}
      </div>
    </section>

    <section className="services-cta" aria-labelledby="cta-title"><div className="services-cta-copy"><span className="service-eyebrow">[ YOUR NEXT CHAPTER STARTS HERE ]</span><Reveal><h2 id="cta-title">LET’S MAKE<br />SOMETHING<br /><em>MATTER.</em></h2></Reveal><p>A wild idea. A new beginning. A “what if”.<br />We’d love to hear it.</p></div><div className="services-cta-art"><Image src="/services/social-muse.webp" alt="Modern storytellers meet old-world artistry in a Renaissance-style fresco." fill sizes="(max-width: 760px) 100vw, 45vw" /></div><Link href="/contact-us#contact-form" className="services-cta-button"><span>START A CONVERSATION</span><span aria-hidden="true">↗</span></Link></section>
  </main>;
}
