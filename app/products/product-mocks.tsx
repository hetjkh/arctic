"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { easeOut } from "../motion-kit";

function WindowBar({ title }: { title: string }) {
  return <div className="mock-bar"><span /><span /><span /><strong>{title}</strong></div>;
}

const switchApps = [
  { letter: "W", name: "WhatsApp", color: "#7fc79a" },
  { letter: "G", name: "Gmail", color: "#e6a29a" },
  { letter: "S", name: "Slack", color: "#c8a6dc" },
  { letter: "in", name: "LinkedIn", color: "#9bb8d9" },
];

const switchMessages = [
  { from: "Jamie from Design", via: "WhatsApp", text: "The new designs look amazing! ✨" },
  { from: "Alex Lee", via: "Slack", text: "A little update on the next launch." },
  { from: "Morgan Kim", via: "Gmail", text: "Ready when you are. Let’s do this." },
];

export function SwitchMock() {
  const reduced = useReducedMotion();
  const [message, setMessage] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setMessage(current => (current + 1) % switchMessages.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduced]);
  const current = switchMessages[message];
  return <div className="mock mock-switch">
    <WindowBar title="ArcticSwitch — My workspace" />
    <div className="mock-switch-body">
      <aside className="mock-switch-side">
        <span className="mock-caption">SPACES</span>
        <span className="mock-space is-active">Work <b>4</b></span>
        <span className="mock-space">Personal <b>2</b></span>
        <span className="mock-caption">APPS</span>
        {switchApps.map(app => <span key={app.name} className="mock-app"><i style={{ background: app.color }}>{app.letter}</i>{app.name}</span>)}
      </aside>
      <div className="mock-switch-main">
        <span className="mock-caption">A FRESH SPACE FOR YOUR DAY</span>
        <strong className="mock-greeting">Good morning, Alex ☀</strong>
        <div className="mock-stats">
          <span><b>4</b>Connected apps</span>
          <span><b>4</b>Unread</span>
          <span><b>Work</b>Active space</span>
        </div>
        <div className="mock-notification-slot">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={message} className="mock-notification" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: easeOut }}>
              <i>{current.from.slice(0, 1)}</i>
              <span><strong>{current.from}</strong><small>via {current.via} · just now</small>{current.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>;
}

const osPrompts = [
  "Draft a proposal for Lumen Café’s rebrand",
  "Invoice Northwind for March, net 14",
  "Which clients haven’t heard from us this month?",
];

const osClients = [
  { name: "Lumen Café", status: "Proposal drafted", tone: "lavender" },
  { name: "Northwind Co.", status: "Invoice paid", tone: "green" },
  { name: "Atlas Studio", status: "In progress", tone: "amber" },
];

export function OsMock() {
  const reduced = useReducedMotion();
  const [prompt, setPrompt] = useState(0);
  const [typing, setTyped] = useState("");
  useEffect(() => {
    if (reduced) return;
    const text = osPrompts[prompt];
    let index = 0;
    let next = 0;
    const typing = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(typing);
        next = window.setTimeout(() => setPrompt(current => (current + 1) % osPrompts.length), 2200);
      }
    }, 38);
    return () => { window.clearInterval(typing); window.clearTimeout(next); };
  }, [prompt, reduced]);
  const typed = reduced ? osPrompts[prompt] : typing;
  const done = typed.length === osPrompts[prompt].length;
  return <div className="mock mock-os">
    <WindowBar title="ArcticOS — Studio" />
    <div className="mock-os-body">
      <aside className="mock-os-side">
        {["Dashboard", "Clients", "Proposals", "Invoices", "Projects"].map((item, index) => <span key={item} className={index === 0 ? "is-active" : ""}>{item}</span>)}
      </aside>
      <div className="mock-os-main">
        <div className="mock-os-prompt"><i>✦</i><span>{typed}<b className={done ? "is-done" : ""} /></span></div>
        <AnimatePresence initial={false}>
          {done && <motion.div key={prompt} className="mock-os-answer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
            <span className="mock-caption">ARCTIC AI</span>
            <strong>{prompt === 0 ? "Proposal ready — 3 sections, $8,400" : prompt === 1 ? "Invoice #0043 created and scheduled" : "2 clients need a check-in this week"}</strong>
            <span className="mock-os-actions"><em>Review</em><em>Send</em></span>
          </motion.div>}
        </AnimatePresence>
        <div className="mock-os-clients">
          {osClients.map(client => <span key={client.name}><i>{client.name.slice(0, 1)}</i>{client.name}<em className={`tone-${client.tone}`}>{client.status}</em></span>)}
        </div>
      </div>
    </div>
  </div>;
}

const invoiceItems = [
  { item: "Brand identity", qty: 1, price: 4800 },
  { item: "Website design", qty: 1, price: 6200 },
  { item: "Content pack", qty: 2, price: 650 },
];

export function InvoiceMock() {
  const reduced = useReducedMotion();
  const subtotal = invoiceItems.reduce((sum, line) => sum + line.qty * line.price, 0);
  const tax = Math.round(subtotal * 0.1);
  const money = (value: number) => `$${value.toLocaleString("en-US")}`;
  return <div className="mock mock-invoice">
    <div className="mock-invoice-paper">
      <div className="mock-invoice-head"><div><span className="mock-caption">INVOICE</span><strong>#0042</strong></div><span className="mock-invoice-logo">✳ Studio Co.</span></div>
      <div className="mock-invoice-parties"><span><small>BILLED TO</small>Lumen Café</span><span><small>DUE</small>14 days</span></div>
      <ul>{invoiceItems.map(line => <li key={line.item}><span>{line.item}</span><span>{line.qty} ×</span><span>{money(line.qty * line.price)}</span></li>)}</ul>
      <div className="mock-invoice-totals"><span>Subtotal<b>{money(subtotal)}</b></span><span>Tax 10%<b>{money(tax)}</b></span><span className="is-total">Total<b>{money(subtotal + tax)}</b></span></div>
      <motion.span className="mock-invoice-stamp" initial={reduced ? false : { opacity: 0, scale: 1.8, rotate: -24 }} whileInView={{ opacity: 1, scale: 1, rotate: -12 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.5, ease: easeOut, delay: 0.4 }}>PAID</motion.span>
    </div>
    <motion.span className="mock-chip mock-chip-one" initial={reduced ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOut, delay: 0.7 }}>✓ Reminder sent</motion.span>
    <motion.span className="mock-chip mock-chip-two" initial={reduced ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOut, delay: 0.9 }}>Paid by card · 2 days</motion.span>
  </div>;
}

const digitalCards = [
  { image: "/services/design-muse.webp", name: "Renaissance UI Kit", price: "$59" },
  { image: "/services/brand-makers.webp", name: "Brand Starter Kit", price: "$49" },
  { image: "/services/digital-atelier.webp", name: "Fresco Website Template", price: "$79" },
];

export function DigitalMock() {
  return <div className="mock mock-digital">
    {digitalCards.map((card, index) => <div key={card.name} className={`mock-digital-card card-${index}`}>
      <div className="mock-digital-art"><Image src={card.image} alt="" fill sizes="(max-width: 760px) 60vw, 22vw" /></div>
      <span><strong>{card.name}</strong><b>{card.price}</b></span>
    </div>)}
  </div>;
}
