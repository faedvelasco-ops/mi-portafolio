import type { ComponentType } from 'react'
import { Mail } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '../icons/brand-icons'
import { contactLinks } from '../../data/contact'
import Reveal from '../Reveal/Reveal'
import './Contact.css'

const linkIcons: Record<string, ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
}

function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 className="section__heading" id="contact-heading">
          Contacto
        </h2>
        <Reveal>
          <ul className="contact__list">
            {contactLinks.map((link) => {
              const Icon = linkIcons[link.id]
              return (
                <li key={link.id}>
                  {link.href ? (
                    <a
                      className="btn btn--secondary"
                      href={link.href}
                      target={link.id === 'email' ? undefined : '_blank'}
                      rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                    >
                      <Icon size={18} />
                      {link.label}
                      {link.id !== 'email' && (
                        <span className="sr-only"> (abre en una pestaña nueva)</span>
                      )}
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
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
