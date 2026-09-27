"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { BlackHole } from "@/components/experience/black-hole";
import { StarField, type AvoidArea } from "@/components/experience/star-field";

// Scroll fractions where each section's top reaches the top of the viewport.
type SectionStops = { work: number; projects: number };

const fallbackStops: SectionStops = { work: 0.15, projects: 0.35 };

const farStars: [number, number] = [0.7, 1.3];
const midStars: [number, number] = [0.9, 1.7];
const nearStars: [number, number] = [1.2, 2.2];

// Distances in Schwarzschild radii for the start and end of the approach.
const startDistance = 10;
const endDistance = 3;

// Angular radius of a Schwarzschild black hole's shadow for a static observer at r:
// sin(a) = (3√3 / 2) · (rs / r) · √(1 − rs / r)
function shadowAngle(distance: number) {
  const sine = ((3 * Math.sqrt(3)) / 2) * (1 / distance) * Math.sqrt(1 - 1 / distance);
  return Math.asin(Math.min(sine, 1));
}

const startShadow = Math.tan(shadowAngle(startDistance));

const distanceAt = (amount: number) => startDistance + (endDistance - startDistance) * amount;

// On-screen size of the shadow relative to where the approach starts.
const apparentShadowSize = (distance: number) => Math.tan(shadowAngle(distance)) / startShadow;

// Piecewise-linear interpolation, clamped at both ends.
function interpolate(value: number, input: number[], output: number[]) {
  if (value <= input[0]) return output[0];

  for (let index = 1; index < input.length; index += 1) {
    if (value <= input[index]) {
      const span = input[index] - input[index - 1];
      const amount = span > 0 ? (value - input[index - 1]) / span : 1;
      return output[index - 1] + (output[index] - output[index - 1]) * amount;
    }
  }

  return output[output.length - 1];
}

function useSectionStops() {
  const stops = useRef<SectionStops>(fallbackStops);

  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const top = (id: string) => {
        const element = document.getElementById(id);
        if (!element || scrollable <= 0) return null;
        return (element.getBoundingClientRect().top + window.scrollY) / scrollable;
      };

      const work = top("work");
      const projects = top("projects");
      if (work !== null && projects !== null && projects > work) {
        stops.current = { work, projects };
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return stops;
}

function useJourney(
  progress: MotionValue<number>,
  stops: { current: SectionStops },
  output: (stops: SectionStops) => [number[], number[]],
) {
  return useTransform(progress, (value) => {
    const [input, result] = output(stops.current);
    return interpolate(value, input, result);
  });
}

export function SpaceExperience() {
  const reduceMotion = useReducedMotion();
  const stops = useSectionStops();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 62,
    damping: 24,
    mass: 0.32,
    restDelta: 0.0005,
  });

  // Hero → Work → Projects: an angled fall toward the black hole. The artwork grows
  // with the shadow's apparent size, its glow spreads outward and thins, and the
  // darkness gives way to deep space.
  const approachEnd = ({ work, projects }: SectionStops) => work + (projects - work) * 0.75;
  const approach = useJourney(progress, stops, (current) => [[0, approachEnd(current)], [0, 1]]);
  const holeScale = useTransform(approach, (amount) => apparentShadowSize(distanceAt(amount)));
  // From the first scroll the shadow also swings anticlockwise along an arc (up, then
  // left), so it settles behind Work's empty label column instead of under the copy.
  // The swing starts with the zoom and eases in and out, so neither end is abrupt.
  const orbit = useJourney(progress, stops, ({ work, projects }) => [
    [0, work + (projects - work) * 0.1], // keep in step with `landed` below
    [0, 1],
  ]);
  const orbitAngle = useTransform(orbit, (amount) => Math.PI * (1 - Math.cos(Math.PI * amount)) / 2);
  const holeX = useTransform(orbitAngle, (angle) => `${(Math.cos(angle) - 1) * 32}vw`);
  const holeY = useTransform(orbitAngle, (angle) => `${-Math.sin(angle) * 14}vh`);
  const holeRotate = useTransform(orbitAngle, (angle) => (angle / Math.PI) * -10);
  // The glow thins out as it spreads, so the Projects copy never sits on bright light.
  // Full brightness until the shadow has landed and the zoom has brought the bright jet
  // on the upper right of the ring into view, then the same fade as before.
  const holeOpacity = useJourney(progress, stops, ({ work, projects }) => {
    const landed = work + (projects - work) * 0.1;
    return [
      [landed, work + (projects - work) * 0.3, work + (projects - work) * 0.55, projects],
      [1, 0.6, 0.35, 0],
    ];
  });
  const glowOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [work, projects, projects + (1 - projects) * 0.4],
    [0, 0.55, 0.3],
  ]);
  const starOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [0, work, projects],
    [0.35, 0.3, 1],
  ]);
  // Stars react to the cursor throughout; the area around the black hole is left alone
  // (see avoidHole), so the stars it uncovers on its way left respond straight away.
  const lensing = useMotionValue(1);
  const art = useRef<HTMLDivElement>(null);
  // In the hero, leave the stars around the black hole's glow alone.
  // Measured once per frame and shared by the three star layers, so they don't each force a
  // layout read between one another's writes.
  const avoidCache = useRef<{ time: number; area: AvoidArea | null }>({ time: -1, area: null });
  const avoidHole = useCallback((): AvoidArea | null => {
    const time = document.timeline.currentTime;
    const now = typeof time === "number" ? time : performance.now();
    if (avoidCache.current.time === now) return avoidCache.current.area;
    let area: AvoidArea | null = null;
    if (art.current && holeOpacity.get() >= 0.05) {
      const box = art.current.getBoundingClientRect();
      area = { x: box.left + box.width * 0.744, y: box.top + box.height * 0.457, radius: box.width * 0.24 };
    }
    avoidCache.current = { time: now, area };
    return area;
  }, [holeOpacity]);
  const farScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.08, 1.2]]);
  const midScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.22, 1.5]]);
  const nearScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.55, 2.3]]);

  if (reduceMotion) {
    return <div className="space-fallback" aria-hidden="true" />;
  }

  return (
    <div className="space-experience" aria-hidden="true">
      <BlackHole
        scale={holeScale}
        spread={approach}
        x={holeX}
        y={holeY}
        rotate={holeRotate}
        opacity={holeOpacity}
        artRef={art}
      />
      <motion.div className="deep-space-glow" style={{ opacity: glowOpacity }} />
      <div className="star-layers">
        <StarField count={70} seed={1} radius={farStars} scale={farScale} opacity={starOpacity} lensing={lensing} avoidArea={avoidHole} />
        <StarField count={40} seed={2} radius={midStars} scale={midScale} opacity={starOpacity} lensing={lensing} avoidArea={avoidHole} />
        <StarField count={18} seed={3} radius={nearStars} scale={nearScale} opacity={starOpacity} lensing={lensing} avoidArea={avoidHole} />
      </div>
    </div>
  );
}
