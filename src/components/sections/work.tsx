import type { WorkEntry } from "@/content/work";
export function Work({ entries, eyebrow, title, empty }: { entries: WorkEntry[]; eyebrow: string; title: string; empty: string }) {
  return (
    <section id="work" className="content-section section-shell" aria-labelledby="work-title">
      <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="work-title">{title}</h2></div>
      {entries.length ? <div className="entry-list">{entries.map((entry) => <article className="work-entry" key={`${entry.organization}-${entry.role}`}>
        <div className="entry-meta"><h3>{entry.role}</h3><p>{entry.organization}</p><time>{entry.dates}</time></div><p className="entry-copy">{entry.summary}</p>
      </article>)}</div> : <p className="quiet-note">{empty}</p>}
    </section>
  );
}
