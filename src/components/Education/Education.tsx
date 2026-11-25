import { educationEntries } from '../../data/education'
import Reveal from '../Reveal/Reveal'
import './Education.css'

function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="education-heading">
      <div className="container">
        <h2 className="section__heading" id="education-heading">
          Educación
        </h2>
        <div className="timeline">
          {educationEntries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.1}>
              <div className="timeline__item">
                <article className="card">
                  <h3>
                    {entry.program} — {entry.institution}
                  </h3>
                  <p className="education__period">{entry.period}</p>
                  {entry.highlights && (
                    <ul>
                      {entry.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
