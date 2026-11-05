import { ArrowRight } from 'lucide-react';
import type { CSSProperties, MouseEvent } from 'react';
import projects from './projects.json';

type RelatedCaseStudiesProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

export default function RelatedCaseStudies({ currentPath, onNavigate }: RelatedCaseStudiesProps) {
  const caseStudies = projects.filter((project) => project.url.startsWith('/') && project.url !== currentPath);

  const openCase = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(path);
  };

  if (caseStudies.length === 0) return null;

  return (
    <section className="related-work" id="related-projects" aria-labelledby="related-work-title">
      <div className="related-work-inner">
        <header className="related-work-head" data-reveal>
          <div>
            <span className="eyebrow">More work</span>
            <h2 id="related-work-title">Related <em>projects</em></h2>
          </div>
          <p>Explore the other UX case studies and projects, without leaving the work.</p>
        </header>
        <ul className="related-work-grid" aria-label="Other case studies">
          {caseStudies.map((project, index) => (
            <li key={project.url} data-reveal style={{ transitionDelay: `${(index % 4) * 70}ms` }}>
              <a
                className="related-project"
                href={project.url}
                onClick={(event) => openCase(event, project.url)}
                aria-label={`View case study: ${project.title}`}
              >
                <span className="related-project-image" style={{ '--related-tint': project.color } as CSSProperties}>
                  <img src={project.cover} alt="" loading="lazy" referrerPolicy="no-referrer" style={project.position ? { objectPosition: project.position } : undefined} />
                </span>
                <span className="related-project-info">
                  <span>
                    <span className="related-project-category">{project.category}</span>
                    <span className="related-project-title">{project.title}</span>
                  </span>
                  <span className="related-project-arrow" aria-hidden="true"><ArrowRight size={17} strokeWidth={1.7} /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
