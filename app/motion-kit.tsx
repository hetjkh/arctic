"use client";

import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "motion/react";
import { Fragment, useEffect, useState, type PointerEvent, type ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.76, 0, 0.24, 1] as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
};
export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const wordVariants: Variants = {
  hidden: { y: "115%", rotate: 5 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: easeOut } },
};

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={rise}>{children}</motion.div>;
}

export function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return <>{words.map((word, index) => <Fragment key={index}><span className="word-mask"><motion.span className="word-inner" variants={wordVariants}>{word}</motion.span></span>{index < words.length - 1 ? " " : null}</Fragment>)}</>;
}

export function SplitHeading({ level = 2, id, className, children }: { level?: 1 | 2; id?: string; className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const Tag = level === 1 ? motion.h1 : motion.h2;
  return <Tag id={id} className={className} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>{children}</Tag>;
}

export function useMagnetic(strength = 0.35) {
  const reduced = useReducedMotion();
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  return {
    style: { x, y },
    handlers: {
      onPointerMove: (event: PointerEvent<HTMLElement>) => {
        if (reduced || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
        y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
      },
      onPointerLeave: () => { x.set(0); y.set(0); },
    },
  };
}

export function useTilt(max = 8) {
  const reduced = useReducedMotion();
  const spring = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    handlers: {
      onPointerMove: (event: PointerEvent<HTMLElement>) => {
        if (reduced || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * max * 2);
        rotateX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * max * 2);
      },
      onPointerLeave: () => { rotateX.set(0); rotateY.set(0); },
    },
  };
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX }} />;
}

export function CursorFollower() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ active: boolean; label: string | null; hidden: boolean }>({ active: false, label: null, hidden: true });
  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.5 });
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches && !reduced);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: globalThis.PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button");
      setState(previous => {
        const next = { active: Boolean(labelled || interactive), label: labelled?.dataset.cursor ?? null, hidden: false };
        return previous.active === next.active && previous.label === next.label && previous.hidden === next.hidden ? previous : next;
      });
    };
    const onLeave = () => setState(previous => ({ ...previous, hidden: true }));
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return <motion.div className={`cursor-follower${state.active ? " is-active" : ""}${state.label ? " has-label" : ""}${state.hidden ? " is-hidden" : ""}`} aria-hidden="true" style={{ x, y }}><span>{state.label}</span></motion.div>;
}
