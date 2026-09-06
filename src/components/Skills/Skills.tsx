import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck, Bot, Plug, Terminal, LayoutGrid, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { skillCategories } from '../../data/skills'
import Reveal from '../Reveal/Reveal'
import './Skills.css'

const categoryIcons: Record<string, LucideIcon> = {
  'qa-manual': ClipboardCheck,
  'qa-automation': Bot,
  'apis-tools': Plug,
  programming: Terminal,
  frontend: LayoutGrid,
  methodologies: Users,
}

function Skills() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-heading">
      <div className="container">
        <h2 className="section__heading" id="skills-heading">
          Habilidades
        </h2>
        <Reveal>
          <div className="skills__carousel">
            <button
              type="button"
              className="skills__nav skills__nav--prev"
              onClick={() => scrollByCard(-1)}
              aria-label="Ver habilidades anteriores"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <div className="skills__track" ref={trackRef}>
              {skillCategories.map((category) => {
                const Icon = categoryIcons[category.id]
                return (
                  <article
                    key={category.id}
                    className="card skills__card"
                    aria-labelledby={`skills-${category.id}-heading`}
                  >
                    <Icon className="skills__icon" size={24} aria-hidden="true" />
                    <h3 id={`skills-${category.id}-heading`}>
                      {category.title}
                      {category.inDevelopment && (
                        <span className="skills__badge">En desarrollo</span>
                      )}
                    </h3>
                    <ul>
                      {category.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>

            <button
              type="button"
              className="skills__nav skills__nav--next"
              onClick={() => scrollByCard(1)}
              aria-label="Ver más habilidades"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Skills
