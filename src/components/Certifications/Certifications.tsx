import { Award } from 'lucide-react'
import { certifications } from '../../data/certifications'
import Reveal from '../Reveal/Reveal'
import './Certifications.css'

function Certifications() {
  return (
    <section
      id="certifications"
      className="section section--alt certifications"
      aria-labelledby="certifications-heading"
    >
      <div className="container">
        <h2 className="section__heading" id="certifications-heading">
          Certificaciones
        </h2>
        <Reveal>
          <ul className="certifications__list">
            {certifications.map((cert) => (
              <li key={cert.id}>
                <Award size={16} aria-hidden="true" />
                {cert.name}
                {cert.issuer && ` — ${cert.issuer}`}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default Certifications
