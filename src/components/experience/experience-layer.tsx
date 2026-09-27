"use client";

import dynamic from "next/dynamic";

const SpaceExperience = dynamic(
  () =>
    import("@/components/experience/space-experience").then(
      (module) => module.SpaceExperience,
    ),
  {
    ssr: false,
    loading: () => <div className="space-fallback" aria-hidden="true" />,
  },
);

export function ExperienceLayer() {
  return <SpaceExperience />;
}
