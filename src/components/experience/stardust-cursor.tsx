"use client";

import { useEffect, useRef } from "react";

const particleCount = 10;
const lifetime = 320;
const spacing = 9;

export function StardustCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const dot = element?.querySelector<HTMLElement>(".stardust-cursor-dot");
    if (!element || !dot) return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const particles = Array.from(element.querySelectorAll<HTMLElement>(".stardust-cursor-particle"), (node, index) => ({
      node,
      x: 0,
      y: 0,
      born: -lifetime,
      driftX: Math.cos(index * 2.4) * 12,
      driftY: Math.sin(index * 2.4) * 12,
      size: 0.7 + (index % 3) * 0.3,
    }));
    let frame = 0;
    let next = 0;
    let previous: { x: number; y: number } | null = null;

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = null;
      element.removeAttribute("data-active");
      element.removeAttribute("data-interactive");
      document.documentElement.classList.remove("has-stardust-cursor");
      particles.forEach((particle) => {
        particle.born = -lifetime;
        particle.node.style.opacity = "0";
      });
    };

    const tick = (now: number) => {
      frame = 0;
      let alive = false;
      particles.forEach((particle) => {
        const age = Math.max(0, (now - particle.born) / lifetime);
        if (age >= 1) {
          particle.node.style.opacity = "0";
          return;
        }
        alive = true;
        const x = particle.x + particle.driftX * age;
        const y = particle.y + particle.driftY * age;
        particle.node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${(1 - age) * particle.size})`;
        particle.node.style.opacity = `${(1 - age) ** 2 * 0.8}`;
      });
      if (alive) frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!media.matches || event.pointerType !== "mouse" || target?.closest("input, textarea, select, [contenteditable]:not([contenteditable='false']), iframe, video")) {
        hide();
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.toggleAttribute("data-interactive", Boolean(target?.closest("a[href], button:not(:disabled), [role='button'], summary")));
      element.setAttribute("data-active", "");
      document.documentElement.classList.add("has-stardust-cursor");

      if (previous) {
        const dx = x - previous.x;
        const dy = y - previous.y;
        const steps = Math.min(particleCount, Math.floor(Math.hypot(dx, dy) / spacing));
        const now = performance.now();
        for (let step = 1; step <= steps; step += 1) {
          const particle = particles[next];
          particle.x = previous.x + dx * (step / steps);
          particle.y = previous.y + dy * (step / steps);
          particle.born = now;
          next = (next + 1) % particleCount;
        }
        if (steps === 0) return;
        if (!frame) frame = requestAnimationFrame(tick);
      }
      previous = { x, y };
    };

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Tab") hide();
    };
    const visibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", keydown);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("dragstart", hide);
    media.addEventListener("change", hide);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", keydown);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("dragstart", hide);
      media.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div className="stardust-cursor" ref={ref} aria-hidden="true">
      {Array.from({ length: particleCount }, (_, index) => <span className="stardust-cursor-particle" key={index} />)}
      <span className="stardust-cursor-dot" />
    </div>
  );
}
