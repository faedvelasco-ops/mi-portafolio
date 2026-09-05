import './Hero.css'

function Hero() {
  return (
    <section id="hero" className="section hero" aria-labelledby="hero-heading">
      <div className="container">
        <h1 id="hero-heading">Faed Federico Velasco Mero</h1>
        <p className="hero__role">Ingeniero QA</p>
        <p>
          QA Engineer enfocado en el aseguramiento de la calidad de aplicaciones
          empresariales, con experiencia en pruebas funcionales, exploratorias, de
          regresión y de APIs en entornos ágiles.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects">
            Ver proyectos
          </a>
          <a
            className="btn btn--secondary"
            href="/cv.pdf"
            download="Faed-Velasco-Mero-CV.pdf"
          >
            Descargar CV
            <span className="sr-only"> (PDF)</span>
          </a>
        </div>
        <ul className="hero__links">
          <li>
            <a
              href="https://www.linkedin.com/in/faed-velasco"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
          </li>
          <li>
            {/* TODO: aún no existe un repositorio de GitHub público */}
            <span className="hero__link--disabled">TODO: GitHub</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Hero
