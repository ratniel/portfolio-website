"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type BlackHoleProps = {
  progress: { get: () => number };
  compact: boolean;
};

const smoothstep = (start: number, end: number, value: number) => {
  const amount = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return amount * amount * (3 - 2 * amount);
};

export function BlackHole({ progress, compact }: BlackHoleProps) {
  const group = useRef<THREE.Group>(null);
  const coolDisk = useRef<THREE.Mesh>(null);
  const warmDisk = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const travel = smoothstep(0, 0.34, progress.get());
    const startX = compact ? 2.2 : 3.55;
    const endX = compact ? 1.85 : 3.05;

    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(startX, endX, travel);
      group.current.position.y = THREE.MathUtils.lerp(0.08, -0.18, travel);
      group.current.scale.setScalar(THREE.MathUtils.lerp(0.82, 1.04, travel));
    }

    if (coolDisk.current) {
      coolDisk.current.rotation.z = 0.16 + clock.elapsedTime * 0.014;
    }

    if (warmDisk.current) {
      warmDisk.current.rotation.z = -0.12 - clock.elapsedTime * 0.009;
    }
  });

  return (
    <group ref={group} position={[compact ? 2.2 : 3.55, 0.08, -1.6]}>
      <mesh rotation={[1.39, 0.08, 0.16]} ref={coolDisk}>
        <ringGeometry args={[1.9, 2.55, 160]} />
        <meshBasicMaterial
          color="#8fa8ff"
          opacity={0.085}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[1.44, -0.04, -0.12]} ref={warmDisk}>
        <ringGeometry args={[1.72, 2.24, 160]} />
        <meshBasicMaterial
          color="#d9a96f"
          opacity={0.1}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.12}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshBasicMaterial
          color="#667bd0"
          opacity={0.04}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshBasicMaterial color="#020308" />
      </mesh>

      <mesh rotation={[1.39, 0.08, 0.16]}>
        <torusGeometry args={[1.8, 0.018, 12, 180]} />
        <meshBasicMaterial
          color="#dce3ff"
          opacity={0.28}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
