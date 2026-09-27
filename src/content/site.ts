export const siteContent = {
  name: "Ratniel Kokane",
  metadata: {
    title: "Ratniel Kokane — AI engineer",
    description: "Trying to understand AI, one rabbit hole at a time.",
  },
  sections: {
    work: { eyebrow: "01 / practice", title: "Work", empty: "Work details will be added here." },
    projects: { eyebrow: "02 / investigation", title: "Things I’m figuring out" },
    journey: { eyebrow: "03 / the turning point" },
    notes: { eyebrow: "04 / in words" },
  },
  navigation: [
    { label: "work", href: "#work" },
    { label: "projects", href: "#projects" },
    { label: "journey", href: "#journey" },
    { label: "notes", href: "#notes" },
  ],
  hero: {
    eyebrow: "AI engineer",
    heading: {
      beforeAccent: "Trying to understand AI, one ",
      accent: "rabbit hole",
      afterAccent: " at a time.",
    },
    introduction:
      "I started in electronics engineering, got pulled in by neural networks, and have spent the last two and a half years putting LLMs into production. I build things to answer the questions I can’t stop thinking about.",
    links: [
      { label: "github", href: "https://github.com/ratniel" },
      { label: "linkedin", href: "https://www.linkedin.com/in/ratniel" },
    ],
    email: { label: "email", address: "ratniel.kokane1729@gmail.com", copy: "copy", copied: "copied" },
    scrollCue: "Scroll to explore",
  },
  journey: {
    heading: "A change in direction",
    body: "I started in electronics engineering. Discovering neural networks changed the questions I wanted to spend my time on, and set me on a path toward building with AI.",
  },
  notes: {
    heading: "Notes from the rabbit holes",
    empty: "I’m still finding the shape of this writing space. When there’s something worth sharing, it’ll find a home here.",
  },
  footer: {
    note: "Made while figuring things out.",
    copyright: "© Ratniel Kokane",
  },
} satisfies {
  name: string;
  metadata: { title: string; description: string };
  navigation: { label: string; href: string }[];
  hero: { eyebrow: string; heading: { beforeAccent: string; accent: string; afterAccent: string }; introduction: string; links: { label: string; href: string }[]; email: { label: string; address: string; copy: string; copied: string }; scrollCue: string };
  sections: { work: { eyebrow: string; title: string; empty: string }; projects: { eyebrow: string; title: string }; journey: { eyebrow: string }; notes: { eyebrow: string } };
  journey: { heading: string; body: string };
  notes: { heading: string; empty: string };
  footer: { note: string; copyright: string };
};
