import { skillCategories } from '../../data/skills'
import './Skills.css'

function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-heading">
      <div className="container">
        <h2 className="section__heading" id="skills-heading">
          Skills
        </h2>
        <div className="skills__groups">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              className="card"
              aria-labelledby={`skills-${category.id}-heading`}
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
