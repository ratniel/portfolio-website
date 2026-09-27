"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { Ref } from "react";

type BlackHoleProps = {
  scale: MotionValue<number>;
  spread: MotionValue<number>;
  x: MotionValue<string>;
  y: MotionValue<string>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
  artRef: Ref<HTMLDivElement>;
};

// Faint enlarged copies of the artwork, screened over it, smear the glow outward
// with the growing shadow. Their black cores are larger, so the shadow stays clean.
const glowEchoes = [
  { reach: 0.14, strength: 0.4 },
  { reach: 0.32, strength: 0.2 },
];

function GlowEcho({ scale, spread, reach, strength }: {
  scale: MotionValue<number>;
  spread: MotionValue<number>;
  reach: number;
  strength: number;
}) {
  const echoScale = useTransform(() => scale.get() * (1 + reach * spread.get()));
  const echoOpacity = useTransform(spread, (amount) => strength * Math.sin(Math.PI * amount));

  return (
    <motion.div
      className="black-hole-art black-hole-echo"
      style={{ scale: echoScale, opacity: echoOpacity }}
    />
  );
}

export function BlackHole({ scale, spread, x, y, rotate, opacity, artRef }: BlackHoleProps) {
  return (
    <motion.div className="black-hole" style={{ x, y, rotate, opacity }}>
      <motion.div ref={artRef} className="black-hole-art" style={{ scale }} />
      {glowEchoes.map((echo) => (
        <GlowEcho key={echo.reach} scale={scale} spread={spread} {...echo} />
      ))}
    </motion.div>
  );
}
