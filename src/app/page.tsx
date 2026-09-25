import { Navigation } from "@/components/navigation";
import { ExperienceLayer } from "@/components/experience/experience-layer";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Notes } from "@/components/sections/notes";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { projects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { workEntries } from "@/content/work";

export default function Home() {
  return <>
    <ExperienceLayer />
    <Navigation items={siteContent.navigation} name={siteContent.name} />
    <main id="top">
      <Hero {...siteContent.hero} />
      <Work entries={workEntries} {...siteContent.sections.work} />
      <Projects projects={projects} {...siteContent.sections.projects} />
      <Journey {...siteContent.sections.journey} {...siteContent.journey} />
      <Notes {...siteContent.sections.notes} {...siteContent.notes} />
    </main>
    <Footer {...siteContent.footer} />
  </>;
}
