export type WorkEntry = {
  organization: string;
  role: string;
  dates: string;
  summary: string;
};

export const workEntries: WorkEntry[] = [
  {
    organization: "AiSensy",
    role: "AI Engineer",
    dates: "Jul 2026 – Sep 2026",
    summary:
      "AiSensy’s agents handle real customer conversations: orders, bookings, support, and knowing when to hand over to a human. I worked on how to tell whether a new version was ready to ship. That meant a benchmark where simulated customers walk the agents through whole conversations, and a pipeline that turns failures seen in production into tests that run on every change.",
  },
  {
    organization: "Nitor Infotech",
    role: "Software Engineer",
    dates: "Oct 2024 – Jul 2026",
    summary:
      "I built most of EventWatch, a system that reads 10,000+ news articles a day looking for anything that could disrupt a supply chain, and closer to 20,000 when something big happens. An LLM pipeline sorts each story into one of 41 kinds of disruption, and Kafka keeps the stages from translation to analyst review moving when the news gets loud. Getting it past 85% accuracy took synthetic data, people checking the hard cases, and a lot of prompt iteration.",
  },
  {
    organization: "PharmaACE",
    role: "NLP Engineer",
    dates: "Apr 2024 – Sep 2024",
    summary:
      "My first job after the AI diploma. A medical chatbot kept misreading questions because it couldn’t pick out domain terms, so I fine-tuned NER models for that vocabulary and its intent accuracy went up by 50%. I also automated a content-assembly chore that had been eating more than 7 hours a week.",
  },
];
