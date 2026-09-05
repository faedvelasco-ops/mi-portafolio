import { experienceEntries } from '../../data/experience'
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
        <div className="experience__list">
          {experienceEntries.map((entry) => (
            <article className="card" key={entry.id}>
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
