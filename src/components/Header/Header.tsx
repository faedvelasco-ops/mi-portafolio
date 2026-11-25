import { useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import {
  Home,
  User,
  Code2,
  Briefcase,
  FlaskConical,
  GraduationCap,
  FolderKanban,
  Mail,
  X,
} from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '../icons/brand-icons'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useProfile } from '../../profile/ProfileContext'
import type { SectionId } from '../../profile/profiles'
import ProfileSwitch from '../ProfileSwitch/ProfileSwitch'
import profilePhoto from '../../assets/profile-photo.jpeg'
import './Header.css'

/** Sections that appear in the sidebar; their order follows the active profile. */
const navMeta: Partial<Record<SectionId, { label: string; Icon: typeof Home }>> = {
  hero: { label: 'Inicio', Icon: Home },
  about: { label: 'Perfil', Icon: User },
  skills: { label: 'Habilidades', Icon: Code2 },
  experience: { label: 'Experiencia', Icon: Briefcase },
  'automation-lab': { label: 'Automation Lab', Icon: FlaskConical },
  education: { label: 'Educación', Icon: GraduationCap },
  projects: { label: 'Proyectos', Icon: FolderKanban },
  contact: { label: 'Contacto', Icon: Mail },
}

interface HeaderProps {
  onNavigateHome?: () => void
}

function Header({ onNavigateHome }: HeaderProps) {
  const { content } = useProfile()
  const navItems = useMemo(
    () =>
      content.sectionOrder.flatMap((id) => {
        const meta = navMeta[id]
        return meta ? [{ id, ...meta }] : []
      }),
    [content],
  )
  const navSectionIds = useMemo(() => navItems.map((item) => item.id), [navItems])
  const activeId = useActiveSection(navSectionIds, !onNavigateHome)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 992px)').matches)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  // Cierra el menú móvil si la ventana crece a tamaño de escritorio.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 993px)')
    const handleChange = () => {
      setIsMenuOpen(false)
      setIsMobile(!mediaQuery.matches)
    }
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

  // Menú móvil como diálogo: el foco entra al abrir y regresa al botón al cerrar,
  // y el resto de la página queda inerte mientras está abierto.
  useEffect(() => {
    if (isMenuOpen) {
      wasOpen.current = true
      closeRef.current?.focus()
      const background = document.querySelectorAll('.app-content, .mobile-bar, .profile-notice')
      background.forEach((element) => element.setAttribute('inert', ''))
      return () => background.forEach((element) => element.removeAttribute('inert'))
    }
    if (wasOpen.current) {
      wasOpen.current = false
      toggleRef.current?.focus()
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
      <div className="mobile-bar" role="region" aria-label="Barra superior">
        <button
          ref={toggleRef}
          type="button"
          className="sidebar-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="sidebar"
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          <img src={profilePhoto} alt="" width="44" height="44" />
        </button>
        <ProfileSwitch className="profile-switch--bar" />
      </div>

      {isMenuOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}

      <header
        id="sidebar"
        className={`sidebar${isMenuOpen ? ' sidebar--open' : ''}`}
        // Cerrado en móvil, el menú está fuera de pantalla: inert lo saca del foco y de los lectores.
        inert={isMobile && !isMenuOpen}
      >
        <button
          ref={closeRef}
          type="button"
          className="sidebar__close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Cerrar menú de navegación"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <ProfileSwitch className="profile-switch--sidebar" />

        <img className="sidebar__photo" src={profilePhoto} alt="" width="110" height="110" />
        <p className="sidebar__name">Faed Velasco</p>
        <p className="sidebar__role">{content.sidebarRole}</p>

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
