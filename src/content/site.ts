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
      "I build things to answer questions I can’t stop thinking about: an LLM pipeline that reads 10,000+ news articles a day, an agent that searches over a thousand government schemes, and speech-to-text that runs entirely on my Mac.",
    links: [
      { label: "github", href: "https://github.com/ratniel" },
      { label: "linkedin", href: "https://www.linkedin.com/in/ratniel" },
      { label: "email", href: "mailto:ratniel.kokane1729@gmail.com" },
    ],
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
  hero: { eyebrow: string; heading: { beforeAccent: string; accent: string; afterAccent: string }; introduction: string; links: { label: string; href: string }[]; scrollCue: string };
  sections: { work: { eyebrow: string; title: string; empty: string }; projects: { eyebrow: string; title: string }; journey: { eyebrow: string }; notes: { eyebrow: string } };
  journey: { heading: string; body: string };
  notes: { heading: string; empty: string };
  footer: { note: string; copyright: string };
};
