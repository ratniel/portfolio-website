"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      ref.current?.style.setProperty("--progress", progress.toFixed(4));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    // Pin the line's ends to the hero's first and last lines of text as they sit on first load.
    const align = () => {
      const element = ref.current;
      const start = document.querySelector("[data-progress-start]");
      const end = document.querySelector("[data-progress-end]");
      if (!element || !start || !end) return;
      const middle = (target: Element) => {
        const box = target.getBoundingClientRect();
        return box.top + window.scrollY + box.height / 2;
      };
      element.style.top = `${middle(start)}px`;
      element.style.bottom = `${Math.max(16, window.innerHeight - middle(end))}px`;
    };
    const resize = () => { align(); schedule(); };
    align();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="scroll-progress" ref={ref} aria-hidden="true">
      <span className="scroll-progress-end" />
      <span className="scroll-progress-track" />
      <span className="scroll-progress-fill" />
      <span className="scroll-progress-marker" />
      <span className="scroll-progress-end" />
    </div>
  );
}
