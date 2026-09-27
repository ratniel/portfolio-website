"use client";

import { motion, type MotionValue } from "motion/react";
import { useMemo } from "react";

type StarFieldProps = {
  count: number;
  seed: number;
  radius: [number, number];
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function StarField({ count, seed, radius, scale, opacity }: StarFieldProps) {
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

  return (
    <motion.svg
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
