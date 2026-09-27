"use client";

import { motion, type MotionValue } from "motion/react";

type BlackHoleProps = {
  artScale: MotionValue<number>;
  shadowScale: MotionValue<number>;
  ringOpacity: MotionValue<number>;
  x: MotionValue<string>;
  y: MotionValue<string>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

// Lensed starlight piling up just outside the shadow edge (radius 100 in this viewBox).
const lensedLight = Array.from({ length: 150 }, (_, index) => {
  const angle = seededRandom(index + 1) * Math.PI * 2;
  const spread = seededRandom(index + 211);
  const distance = 101 + spread * spread * 34;
  return {
    cx: 140 + Math.cos(angle) * distance,
    cy: 140 + Math.sin(angle) * distance,
    r: 0.1 + seededRandom(index + 419) * 0.16,
  };
});

export function BlackHole({ artScale, shadowScale, ringOpacity, x, y, rotate, opacity }: BlackHoleProps) {
  return (
    <motion.div className="black-hole" style={{ x, y, rotate, opacity }}>
      <motion.div className="black-hole-art" style={{ scale: artScale }} />
      <motion.div className="event-horizon" style={{ scale: shadowScale }}>
        <div className="event-horizon-shadow" />
        <motion.div className="photon-ring" style={{ opacity: ringOpacity }} />
        <motion.svg className="lensed-light" viewBox="0 0 280 280" style={{ opacity: ringOpacity }}>
          {lensedLight.map((star, index) => (
            <circle key={index} {...star} />
          ))}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
