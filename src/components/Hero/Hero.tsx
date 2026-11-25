import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '../icons/brand-icons'
import './Hero.css'

function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="hero" className="section hero" aria-labelledby="hero-heading">
      <motion.div
        className="container"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 id="hero-heading">Faed Federico Velasco Mero</h1>
        <p className="hero__role">QA Engineer · Playwright & API Testing</p>
        <p>
          QA Engineer en CONTPAQi, con experiencia previa como Ingeniero de Pruebas
          en IBM. Diseño y ejecuto pruebas funcionales, de regresión y de APIs en
          aplicaciones empresariales, y en proyectos propios automatizo pruebas E2E
          y de API con Playwright y TypeScript. El desarrollo de software (React,
          TypeScript) complementa mi perfil: entiendo cómo se construye lo que pruebo.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#automation-lab">
            Ver Automation Lab
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            className="btn btn--secondary"
            href="/cv.pdf"
            download="Faed-Velasco-Mero-CV.pdf"
          >
            <Download size={18} aria-hidden="true" />
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
              <LinkedinIcon size={18} />
              LinkedIn
              <span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/faedvelasco-ops"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={18} />
              GitHub
              <span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
          </li>
        </ul>
      </motion.div>
    </section>
  )
}

export default Hero
