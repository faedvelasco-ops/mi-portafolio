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
                Desarrollador de software con experiencia construyendo aplicaciones
                web (React, TypeScript, Next.js) y en programación con Java y
                Python, complementado con un sólido background como QA Engineer en
                aseguramiento de calidad de aplicaciones empresariales.
              </p>
              <p>
                Cuento con experiencia construyendo proyectos propios de principio a
                fin (ver Changarritos) y formación en ciencia de datos, lo que me
                permite abordar los sistemas desde una perspectiva técnica y
                analítica. Mi experiencia en QA —pruebas funcionales, de regresión y
                de APIs dentro de entornos ágiles— me da una ventaja real al
                desarrollar: pienso en cómo se probará el código y en los casos
                límite desde el diseño.
              </p>
              <h3>Especialidades</h3>
              <ul className="about__specialties">
                <li>Desarrollo frontend con React y TypeScript</li>
                <li>Programación con Java, Python y SQL</li>
                <li>Diseño y consumo de APIs</li>
                <li>Aseguramiento de la calidad (QA) y pruebas funcionales/de regresión</li>
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
