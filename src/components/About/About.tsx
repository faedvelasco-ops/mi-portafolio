import profilePhoto from '../../assets/profile-photo.jpeg'
import Reveal from '../Reveal/Reveal'
import './About.css'

function About() {
  return (
    <section
      id="about"
      className="section section--alt about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <Reveal>
          <div className="about__layout">
            <div className="about__photo-frame">
              <img
                className="about__photo"
                src={profilePhoto}
                alt="Foto profesional de Faed Velasco"
                width="280"
                height="426"
              />
            </div>
            <div className="about__content">
              <h2 className="section__heading" id="about-heading">
                Perfil profesional
              </h2>
              <p>
                QA Tester con experiencia en aseguramiento de la calidad de
                aplicaciones empresariales, enfocado en diseño de pruebas, análisis
                de defectos y mejora continua.
              </p>
              <p>
                Con experiencia en desarrollo de software y formación en ciencia de
                datos, comprendo los sistemas desde una perspectiva técnica y
                analítica, validando APIs e identificando riesgos y defectos desde
                etapas tempranas. Experiencia en pruebas funcionales, exploratorias,
                de regresión y de APIs dentro de entornos ágiles.
              </p>
              <h3>Especialidades</h3>
              <ul className="about__specialties">
                <li>Aseguramiento de la calidad (QA)</li>
                <li>Diseño y ejecución de pruebas funcionales, exploratorias y de regresión</li>
                <li>Validación de APIs</li>
                <li>Metodologías ágiles (Scrum)</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
