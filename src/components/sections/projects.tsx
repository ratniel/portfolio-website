import type { Project } from "@/content/projects";
export function Projects({ projects, eyebrow, title, codeLabel }: { projects: Project[]; eyebrow: string; title: string; codeLabel: string }) {
  return (
    <section id="projects" className="content-section section-shell" aria-labelledby="projects-title">
      <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="projects-title">{title}</h2></div>
      <div className="project-list">{projects.map((project, index) => <article className="project-entry" key={project.name}>
        <p className="project-index">0{index + 1}</p><div><h3>{project.name}</h3><p className="project-why">{project.why}</p><p>{project.built}</p>{project.github && <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">{codeLabel} <span aria-hidden="true">↗</span></a>}</div>
      </article>)}</div>
    </section>
  );
}
