import { EmailPopover } from "@/components/email-popover";

type HeroProps = { name: string; eyebrow: string; heading: { beforeAccent: string; accent: string; afterAccent: string }; introduction: string; links: { label: string; href: string }[]; email: { label: string; address: string; copy: string; copied: string }; scrollCue: string };
export function Hero({ name, eyebrow, heading, introduction, links, email, scrollCue }: HeroProps) {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <p className="eyebrow" data-progress-start>{eyebrow}</p>
      <h1 id="hero-title" className="hero-name">{name}</h1>
      <p className="hero-tagline">{heading.beforeAccent}<span className="hero-accent">{heading.accent}</span>{heading.afterAccent}</p>
      <p className="hero-intro">{introduction}</p>
      <ul className="hero-links">
        {links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}
        <li><EmailPopover {...email} /></li>
      </ul>
      <a className="scroll-cue" href="#work" data-progress-end>{scrollCue} <span aria-hidden="true">↓</span></a>
    </section>
  );
}
