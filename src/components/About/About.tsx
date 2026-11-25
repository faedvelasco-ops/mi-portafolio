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
                QA Engineer con experiencia en aseguramiento de calidad de
                aplicaciones empresariales: pruebas funcionales, exploratorias, de
                regresión y de APIs, gestión de defectos en Azure DevOps y trabajo
                con equipos de desarrollo bajo Scrum.
              </p>
              <p>
                Fuera del trabajo construyo proyectos de automatización con Playwright
                y TypeScript (ver Automation Lab) y proyectos de desarrollo de
                principio a fin (ver Changarritos). Mi formación en desarrollo de
                software (React, TypeScript, Java, Python) y en ciencia de datos me
                permite entender cómo se construye lo que pruebo y comunicarme con
                los desarrolladores en su mismo lenguaje.
              </p>
              <h3>Especialidades</h3>
              <ul className="about__specialties">
                <li>Pruebas funcionales, exploratorias y de regresión</li>
                <li>Pruebas de APIs REST (Postman, Swagger)</li>
                <li>Automatización E2E y de API con Playwright y TypeScript (proyectos propios)</li>
                <li>Gestión de defectos con Azure DevOps y metodologías ágiles (Scrum)</li>
                <li>Desarrollo frontend con React y TypeScript</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
