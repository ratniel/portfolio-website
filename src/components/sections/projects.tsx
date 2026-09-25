import type { Project } from "@/content/projects";
export function Projects({ projects, eyebrow, title }: { projects: Project[]; eyebrow: string; title: string }) {
  return (
    <section id="projects" className="content-section section-shell" aria-labelledby="projects-title">
      <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id="projects-title">{title}</h2></div>
      <div className="project-list">{projects.map((project, index) => <article className="project-entry" key={project.name}>
        <p className="project-index">0{index + 1}</p><div><h3>{project.name}</h3><p className="project-question">{project.question}</p><p>{project.description}</p>{project.learning && <p className="project-learning">{project.learning}</p>}</div>
      </article>)}</div>
    </section>
  );
}
