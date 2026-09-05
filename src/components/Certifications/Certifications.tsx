import { certifications } from '../../data/certifications'
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
        <ul className="certifications__list">
          {certifications.map((cert) => (
            <li key={cert.id}>
              {cert.name}
              {cert.issuer && ` — ${cert.issuer}`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Certifications
