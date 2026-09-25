type HeroProps = { eyebrow: string; heading: { beforeAccent: string; accent: string; afterAccent: string }; introduction: string; prompt: string; exploration: string; scrollCue: string };
export function Hero({ eyebrow, heading, introduction, prompt, exploration, scrollCue }: HeroProps) {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="hero-title">{heading.beforeAccent}<span className="hero-accent">{heading.accent}</span>{heading.afterAccent}</h1>
      <p className="hero-intro">{introduction}</p>
      <div className="currently"><span className="currently-label">{prompt}</span><span>{exploration}</span></div>
      <a className="scroll-cue" href="#work">{scrollCue} <span aria-hidden="true">↓</span></a>
    </section>
  );
}
