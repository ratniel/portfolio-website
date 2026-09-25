type JourneyProps = { eyebrow: string; heading: string; body: string };
export function Journey({ eyebrow, heading, body }: JourneyProps) {
  return <section id="journey" className="content-section section-shell journey-section" aria-labelledby="journey-title"><div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="journey-title">{heading}</h2></div><p className="journey-copy">{body}</p></section>;
}
