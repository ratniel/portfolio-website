"use client";

import { useEffect, useRef } from "react";
import type { siteContent } from "@/content/site";

type ScrollProgressProps = { items: typeof siteContent.navigation };

export function ScrollProgress({ items }: ScrollProgressProps) {
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

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      element.querySelectorAll<HTMLSpanElement>("[data-section]").forEach((checkpoint) => {
        const section = document.getElementById(checkpoint.dataset.section ?? "");
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
        const position = scrollable > 0 ? Math.min(1, Math.max(0, top / scrollable)) : 0;
        checkpoint.style.top = `${position * 100}%`;
      });
    };
    const resize = () => { align(); schedule(); };
    align();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [items]);

  return (
    <div className="scroll-progress" ref={ref} aria-hidden="true">
      <span className="scroll-progress-end" />
      <span className="scroll-progress-track" />
      <span className="scroll-progress-fill" />
      {items.map((item) => (
        <span className="scroll-progress-checkpoint" data-section={item.href.slice(1)} key={item.href} />
      ))}
      <span className="scroll-progress-marker" />
      <span className="scroll-progress-end" />
    </div>
  );
}
