"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

const MotionLink = motion.create(Link);
const links = [
  { href: "/", label: "HOME" },
  { href: "/about-us", label: "ABOUT US" },
  { href: "/services", label: "SERVICES" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/contact-us", label: "CONTACT US" },
];

export default function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <nav className="navigation" aria-label="Main navigation">
      {links.map(({ href, label }) => (
        <MotionLink
          key={href}
          href={href}
          aria-label={label}
          aria-current={pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)) ? "page" : undefined}
          initial="rest"
          animate="rest"
          whileHover="active"
          whileFocus="active"
        >
          <motion.span
            className="nav-fill"
            aria-hidden="true"
            variants={{ rest: { y: "101%" }, active: { y: "0%" } }}
            transition={transition}
          />
          <span className="nav-label" aria-hidden="true">
            <motion.span
              className="nav-label-track"
              variants={{ rest: { y: "0%" }, active: { y: "-50%" } }}
              transition={transition}
            >
              <span>{label}</span>
              <span>{label}</span>
            </motion.span>
          </span>
          <motion.span
            className="nav-corner"
            aria-hidden="true"
            variants={{ rest: { opacity: 1 }, active: { opacity: 0 } }}
            transition={transition}
          />
          <motion.span
            className="nav-arrow"
            aria-hidden="true"
            variants={{ rest: { opacity: 0, x: -6, y: 6 }, active: { opacity: 1, x: 0, y: 0 } }}
            transition={transition}
          >
            ↗
          </motion.span>
        </MotionLink>
      ))}
    </nav>
  );
}
