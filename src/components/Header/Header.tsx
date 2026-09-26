import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import {
  Home,
  User,
  Code2,
  Briefcase,
  GraduationCap,
  FolderKanban,
  FlaskConical,
  Mail,
  X,
} from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '../icons/brand-icons'
import { useActiveSection } from '../../hooks/useActiveSection'
import profilePhoto from '../../assets/profile-photo.jpeg'
import './Header.css'

const navItems = [
  { id: 'hero', label: 'Inicio', Icon: Home },
  { id: 'about', label: 'Perfil', Icon: User },
  { id: 'skills', label: 'Habilidades', Icon: Code2 },
  { id: 'experience', label: 'Experiencia', Icon: Briefcase },
  { id: 'education', label: 'Educación', Icon: GraduationCap },
  { id: 'projects', label: 'Proyectos', Icon: FolderKanban },
  { id: 'automation-lab', label: 'Automation Lab', Icon: FlaskConical },
  { id: 'contact', label: 'Contacto', Icon: Mail },
]

const navSectionIds = navItems.map((item) => item.id)

interface HeaderProps {
  onNavigateHome?: () => void
}

function Header({ onNavigateHome }: HeaderProps) {
  const activeId = useActiveSection(navSectionIds, !onNavigateHome)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Cierra el menú móvil si la ventana crece a tamaño de escritorio.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 993px)')
    const handleChange = () => setIsMenuOpen(false)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    if (!isMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  // Cierra el menú móvil con la tecla Escape.
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const handleNavClick = (event: MouseEvent<HTMLUListElement>) => {
    if (onNavigateHome) {
      event.preventDefault()
      onNavigateHome()
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-controls="sidebar"
        aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
      >
        <img src={profilePhoto} alt="" width="44" height="44" />
      </button>

      {isMenuOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}

      <header id="sidebar" className={`sidebar${isMenuOpen ? ' sidebar--open' : ''}`}>
        <button
          type="button"
          className="sidebar__close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Cerrar menú de navegación"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <img className="sidebar__photo" src={profilePhoto} alt="" width="110" height="110" />
        <p className="sidebar__name">Faed Velasco</p>
        <p className="sidebar__role">Ingeniero QA</p>

        <ul className="sidebar__socials">
          <li>
            <a
              href="https://www.linkedin.com/in/faed-velasco"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={18} />
              <span className="sr-only">LinkedIn (abre en una pestaña nueva)</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/faedvelasco-ops" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={18} />
              <span className="sr-only">GitHub (abre en una pestaña nueva)</span>
            </a>
          </li>
        </ul>

        <hr className="sidebar__divider" />

        <nav aria-label="Navegación principal">
          <ul className="sidebar__nav-list" onClick={handleNavClick}>
            {navItems.map(({ id, label, Icon }) => (
              <li key={id}>
                <a href={`#${id}`} className={activeId === id ? 'is-active' : undefined}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
