import type { ComponentType } from 'react'
import { LinkedinIcon, GithubIcon } from '../icons/brand-icons'
import { contactLinks } from '../../data/contact'
import Reveal from '../Reveal/Reveal'
import ContactForm from './ContactForm'
import './Contact.css'

const linkIcons: Record<string, ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
}

function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 className="section__heading" id="contact-heading">
          Contacto
        </h2>
        <Reveal>
          <div className="contact__layout">
            <div className="contact__intro">
              <p>
                ¿Tienes una oportunidad, un proyecto o simplemente quieres
                platicar sobre QA y automatización? Escríbeme por aquí o por
                cualquiera de estos medios.
              </p>
              <ul className="contact__list">
                {contactLinks.map((link) => {
                  const Icon = linkIcons[link.id]
                  return (
                    <li key={link.id}>
                      {link.href ? (
                        <a
                          className="btn btn--secondary"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon size={18} />
                          {link.label}
                          <span className="sr-only"> (abre en una pestaña nueva)</span>
                        </a>
                      ) : (
                        <span className="btn btn--secondary btn--disabled">
                          <Icon size={18} />
                          TODO: {link.label}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="contact__form-frame">
              <div className="contact__form-card card">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
