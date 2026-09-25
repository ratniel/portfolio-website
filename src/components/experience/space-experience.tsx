"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { BlackHole } from "@/components/experience/black-hole";
import { StarField } from "@/components/experience/star-field";

type SceneProps = {
  limitedDevice: boolean;
  progress: { get: () => number };
};

const smoothstep = (start: number, end: number, value: number) => {
  const amount = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return amount * amount * (3 - 2 * amount);
};

function Scene({ limitedDevice, progress }: SceneProps) {
  const { size } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const compact = size.width < 680;

  useFrame(({ camera }) => {
    const travel = smoothstep(0, 0.34, progress.get());
    camera.position.x = THREE.MathUtils.lerp(0, compact ? 0.12 : 0.28, travel);
    camera.position.y = THREE.MathUtils.lerp(0, -0.12, travel);
    camera.position.z = THREE.MathUtils.lerp(8, 4.7, travel);

    lookAt.set(
      THREE.MathUtils.lerp(0.2, compact ? 0.48 : 0.95, travel),
      THREE.MathUtils.lerp(0, -0.2, travel),
      -1.6,
    );
    camera.lookAt(lookAt);
  });

  return (
    <>
      <StarField
        count={limitedDevice ? (compact ? 70 : 120) : compact ? 130 : 260}
        progress={progress}
      />
      <BlackHole compact={compact} progress={progress} />
    </>
  );
}

export function SpaceExperience() {
  const reduceMotion = useReducedMotion();
  const [capabilities] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      const webgl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

      return {
        limitedDevice: navigator.hardwareConcurrency <= 4,
        webglAvailable: Boolean(webgl),
      };
    } catch {
      return { limitedDevice: true, webglAvailable: false };
    }
  });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 62,
    damping: 24,
    mass: 0.32,
    restDelta: 0.0005,
  });

  if (reduceMotion || !capabilities.webglAvailable) {
    return <div className="space-fallback" aria-hidden="true" />;
  }

  return (
    <div className="space-experience" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 80 }}
        dpr={capabilities.limitedDevice ? 1 : [1, 1.5]}
        fallback={<div className="space-fallback" />}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene limitedDevice={capabilities.limitedDevice} progress={progress} />
      </Canvas>
    </div>
  );
}
