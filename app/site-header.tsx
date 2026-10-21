import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Arctic Base home">
        <Image src="/image.png" alt="Arctic Base" width={7234} height={1182} sizes="(max-width: 600px) 230px, 265px" className="brand-logo" preload />
      </Link>
      <Navigation />
    </header>
  );
}
