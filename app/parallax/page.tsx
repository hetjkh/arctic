import type { Metadata } from "next";
import Link from "next/link";
import ParallaxExperience from "./parallax-experience";
import styles from "./parallax.module.css";

export const metadata: Metadata = {
  title: "A Different Point of View — Arctic Base",
  description: "An interactive, layered Renaissance scene. Move your cursor and watch the image come to life in three dimensions.",
};

export default function ParallaxPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>ARCTIC BASE<span aria-hidden="true">✳</span></Link>
        <span className={styles.eyebrow}>THE PLAYGROUND / 001</span>
        <Link href="/" className={styles.back}>Back to studio <span aria-hidden="true">↗</span></Link>
      </header>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}><span className={styles.dot} /> AN EXPERIMENT IN PERSPECTIVE</p>
          <h1>A different <em>point of view.</em></h1>
        </div>
        <p className={styles.description}>Old masters. A new dimension.<br />Move across the image and let a little curiosity<br className={styles.desktopBreak} /> bring the scene to life.</p>
      </section>
      <ParallaxExperience />
      <footer className={styles.footer}><span>OLD-SCHOOL CRAFT. NEW POSSIBILITIES.</span><span>ARCTIC BASE © {new Date().getFullYear()}</span></footer>
    </main>
  );
}
