import { contactLinks } from '../../data/contact'
import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 className="section__heading" id="contact-heading">
          Contacto
        </h2>
        <ul className="contact__list">
          {contactLinks.map((link) => (
            <li key={link.id}>
              {link.href ? (
                <a
                  className="btn btn--secondary"
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                >
                  {link.label}
                  {link.id !== 'email' && (
                    <span className="sr-only"> (abre en una pestaña nueva)</span>
                  )}
                </a>
              ) : (
                <span className="btn btn--secondary btn--disabled">
                  TODO: {link.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contact
