export interface ExperienceEntry {
  id: string
  role: string
  company: string
  period: string
  responsibilities: string[]
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'contpaqi',
    role: 'Ingeniero QA',
    company: 'CONTPAQi',
    period: 'Oct 2024 – Actualidad',
    responsibilities: [
      'Diseño y mantenimiento de casos de prueba para funcionalidades críticas del sistema.',
      'Ejecución de pruebas funcionales, exploratorias y de regresión en aplicaciones empresariales.',
      'Gestión y seguimiento de defectos mediante Azure DevOps.',
      'Validación de correcciones y aseguramiento de la calidad previo a las liberaciones.',
      'Análisis de defectos para identificar patrones y prevenir errores recurrentes.',
      'Propuesta de mejoras en los procesos de pruebas y calidad del producto.',
      'Colaboración con equipos de desarrollo bajo la metodología Scrum.',
    ],
  },
  {
    id: 'ibm',
    role: 'Ingeniero de Pruebas',
    company: 'IBM',
    period: 'Ene 2024 – Jul 2024',
    responsibilities: [
      'Ejecución de pruebas en diferentes fases sobre infraestructura de servidores.',
      'Validación y documentación de resultados de pruebas.',
      'Verificación del cumplimiento de requerimientos técnicos.',
      'Apoyo en la identificación de incidencias y validación de soluciones.',
    ],
  },
]
