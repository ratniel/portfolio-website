export type Project = {
  name: string;
  why: string;
  built: string;
  github?: string;
};

export const projects: Project[] = [
  {
    name: "JurisAI",
    why: "There are well over a thousand government schemes, and finding the ones that apply to you means reading a lot of dense text. I wanted to see whether an agent could do that reading for you.",
    built: "An assistant over 1,196 schemes that works out what you’re asking, plans one to three searches, and answers from the scheme text itself.",
  },
  {
    name: "Kotaeba",
    why: "I wanted dictation on my Mac that never sends my voice to a server.",
    built: "A menu bar app: hold a hotkey, speak, and the text lands in whatever app you’re typing in. Transcription runs locally with Parakeet or Whisper on Apple’s MLX.",
    github: "https://github.com/ratniel/kotaeba",
  },
  {
    name: "Visage",
    why: "Can a model running on a laptop lift handwritten calligraphy cleanly off a photo?",
    built: "Early days: a local pipeline that segments only the handwriting from a calligraphy image and exports it with a transparent background.",
  },
];
