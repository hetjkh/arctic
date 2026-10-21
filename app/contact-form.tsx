"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { easeOut } from "./motion-kit";

type Status = "idle" | "sending" | "sent";

const fieldRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const labels: Record<Status, { text: string; note: string }> = {
  idle: { text: "LET’S CONNECT", note: "A meeting of minds starts here. This form is a demo." },
  sending: { text: "SENDING…", note: "Packing your message with care." },
  sent: { text: "THANK YOU", note: "Demo complete. Thank you for trying it — no message was sent." },
};

function Field({ label, aside, className = "", children }: { label: string; aside?: string; className?: string; children: ReactNode }) {
  return <motion.label className={`field ${className}`} variants={fieldRise}>
    <span className="field-label" aria-hidden="true">{label}</span>
    {children}
    {aside && <span className="field-aside" aria-hidden="true">{aside}</span>}
    <span className="field-check" aria-hidden="true">✓</span>
  </motion.label>;
}

export default function ContactForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    timer.current = window.setTimeout(() => setStatus("sent"), reduced ? 0 : 1200);
  }

  function handleInvalid(event: FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLElement).closest(".field");
    if (!field) return;
    field.classList.remove("is-invalid");
    void (field as HTMLElement).offsetWidth;
    field.classList.add("is-invalid");
  }

  return (
    <motion.form id="contact-form" onSubmit={handleSubmit} onInvalidCapture={handleInvalid} onChange={event => { (event.target as HTMLElement).closest(".field")?.classList.remove("is-invalid"); if (status === "sent") setStatus("idle"); }} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}>
      <div className="name-fields">
        <Field label="FIRST NAME">
          <span className="sr-only">First name (required)</span>
          <input name="firstName" autoComplete="given-name" placeholder="FIRST NAME" required maxLength={80} />
        </Field>
        <Field label="LAST NAME">
          <span className="sr-only">Last name (required)</span>
          <input name="lastName" autoComplete="family-name" placeholder="LAST NAME" required maxLength={80} />
        </Field>
      </div>
      <Field label="EMAIL" aside="REQUIRED">
        <span className="sr-only">Email (required)</span>
        <input name="email" type="email" autoComplete="email" placeholder="EMAIL" required maxLength={254} />
      </Field>
      <Field label="PHONE NUMBER" aside="OPTIONAL">
        <span className="sr-only">Phone number (optional)</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="PHONE NUMBER" maxLength={40} pattern="[0-9+()\-\s]{6,40}" />
      </Field>
      <Field label="MESSAGE" className="message-field">
        <span className="sr-only">Message (required)</span>
        <textarea name="message" placeholder="MESSAGE" required maxLength={5000} />
        <span className="message-hint">BIG IDEAS, SMALL QUESTIONS. WE’RE ALL EARS.</span>
      </Field>
      <motion.div className="submit-area" variants={fieldRise}>
        <button type="submit" className={`submit-button is-${status}`} disabled={status === "sending"}>
          <span className="submit-label">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={status} className="submit-label-roll" data-text={labels[status].text} initial={reduced ? false : { y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={reduced ? undefined : { y: "-100%", opacity: 0 }} transition={{ duration: 0.35, ease: easeOut }}>{labels[status].text}</motion.span>
            </AnimatePresence>
          </span>
          <span className="submit-arrow" aria-hidden="true">
            {status === "sending" ? <span className="submit-spinner" /> : status === "sent" ? <motion.span initial={reduced ? false : { scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 420, damping: 16 }}>✓</motion.span> : <span className="submit-arrow-icon">↗</span>}
          </span>
        </button>
        <p className="form-note" role="status">{labels[status].note}</p>
      </motion.div>
    </motion.form>
  );
}
