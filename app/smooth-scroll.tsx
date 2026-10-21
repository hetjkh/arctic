"use client";

import { useEffect } from "react";

function canScrollInside(start: EventTarget | null, deltaY: number) {
  let element = start instanceof Element ? start : null;
  while (element && element !== document.body && element !== document.documentElement) {
    const { overflowY } = getComputedStyle(element);
    if ((overflowY === "auto" || overflowY === "scroll") && element.scrollHeight > element.clientHeight) {
      if (deltaY < 0 ? element.scrollTop > 0 : element.scrollTop + element.clientHeight < element.scrollHeight) return true;
    }
    element = element.parentElement;
  }
  return false;
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const root = document.documentElement;
    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;
    let running = false;

    const stop = () => {
      if (!running) return;
      cancelAnimationFrame(frame);
      running = false;
      delete root.dataset.smoothScrolling;
      current = target = window.scrollY;
    };

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
        delete root.dataset.smoothScrolling;
      }
      window.scrollTo({ top: current, behavior: "instant" });
      if (running) frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (reduced.matches || !finePointer.matches || event.ctrlKey || event.defaultPrevented) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (canScrollInside(event.target, event.deltaY)) return;
      event.preventDefault();
      if (!running) current = target = window.scrollY;
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;
      target = Math.max(0, Math.min(root.scrollHeight - window.innerHeight, target + delta));
      if (!running) {
        running = true;
        root.dataset.smoothScrolling = "true";
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    window.addEventListener("resize", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("resize", stop);
    };
  }, []);

  return null;
}
