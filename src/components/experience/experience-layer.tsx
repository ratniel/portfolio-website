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

const StardustCursor = dynamic(
  () => import("@/components/experience/stardust-cursor").then((module) => module.StardustCursor),
  { ssr: false },
);

export function ExperienceLayer() {
  return <><SpaceExperience /><StardustCursor /></>;
}
