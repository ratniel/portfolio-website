"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { BlackHole } from "@/components/experience/black-hole";
import { StarField } from "@/components/experience/star-field";

// Scroll fractions where each section's top reaches the top of the viewport.
type SectionStops = { work: number; projects: number };

const fallbackStops: SectionStops = { work: 0.15, projects: 0.35 };

const farStars: [number, number] = [0.7, 1.3];
const midStars: [number, number] = [0.9, 1.7];
const nearStars: [number, number] = [1.2, 2.2];

// Distances in Schwarzschild radii for the start and end of the approach.
const startDistance = 10;
const endDistance = 2.4;

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

  // Hero → Work → Projects: an angled fall toward the black hole. The shadow grows
  // faster than the disk art and starlight piles up at its edge, until darkness
  // fills the view and gives way to deep space.
  const approachEnd = ({ work, projects }: SectionStops) => work + (projects - work) * 0.75;
  const approach = useJourney(progress, stops, (current) => [[0, approachEnd(current)], [0, 1]]);
  const shadowScale = useTransform(approach, (amount) => apparentShadowSize(distanceAt(amount)));
  const artScale = useTransform(shadowScale, (scale) => scale ** 0.4);
  const holeX = useTransform(approach, (amount) => `${amount * 12}vw`);
  const holeY = useTransform(approach, (amount) => `${amount * -6}vh`);
  const holeRotate = useTransform(approach, (amount) => amount * -6);
  // The ring brightens as light piles up, then dims once its edge sweeps behind the text.
  const ringOpacity = useTransform(approach, (amount) =>
    interpolate(amount, [0, 0.35, 0.72, 1], [0, 0.2, 0.75, 0.22]),
  );
  const holeOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [work + (projects - work) * 0.6, projects],
    [1, 0],
  ]);
  const glowOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [work, projects, projects + (1 - projects) * 0.4],
    [0, 0.55, 0.3],
  ]);
  const starOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [0, work, projects],
    [0.35, 0.3, 1],
  ]);
  const farScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.08, 1.2]]);
  const midScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.22, 1.5]]);
  const nearScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.55, 2.3]]);

  if (reduceMotion) {
    return <div className="space-fallback" aria-hidden="true" />;
  }

  return (
    <div className="space-experience" aria-hidden="true">
      <BlackHole
        artScale={artScale}
        shadowScale={shadowScale}
        ringOpacity={ringOpacity}
        x={holeX}
        y={holeY}
        rotate={holeRotate}
        opacity={holeOpacity}
      />
      <motion.div className="deep-space-glow" style={{ opacity: glowOpacity }} />
      <div className="star-layers">
        <StarField count={70} seed={1} radius={farStars} scale={farScale} opacity={starOpacity} />
        <StarField count={40} seed={2} radius={midStars} scale={midScale} opacity={starOpacity} />
        <StarField count={18} seed={3} radius={nearStars} scale={nearScale} opacity={starOpacity} />
      </div>
    </div>
  );
}
