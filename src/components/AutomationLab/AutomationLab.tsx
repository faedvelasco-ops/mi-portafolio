import { FlaskConical, FileBarChart, PlayCircle } from 'lucide-react'
import { GithubIcon } from '../icons/brand-icons'
import { automationProjects } from '../../data/automationLab'
import Reveal from '../Reveal/Reveal'
import { useProfile } from '../../profile/ProfileContext'
import './AutomationLab.css'

function AutomationLab() {
  const { content } = useProfile()

  return (
    <section
      id="automation-lab"
      className="section automation-lab"
      aria-labelledby="automation-lab-heading"
    >
      <div className="container">
        <h2 className="section__heading" id="automation-lab-heading">
          Automation Lab
        </h2>
        <p className="automation-lab__intro">{content.automationLabIntro}</p>
        <div className="automation-lab__list">
          {automationProjects.map((project) => (
            <Reveal key={project.id}>
              <article className="card automation-lab__card" aria-labelledby={`${project.id}-heading`}>
                <div className="automation-lab__header">
                  <FlaskConical className="automation-lab__icon" size={24} aria-hidden="true" />
                  <h3 id={`${project.id}-heading`}>{project.name}</h3>
                </div>
                <p className="automation-lab__summary">{project.summary}</p>

                <div className="automation-lab__aside">
                  <dl className="automation-lab__stats">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="automation-lab__stat">
                        <dt>{stat.label}</dt>
                        <dd>{stat.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="project-links automation-lab__links">
                    <li>
                      <a
                        className="btn btn--primary"
                        href={project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileBarChart size={16} aria-hidden="true" />
                        Ver reporte en vivo
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn btn--secondary"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon size={16} />
                        Código fuente
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn btn--secondary"
                        href={project.ciUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PlayCircle size={16} aria-hidden="true" />
                        Ejecuciones de CI
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="automation-lab__main">
                  <ul className="automation-lab__highlights">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <ul className="automation-lab__tech" aria-label="Tecnologías">
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AutomationLab
