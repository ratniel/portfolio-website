import type { siteContent } from "@/content/site";

type NavigationProps = { items: typeof siteContent.navigation; name: string };

export function Navigation({ items, name }: NavigationProps) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={`${name}, home`}>{name}</a>
      <nav aria-label="Main navigation">
        {items.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
    </header>
  );
}
