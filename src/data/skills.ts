export interface SkillCategory {
  id: string
  title: string
  skills: string[]
  inDevelopment?: boolean
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'qa-manual',
    title: 'QA — Testing Manual',
    skills: [
      'Pruebas funcionales',
      'Pruebas exploratorias',
      'Pruebas de regresión',
      'Pruebas estáticas',
      'Diseño de casos de prueba',
      'Gestión del ciclo de vida de defectos',
    ],
  },
  {
    id: 'qa-automation',
    title: 'QA Automation',
    skills: ['Playwright', 'TypeScript', 'E2E Testing', 'Test Automation'],
    inDevelopment: true,
  },
  {
    id: 'apis-tools',
    title: 'APIs & Herramientas',
    skills: ['APIs REST', 'Postman', 'Swagger', 'Azure DevOps', 'Jira', 'Excel', 'Git / GitHub'],
  },
  {
    id: 'programming',
    title: 'Programación y Bases de Datos',
    skills: ['Java', 'C#', 'C++', 'C', 'PHP', 'Python', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Desarrollo Frontend',
    skills: [
      'HTML5',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'React Native',
      'Next.js',
    ],
  },
  {
    id: 'methodologies',
    title: 'Metodologías',
    skills: ['Scrum', 'Kanban'],
  },
]
