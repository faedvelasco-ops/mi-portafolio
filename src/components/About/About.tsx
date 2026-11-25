import profilePhoto from '../../assets/profile-photo.jpeg'
import Reveal from '../Reveal/Reveal'
import { useProfile } from '../../profile/ProfileContext'
import './About.css'

function About() {
  const { content } = useProfile()

  return (
    <section
      id="about"
      className="section about"
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
                decoding="async"
              />
            </div>
            <div className="about__content">
              <h2 className="section__heading" id="about-heading">
                Perfil profesional
              </h2>
              {content.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <h3>Especialidades</h3>
              <ul className="about__specialties">
                {content.specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
