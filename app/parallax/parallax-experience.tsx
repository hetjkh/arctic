"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./parallax.module.css";

// Paint the table before the subject so the laptop rests on the tabletop.
// Motion depth is independent of paint order.
const layers = [
  { id: "library", label: "The library", depth: 0.2, number: "01", detail: "A little atmosphere" },
  { id: "characters", label: "The old masters", depth: 0.5, number: "02", detail: "A curious crowd" },
  { id: "desk", label: "The foreground", depth: 1.2, number: "04", detail: "The finishing details" },
  { id: "subject", label: "The new perspective", depth: 0.85, number: "03", detail: "At the heart of it all" },
];

export default function ParallaxExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"depth" | "flat">("depth");
  const [strength, setStrength] = useState(65);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const ready = loaded.length === layers.length;
  const enabled = mode === "depth" && !reducedMotion && ready && !failed;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;
    const elements = Array.from(scene.querySelectorAll<HTMLElement>("[data-depth]"));
    let frame = 0;
    let previous = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      const amount = strength / 100;
      // Add coverage above 100% so stronger movement stays inside the artwork.
      const scale = 1.09 + Math.max(0, amount - 1) * 0.14;
      // Percentage movement scales with the artwork, including on small screens.
      for (const element of elements) {
        const depth = Number(element.dataset.depth);
        element.style.transform = `translate3d(${currentX * depth * amount * 2.8}%, ${currentY * depth * amount * 2}%, 0)`;
      }
      scene.style.transform = `perspective(1600px) rotateX(${-currentY * amount * 1.6}deg) rotateY(${currentX * amount * 2}deg) scale(${scale})`;
    };
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 64) : 16;
      previous = time;
      const easing = 1 - Math.exp(-elapsed / 110);
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      const settled = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.001;
      if (settled) { currentX = targetX; currentY = targetY; }
      paint();
      frame = settled ? 0 : requestAnimationFrame(tick);
      if (settled) previous = 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const reset = () => { targetX = 0; targetY = 0; start(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !stage.hasPointerCapture(event.pointerId)) return;
      const bounds = stage.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      start();
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") stage.setPointerCapture(event.pointerId);
      move(event);
    };
    const up = (event: PointerEvent) => { if (event.pointerType === "touch") reset(); };
    const key = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Escape", "Home"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Escape" || event.key === "Home") return reset();
      if (event.key === "ArrowLeft") targetX -= 0.25;
      if (event.key === "ArrowRight") targetX += 0.25;
      if (event.key === "ArrowUp") targetY -= 0.25;
      if (event.key === "ArrowDown") targetY += 0.25;
      targetX = Math.max(-1, Math.min(1, targetX));
      targetY = Math.max(-1, Math.min(1, targetY));
      start();
    };
    paint();
    if (!enabled) return;
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointerleave", reset);
    stage.addEventListener("pointercancel", reset);
    stage.addEventListener("lostpointercapture", reset);
    stage.addEventListener("keydown", key);
    stage.addEventListener("blur", reset);
    window.addEventListener("blur", reset);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointerleave", reset);
      stage.removeEventListener("pointercancel", reset);
      stage.removeEventListener("lostpointercapture", reset);
      stage.removeEventListener("keydown", key);
      stage.removeEventListener("blur", reset);
      window.removeEventListener("blur", reset);
    };
  }, [enabled, strength]);

  return (
    <section className={styles.experience} aria-label="Interactive parallax artwork">
      <div className={styles.toolbar}>
        <div className={styles.modes} aria-label="View mode" role="group">
          <button type="button" aria-pressed={mode === "depth"} onClick={() => setMode("depth")}><span aria-hidden="true">◈</span> In depth</button>
          <button type="button" aria-pressed={mode === "flat"} onClick={() => setMode("flat")}>Original image</button>
        </div>
        <label className={styles.slider} htmlFor="parallax-depth">Depth
          <input id="parallax-depth" type="range" min="0" max="200" value={strength} disabled={!enabled} onChange={(event) => setStrength(Number(event.target.value))} />
          <output htmlFor="parallax-depth">{strength}%</output>
        </label>
      </div>
      <div ref={stageRef} className={styles.stage} tabIndex={enabled ? 0 : -1} role="group" aria-label="A woman with a laptop surrounded by astonished historical thinkers in a Renaissance library" aria-describedby="parallax-instructions" data-enabled={enabled}>
        <div ref={sceneRef} className={styles.scene} aria-hidden="true" style={{ opacity: mode === "depth" && ready && !failed ? 1 : 0 }}>
          {layers.map((layer) => (
            <div key={layer.id} className={styles.layer} data-depth={layer.depth} data-layer={layer.id}>
              <div className={layer.id === "subject" ? styles.subject : styles.fullLayer}>
                <Image src={`/parallax/${layer.id}.webp`} alt="" fill sizes="100vw" unoptimized loading="eager" draggable={false}
                  onLoad={() => setLoaded((previous) => previous.includes(layer.id) ? previous : [...previous, layer.id])}
                  onError={() => setFailed(true)} />
              </div>
            </div>
          ))}
        </div>
        <Image className={styles.original} src="/paraalz%20effect.png" alt="" fill sizes="100vw" unoptimized loading="eager" draggable={false} style={{ opacity: mode === "flat" || !ready || failed ? 1 : 0 }} />
        <div className={styles.sceneIndex} aria-hidden="true">FIG. 001 / THE MEETING OF MINDS</div>
      </div>
      <div className={styles.caption}>
        <p id="parallax-instructions" aria-live="polite">{failed ? "The layers could not load. Showing the original image." : !ready ? "Preparing the scene…" : mode === "flat" ? "The image that started it all." : reducedMotion ? "A still composition, respecting your reduced-motion preference." : "Move your cursor, drag on touch, or focus the image and use the arrow keys."}</p>
        <span>ONE SCENE. FOUR DEPTHS.</span>
      </div>
      <div className={styles.layerNotes}>
        {[...layers].sort((a, b) => a.depth - b.depth).map((layer) => (
          <a key={layer.id} href={`/parallax/${layer.id}.webp`} target="_blank" rel="noreferrer" className={styles.layerNote} aria-label={`View ${layer.label} image layer (opens in a new tab)`}>
            <span className={styles.layerNumber}>{layer.number}</span>
            <div><h2>{layer.label}</h2><p>{layer.detail}</p></div>
            <span className={styles.layerArrow} aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
