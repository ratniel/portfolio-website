"use client";

import { motion, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

export type AvoidArea = { x: number; y: number; radius: number };

type StarFieldProps = {
  count: number;
  seed: number;
  radius: [number, number];
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  lensing: MotionValue<number>;
  avoidArea: () => AvoidArea | null;
};

type Star = { x: number; y: number; r: number };

// Stars within this many screen pixels of the cursor are nudged outward, like faint lensing.
const lensRadius = 150;
const lensPush = 10;

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function useStarLensing(
  svg: { current: SVGSVGElement | null },
  stars: Star[],
  lensing: MotionValue<number>,
  avoidArea: () => AvoidArea | null,
) {
  useEffect(() => {
    const element = svg.current;
    if (!element || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const circles = Array.from(element.querySelectorAll("circle"));
    const offsets = stars.map(() => ({ x: 0, y: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const tick = () => {
      frame = 0;
      const matrix = element.getScreenCTM();
      if (!matrix) return;

      const strength = lensing.get();
      const avoid = strength > 0.01 ? avoidArea() : null;
      let settling = false;

      stars.forEach((star, index) => {
        let targetX = 0;
        let targetY = 0;

        if (pointer && strength > 0.01) {
          const screenX = matrix.a * star.x + matrix.c * star.y + matrix.e;
          const screenY = matrix.b * star.x + matrix.d * star.y + matrix.f;
          const dx = screenX - pointer.x;
          const dy = screenY - pointer.y;
          const distance = Math.hypot(dx, dy);
          const avoided = avoid && Math.hypot(screenX - avoid.x, screenY - avoid.y) < avoid.radius;

          if (!avoided && distance > 0.5 && distance < lensRadius) {
            const push = ((1 - distance / lensRadius) ** 2 * lensPush * strength) / matrix.a;
            targetX = (dx / distance) * push;
            targetY = (dy / distance) * push;
          }
        }

        const offset = offsets[index];
        offset.x += (targetX - offset.x) * 0.12;
        offset.y += (targetY - offset.y) * 0.12;
        if (Math.abs(targetX - offset.x) > 0.01 || Math.abs(targetY - offset.y) > 0.01) settling = true;
        circles[index].setAttribute("transform", `translate(${offset.x.toFixed(2)} ${offset.y.toFixed(2)})`);
      });

      if (settling) frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const leave = () => {
      pointer = null;
      schedule();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [svg, stars, lensing, avoidArea]);
}

export function StarField({ count, seed, radius, scale, opacity, lensing, avoidArea }: StarFieldProps) {
  const svg = useRef<SVGSVGElement>(null);
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const base = seed * 1000 + index * 3;
        return {
          x: seededRandom(base + 1) * 1600,
          y: seededRandom(base + 2) * 1000,
          r: radius[0] + seededRandom(base + 3) * (radius[1] - radius[0]),
        };
      }),
    [count, seed, radius],
  );

  useStarLensing(svg, stars, lensing, avoidArea);

  return (
    <motion.svg
      ref={svg}
      className="star-field"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{ scale, opacity }}
    >
      {stars.map((star, index) => (
        <circle key={index} cx={star.x} cy={star.y} r={star.r} />
      ))}
    </motion.svg>
  );
}
