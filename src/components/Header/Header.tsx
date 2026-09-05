import './Header.css'

function Header() {
  return (
    <header className="header">
      <nav aria-label="Navegación principal">
        <ul className="header__nav-list">
          <li>
            <a href="#hero">Inicio</a>
          </li>
          <li>
            <a href="#about">Perfil</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#experience">Experiencia</a>
          </li>
          <li>
            <a href="#education">Educación</a>
          </li>
          <li>
            <a href="#projects">Proyectos</a>
          </li>
          <li>
            <a href="#automation-lab">Automation Lab</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
