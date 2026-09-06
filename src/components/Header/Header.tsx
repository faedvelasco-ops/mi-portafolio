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

  const handleNavClick = (event: MouseEvent<HTMLUListElement>) => {
    if (onNavigateHome) {
      event.preventDefault()
      onNavigateHome()
    }
  }

  return (
    <header className="sidebar">
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
        <ul className="sidebar__nav-list" onClick={onNavigateHome ? handleNavClick : undefined}>
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
  )
}

export default Header
