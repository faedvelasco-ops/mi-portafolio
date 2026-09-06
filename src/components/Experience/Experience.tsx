import { experienceEntries } from '../../data/experience'
import Reveal from '../Reveal/Reveal'
import './Experience.css'

function Experience() {
  return (
    <section
      id="experience"
      className="section section--alt experience"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <h2 className="section__heading" id="experience-heading">
          Experiencia profesional
        </h2>
        <div className="timeline">
          {experienceEntries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.1}>
              <div className="timeline__item">
                <article className="card">
                  <h3>
                    {entry.role} — {entry.company}
                  </h3>
                  <p className="experience__period">{entry.period}</p>
                  <ul>
                    {entry.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
