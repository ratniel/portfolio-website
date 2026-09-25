"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type StarFieldProps = {
  count: number;
  progress: { get: () => number };
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function StarField({ count, progress }: StarFieldProps) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (seededRandom(index + 1) - 0.5) * 24;
      values[index * 3 + 1] = (seededRandom(index + 97) - 0.5) * 14;
      values[index * 3 + 2] = -seededRandom(index + 193) * 18;
    }

    return values;
  }, [count]);

  useFrame(({ clock }) => {
    const travel = THREE.MathUtils.clamp(progress.get() / 0.34, 0, 1);

    if (points.current) {
      points.current.position.z = travel * 1.4;
      points.current.rotation.y = clock.elapsedTime * 0.0018;
    }

    if (material.current) {
      material.current.opacity = THREE.MathUtils.lerp(0.34, 0.12, travel);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#c6d1f5"
        opacity={0.34}
        size={0.027}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </points>
  );
}
