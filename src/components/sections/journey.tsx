type JourneyStop = { place: string; detail: string; dates: string; body: string };
type JourneyProps = { eyebrow: string; heading: string; stops: JourneyStop[] };
export function Journey({ eyebrow, heading, stops }: JourneyProps) {
  return (
    <section id="journey" className="content-section section-shell journey-section" aria-labelledby="journey-title">
      <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="journey-title">{heading}</h2></div>
      <ol className="journey-stops">
        {stops.map((stop) => (
          <li className="journey-stop" key={stop.place}>
            <div className="journey-meta"><h3>{stop.place}</h3><p>{stop.detail}</p><p>{stop.dates}</p></div>
            <p className="journey-copy">{stop.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
