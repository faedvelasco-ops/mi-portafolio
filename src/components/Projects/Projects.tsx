import { ExternalLink, FlaskConical, ArrowRight } from 'lucide-react'
import { GithubIcon } from '../icons/brand-icons'
import changarritosFlyer from '../../assets/changarritos-flyer.jpeg'
import portfolioPreview from '../../assets/portfolio-preview.jpg'
import { projects } from '../../data/projects'
import Reveal from '../Reveal/Reveal'
import './Projects.css'

/** Intrinsic sizes let the browser reserve space before the image loads (no layout shift). */
const projectImages: Record<string, { src: string; width: number; height: number }> = {
  changarritos: { src: changarritosFlyer, width: 1080, height: 1080 },
  portafolio: { src: portfolioPreview, width: 1280, height: 720 },
}

interface ProjectsProps {
  onOpenDetail: (projectId: string) => void
}

function Projects({ onOpenDetail }: ProjectsProps) {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-heading">
      <div className="container">
        <h2 className="section__heading" id="projects-heading">
          Proyectos
        </h2>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <article className="card">
                <div className="projects__media">
                  <img
                    src={projectImages[project.id].src}
                    width={projectImages[project.id].width}
                    height={projectImages[project.id].height}
                    alt={`Vista previa de ${project.name}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="projects__overlay" aria-hidden="true">
                    <span>{project.status}</span>
                  </div>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="projects__status">{project.status}</p>
                <ul className="project-links">
                  {project.liveUrl && (
                    <li>
                      <a
                        className="btn btn--primary"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        Live / Producción
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  )}
                  {project.githubUrl && (
                    <li>
                      <a
                        className="btn btn--secondary"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon size={16} />
                        Código Fuente
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  )}
                  {project.testsUrl && (
                    <li>
                      <a
                        className="btn btn--secondary"
                        href={project.testsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FlaskConical size={16} aria-hidden="true" />
                        Pruebas Automatizadas
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      </a>
                    </li>
                  )}
                  {project.hasDetailPage && (
                    <li>
                      <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={() => onOpenDetail(project.id)}
                        aria-label={`Ver detalles de ${project.name}`}
                      >
                        Ver detalles
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    </li>
                  )}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
