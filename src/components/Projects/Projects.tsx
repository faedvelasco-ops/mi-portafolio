import changarritosFlyer from '../../assets/changarritos-flyer.jpeg'
import { projects } from '../../data/projects'
import './Projects.css'

const projectImages: Record<string, string> = {
  changarritos: changarritosFlyer,
}

function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-heading">
      <div className="container">
        <h2 className="section__heading" id="projects-heading">
          Proyectos
        </h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <article className="card" key={project.id}>
              <img src={projectImages[project.id]} alt={`Vista previa de ${project.name}`} />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="projects__status">{project.status}</p>
              <ul className="projects__tech-list">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <ul className="project-links">
                {project.liveUrl && (
                  <li>
                    <a
                      className="btn btn--primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                      Source Code
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
                      Tests / Automation
                      <span className="sr-only"> (abre en una pestaña nueva)</span>
                    </a>
                  </li>
                )}
                {project.detailsAnchor && (
                  <li>
                    <a
                      className="btn btn--secondary"
                      href={project.detailsAnchor}
                      aria-label={`Ver detalles de ${project.name}`}
                    >
                      Ver detalles
                    </a>
                  </li>
                )}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
