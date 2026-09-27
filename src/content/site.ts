export const siteContent = {
  name: "Ratniel Kokane",
  metadata: {
    title: "Ratniel Kokane — AI engineer",
    description: "Trying to understand AI, one rabbit hole at a time.",
  },
  sections: {
    work: { eyebrow: "01 / practice", title: "Work", empty: "Work details will be added here." },
    projects: { eyebrow: "02 / investigation", title: "Things I’m figuring out", codeLabel: "github" },
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
    stops: [
      {
        place: "MANIT Bhopal",
        detail: "B.Tech, Electronics & Communication",
        dates: "2019 – 2023",
        body: "I started in electronics engineering, and somewhere along the way I found neural networks. The idea that we could build machines that think a little like we do really caught hold of me, and it changed the questions I wanted to spend my time on.",
      },
      {
        place: "C-DAC ACTS, Pune",
        detail: "PG Diploma in Artificial Intelligence",
        dates: "2023 – 2024",
        body: "This is where I fell in love with software development, and with the feeling that almost anything is possible if you can write the code for it. It’s also where I met some really cool friends who helped shape how I think about all of this.",
      },
    ],
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
  sections: { work: { eyebrow: string; title: string; empty: string }; projects: { eyebrow: string; title: string; codeLabel: string }; journey: { eyebrow: string }; notes: { eyebrow: string } };
  journey: { heading: string; stops: { place: string; detail: string; dates: string; body: string }[] };
  notes: { heading: string; empty: string };
  footer: { note: string; copyright: string };
};
