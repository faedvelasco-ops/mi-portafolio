import type { ProjectDetailData } from '../../types/project'
import './ProjectDetail.css'

interface ProjectDetailProps {
  data: ProjectDetailData
  image?: string
  imageAlt?: string
}

function ProjectDetail({ data, image, imageAlt }: ProjectDetailProps) {
  return (
    <div className="project-detail">
      {image && (
        <div className="project-detail__image-frame">
          <img className="project-detail__image" src={image} alt={imageAlt ?? ''} />
        </div>
      )}
      <div className="project-detail__content">
        {data.tagline && <p className="project-detail__tagline">{data.tagline}</p>}

        {data.overview && (
          <>
            <h3>Overview</h3>
            <p>{data.overview}</p>
          </>
        )}

        <h3>Problem</h3>
        <p>{data.problem}</p>

        <h3>Solution</h3>
        <p>{data.solution}</p>

        <h3>Funcionalidades</h3>
        <ul>
          {data.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        {data.qaStrategy && (
          <>
            <h3>QA Strategy</h3>
            <p>{data.qaStrategy}</p>
          </>
        )}

        <h3>Technologies</h3>
        <ul className="project-detail__tech-list">
          {data.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {data.upcomingTechnologies?.map((tech) => (
            <li key={tech} className="project-detail__tech-tag--upcoming">
              {tech} (en desarrollo)
            </li>
          ))}
        </ul>

        <p className="project-detail__status">{data.status}</p>

        <ul className="project-links">
          {data.liveUrl && (
            <li>
              <a
                className="btn btn--primary"
                href={data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live / Producción
                <span className="sr-only"> (abre en una pestaña nueva)</span>
              </a>
            </li>
          )}
          {data.githubUrl && (
            <li>
              <a
                className="btn btn--secondary"
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
                <span className="sr-only"> (abre en una pestaña nueva)</span>
              </a>
            </li>
          )}
          {data.testsUrl && (
            <li>
              <a
                className="btn btn--secondary"
                href={data.testsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Automated Tests
                <span className="sr-only"> (abre en una pestaña nueva)</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ProjectDetail
