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
    // Align the lower endpoint with the hero's scroll cue at its initial position.
    const align = () => {
      const element = ref.current;
      const end = document.querySelector("[data-progress-end]");
      if (!element || !end) return;
      const box = end.getBoundingClientRect();
      const middle = box.top + window.scrollY + box.height / 2;
      element.style.bottom = `${Math.max(16, window.innerHeight - middle)}px`;
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
