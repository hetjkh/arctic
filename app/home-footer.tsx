import Link from "next/link";

type FooterLink = { label: string; href: string; external?: boolean };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  { title: "PAGES", links: [{ label: "Home", href: "/" }, { label: "About us", href: "/about-us" }, { label: "Services", href: "/services" }, { label: "Products", href: "/products" }, { label: "Portfolio", href: "/portfolio" }, { label: "Contact us", href: "/contact-us" }] },
  { title: "PRODUCTS", links: [{ label: "ArcticSwitch", href: "https://arctic-switch.vercel.app/", external: true }, { label: "ArcticOS", href: "/products#arcticos" }, { label: "ArcticInvoice", href: "/products#arcticinvoice" }, { label: "Digital products", href: "/products/digital" }] },
  { title: "SAY HELLO", links: [{ label: "business@arcticbase.example", href: "/contact-us#contact-form" }, { label: "hello@arcticbase.example", href: "/contact-us#contact-form" }] },
];

const wordmark = "ARCTIC BASE";

export default function HomeFooter({ topId }: { topId: string }) {
  return (
    <footer className="home-footer">
      <div className="home-footer-grid">
        <div className="home-footer-intro">
          <span className="home-footer-tag"><span className="status-dot" /> ARCTIC BASE STUDIO</span>
          <p>A creative studio for brands that want to be remembered. Websites, products, films, and everything in between.</p>
          <a href={`#${topId}`} className="home-footer-top">BACK TO TOP <span aria-hidden="true">↑</span></a>
        </div>
        {footerColumns.map(column => <nav key={column.title} className="home-footer-column" aria-label={column.title}>
          <h2>{column.title}</h2>
          <ul>{column.links.map(link => <li key={link.label}>{link.external
            ? <a href={link.href} target="_blank" rel="noopener noreferrer"><span>{link.label}</span><i aria-hidden="true">↗</i><span className="sr-only"> (opens in a new tab)</span></a>
            : <Link href={link.href}><span>{link.label}</span><i aria-hidden="true">↗</i></Link>}</li>)}</ul>
        </nav>)}
      </div>
      <p className="home-wordmark" aria-label="Arctic Base">
        {wordmark.split("").map((letter, index) => <span key={index} aria-hidden="true" style={{ transitionDelay: `${index * 25}ms` }}>{letter === " " ? "\u00a0" : letter}</span>)}
        <span className="home-wordmark-mark" aria-hidden="true">✳</span>
      </p>
      <div className="site-footer">
        <span>© {new Date().getFullYear()} ARCTIC BASE</span>
        <span className="footer-middle">A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</span>
        <span className="demo-label"><span className="status-dot" />DEMO EXPERIENCE</span>
      </div>
    </footer>
  );
}
