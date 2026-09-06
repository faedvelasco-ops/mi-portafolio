import { contactLinks } from '../../data/contact'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer__links">
          {contactLinks.map((link) =>
            link.href ? (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                >
                  {link.label}
                </a>
              </li>
            ) : null,
          )}
        </ul>

        <hr className="footer__divider" />

        <p>© {year} Faed Velasco. Todos los derechos reservados.</p>
        <p className="footer__credits">Hecho con React, TypeScript y Vite.</p>
      </div>
    </footer>
  )
}

export default Footer
