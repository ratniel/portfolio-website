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
import { StarField } from "@/components/experience/star-field";

// Scroll fractions where each section's top reaches the top of the viewport.
type SectionStops = { work: number; projects: number };

const fallbackStops: SectionStops = { work: 0.15, projects: 0.35 };

const farStars: [number, number] = [0.7, 1.3];
const midStars: [number, number] = [0.9, 1.7];
const nearStars: [number, number] = [1.2, 2.2];

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

  // Hero → Work: the camera approaches the black hole.
  // Work → Projects: it keeps growing into an abstract horizon while stars take over.
  const holeScale = useJourney(progress, stops, ({ work, projects }) => [
    [0, work, projects],
    [1, 1.6, 2.5],
  ]);
  const holeX = useJourney(progress, stops, ({ work }) => [[0, work], [6, -3]]);
  const holeY = useJourney(progress, stops, ({ work }) => [[0, work], [0, 4]]);
  const holeOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [work + (projects - work) * 0.35, projects],
    [1, 0],
  ]);
  const glowOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [work, projects, projects + (1 - projects) * 0.4],
    [0, 0.55, 0.3],
  ]);
  const starOpacity = useJourney(progress, stops, ({ work, projects }) => [
    [0, work, projects],
    [0.35, 0.45, 1],
  ]);
  const farScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.08, 1.2]]);
  const midScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.22, 1.5]]);
  const nearScale = useJourney(progress, stops, ({ projects }) => [[0, projects, 1], [1, 1.55, 2.3]]);

  const holeTranslateX = useTransform(holeX, (value) => `${value}%`);
  const holeTranslateY = useTransform(holeY, (value) => `${value}%`);

  if (reduceMotion) {
    return <div className="space-fallback" aria-hidden="true" />;
  }

  return (
    <div className="space-experience" aria-hidden="true">
      <motion.div
        className="black-hole"
        style={{ scale: holeScale, x: holeTranslateX, y: holeTranslateY, opacity: holeOpacity }}
      >
        <div className="black-hole-art" />
      </motion.div>
      <motion.div className="deep-space-glow" style={{ opacity: glowOpacity }} />
      <div className="star-layers">
        <StarField count={70} seed={1} radius={farStars} scale={farScale} opacity={starOpacity} />
        <StarField count={40} seed={2} radius={midStars} scale={midScale} opacity={starOpacity} />
        <StarField count={18} seed={3} radius={nearStars} scale={nearScale} opacity={starOpacity} />
      </div>
    </div>
  );
}
