type NotesProps = { eyebrow: string; heading: string; empty: string };
export function Notes({ eyebrow, heading, empty }: NotesProps) {
  return <section id="notes" className="content-section section-shell notes-section" aria-labelledby="notes-title"><div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="notes-title">{heading}</h2></div><p className="quiet-note">{empty}</p></section>;
}
