type FooterProps = { note: string; copyright: string };
export function Footer({ note, copyright }: FooterProps) {
  return <footer className="site-footer section-shell"><p>{note}</p><small>{copyright}</small></footer>;
}
